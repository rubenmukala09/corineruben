import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, Loader2, MessageSquare, Calendar } from "lucide-react";

export const InquiriesTable = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    loadInquiries();

    const channel = supabase
      .channel("website_inquiries_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "website_inquiries" },
        () => loadInquiries(),
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("website_inquiries")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("Error loading inquiries:", error);
      toast({
        title: "Error loading inquiries",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (id: string, status: string) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("website_inquiries")
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
        description: `Inquiry marked as ${status}`,
      });
      loadInquiries();
    }
    setUpdatingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "bg-blue-500";
      case "in_progress":
        return "bg-yellow-500";
      case "resolved":
        return "bg-green-500";
      case "archived":
        return "bg-gray-500";
      default:
        return "bg-gray-400";
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
        <h3 className="text-lg font-bold">
          Contact Form Inquiries ({inquiries.length})
        </h3>
        <Button onClick={loadInquiries} variant="outline" size="sm">
          Refresh
        </Button>
      </div>

      {inquiries.length === 0 ? (
        <Card className="p-8 text-center text-muted-foreground">
          No inquiries yet
        </Card>
      ) : (
        inquiries.map((inquiry) => (
          <Card key={inquiry.id} className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-lg">{inquiry.name}</h4>
                  <Badge variant="secondary">
                    {inquiry.inquiry_type?.replace("_", " ").toUpperCase()}
                  </Badge>
                  <Badge className={getStatusColor(inquiry.status || "new")}>
                    {inquiry.status || "new"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Submitted {new Date(inquiry.created_at).toLocaleDateString()}{" "}
                  at {new Date(inquiry.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-semibold mb-1">
                  Contact Information
                </p>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="hover:underline"
                    >
                      {inquiry.email}
                    </a>
                  </div>
                  {inquiry.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <a
                        href={`tel:${inquiry.phone}`}
                        className="hover:underline"
                      >
                        {inquiry.phone}
                      </a>
                    </div>
                  )}
                  {inquiry.metadata?.preferredDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>{inquiry.metadata.preferredDate}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold mb-1">Preferences</p>
                <div className="space-y-1 text-sm">
                  {inquiry.metadata?.language && (
                    <p>Language: {inquiry.metadata.language}</p>
                  )}
                </div>
              </div>
            </div>

            {inquiry.message && (
              <div>
                <p className="text-sm font-semibold mb-1 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </p>
                <p className="text-sm whitespace-pre-wrap bg-muted p-3 rounded-lg">
                  {inquiry.message}
                </p>
              </div>
            )}

            <div className="flex gap-2 pt-2 border-t">
              <Button
                size="sm"
                variant="outline"
                onClick={() => updateStatus(inquiry.id, "in_progress")}
                disabled={
                  updatingId === inquiry.id || inquiry.status === "in_progress"
                }
              >
                Mark In Progress
              </Button>
              <Button
                size="sm"
                variant="default"
                onClick={() => updateStatus(inquiry.id, "resolved")}
                disabled={
                  updatingId === inquiry.id || inquiry.status === "resolved"
                }
              >
                Mark Resolved
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => updateStatus(inquiry.id, "archived")}
                disabled={updatingId === inquiry.id}
              >
                Archive
              </Button>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};
