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

const mockClients: Array<{
  id: number;
  logo: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  services: string[];
  status: string;
  mrr: number;
  joinDate: string;
}> = [];

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
      "AI Receptionist": "bg-blue-500/20 text-blue-400 border-blue-500/30",
      "Website": "bg-purple-500/20 text-purple-400 border-purple-500/30",
      "AI Insurance": "bg-teal-500/20 text-teal-400 border-teal-500/30",
      "Training": "bg-orange-500/20 text-orange-400 border-orange-500/30",
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
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
          +{services.length - 2} more
        </span>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB]">Business Clients</h1>
          <p className="text-[#9CA3AF]">Manage your business client accounts</p>
        </div>
        <Button onClick={() => navigate("/admin/clients/businesses/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      {selectedClients.length > 0 && (
        <div className="bg-[#1F2937] border border-gray-700 rounded-lg p-4 flex items-center justify-between">
          <span className="font-medium text-[#F9FAFB]">{selectedClients.length} clients selected</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="border-gray-700">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700">Change Status</Button>
            <Button variant="outline" size="sm" className="border-gray-700">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm" className="border-gray-700" onClick={() => setSelectedClients([])}>
              Clear Selection
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
            <Input
              placeholder="Search company, contact, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
            />
          </div>
        </div>
        
        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-[180px] bg-[#1F2937] border-gray-700">
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
          <SelectTrigger className="w-[140px] bg-[#1F2937] border-gray-700">
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
          <SelectTrigger className="w-[160px] bg-[#1F2937] border-gray-700">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="30">Last 30 Days</SelectItem>
            <SelectItem value="90">Last 90 Days</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" className="border-gray-700">
          <Download className="mr-2 h-4 w-4" />
          Export to CSV
        </Button>
      </div>

      {filteredClients.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🏢</div>
          <h3 className="text-xl font-semibold mb-2 text-[#F9FAFB]">No Business Clients Yet</h3>
          <p className="text-[#9CA3AF] mb-6">Add your first business client</p>
          <Button onClick={() => navigate("/admin/clients/businesses/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add Client
          </Button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="border border-gray-800 rounded-lg overflow-hidden bg-[#111827]">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-transparent">
                  <TableHead className="w-12 text-[#9CA3AF]">
                    <Checkbox 
                      checked={selectedClients.length === filteredClients.length}
                      onCheckedChange={toggleSelectAll}
                    />
                  </TableHead>
                  <TableHead className="w-16 text-[#9CA3AF]">Logo</TableHead>
                  <TableHead className="text-[#9CA3AF]">Company Name</TableHead>
                  <TableHead className="text-[#9CA3AF]">Contact Person</TableHead>
                  <TableHead className="text-[#9CA3AF]">Services</TableHead>
                  <TableHead className="text-[#9CA3AF]">Status</TableHead>
                  <TableHead className="text-[#9CA3AF]">MRR</TableHead>
                  <TableHead className="text-[#9CA3AF]">Join Date</TableHead>
                  <TableHead className="text-right text-[#9CA3AF]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow 
                    key={client.id}
                    className="cursor-pointer border-gray-700 hover:bg-[#1F2937]"
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
                    <TableCell className="font-semibold text-[#F9FAFB]">{client.companyName}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-[#F9FAFB]">{client.contactName}</div>
                        <div className="text-sm text-[#9CA3AF]">{client.contactEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getServiceBadges(client.services)}</TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell className="font-bold text-lg text-[#F9FAFB]">${client.mrr}</TableCell>
                    <TableCell className="text-[#9CA3AF]">{client.joinDate}</TableCell>
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
            <p className="text-sm text-[#9CA3AF]">
              Showing 1-{filteredClients.length} of {filteredClients.length} clients
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled className="border-gray-700">Previous</Button>
              <Button variant="outline" size="sm" disabled className="border-gray-700">Next</Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
