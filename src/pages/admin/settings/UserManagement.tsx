import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "sonner";
import { UserPlus, MoreHorizontal } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const UserManagement = () => {
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "Ruben Garcia",
      email: "ruben@invisionnetwork.org",
      role: "admin",
      status: "active",
      lastLogin: "2025-01-15",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@invisionnetwork.org",
      role: "secretary",
      status: "active",
      lastLogin: "2025-01-14",
    },
  ]);

  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "secretary",
    sendInvite: true,
  });

  const handleAddUser = () => {
    toast.success("User account created and invitation sent!");
    setIsAddingUser(false);
    setNewUser({ name: "", email: "", role: "secretary", sendInvite: true });
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, "default" | "secondary" | "outline"> = {
      admin: "default",
      secretary: "secondary",
      role3: "outline",
    };
    return (
      <Badge variant={variants[role] || "outline"}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getRolePermissions = (role: string) => {
    const permissions: Record<string, { can: string[]; cannot: string[] }> = {
      admin: {
        can: [
          "Full access to all features",
          "Manage users and settings",
          "View billing and financial data",
          "Delete and modify any content",
        ],
        cannot: [],
      },
      secretary: {
        can: [
          "Post and edit articles",
          "Reply to messages",
          "View orders (read-only)",
          "Add testimonials",
          "Send newsletters",
        ],
        cannot: [
          "Change pricing",
          "Delete users",
          "Access billing",
          "Modify site settings",
        ],
      },
      role3: {
        can: ["To be defined"],
        cannot: ["To be defined"],
      },
    };
    return permissions[role] || permissions.role3;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Team Members</h3>
          <p className="text-sm text-muted-foreground">
            Manage user accounts and permissions
          </p>
        </div>
        <Dialog open={isAddingUser} onOpenChange={setIsAddingUser}>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
              <DialogDescription>
                Create a new user account and assign permissions
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="john@invisionnetwork.org"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({ ...newUser, role: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="secretary">Secretary</SelectItem>
                    <SelectItem value="role3">Role 3 (TBD)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3 rounded-lg border p-4 bg-muted/50">
                <p className="text-sm font-medium">Permissions for {newUser.role}</p>
                <div className="space-y-2">
                  <p className="text-xs font-medium text-green-600">Can do:</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    {getRolePermissions(newUser.role).can.map((perm, idx) => (
                      <li key={idx}>• {perm}</li>
                    ))}
                  </ul>
                  {getRolePermissions(newUser.role).cannot.length > 0 && (
                    <>
                      <p className="text-xs font-medium text-red-600 pt-2">Cannot do:</p>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {getRolePermissions(newUser.role).cannot.map((perm, idx) => (
                          <li key={idx}>• {perm}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="sendInvite">Send invitation email</Label>
                <Switch
                  id="sendInvite"
                  checked={newUser.sendInvite}
                  onCheckedChange={(checked) =>
                    setNewUser({ ...newUser, sendInvite: checked })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddingUser(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddUser}>Create User Account</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Login</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getRoleBadge(user.role)}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "active" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.lastLogin}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserManagement;
