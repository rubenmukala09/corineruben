import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export type UserRole = 'admin' | 'secretary' | 'training_coordinator' | 'business_consultant' | 'support_specialist' | 'staff' | 'moderator' | 'user';

export interface RoleConfig {
  role: UserRole;
  displayName: string;
  permissions: string[];
  redirectTo: string;
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  'admin': {
    role: 'admin',
    displayName: 'Administrator',
    permissions: ['*'],
    redirectTo: '/admin'
  },
  'secretary': {
    role: 'secretary',
    displayName: 'Office Manager',
    permissions: [
      'view_clients',
      'manage_clients',
      'view_messages',
      'reply_messages',
      'view_calendar',
      'manage_appointments'
    ],
    redirectTo: '/admin/clients/businesses'
  },
  'training_coordinator': {
    role: 'training_coordinator',
    displayName: 'Training Coordinator',
    permissions: [
      'view_training',
      'manage_training',
      'view_individual_clients',
      'manage_scamshield',
      'create_content',
      'view_training_analytics'
    ],
    redirectTo: '/admin/content/articles'
  },
  'business_consultant': {
    role: 'business_consultant',
    displayName: 'Business Consultant',
    permissions: [
      'view_business_clients',
      'manage_business_clients',
      'view_services',
      'create_proposals',
      'manage_ai_services'
    ],
    redirectTo: '/admin/clients/businesses'
  },
  'support_specialist': {
    role: 'support_specialist',
    displayName: 'Support Specialist',
    permissions: [
      'view_all_clients',
      'view_tickets',
      'manage_tickets',
      'view_logs',
      'access_technical_docs'
    ],
    redirectTo: '/admin'
  },
  'staff': {
    role: 'staff',
    displayName: 'Staff Member',
    permissions: [
      'view_clients',
      'view_messages',
      'view_calendar'
    ],
    redirectTo: '/admin'
  },
  'moderator': {
    role: 'moderator',
    displayName: 'Moderator',
    permissions: [
      'view_clients',
      'manage_content'
    ],
    redirectTo: '/admin'
  },
  'user': {
    role: 'user',
    displayName: 'User',
    permissions: [],
    redirectTo: '/portal'
  }
};

export function useUserRole() {
  const [user, setUser] = useState<User | null>(null);
  const [roleConfig, setRoleConfig] = useState<RoleConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async (currentUser: User) => {
      try {
        // Fetch user role from database
        const { data: roleData, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', currentUser.id)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
          setRoleConfig(null);
        } else if (roleData) {
          // Map database role to RoleConfig
          const config = ROLE_CONFIGS[roleData.role as UserRole];
          setRoleConfig(config || null);
        } else {
          setRoleConfig(null);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRoleConfig(null);
      } finally {
        setLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          fetchUserRole(currentUser);
        } else {
          setRoleConfig(null);
          setLoading(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        fetchUserRole(currentUser);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const hasPermission = (permission: string): boolean => {
    if (!roleConfig) return false;
    if (roleConfig.permissions.includes('*')) return true;
    return roleConfig.permissions.includes(permission);
  };

  const isAdmin = (): boolean => {
    return roleConfig?.role === 'admin';
  };

  return {
    user,
    role: roleConfig?.role,
    roleConfig,
    loading,
    hasPermission,
    isAdmin
  };
}
