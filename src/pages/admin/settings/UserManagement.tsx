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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { UserPlus, MoreHorizontal, Trash2, Edit, Ban } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  account_status: string;
  last_sign_in_at: string | null;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [newUser, setNewUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    role: "secretary",
    password: "",
  });
  const { isAdmin } = useUserRole();

  // Fetch users from database
  useEffect(() => {
    fetchUsers();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('user_management_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_roles'
        },
        () => {
          fetchUsers();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch user roles with profile information
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Get unique user IDs
      const userIds = [...new Set(userRoles?.map(r => r.user_id) || [])];

      // Fetch profiles for these users
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, account_status, last_sign_in_at')
        .in('id', userIds);

      if (profilesError) throw profilesError;

      // Combine data - each user shows their primary role
      const combinedUsers = profiles?.map(profile => {
        const userRole = userRoles?.find(r => r.user_id === profile.id);
        return {
          id: profile.id,
          email: profile.email || '',
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          role: userRole?.role || 'user',
          account_status: profile.account_status || 'active',
          last_sign_in_at: profile.last_sign_in_at,
        };
      }) || [];

      setUsers(combinedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.first_name || !newUser.last_name || !newUser.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Create auth user via admin API (requires service role key)
      // For now, we'll use the edge function approach or manual admin panel
      const { data, error } = await supabase.auth.signUp({
        email: newUser.email,
        password: newUser.password,
        options: {
          data: {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
          },
          emailRedirectTo: `${window.location.origin}/auth`,
        }
      });

      if (error) throw error;

      if (data.user) {
        // Add role to user_roles table
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: data.user.id,
            role: newUser.role,
          });

        if (roleError) throw roleError;

        toast.success('User account created successfully! Invitation email sent.');
        setIsAddingUser(false);
        setNewUser({ email: "", first_name: "", last_name: "", role: "secretary", password: "" });
        fetchUsers();
      }
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Failed to create user account');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      // Delete user role
      const { error: roleError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (roleError) throw roleError;

      // Note: Actual auth user deletion requires service role or admin API
      // For now, we just remove the role which effectively disables access
      
      toast.success('User access removed successfully');
      setUserToDelete(null);
      fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error('Failed to remove user access');
    }
  };

  const getRoleBadge = (role: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "outline"; label: string }> = {
      admin: { variant: "default", label: "Admin" },
      secretary: { variant: "secondary", label: "Secretary" },
      staff: { variant: "outline", label: "Staff" },
      training_coordinator: { variant: "outline", label: "Training Coordinator" },
      business_consultant: { variant: "outline", label: "Business Consultant" },
      support_specialist: { variant: "outline", label: "Support Specialist" },
      moderator: { variant: "secondary", label: "Moderator" },
      user: { variant: "outline", label: "User" },
    };
    const config = variants[role] || { variant: "outline" as const, label: role };
    return <Badge variant={config.variant}>{config.label}</Badge>;
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
      staff: {
        can: [
          "View client information",
          "Manage appointments",
          "Respond to inquiries",
        ],
        cannot: [
          "Delete users",
          "Access billing",
          "Modify site settings",
        ],
      },
    };
    return permissions[role] || { can: ["To be defined"], cannot: ["To be defined"] };
  };

  if (!isAdmin()) {
    return (
      <div className="p-6 text-center">
        <p className="text-muted-foreground">You don't have permission to manage users.</p>
      </div>
    );
  }

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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={newUser.first_name}
                    onChange={(e) => setNewUser({ ...newUser, first_name: e.target.value })}
                    placeholder="John"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={newUser.last_name}
                    onChange={(e) => setNewUser({ ...newUser, last_name: e.target.value })}
                    placeholder="Doe"
                  />
                </div>
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
                <Label htmlFor="password">Temporary Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Minimum 6 characters"
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
                    <SelectItem value="staff">Staff</SelectItem>
                    <SelectItem value="training_coordinator">Training Coordinator</SelectItem>
                    <SelectItem value="business_consultant">Business Consultant</SelectItem>
                    <SelectItem value="support_specialist">Support Specialist</SelectItem>
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

      {loading ? (
        <div className="text-center p-8">
          <p className="text-muted-foreground">Loading users...</p>
        </div>
      ) : (
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
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src="" />
                          <AvatarFallback>
                            {user.first_name?.[0]}{user.last_name?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">
                          {user.first_name} {user.last_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>
                      <Badge variant={user.account_status === "active" ? "default" : "secondary"}>
                        {user.account_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.last_sign_in_at
                        ? new Date(user.last_sign_in_at).toLocaleDateString()
                        : "Never"}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setUserToDelete(user.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Remove Access
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!userToDelete} onOpenChange={() => setUserToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove User Access?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the user's role and prevent them from accessing the admin portal.
              This action can be reversed by re-adding the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => userToDelete && handleDeleteUser(userToDelete)}>
              Remove Access
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserManagement;
