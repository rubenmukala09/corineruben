import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminAudit } from '@/hooks/useAdminAudit';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, Save } from 'lucide-react';

interface UserData {
  id: string;
  email: string;
  username: string | null;
  full_name: string | null;
  role: string | null;
}

interface EditUserModalProps {
  user: UserData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: () => void;
}

const APP_ROLES = [
  { value: 'user', label: 'User' },
  { value: 'staff', label: 'Staff' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'admin', label: 'Admin' },
  { value: 'trainer', label: 'Trainer' },
  { value: 'developer', label: 'Developer' },
  { value: 'analyst', label: 'Analyst' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'caregiver', label: 'Caregiver' },
  { value: 'senior', label: 'Senior' },
];

export function EditUserModal({ user, open, onOpenChange, onSaved }: EditUserModalProps) {
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();
  const { logAction } = useAdminAudit();

  useEffect(() => {
    if (user) {
      setFullName(user.full_name || '');
      setUsername(user.username || '');
      setSelectedRole(user.role || 'user');
    }
  }, [user]);

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);

      // Update profile
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username: username,
        })
        .eq('id', user.id);

      if (profileError) throw profileError;

      // Update role if changed
      if (selectedRole !== user.role) {
        // First delete existing role
        await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', user.id);

        // Insert new role
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({
            user_id: user.id,
            role: selectedRole as any,
          });

        if (roleError) throw roleError;

        await logAction('edit_user', 'user', user.id, {
          email: user.email,
          old_role: user.role,
          new_role: selectedRole,
        });
      }

      await logAction('edit_user', 'user', user.id, {
        email: user.email,
        changes: { full_name: fullName, username },
      });

      toast({
        title: 'User Updated',
        description: `Successfully updated ${user.email}`,
      });

      onSaved();
      onOpenChange(false);
    } catch (error: any) {
      console.error('Error updating user:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update user',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#1F2937] border-gray-700 text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription className="text-gray-400">
            Update user details and role assignment
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">Email</Label>
            <Input
              id="email"
              value={user?.email || ''}
              disabled
              className="bg-gray-800 border-gray-600 text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter full name"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="username" className="text-gray-300">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="bg-gray-800 border-gray-600 text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role" className="text-gray-300">Role</Label>
            <Select value={selectedRole} onValueChange={setSelectedRole}>
              <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent className="bg-[#1F2937] border-gray-700">
                {APP_ROLES.map((role) => (
                  <SelectItem 
                    key={role.value} 
                    value={role.value}
                    className="text-gray-200 hover:bg-gray-700"
                  >
                    {role.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
