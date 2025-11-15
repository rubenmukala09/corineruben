import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Download, Eye, Pencil, Copy, RotateCcw, Ban } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockClients = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 234-5678",
    plan: "family",
    planPrice: 79,
    status: "active",
    accessCode: "abc123def456ghi789jkl012",
    lastActive: "2 hours ago",
    joinDate: "3 months ago",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: null,
    plan: "starter",
    planPrice: 39,
    status: "active",
    accessCode: "xyz789abc456def123ghi890",
    lastActive: "1 day ago",
    joinDate: "1 month ago",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@email.com",
    phone: "(555) 876-5432",
    plan: "premium",
    planPrice: 129,
    status: "expired",
    accessCode: "mno345pqr678stu901vwx234",
    lastActive: "2 weeks ago",
    joinDate: "8 months ago",
  },
];

export default function IndividualClients() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedClients, setSelectedClients] = useState<number[]>([]);

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (client.phone && client.phone.includes(searchQuery));

    const matchesPlan = planFilter === "all" || client.plan === planFilter;
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;

    return matchesSearch && matchesPlan && matchesStatus;
  });

  const toggleClientSelection = (id: number) => {
    setSelectedClients((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedClients((prev) =>
      prev.length === filteredClients.length ? [] : filteredClients.map((c) => c.id)
    );
  };

  const copyAccessLink = (code: string) => {
    const link = `https://invisionnetwork.org/access/${code}`;
    navigator.clipboard.writeText(link);
    toast({
      title: "Copied!",
      description: "Access link copied to clipboard",
    });
  };

  const getPlanBadge = (plan: string) => {
    const variants = {
      starter: { color: "bg-blue-100 text-blue-800 border-blue-200", text: "Starter" },
      family: { color: "bg-purple-100 text-purple-800 border-purple-200", text: "Family" },
      premium: { color: "bg-yellow-100 text-yellow-800 border-yellow-200", text: "Premium" },
      custom: { color: "bg-teal-100 text-teal-800 border-teal-200", text: "Custom" },
    };
    const config = variants[plan as keyof typeof variants];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        {config.text}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "success" as const, text: "Active" },
      expired: { variant: "destructive" as const, text: "Expired" },
      cancelled: { variant: "outline" as const, text: "Cancelled" },
    };
    const config = variants[status as keyof typeof variants];
    return <Badge variant={config.variant}>{config.text}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Individual Clients</h1>
          <p className="text-muted-foreground">Family Shield Protection Subscribers</p>
        </div>
        <Button onClick={() => navigate("/admin/clients/individuals/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {selectedClients.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between">
          <span className="font-medium">{selectedClients.length} clients selected</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Send Email
            </Button>
            <Button variant="outline" size="sm">Change Plan</Button>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={() => setSelectedClients([])}>
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search name, email, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <Select value={planFilter} onValueChange={setPlanFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Plan Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="family">Family</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      {filteredClients.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold mb-2">No Individual Clients Yet</h3>
          <p className="text-muted-foreground mb-6">Add your first Family Shield subscriber</p>
          <Button onClick={() => navigate("/admin/clients/individuals/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      ) : (
        <>
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedClients.length === filteredClients.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Access Link</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow
                    key={client.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/admin/clients/individuals/${client.id}`)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedClients.includes(client.id)}
                        onCheckedChange={() => toggleClientSelection(client.id)}
                      />
                    </TableCell>
                    <TableCell className="font-semibold">{client.name}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${client.email}`}
                        className="text-primary hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {client.email}
                      </a>
                    </TableCell>
                    <TableCell>{client.phone || "-"}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getPlanBadge(client.plan)}
                        <p className="text-xs text-muted-foreground">${client.planPrice}/month</p>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">•••••••••</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => copyAccessLink(client.accessCode)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <RotateCcw className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{client.lastActive}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Ban className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Showing 1-{filteredClients.length} of {filteredClients.length} clients
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>
                Previous
              </Button>
              <Button variant="outline" size="sm" disabled>
                Next
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
