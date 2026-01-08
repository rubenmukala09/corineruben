import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminLayout } from "@/components/admin/AdminLayout";
import SiteSettings from "./settings/SiteSettings";
import EmailSettings from "./settings/EmailSettings";
import PaymentSettings from "./settings/PaymentSettings";
import UserManagement from "./settings/UserManagement";
import DiscountCodes from "./settings/DiscountCodes";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const currentTab = location.pathname.split("/").pop() || "site";

  return (
    <AdminLayout
      title="Settings"
      subtitle="Manage your site configuration and preferences"
    >
      <Tabs value={currentTab} onValueChange={(value) => navigate(`/admin/settings/${value}`)}>
        <TabsList className="grid w-full grid-cols-5 bg-[#111827]">
          <TabsTrigger value="site">Site Settings</TabsTrigger>
          <TabsTrigger value="email">Email Settings</TabsTrigger>
          <TabsTrigger value="payment">Payment Settings</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="discounts">Discount Codes</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="bg-[#111827] border border-gray-800 rounded-lg shadow-sm p-6 mt-6">
        <Routes>
          <Route index element={<Navigate to="/admin/settings/site" replace />} />
          <Route path="site" element={<SiteSettings />} />
          <Route path="email" element={<EmailSettings />} />
          <Route path="payment" element={<PaymentSettings />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="discounts" element={<DiscountCodes />} />
        </Routes>
      </div>
    </AdminLayout>
  );
};

export default Settings;
