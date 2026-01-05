import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AdminStatus {
  isAdmin: boolean;
  isStaff: boolean;
  role: string | null;
  isLoading: boolean;
  error: string | null;
}

const ADMIN_ROLES = ['admin', 'super_admin'];
const STAFF_ROLES = ['admin', 'super_admin', 'staff', 'manager'];

export const useAdminStatus = () => {
  const [status, setStatus] = useState<AdminStatus>({
    isAdmin: false,
    isStaff: false,
    role: null,
    isLoading: true,
    error: null
  });

  const checkStatus = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setStatus({
          isAdmin: false,
          isStaff: false,
          role: null,
          isLoading: false,
          error: null
        });
        return;
      }

      // Get role from user_roles table (secure - has RLS)
      const { data: userRoles, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching user roles:', error);
        setStatus({
          isAdmin: false,
          isStaff: false,
          role: null,
          isLoading: false,
          error: error.message
        });
        return;
      }

      // Get the first/primary role
      const role = userRoles?.[0]?.role || null;
      
      setStatus({
        isAdmin: role ? ADMIN_ROLES.includes(role) : false,
        isStaff: role ? STAFF_ROLES.includes(role) : false,
        role,
        isLoading: false,
        error: null
      });
    } catch (err) {
      console.error('Error checking admin status:', err);
      setStatus({
        isAdmin: false,
        isStaff: false,
        role: null,
        isLoading: false,
        error: 'Failed to check admin status'
      });
    }
  }, []);

  useEffect(() => {
    checkStatus();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkStatus();
    });

    return () => subscription.unsubscribe();
  }, [checkStatus]);

  const hasRole = useCallback((requiredRole: string | string[]): boolean => {
    if (!status.role) return false;
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    return roles.includes(status.role);
  }, [status.role]);

  return {
    ...status,
    hasRole,
    refresh: checkStatus
  };
};

export default useAdminStatus;
