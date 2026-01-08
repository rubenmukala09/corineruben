import SuperAdminProductManager from "@/components/admin/super/SuperAdminProductManager";
import SuperAdminSalesOverview from "@/components/admin/super/SuperAdminSalesOverview";

export default function ProductsList() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">Products & Sales</h1>
        <p className="text-[#9CA3AF]">Manage digital products and view sales analytics</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SuperAdminProductManager />
        <SuperAdminSalesOverview />
      </div>
    </div>
  );
}
