import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import SuperAdminActivityFeed from "@/components/admin/super/SuperAdminActivityFeed";

export default function ActivityLog() {
  return (
    <AdminLayout
      title="Activity Log"
      subtitle="Complete history of all system activities"
      searchPlaceholder="Search activities..."
      headerActions={
        <Link to="/admin">
          <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
            Back to Dashboard
          </Button>
        </Link>
      }
    >
      <SuperAdminActivityFeed />
    </AdminLayout>
  );
}
