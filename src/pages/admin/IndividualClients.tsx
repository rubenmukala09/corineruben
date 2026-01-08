import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AdminLayout } from "@/components/admin/AdminLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Plus, Download, Eye, Pencil, Ban, Loader2, Users } from "lucide-react";

interface Client {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  address: string | null;
  total_spent: number | null;
  created_at: string;
  tags: string[] | null;
}

export default function IndividualClients() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Fetch clients from Supabase
  const { data: clients = [], isLoading, error } = useQuery({
    queryKey: ["clients"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Client[];
    },
  });

  // Create client mutation
  const createClientMutation = useMutation({
    mutationFn: async (clientData: typeof newClient) => {
      const { data, error } = await supabase
        .from("clients")
        .insert([clientData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast({ title: "Success", description: "Client created successfully" });
      setDialogOpen(false);
      setNewClient({ first_name: "", last_name: "", email: "", phone: "", address: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create client",
        variant: "destructive",
      });
    },
  });

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.phone && client.phone.includes(searchQuery));

    return matchesSearch;
  });

  const toggleClientSelection = (id: string) => {
    setSelectedClients((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedClients((prev) =>
      prev.length === filteredClients.length ? [] : filteredClients.map((c) => c.id)
    );
  };

  const handleCreateClient = () => {
    if (!newClient.first_name || !newClient.last_name || !newClient.email) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    createClientMutation.mutate(newClient);
  };

  const handleExport = () => {
    try {
      const headers = ["Name", "Email", "Phone", "Address", "Total Spent", "Created"];
      const rows = filteredClients.map(c => [
        `${c.first_name} ${c.last_name}`,
        c.email,
        c.phone || "",
        c.address || "",
        c.total_spent?.toString() || "0",
        c.created_at
      ]);
      const csvContent = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `clients_export_${new Date().toISOString().split('T')[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      toast({ title: "Export Complete", description: "Clients exported as CSV" });
    } catch {
      toast({ title: "Export Failed", variant: "destructive" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <AdminLayout
      title="Individual Clients"
      subtitle="Family Shield Protection Subscribers"
      searchPlaceholder="Search clients..."
      headerActions={
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add New Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#1F2937] border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Add New Client</DialogTitle>
              <DialogDescription className="text-gray-400">
                Create a new individual client account
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300">First Name *</Label>
                  <Input
                    value={newClient.first_name}
                    onChange={(e) => setNewClient({ ...newClient, first_name: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    placeholder="John"
                  />
                </div>
                <div>
                  <Label className="text-gray-300">Last Name *</Label>
                  <Input
                    value={newClient.last_name}
                    onChange={(e) => setNewClient({ ...newClient, last_name: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white mt-1"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-300">Email *</Label>
                <Input
                  type="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <Label className="text-gray-300">Phone</Label>
                <Input
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div>
                <Label className="text-gray-300">Address</Label>
                <Input
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  className="bg-gray-800 border-gray-700 text-white mt-1"
                  placeholder="123 Main St, City, State"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)} className="border-gray-600">
                Cancel
              </Button>
              <Button
                onClick={handleCreateClient}
                disabled={createClientMutation.isPending}
                className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]"
              >
                {createClientMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="space-y-6">
        {selectedClients.length > 0 && (
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 flex items-center justify-between">
            <span className="font-medium text-cyan-400">{selectedClients.length} clients selected</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
                Send Email
              </Button>
              <Button variant="outline" size="sm" onClick={handleExport} className="border-gray-700 text-gray-300">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={() => setSelectedClients([])} className="border-gray-700 text-gray-300">
                Clear Selection
              </Button>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search name, email, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#1F2937] border-gray-700 text-white"
              />
            </div>
          </div>

          <Button variant="outline" onClick={handleExport} className="border-gray-700 text-gray-300 hover:bg-gray-800">
            <Download className="mr-2 h-4 w-4" />
            Export to CSV
          </Button>
        </div>

        {isLoading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-[#111827] rounded-lg border border-gray-800">
                <Skeleton className="h-10 w-10 rounded-full bg-gray-800" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/3 bg-gray-800" />
                  <Skeleton className="h-3 w-1/4 bg-gray-800" />
                </div>
                <Skeleton className="h-6 w-20 bg-gray-800" />
              </div>
            ))}
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="text-center py-16 bg-[#111827] rounded-lg border border-gray-800">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-gray-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">No Individual Clients Yet</h3>
            <p className="text-gray-400 mb-6">Add your first Family Shield subscriber</p>
            <Button 
              onClick={() => setDialogOpen(true)}
              className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Client
            </Button>
          </div>
        ) : (
          <>
            <div className="border border-gray-800 rounded-lg overflow-hidden bg-[#111827]">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800 hover:bg-transparent">
                    <TableHead className="w-12 text-gray-400">
                      <Checkbox
                        checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="text-gray-400">Name</TableHead>
                    <TableHead className="text-gray-400">Email</TableHead>
                    <TableHead className="text-gray-400">Phone</TableHead>
                    <TableHead className="text-gray-400">Total Spent</TableHead>
                    <TableHead className="text-gray-400">Joined</TableHead>
                    <TableHead className="text-right text-gray-400">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClients.map((client) => (
                    <TableRow
                      key={client.id}
                      className="cursor-pointer border-gray-800 hover:bg-gray-800/50"
                      onClick={() => navigate(`/admin/clients/individuals/${client.id}`)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={selectedClients.includes(client.id)}
                          onCheckedChange={() => toggleClientSelection(client.id)}
                        />
                      </TableCell>
                      <TableCell className="font-semibold text-white">
                        {client.first_name} {client.last_name}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`mailto:${client.email}`}
                          className="text-cyan-400 hover:underline"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {client.email}
                        </a>
                      </TableCell>
                      <TableCell className="text-gray-400">{client.phone || "-"}</TableCell>
                      <TableCell className="text-green-400">
                        ${(client.total_spent || 0).toLocaleString()}
                      </TableCell>
                      <TableCell className="text-gray-400">{formatDate(client.created_at)}</TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-end gap-1">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-gray-400 hover:text-white hover:bg-gray-800"
                            onClick={() => navigate(`/admin/clients/individuals/${client.id}`)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-gray-400 hover:text-white hover:bg-gray-800"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="flex items-center justify-between text-gray-400">
              <p className="text-sm">
                Showing 1-{filteredClients.length} of {filteredClients.length} clients
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled className="border-gray-700">
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled className="border-gray-700">
                  Next
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
