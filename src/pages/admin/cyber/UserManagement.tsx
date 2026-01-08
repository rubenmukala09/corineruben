import SuperAdminUserManagement from "@/components/admin/super/SuperAdminUserManagement";

export default function UserManagement() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">User Management</h1>
        <p className="text-[#9CA3AF]">Manage all registered clients and their permissions</p>
      </div>
      <SuperAdminUserManagement />
    </div>
  );
}
