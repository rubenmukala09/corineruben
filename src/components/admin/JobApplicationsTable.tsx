import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Shield, Loader2, Download, Briefcase } from "lucide-react";

export const JobApplicationsTable = () => {
  const { toast } = useToast();
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error loading applications:", error);
      toast({
        title: "Error loading applications",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setApplications(data || []);
    }
    setLoading(false);
  }, [toast]);

  useEffect(() => {
    loadApplications();

    const channel = supabase
      .channel('job_applications_changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'job_applications' },
        () => loadApplications()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadApplications]);

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("job_applications")
      .update({ status })
      .eq("id", id);

    if (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Status Updated",
        description: `Application marked as ${status}`,
      });
      loadApplications();
    }
    setUpdatingId(null);
  };

  const downloadVeteranDoc = async (docUrl: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('veteran-docs')
        .download(docUrl);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = docUrl.split('/').pop() || 'veteran-doc';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      toast({
        title: "Download Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'reviewing': return 'bg-blue-500';
      case 'interviewing': return 'bg-purple-500';
      case 'offered': return 'bg-green-500';
      case 'rejected': return 'bg-red-500';
      case 'withdrawn': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  if (loading) {
    return (
      <Card className="p-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">Job Applications ({applications.length})</h3>
        <Button onClick={loadApplications} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {applications.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No applications yet
        </Card>
      ) : (
        applications.map((app) => (
          <Card key={app.id} className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h4 className="font-bold text-lg">{app.first_name} {app.last_name}</h4>
                  <Badge variant="secondary">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {app.position}
                  </Badge>
                  <Badge className={getStatusColor(app.status || 'pending')}>
                    {app.status || 'pending'}
                  </Badge>
                  {app.is_veteran && (
                    <Badge variant="outline" className="gap-1">
                      <Shield className="w-3 h-3" />
                      Veteran - PRIORITY
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Applied {new Date(app.created_at).toLocaleDateString()} at{" "}
                  {new Date(app.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold mb-1">Contact Information</p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a href={`mailto:${app.email}`} className="hover:underline">
                      {app.email}
                    </a>
                  </div>
                  {app.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a href={`tel:${app.phone}`} className="hover:underline">
                        {app.phone}
                      </a>
                    </div>
                  )}
                  {app.linkedin_url && (
                    <a href={app.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline text-sm">
                      View LinkedIn →
                    </a>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">Details</p>
                <div className="space-y-1 text-sm">
                  <p>Availability: {app.availability}</p>
                </div>
              </div>
            </div>

            {app.is_veteran && app.veteran_document_url && (
              <div className="bg-primary/5 p-3 rounded-lg">
                <p className="text-sm font-semibold mb-2">🇺🇸 Veteran Verification</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => downloadVeteranDoc(app.veteran_document_url)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Verification Doc
                </Button>
              </div>
            )}

            {app.cover_letter && (
              <div>
                <p className="text-sm font-semibold mb-1">Cover Letter</p>
                <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-lg max-h-32 overflow-y-auto">
                  {app.cover_letter}
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t flex-wrap">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus(app.id, 'reviewing')}
                disabled={updatingId === app.id || app.status === 'reviewing'}
              >
                Start Review
              </Button>
              <Button
                size="sm"
                variant="default"
                onClick={() => updateStatus(app.id, 'interviewing')}
                disabled={updatingId === app.id || app.status === 'interviewing'}
              >
                Schedule Interview
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => updateStatus(app.id, 'offered')}
                disabled={updatingId === app.id || app.status === 'offered'}
              >
                Make Offer
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => updateStatus(app.id, 'rejected')}
                disabled={updatingId === app.id}
              >
                Reject
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};
