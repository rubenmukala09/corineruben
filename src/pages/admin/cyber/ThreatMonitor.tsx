import { useState } from "react";
import { Link } from "react-router-dom";
import { Shield, AlertTriangle, CheckCircle, XCircle, RefreshCw, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ThreatEvent {
  id: string;
  threat_type: string;
  severity: string;
  status: string;
  target: string | null;
  description: string | null;
  created_at: string;
  resolved_at: string | null;
}

export default function ThreatMonitor() {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newThreat, setNewThreat] = useState({
    threat_type: "",
    severity: "medium",
    target: "",
  });

  // Fetch threats from database
  const { data: threats = [], isLoading, refetch } = useQuery({
    queryKey: ["threat-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("threat_events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ThreatEvent[];
    },
  });

  // Add threat mutation (for testing/demo)
  const addThreatMutation = useMutation({
    mutationFn: async (threat: { threat_type: string; severity: string; target: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("threat_events")
        .insert({
          ...threat,
          profile_id: user.id,
          status: "active",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threat-events"] });
      toast.success("Threat event logged");
      setIsAddDialogOpen(false);
      setNewThreat({ threat_type: "", severity: "medium", target: "" });
    },
    onError: (error) => {
      toast.error("Failed to log threat: " + error.message);
    },
  });

  // Resolve threat mutation
  const resolveThreatMutation = useMutation({
    mutationFn: async (threatId: string) => {
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from("threat_events")
        .update({ 
          status: "resolved", 
          resolved_at: new Date().toISOString(),
          resolved_by: user?.id 
        })
        .eq("id", threatId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threat-events"] });
      toast.success("Threat resolved successfully");
    },
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical": return "text-red-500 bg-red-500/10";
      case "high": return "text-orange-500 bg-orange-500/10";
      case "medium": return "text-yellow-500 bg-yellow-500/10";
      case "low": return "text-green-500 bg-green-500/10";
      default: return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "resolved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "investigating": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "dismissed": return <XCircle className="h-4 w-4 text-gray-500" />;
      case "active": return <Shield className="h-4 w-4 text-red-500" />;
      default: return <Shield className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusLabel = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // Calculate stats from real data
  const activeThreats = threats.filter(t => t.status === "active").length;
  const blockedToday = threats.filter(t => {
    const today = new Date();
    const threatDate = new Date(t.created_at);
    return threatDate.toDateString() === today.toDateString() && t.status === "resolved";
  }).length;
  const underReview = threats.filter(t => t.status === "investigating").length;
  const resolved = threats.filter(t => t.status === "resolved").length;

  return (
    <AdminLayout
      title="Threat Monitor"
      subtitle="Real-time threat detection and response"
      searchPlaceholder="Search threats..."
      headerActions={
        <div className="flex items-center gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-gray-700 text-[#9CA3AF] hover:text-white">
                <Plus className="h-4 w-4 mr-2" />
                Log Threat
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#111827] border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-[#F9FAFB]">Log New Threat Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="text-[#9CA3AF]">Threat Type</Label>
                  <Input
                    placeholder="e.g., Phishing Attempt"
                    value={newThreat.threat_type}
                    onChange={(e) => setNewThreat(prev => ({ ...prev, threat_type: e.target.value }))}
                    className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#9CA3AF]">Severity</Label>
                  <Select
                    value={newThreat.severity}
                    onValueChange={(value) => setNewThreat(prev => ({ ...prev, severity: value }))}
                  >
                    <SelectTrigger className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1F2937] border-gray-700">
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-[#9CA3AF]">Target</Label>
                  <Input
                    placeholder="e.g., user@email.com"
                    value={newThreat.target}
                    onChange={(e) => setNewThreat(prev => ({ ...prev, target: e.target.value }))}
                    className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                  />
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#EF4444] to-[#F97316] text-white"
                  onClick={() => addThreatMutation.mutate(newThreat)}
                  disabled={!newThreat.threat_type || addThreatMutation.isPending}
                >
                  {addThreatMutation.isPending ? "Logging..." : "Log Threat Event"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Link to="/admin">
            <Button variant="outline" className="border-gray-700 text-[#9CA3AF] hover:text-white">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        {[
          { label: "Active Threats", value: activeThreats.toString(), color: "from-red-500 to-orange-500" },
          { label: "Blocked Today", value: blockedToday.toString(), color: "from-green-500 to-emerald-500" },
          { label: "Under Review", value: underReview.toString(), color: "from-yellow-500 to-orange-500" },
          { label: "Total Resolved", value: resolved.toString(), color: "from-blue-500 to-cyan-500" },
        ].map((stat) => (
          <Card key={stat.label} className="bg-[#111827] border-gray-800">
            <CardContent className="p-6">
              <p className="text-[#9CA3AF] text-sm">{stat.label}</p>
              <p className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Threats List */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#F9FAFB]">Recent Threats</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => refetch()}
            className="text-[#9CA3AF] hover:text-white"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto text-[#06B6D4] mb-4" />
              <p className="text-[#9CA3AF]">Loading threats...</p>
            </div>
          ) : threats.length === 0 ? (
            <div className="text-center py-12">
              <Shield className="h-16 w-16 mx-auto text-green-500/50 mb-4" />
              <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">All Clear!</h3>
              <p className="text-[#9CA3AF] max-w-sm mx-auto">
                No threat events detected. Your systems are secure.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {threats.map((threat) => (
                <div key={threat.id} className="flex items-center justify-between p-4 rounded-lg bg-[#1F2937] border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${getSeverityColor(threat.severity)}`}>
                      <Shield className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-medium text-[#F9FAFB]">{threat.threat_type}</p>
                      <p className="text-sm text-[#9CA3AF]">Target: {threat.target || 'Unknown'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${getSeverityColor(threat.severity)}`}>
                      {threat.severity}
                    </span>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(threat.status)}
                      <span className="text-sm text-[#9CA3AF]">{getStatusLabel(threat.status)}</span>
                    </div>
                    <span className="text-sm text-[#9CA3AF] min-w-[100px] text-right">
                      {formatDistanceToNow(new Date(threat.created_at), { addSuffix: true })}
                    </span>
                    {threat.status === "active" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => resolveThreatMutation.mutate(threat.id)}
                        disabled={resolveThreatMutation.isPending}
                        className="text-green-500 hover:text-white hover:bg-green-500/20"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
