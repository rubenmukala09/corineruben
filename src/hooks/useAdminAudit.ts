import { useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

type AuditAction =
  | "view_user"
  | "edit_user"
  | "delete_user"
  | "reset_password"
  | "reset_user_state"
  | "create_product"
  | "edit_product"
  | "delete_product"
  | "upload_file"
  | "view_logs"
  | "export_data"
  | "login"
  | "logout"
  | "settings_change";

type EntityType =
  | "user"
  | "product"
  | "subscription"
  | "order"
  | "activity_log"
  | "settings"
  | "file"
  | "dashboard";

interface AuditDetails {
  [key: string]: unknown;
}

export const useAdminAudit = () => {
  const logAction = useCallback(
    async (
      actionType: AuditAction,
      entityType: EntityType,
      entityId?: string,
      details?: AuditDetails,
    ) => {
      try {
        const { data, error } = await supabase.rpc("log_admin_action", {
          p_action_type: actionType,
          p_entity_type: entityType,
          p_entity_id: entityId || null,
          p_details: details || {},
        });

        if (error) {
          console.error("Failed to log admin action:", error);
          return null;
        }

        return data;
      } catch (err) {
        console.error("Error logging admin action:", err);
        return null;
      }
    },
    [],
  );

  return { logAction };
};

export default useAdminAudit;
