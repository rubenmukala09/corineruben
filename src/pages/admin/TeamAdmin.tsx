import { useState } from "react";
import { AdminSidebar } from "@/components/AdminSidebar";
import { AdminTopBar } from "@/components/AdminTopBar";
import { BreadcrumbNav } from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Search,
  Grid3x3,
  List,
  Edit,
  Trash2,
  GripVertical,
  Users,
} from "lucide-react";
import { motion, Reorder } from "framer-motion";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
  status: "active" | "inactive";
  joinDate: string;
  displayOrder: number;
  showOnAbout: boolean;
  isFounder?: boolean;
}

export default function TeamAdmin() {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  // Only keep Ruben Nkulu - the founder
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Ruben Nkulu",
      role: "Founder & CEO",
      department: "Executive",
      email: "ruben@invisionnetwork.org",
      phone: "+1 (937) 974-1657",
      location: "Dayton, OH",
      avatar: "/placeholder.svg",
      status: "active",
      joinDate: "2020-01-15",
      displayOrder: 1,
      showOnAbout: true,
      isFounder: true,
    },
  ]);

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReorder = (newOrder: TeamMember[]) => {
    const updatedMembers = newOrder.map((member, index) => ({
      ...member,
      displayOrder: index + 1,
    }));
    setTeamMembers(updatedMembers);
    
    toast({
      title: "Order Updated",
      description: "Team member order has been saved",
    });
  };

  const handleToggleDisplay = (memberId: string) => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === memberId
          ? { ...member, showOnAbout: !member.showOnAbout }
          : member
      )
    );
  };

  const handleDeleteClick = (member: TeamMember) => {
    if (member.isFounder) {
      toast({
        title: "Cannot Delete",
        description: "The founder cannot be removed from the team",
        variant: "destructive",
      });
      return;
    }
    setMemberToDelete(member);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (memberToDelete) {
      setTeamMembers((prev) => prev.filter((m) => m.id !== memberToDelete.id));
      toast({
        title: "Team Member Removed",
        description: `${memberToDelete.name} has been removed from the team`,
      });
    }
    setDeleteDialogOpen(false);
    setMemberToDelete(null);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar isOpen={sidebarOpen} />
      <AdminTopBar
        sidebarOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <main
        className={`flex-1 transition-all duration-300 pt-16 ${
          sidebarOpen ? "md:ml-[260px]" : "md:ml-[70px]"
        }`}
      >
        {/* Header */}
        <div className="bg-background border-b sticky top-16 z-10">
          <div className="px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">Team Members</h1>
                <BreadcrumbNav />
              </div>
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Add Team Member
              </Button>
            </div>

            {/* Controls Bar */}
            <div className="flex items-center justify-between gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search team members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="gap-2"
                >
                  <Grid3x3 className="h-4 w-4" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="gap-2"
                >
                  <List className="h-4 w-4" />
                  List
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">1</div>
                <p className="text-sm text-muted-foreground">Total Members</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold text-green-600">1</div>
                <p className="text-sm text-muted-foreground">Active</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">1</div>
                <p className="text-sm text-muted-foreground">Department</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">5</div>
                <p className="text-sm text-muted-foreground">Years Active</p>
              </CardContent>
            </Card>
          </div>

          {/* Team Members */}
          {filteredMembers.length === 0 ? (
            <Card className="border-2 border-dashed">
              <CardContent className="py-24 text-center">
                <div className="flex flex-col items-center gap-4 text-muted-foreground">
                  <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
                    <Users className="h-10 w-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Build Your Team
                    </h3>
                    <p className="text-sm mb-4">
                      Add your first team member to showcase your expert staff
                    </p>
                    <Button size="lg" className="gap-2">
                      <Plus className="h-5 w-5" />
                      Add Team Member
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : viewMode === "grid" ? (
            <Reorder.Group
              axis="y"
              values={filteredMembers}
              onReorder={handleReorder}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredMembers.map((member) => (
                <Reorder.Item
                  key={member.id}
                  value={member}
                  className="cursor-move"
                >
                  <Card className="hover:shadow-xl transition-all hover:-translate-y-1 h-full group">
                    <CardContent className="p-6 flex flex-col items-center text-center relative">
                      {/* Drag Handle */}
                      <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical className="h-5 w-5 text-muted-foreground" />
                      </div>

                      {/* Display Order Badge */}
                      <div className="absolute top-4 right-4">
                        <Badge variant="outline" className="text-xs">
                          #{member.displayOrder}
                        </Badge>
                      </div>

                      {/* Avatar */}
                      <Avatar className="h-[120px] w-[120px] mb-4 ring-4 ring-background">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback className="text-3xl">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      {/* Member Info */}
                      <div className="mb-4">
                        <h3 className="font-bold text-xl mb-1">{member.name}</h3>
                        <p className="text-muted-foreground mb-2">{member.role}</p>
                        
                        {/* Badges */}
                        <div className="flex items-center justify-center gap-2 flex-wrap">
                          {member.isFounder && (
                            <Badge className="bg-purple-500">Founder</Badge>
                          )}
                          <Badge
                            variant={member.status === "active" ? "default" : "secondary"}
                          >
                            {member.status}
                          </Badge>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 w-full">
                        <Button
                          variant="outline"
                          className="flex-1"
                          onClick={() => {
                            toast({
                              title: "Edit Member",
                              description: "Edit modal coming soon",
                            });
                          }}
                        >
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          className={cn(
                            "flex-1",
                            member.isFounder && "opacity-50 cursor-not-allowed"
                          )}
                          onClick={() => handleDeleteClick(member)}
                          disabled={member.isFounder}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Photo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Display</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.map((member) => (
                    <TableRow key={member.id} className="group">
                      <TableCell>
                        <GripVertical className="h-5 w-5 text-muted-foreground cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
                      </TableCell>
                      <TableCell>
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell className="font-medium">
                        <div>
                          {member.name}
                          {member.isFounder && (
                            <Badge className="ml-2 bg-purple-500 text-xs">
                              Founder
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{member.role}</TableCell>
                      <TableCell>
                        <Switch
                          checked={member.showOnAbout}
                          onCheckedChange={() => handleToggleDisplay(member.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{member.displayOrder}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              toast({
                                title: "Edit Member",
                                description: "Edit modal coming soon",
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClick(member)}
                            disabled={member.isFounder}
                            className={member.isFounder ? "opacity-50 cursor-not-allowed" : ""}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remove {memberToDelete?.name} from team?</AlertDialogTitle>
              <AlertDialogDescription>
                They will no longer appear on the About page. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Remove
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </main>
    </div>
  );
}
