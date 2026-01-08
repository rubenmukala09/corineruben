import SuperAdminActivityFeed from "@/components/admin/super/SuperAdminActivityFeed";

export default function ActivityLog() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#F9FAFB]">Activity Log</h1>
        <p className="text-[#9CA3AF]">Complete history of all system activities</p>
      </div>
      <SuperAdminActivityFeed />
    </div>
  );
}
