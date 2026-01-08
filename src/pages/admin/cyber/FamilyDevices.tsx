import { Link } from "react-router-dom";
import { Smartphone, Laptop, Tablet, Tv, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AdminLayout } from "@/components/admin/AdminLayout";

const devices = [
  { id: 1, name: "iPhone 14 Pro", type: "smartphone", owner: "John", status: "Protected", lastScan: "2 mins ago", protection: 100 },
  { id: 2, name: "MacBook Pro", type: "laptop", owner: "Sarah", status: "Protected", lastScan: "5 mins ago", protection: 95 },
  { id: 3, name: "iPad Air", type: "tablet", owner: "Kids", status: "Warning", lastScan: "1 hour ago", protection: 72 },
  { id: 4, name: "Samsung TV", type: "tv", owner: "Living Room", status: "Protected", lastScan: "3 hours ago", protection: 88 },
  { id: 5, name: "Windows Desktop", type: "laptop", owner: "Office", status: "At Risk", lastScan: "1 day ago", protection: 45 },
];

export default function FamilyDevices() {
  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "smartphone": return Smartphone;
      case "laptop": return Laptop;
      case "tablet": return Tablet;
      case "tv": return Tv;
      default: return Smartphone;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Protected": return "text-green-500";
      case "Warning": return "text-yellow-500";
      case "At Risk": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  const getProtectionColor = (protection: number) => {
    if (protection >= 90) return "bg-green-500";
    if (protection >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <AdminLayout
      title="Family Devices"
      subtitle="Monitor and protect all connected devices"
      searchPlaceholder="Search devices..."
      headerActions={
        <Link to="/admin">
          <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
            Back to Dashboard
          </Button>
        </Link>
      }
    >
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-green-500">5</p>
            <p className="text-[#9CA3AF]">Total Devices</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-green-500">3</p>
            <p className="text-[#9CA3AF]">Fully Protected</p>
          </CardContent>
        </Card>
        <Card className="bg-[#111827] border-gray-800">
          <CardContent className="p-6 text-center">
            <p className="text-4xl font-bold text-red-500">1</p>
            <p className="text-[#9CA3AF]">Needs Attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Devices List */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader>
          <CardTitle className="text-[#F9FAFB]">Connected Devices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices.map((device) => {
              const Icon = getDeviceIcon(device.type);
              return (
                <div key={device.id} className="flex items-center justify-between p-4 rounded-lg bg-[#1F2937] border border-gray-800">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-[#3B82F6]/20 to-[#06B6D4]/20">
                      <Icon className="h-6 w-6 text-[#06B6D4]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#F9FAFB]">{device.name}</p>
                      <p className="text-sm text-[#9CA3AF]">{device.owner} • Last scan: {device.lastScan}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#9CA3AF]">Protection</span>
                        <span className="text-[#F9FAFB]">{device.protection}%</span>
                      </div>
                      <Progress value={device.protection} className={`h-2 ${getProtectionColor(device.protection)}`} />
                    </div>
                    <span className={`font-medium ${getStatusColor(device.status)}`}>{device.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
