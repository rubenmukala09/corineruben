import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type UserRole =
  | "admin"
  | "secretary"
  | "training_coordinator"
  | "business_consultant"
  | "support_specialist"
  | "staff"
  | "moderator"
  | "user";

interface RoleConfig {
  role: UserRole;
  displayName: string;
  permissions: string[];
  redirectTo: string;
}

export const ROLE_CONFIGS: Record<UserRole, RoleConfig> = {
  admin: {
    role: "admin",
    displayName: "Administrator",
    permissions: ["*"],
    redirectTo: "/admin",
  },
  secretary: {
    role: "secretary",
    displayName: "Office Manager",
    permissions: [
      "view_clients",
      "manage_clients",
      "view_messages",
      "reply_messages",
      "view_calendar",
      "manage_appointments",
    ],
    redirectTo: "/portal/secretary",
  },
  training_coordinator: {
    role: "training_coordinator",
    displayName: "Training Coordinator",
    permissions: [
      "view_training",
      "manage_training",
      "view_individual_clients",
      "manage_scamshield",
      "create_content",
      "view_training_analytics",
    ],
    redirectTo: "/portal/coordinator",
  },
  business_consultant: {
    role: "business_consultant",
    displayName: "Business Consultant",
    permissions: [
      "view_business_clients",
      "manage_business_clients",
      "view_services",
      "create_proposals",
      "manage_ai_services",
    ],
    redirectTo: "/portal/staff",
  },
  support_specialist: {
    role: "support_specialist",
    displayName: "Support Specialist",
    permissions: [
      "view_all_clients",
      "view_tickets",
      "manage_tickets",
      "view_logs",
      "access_technical_docs",
    ],
    redirectTo: "/admin",
  },
  staff: {
    role: "staff",
    displayName: "Staff Member",
    permissions: ["view_clients", "view_messages", "view_calendar"],
    redirectTo: "/admin",
  },
  moderator: {
    role: "moderator",
    displayName: "Moderator",
    permissions: ["view_clients", "manage_content"],
    redirectTo: "/admin",
  },
  user: {
    role: "user",
    displayName: "User",
    permissions: [],
    redirectTo: "/portal",
  },
};

interface AuthContextType {
  user: User | null;
  session: Session | null;
  roleConfig: RoleConfig | null;
  loading: boolean;
  initialized: boolean;
  hasPermission: (permission: string) => boolean;
  isAdmin: () => boolean;
  signOut: () => Promise<void>;
  adminName: string;
  adminEmail: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [roleConfig, setRoleConfig] = useState<RoleConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [adminName, setAdminName] = useState("Admin");
  const [adminEmail, setAdminEmail] = useState("");

  const fetchUserRole = useCallback(async (currentUser: User) => {
    try {
      const { data: roleData, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", currentUser.id)
        .single();

      if (error) {
        console.error("Error fetching user role:", error);
        setRoleConfig(null);
      } else if (roleData) {
        const config = ROLE_CONFIGS[roleData.role as UserRole];
        setRoleConfig(config || null);
      } else {
        setRoleConfig(null);
      }

      // Fetch profile info
      const { data: profile } = await supabase
        .from("profiles_safe")
        .select("first_name, last_name")
        .eq("id", currentUser.id)
        .single();

      if (profile) {
        setAdminName(
          `${profile.first_name || ""} ${profile.last_name || ""}`.trim() ||
            "Admin",
        );
      }
      setAdminEmail(currentUser.email || "");
    } catch (error) {
      console.error("Error fetching user role:", error);
      setRoleConfig(null);
    }
  }, []);

  useEffect(() => {
    // Set up auth state listener FIRST
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // Defer Supabase calls with setTimeout to prevent deadlock
        setTimeout(() => {
          fetchUserRole(session.user);
        }, 0);
      } else {
        setRoleConfig(null);
        setLoading(false);
        setInitialized(true);
      }
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchUserRole(session.user).finally(() => {
          setLoading(false);
          setInitialized(true);
        });
      } else {
        setLoading(false);
        setInitialized(true);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchUserRole]);

  const hasPermission = useCallback(
    (permission: string): boolean => {
      if (!roleConfig) return false;
      if (roleConfig.permissions.includes("*")) return true;
      return roleConfig.permissions.includes(permission);
    },
    [roleConfig],
  );

  const isAdmin = useCallback((): boolean => {
    return roleConfig?.role === "admin";
  }, [roleConfig]);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRoleConfig(null);
    setAdminName("Admin");
    setAdminEmail("");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        roleConfig,
        loading,
        initialized,
        hasPermission,
        isAdmin,
        signOut,
        adminName,
        adminEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
