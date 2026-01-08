import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AdminLayout } from "@/components/admin/AdminLayout";
import SuperAdminProductManager from "@/components/admin/super/SuperAdminProductManager";
import SuperAdminSalesOverview from "@/components/admin/super/SuperAdminSalesOverview";

export default function ProductsList() {
  return (
    <AdminLayout
      title="Products & Sales"
      subtitle="Manage digital products and view sales analytics"
      searchPlaceholder="Search products..."
      headerActions={
        <Link to="/admin">
          <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
            Back to Dashboard
          </Button>
        </Link>
      }
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Product Manager */}
        <SuperAdminProductManager />
        
        {/* Sales Overview */}
        <SuperAdminSalesOverview />
      </div>
    </AdminLayout>
  );
}
