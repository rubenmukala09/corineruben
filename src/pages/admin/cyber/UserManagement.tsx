import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import SuperAdminUserManagement from "@/components/admin/super/SuperAdminUserManagement";

export default function UserManagement() {
  return (
    <AdminLayout
      title="User Management"
      subtitle="Manage all registered clients and their permissions"
      searchPlaceholder="Search users..."
      headerActions={
        <Link to="/admin">
          <Button variant="outline" className="border-gray-700 text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800">
            Back to Dashboard
          </Button>
        </Link>
      }
    >
      <SuperAdminUserManagement />
    </AdminLayout>
  );
}
