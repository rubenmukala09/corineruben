import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Download, Eye, Mail, Pencil } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const mockClients = [
  {
    id: 1,
    logo: "",
    companyName: "TechCorp Solutions",
    contactName: "John Smith",
    contactEmail: "john@techcorp.com",
    services: ["AI Receptionist", "Website", "AI Insurance"],
    status: "active",
    mrr: 597,
    joinDate: "3 months ago",
  },
  {
    id: 2,
    logo: "",
    companyName: "Healthcare Plus",
    contactName: "Sarah Johnson",
    contactEmail: "sarah@healthcareplus.com",
    services: ["AI Receptionist"],
    status: "trial",
    mrr: 149,
    joinDate: "2 weeks ago",
  },
  {
    id: 3,
    logo: "",
    companyName: "Legal Associates",
    contactName: "Michael Brown",
    contactEmail: "michael@legalassoc.com",
    services: ["Website", "Training"],
    status: "inactive",
    mrr: 0,
    joinDate: "6 months ago",
  },
];

export default function BusinessClients() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [selectedClients, setSelectedClients] = useState<number[]>([]);

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch = 
      client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesService = serviceFilter === "all" || client.services.some(s => 
      s.toLowerCase().replace(" ", "-") === serviceFilter
    );
    
    const matchesStatus = statusFilter === "all" || client.status === statusFilter;
    
    return matchesSearch && matchesService && matchesStatus;
  });

  const toggleClientSelection = (id: number) => {
    setSelectedClients(prev => 
      prev.includes(id) ? prev.filter(cid => cid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedClients(prev => 
      prev.length === filteredClients.length ? [] : filteredClients.map(c => c.id)
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: "success" as const, icon: "✓", text: "Active" },
      trial: { variant: "default" as const, icon: "⏱", text: "Trial" },
      inactive: { variant: "destructive" as const, icon: "✗", text: "Inactive" },
    };
    const config = variants[status as keyof typeof variants];
    return (
      <Badge variant={config.variant}>
        {config.icon} {config.text}
      </Badge>
    );
  };

  const getServiceBadges = (services: string[]) => {
    const colors: Record<string, string> = {
      "AI Receptionist": "bg-blue-100 text-blue-800 border-blue-200",
      "Website": "bg-purple-100 text-purple-800 border-purple-200",
      "AI Insurance": "bg-teal-100 text-teal-800 border-teal-200",
      "Training": "bg-orange-100 text-orange-800 border-orange-200",
    };

    if (services.length <= 2) {
      return (
        <div className="flex gap-1 flex-wrap">
          {services.map(service => (
            <span key={service} className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[service]}`}>
              {service}
            </span>
          ))}
        </div>
      );
    }

    return (
      <div className="flex gap-1 flex-wrap">
        {services.slice(0, 2).map(service => (
          <span key={service} className={`px-2 py-1 rounded-full text-xs font-medium border ${colors[service]}`}>
            {service}
          </span>
        ))}
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          +{services.length - 2} more
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Business Clients</h1>
        </div>
        <Button onClick={() => navigate("/admin/clients/businesses/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {selectedClients.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between">
          <span className="font-medium">{selectedClients.length} clients selected</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <Button variant="outline" size="sm">Change Status</Button>
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
              placeholder="Search company, contact, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Service Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Services</SelectItem>
            <SelectItem value="ai-receptionist">AI Receptionist</SelectItem>
            <SelectItem value="website">Website</SelectItem>
            <SelectItem value="ai-insurance">AI Insurance</SelectItem>
            <SelectItem value="training">Training</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
            <SelectItem value="90">Last 90 Days</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      {filteredClients.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-xl font-semibold mb-2">No Business Clients Yet</h3>
          <p className="text-muted-foreground mb-6">Add your first business client</p>
          <Button onClick={() => navigate("/admin/clients/businesses/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="space-y-4 mobile-cards">
            {filteredClients.map((client) => {
              const isSelected = selectedClients.includes(client.id);
              return (
                <div
                  key={client.id}
                  className="bg-card border border-border rounded-lg p-4 active:scale-[0.98] transition-transform"
                  onClick={() => navigate(`/admin/clients/businesses/${client.id}`)}
                >
                  <div className="flex items-start gap-3 mb-4 pb-4 border-b border-border">
                    <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={isSelected}
                        onCheckedChange={() => toggleClientSelection(client.id)}
                      />
                    </div>
                    <Avatar className="h-12 w-12 rounded-md flex-shrink-0">
                      <AvatarImage src={client.logo} />
                      <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                        {client.companyName.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h3 className="font-semibold text-base truncate">{client.companyName}</h3>
                        {getStatusBadge(client.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">{client.contactName}</p>
                      <p className="text-xs text-muted-foreground">{client.contactEmail}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1 font-medium">Services</div>
                      {getServiceBadges(client.services)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 font-medium">MRR</div>
                        <div className="text-lg font-bold">${client.mrr}</div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1 font-medium">Join Date</div>
                        <div className="text-sm">{client.joinDate}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4 pt-4 border-t border-border" onClick={(e) => e.stopPropagation()}>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop Table View */}
          <div className="border rounded-lg overflow-hidden desktop-table">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={selectedClients.length === filteredClients.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-16">Logo</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Services</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>MRR</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow 
                    key={client.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => navigate(`/admin/clients/businesses/${client.id}`)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox 
                        checked={selectedClients.includes(client.id)}
                        onCheckedChange={() => toggleClientSelection(client.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Avatar className="h-10 w-10 rounded-md">
                        <AvatarImage src={client.logo} />
                        <AvatarFallback className="rounded-md bg-primary/10 text-primary">
                          {client.companyName.substring(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell className="font-semibold">{client.companyName}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{client.contactName}</div>
                        <div className="text-sm text-muted-foreground">{client.contactEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getServiceBadges(client.services)}</TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell className="font-bold text-lg">${client.mrr}</TableCell>
                    <TableCell className="text-muted-foreground">{client.joinDate}</TableCell>
                    <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
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
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" disabled>Next</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
