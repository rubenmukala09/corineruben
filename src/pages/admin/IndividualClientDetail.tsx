import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Shield, Edit } from "lucide-react";
import { format } from "date-fns";

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  notes: string | null;
  total_spent: number | null;
  created_at: string;
  tags: string[] | null;
}

export default function IndividualClientDetail() {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchClient();
  }, [id]);

  const fetchClient = async () => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      setClient(data);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load client",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  if (loading) {
    return (
      <AdminLayout
        title="Client Details"
        subtitle="Loading client information..."
        headerActions={
          <Link to="/admin/clients/individuals">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Clients
            </Button>
          </Link>
        }
      >
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1 bg-[#111827] border-gray-800">
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <Skeleton className="w-24 h-24 rounded-full bg-gray-800" />
                <Skeleton className="h-6 w-40 mt-4 bg-gray-800" />
                <Skeleton className="h-4 w-32 mt-2 bg-gray-800" />
              </div>
            </CardContent>
          </Card>
          <Card className="lg:col-span-2 bg-[#111827] border-gray-800">
            <CardContent className="p-6 space-y-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full bg-gray-800" />
              ))}
            </CardContent>
          </Card>
        </div>
      </AdminLayout>
    );
  }

  if (!client) {
    return (
      <AdminLayout
        title="Client Not Found"
        subtitle="The requested client could not be found"
        headerActions={
          <Link to="/admin/clients/individuals">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Clients
            </Button>
          </Link>
        }
      >
        <Card className="bg-[#111827] border-gray-800 p-8 text-center">
          <p className="text-gray-400">This client does not exist or has been removed.</p>
        </Card>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title={`${client.first_name} ${client.last_name}`}
      subtitle="Individual client details and activity"
      headerActions={
        <div className="flex gap-2">
          <Link to="/admin/clients/individuals">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
            <Edit className="w-4 h-4 mr-2" />
            Edit Client
          </Button>
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1 bg-[#111827] border-gray-800">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 border-4 border-cyan-500/30">
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-2xl">
                  {getInitials(client.first_name, client.last_name)}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold text-white">
                {client.first_name} {client.last_name}
              </h2>
              <p className="text-gray-400">{client.email}</p>
              
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Shield className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>

              {client.tags && client.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-1">
                  {client.tags.map((tag, i) => (
                    <Badge key={i} variant="outline" className="text-gray-400 border-gray-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Details Card */}
        <Card className="lg:col-span-2 bg-[#111827] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <Mail className="w-5 h-5 text-cyan-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="text-white">{client.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <Phone className="w-5 h-5 text-green-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="text-white">{client.phone || "Not provided"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-400" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="text-white">{client.address || "Not provided"}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-800/50 rounded-lg">
                <Calendar className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-xs text-gray-500">Member Since</p>
                  <p className="text-white">{format(new Date(client.created_at), "MMM d, yyyy")}</p>
                </div>
              </div>
            </div>

            {client.notes && (
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <p className="text-xs text-gray-500 mb-2">Notes</p>
                <p className="text-gray-300">{client.notes}</p>
              </div>
            )}

            <div className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
              <p className="text-xs text-gray-500 mb-1">Total Spent</p>
              <p className="text-2xl font-bold text-cyan-400">
                ${(client.total_spent || 0).toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
