import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

export type UserRole = 'admin' | 'secretary' | 'training_coordinator' | 'business_consultant' | 'support_specialist';

export interface RoleConfig {
  role: UserRole;
  displayName: string;
  permissions: string[];
  redirectTo: string;
}

const ROLE_MAPPINGS: Record<string, RoleConfig> = {
  'ruben@invisionnetwork.org': {
    role: 'admin',
    displayName: 'Administrator',
    permissions: ['*'],
    redirectTo: '/admin'
  },
  'hello@invisionnetwork.org': {
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
    redirectTo: '/admin/clients'
  },
  'training@invisionnetwork.org': {
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
    redirectTo: '/admin/articles'
  },
  'consulting@invisionnetwork.org': {
    role: 'business_consultant',
    displayName: 'Business Consultant',
    permissions: [
      'view_business_clients',
      'manage_business_clients',
      'view_services',
      'create_proposals',
      'manage_ai_services'
    ],
    redirectTo: '/admin/business-clients'
  },
  'support@invisionnetwork.org': {
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
  }
};

export function useUserRole() {
  const [user, setUser] = useState<User | null>(null);
  const [roleConfig, setRoleConfig] = useState<RoleConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async (currentUser: User) => {
      try {
        const email = currentUser.email?.toLowerCase().trim();
        if (email && ROLE_MAPPINGS[email]) {
          setRoleConfig(ROLE_MAPPINGS[email]);
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
