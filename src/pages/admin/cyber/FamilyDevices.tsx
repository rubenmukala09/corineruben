import { useState } from "react";
import { Link } from "react-router-dom";
import { Smartphone, Laptop, Tablet, Tv, Shield, Plus, RefreshCw, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { formatDistanceToNow } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Device {
  id: string;
  device_name: string;
  device_type: string;
  status: string;
  last_scan: string;
  protection_level: number;
  os_version: string | null;
  profile_id: string;
}

export default function FamilyDevices() {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({
    device_name: "",
    device_type: "mobile",
  });

  // Fetch devices from database
  const { data: devices = [], isLoading, refetch } = useQuery({
    queryKey: ["user-devices"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("user_devices")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Device[];
    },
  });

  // Add device mutation
  const addDeviceMutation = useMutation({
    mutationFn: async (device: { device_name: string; device_type: string }) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { data, error } = await supabase
        .from("user_devices")
        .insert({
          ...device,
          profile_id: user.id,
          protection_level: 100,
          status: "protected",
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-devices"] });
      toast.success("Device added successfully");
      setIsAddDialogOpen(false);
      setNewDevice({ device_name: "", device_type: "mobile" });
    },
    onError: (error) => {
      toast.error("Failed to add device: " + error.message);
    },
  });

  // Scan device mutation
  const scanDeviceMutation = useMutation({
    mutationFn: async (deviceId: string) => {
      const { data, error } = await supabase
        .from("user_devices")
        .update({ last_scan: new Date().toISOString() })
        .eq("id", deviceId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-devices"] });
      toast.success("Device scan completed");
    },
  });

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile": return Smartphone;
      case "laptop":
      case "desktop": return Laptop;
      case "tablet": return Tablet;
      case "iot": return Tv;
      default: return Smartphone;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "protected": return "text-green-500";
      case "warning": return "text-yellow-500";
      case "at_risk": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "protected": return "Protected";
      case "warning": return "Warning";
      case "at_risk": return "At Risk";
      default: return status;
    }
  };

  const getProtectionColor = (protection: number) => {
    if (protection >= 90) return "bg-green-500";
    if (protection >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Calculate stats from real data
  const totalDevices = devices.length;
  const fullyProtected = devices.filter(d => d.protection_level >= 90).length;
  const needsAttention = devices.filter(d => d.status === "at_risk" || d.protection_level < 70).length;

  return (
    <AdminLayout
      title="Family Devices"
      subtitle="Monitor and protect all connected devices"
      searchPlaceholder="Search devices..."
      headerActions={
        <div className="flex items-center gap-2">
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-[#10B981] to-[#06B6D4] text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Device
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#111827] border-gray-800">
              <DialogHeader>
                <DialogTitle className="text-[#F9FAFB]">Add New Device</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label className="text-[#9CA3AF]">Device Name</Label>
                  <Input
                    placeholder="e.g., iPhone 15 Pro"
                    value={newDevice.device_name}
                    onChange={(e) => setNewDevice(prev => ({ ...prev, device_name: e.target.value }))}
                    className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[#9CA3AF]">Device Type</Label>
                  <Select
                    value={newDevice.device_type}
                    onValueChange={(value) => setNewDevice(prev => ({ ...prev, device_type: value }))}
                  >
                    <SelectTrigger className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1F2937] border-gray-700">
                      <SelectItem value="mobile">Mobile</SelectItem>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="desktop">Desktop</SelectItem>
                      <SelectItem value="tablet">Tablet</SelectItem>
                      <SelectItem value="iot">IoT Device</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white"
                  onClick={() => addDeviceMutation.mutate(newDevice)}
                  disabled={!newDevice.device_name || addDeviceMutation.isPending}
                >
                  {addDeviceMutation.isPending ? "Adding..." : "Add Device"}
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
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-[#06B6D4]">{totalDevices}</p>
            <p className="text-[#9CA3AF]">Total Devices</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-green-500">{fullyProtected}</p>
            <p className="text-[#9CA3AF]">Fully Protected</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-red-500">{needsAttention}</p>
            <p className="text-[#9CA3AF]">Needs Attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Devices List */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#F9FAFB]">Connected Devices</CardTitle>
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
              <p className="text-[#9CA3AF]">Loading devices...</p>
            </div>
          ) : devices.length === 0 ? (
            <div className="text-center py-12">
              <Wifi className="h-16 w-16 mx-auto text-[#3B82F6]/50 mb-4" />
              <h3 className="text-xl font-semibold text-[#F9FAFB] mb-2">No devices connected</h3>
              <p className="text-[#9CA3AF] mb-6 max-w-sm mx-auto">
                Start protecting your family by adding your first device to the security network.
              </p>
              <Button
                onClick={() => setIsAddDialogOpen(true)}
                className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Device
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {devices.map((device) => {
                const Icon = getDeviceIcon(device.device_type);
                return (
                  <div key={device.id} className="flex items-center justify-between p-4 rounded-lg bg-[#1F2937] border border-gray-800 hover:border-gray-700 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20">
                        <Icon className="h-6 w-6 text-[#06B6D4]" />
                      </div>
                      <div>
                        <p className="font-medium text-[#F9FAFB]">{device.device_name}</p>
                        <p className="text-sm text-[#9CA3AF]">
                          {device.device_type} • Last scan: {device.last_scan ? formatDistanceToNow(new Date(device.last_scan), { addSuffix: true }) : 'Never'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="w-32">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-[#9CA3AF]">Protection</span>
                          <span className="text-[#F9FAFB]">{device.protection_level}%</span>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all ${getProtectionColor(device.protection_level)}`}
                            style={{ width: `${device.protection_level}%` }}
                          />
                        </div>
                      </div>
                      <span className={`font-medium min-w-[80px] text-right ${getStatusColor(device.status)}`}>
                        {getStatusLabel(device.status)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => scanDeviceMutation.mutate(device.id)}
                        disabled={scanDeviceMutation.isPending}
                        className="text-[#06B6D4] hover:text-white hover:bg-[#06B6D4]/20"
                      >
                        <Shield className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
