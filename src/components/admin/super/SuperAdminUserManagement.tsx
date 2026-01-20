import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminAudit } from '@/hooks/useAdminAudit';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Search,
  MoreHorizontal,
  Mail,
  Key,
  RefreshCw,
  UserCog,
  Shield,
  Users,
  Crown,
  Loader2,
  Eye,
  Pencil,
  Ban,
} from 'lucide-react';
import { format } from 'date-fns';
import { EditUserModal } from '@/components/admin/EditUserModal';

interface UserProfile {
  id: string;
  email: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  created_at: string;
  last_login_at: string | null;
}

interface UserWithRole extends UserProfile {
  role: string | null;
  subscription_status: string | null;
  subscription_plan: string | null;
}

export default function SuperAdminUserManagement() {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeactivateDialog, setShowDeactivateDialog] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const { toast } = useToast();
  const { logAction } = useAdminAudit();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Fetch profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, username, full_name, avatar_url, created_at, last_login_at')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      // Fetch subscriptions
      const { data: subscriptions, error: subsError } = await supabase
        .from('subscriptions')
        .select('user_id, status, plan_name');

      if (subsError) throw subsError;

      // Combine data
      const usersWithData: UserWithRole[] = (profiles || []).map(profile => {
        const userRole = roles?.find(r => r.user_id === profile.id);
        const userSub = subscriptions?.find(s => s.user_id === profile.id);
        
        return {
          ...profile,
          role: userRole?.role || null,
          subscription_status: userSub?.status || null,
          subscription_plan: userSub?.plan_name || null,
        };
      });

      setUsers(usersWithData);
      await logAction('view_logs', 'user', undefined, { action: 'fetch_all_users', count: usersWithData.length });
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendPasswordReset = async (user: UserWithRole) => {
    try {
      setActionLoading(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;

      await logAction('reset_password', 'user', user.id, { email: user.email });
      
      toast({
        title: 'Password Reset Sent',
        description: `Password reset email sent to ${user.email}`,
      });
    } catch (error: any) {
      console.error('Error sending password reset:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to send password reset',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const handleResetUserState = async () => {
    if (!selectedUser) return;
    
    try {
      setActionLoading(true);

      // Clear user's tasks
      await supabase
        .from('admin_tasks')
        .delete()
        .eq('user_id', selectedUser.id);

      // Clear user's events
      await supabase
        .from('admin_events')
        .delete()
        .eq('user_id', selectedUser.id);

      await logAction('reset_user_state', 'user', selectedUser.id, { 
        email: selectedUser.email,
        actions: ['cleared_tasks', 'cleared_events']
      });

      toast({
        title: 'User State Reset',
        description: `Successfully reset dashboard state for ${selectedUser.email}`,
      });

      setShowResetDialog(false);
      setSelectedUser(null);
    } catch (error: any) {
      console.error('Error resetting user state:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to reset user state',
        variant: 'destructive',
      });
    } finally {
      setActionLoading(false);
    }
  };

  const getRoleBadge = (role: string | null) => {
    switch (role) {
      case 'admin':
      case 'super_admin':
        return <Badge className="bg-gradient-to-r from-purple-500 to-pink-500"><Crown className="w-3 h-3 mr-1" />{role}</Badge>;
      case 'staff':
      case 'manager':
        return <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500"><Shield className="w-3 h-3 mr-1" />{role}</Badge>;
      default:
        return <Badge variant="secondary"><Users className="w-3 h-3 mr-1" />user</Badge>;
    }
  };

  const getSubscriptionBadge = (status: string | null, plan: string | null) => {
    if (!status) return <Badge variant="outline">No Subscription</Badge>;
    
    const colors: Record<string, string> = {
      active: 'bg-green-500',
      past_due: 'bg-yellow-500',
      canceled: 'bg-red-500',
      trialing: 'bg-blue-500',
    };

    return (
      <Badge className={colors[status] || 'bg-gray-500'}>
        {plan || status}
      </Badge>
    );
  };

  const filteredUsers = users.filter(user => 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.full_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <UserCog className="w-5 h-5 text-cyan-400" />
              User & Client Management
            </CardTitle>
            <CardDescription className="text-gray-400">
              Manage registered users, roles, and subscriptions
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchUsers}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search users by email, username, or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-[#1F2937] border-gray-700 text-white"
          />
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 border-b border-gray-800">
                <div className="h-10 w-10 rounded-full bg-gray-800 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/3 bg-gray-800 rounded animate-pulse" />
                  <div className="h-3 w-1/4 bg-gray-800 rounded animate-pulse" />
                </div>
                <div className="h-6 w-20 bg-gray-800 rounded-full animate-pulse" />
                <div className="h-6 w-24 bg-gray-800 rounded animate-pulse" />
                <div className="h-8 w-8 bg-gray-800 rounded animate-pulse" />
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">User</TableHead>
                  <TableHead className="text-gray-400">Role</TableHead>
                  <TableHead className="text-gray-400">Subscription</TableHead>
                  <TableHead className="text-gray-400">Joined</TableHead>
                  <TableHead className="text-gray-400">Last Login</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-gray-800 hover:bg-gray-800/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border-2 border-cyan-500/30">
                          <AvatarImage src={user.avatar_url || undefined} />
                          <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white">
                            {(user.full_name || user.email || 'U').charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">{user.full_name || user.username || 'Unnamed'}</p>
                          <p className="text-sm text-gray-400">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getSubscriptionBadge(user.subscription_status, user.subscription_plan)}</TableCell>
                    <TableCell className="text-gray-400">
                      {user.created_at ? format(new Date(user.created_at), 'MMM d, yyyy') : 'N/A'}
                    </TableCell>
                    <TableCell className="text-gray-400">
                      {user.last_login_at ? format(new Date(user.last_login_at), 'MMM d, yyyy') : 'Never'}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#1F2937] border-gray-700">
                          <DropdownMenuLabel className="text-gray-400">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem 
                            className="text-gray-200 hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowDetailsDialog(true);
                            }}
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-gray-200 hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowEditDialog(true);
                            }}
                          >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-gray-200 hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleSendPasswordReset(user)}
                          >
                            <Mail className="mr-2 h-4 w-4" />
                            Send Password Reset
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="text-gray-200 hover:bg-gray-700 cursor-pointer"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowResetDialog(true);
                            }}
                          >
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reset User Dashboard
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem 
                            className="text-red-400 hover:bg-red-900/30 cursor-pointer"
                            onClick={() => {
                              setSelectedUser(user);
                              setShowDeactivateDialog(true);
                            }}
                          >
                            <Ban className="mr-2 h-4 w-4" />
                            Deactivate Account
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No users found matching your search
              </div>
            )}
          </div>
        )}

        {/* Reset Confirmation Dialog */}
        <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
          <DialogContent className="bg-[#1F2937] border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle>Reset User Dashboard</DialogTitle>
              <DialogDescription className="text-gray-400">
                This will clear the user's tasks and events. This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-300">
                Are you sure you want to reset the dashboard state for{' '}
                <span className="font-semibold text-cyan-400">{selectedUser?.email}</span>?
              </p>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowResetDialog(false)}
                className="border-gray-600"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleResetUserState}
                disabled={actionLoading}
              >
                {actionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reset Dashboard
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* User Details Dialog */}
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="bg-[#1F2937] border-gray-700 text-white max-w-lg">
            <DialogHeader>
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16 border-2 border-cyan-500">
                    <AvatarImage src={selectedUser.avatar_url || undefined} />
                    <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xl">
                      {(selectedUser.full_name || selectedUser.email || 'U').charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-semibold">{selectedUser.full_name || 'Unnamed'}</h3>
                    <p className="text-gray-400">{selectedUser.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-gray-400">Username</p>
                    <p className="font-medium">{selectedUser.username || 'Not set'}</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-gray-400">Role</p>
                    <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-gray-400">Subscription</p>
                    <div className="mt-1">{getSubscriptionBadge(selectedUser.subscription_status, selectedUser.subscription_plan)}</div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-gray-400">User ID</p>
                    <p className="font-mono text-xs truncate">{selectedUser.id}</p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowDetailsDialog(false)}
                className="border-gray-600"
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit User Modal */}
        <EditUserModal
          user={selectedUser}
          open={showEditDialog}
          onOpenChange={setShowEditDialog}
          onSaved={fetchUsers}
        />

        {/* Deactivate User Dialog */}
        <Dialog open={showDeactivateDialog} onOpenChange={setShowDeactivateDialog}>
          <DialogContent className="bg-[#1F2937] border-gray-700 text-white">
            <DialogHeader>
              <DialogTitle className="text-red-400">Deactivate Account</DialogTitle>
              <DialogDescription className="text-gray-400">
                This will suspend the user's account. They will not be able to log in until reactivated.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-gray-300">
                Are you sure you want to deactivate the account for{' '}
                <span className="font-semibold text-red-400">{selectedUser?.email}</span>?
              </p>
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowDeactivateDialog(false)}
                className="border-gray-600"
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={async () => {
                  if (!selectedUser) return;
                  try {
                    setActionLoading(true);
                    await supabase
                      .from('profiles')
                      .update({ account_status: 'suspended' })
                      .eq('id', selectedUser.id);
                    
                    await logAction('delete_user', 'user', selectedUser.id, {
                      email: selectedUser.email,
                      action: 'deactivated'
                    });
                    
                    toast({
                      title: 'Account Deactivated',
                      description: `${selectedUser.email} has been suspended`,
                    });
                    setShowDeactivateDialog(false);
                    setSelectedUser(null);
                    fetchUsers();
                  } catch (error: any) {
                    toast({
                      title: 'Error',
                      description: error.message || 'Failed to deactivate account',
                      variant: 'destructive',
                    });
                  } finally {
                    setActionLoading(false);
                  }
                }}
                disabled={actionLoading}
              >
                {actionLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Deactivate Account
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
