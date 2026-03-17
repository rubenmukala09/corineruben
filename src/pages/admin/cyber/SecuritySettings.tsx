import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Shield,
  Key,
  Fingerprint,
  ChevronLeft,
  ChevronRight,
  Menu,
  Search,
  Bell,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { CyberSidebar } from "@/components/admin/neon/CyberSidebar";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function SecuritySettings() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [settings, setSettings] = useState({
    twoFactor: true,
    biometric: true,
    loginAlerts: true,
    threatAlerts: true,
    autoBlock: true,
    vpnRequired: false,
  });

  return (
    <div className="flex min-h-screen bg-[#0B0F19] w-full">
      <CyberSidebar
        isOpen={sidebarOpen}
        isMobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      <header
        className={`fixed top-0 right-0 left-0 h-16 bg-[#111827]/95 backdrop-blur-xl border-b border-gray-800 z-40 
        transition-all duration-300 ${sidebarOpen ? "md:left-[260px]" : "md:left-[70px]"}`}
      >
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          <div className="flex items-center gap-4 flex-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                window.innerWidth < 768
                  ? setMobileSidebarOpen(!mobileSidebarOpen)
                  : setSidebarOpen(!sidebarOpen)
              }
              className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            >
              <Menu className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.back()}
                className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800 h-9 w-9"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => window.history.forward()}
                className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800 h-9 w-9"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="relative hidden sm:block max-w-md flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
              <Input
                type="text"
                placeholder="Search settings..."
                className="pl-10 bg-[#374151] border-gray-700 text-[#F9FAFB] placeholder:text-[#9CA3AF] h-10 rounded-lg"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="relative text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
            >
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main
        className={`flex-1 transition-all duration-300 pt-16 w-full ${sidebarOpen ? "md:ml-[260px]" : "md:ml-[70px]"}`}
      >
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#F9FAFB]">
                Security Settings
              </h1>
              <p className="text-[#9CA3AF]">
                Configure security preferences and policies
              </p>
            </div>
            <Link to="/admin">
              <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
                Back to Dashboard
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-[#F9FAFB] flex items-center gap-2">
                  <Key className="h-5 w-5 text-[#06B6D4]" />
                  Authentication
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Configure how users authenticate
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#F9FAFB]">
                      Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-[#9CA3AF]">
                      Require 2FA for all users
                    </p>
                  </div>
                  <Switch
                    checked={settings.twoFactor}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, twoFactor: v })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#F9FAFB]">Biometric Login</Label>
                    <p className="text-sm text-[#9CA3AF]">
                      Allow fingerprint/face recognition
                    </p>
                  </div>
                  <Switch
                    checked={settings.biometric}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, biometric: v })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#F9FAFB]">Login Alerts</Label>
                    <p className="text-sm text-[#9CA3AF]">
                      Notify on new device logins
                    </p>
                  </div>
                  <Switch
                    checked={settings.loginAlerts}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, loginAlerts: v })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-[#F9FAFB] flex items-center gap-2">
                  <Shield className="h-5 w-5 text-[#10B981]" />
                  Protection
                </CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Configure threat protection settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#F9FAFB]">Threat Alerts</Label>
                    <p className="text-sm text-[#9CA3AF]">
                      Get notified on detected threats
                    </p>
                  </div>
                  <Switch
                    checked={settings.threatAlerts}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, threatAlerts: v })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#F9FAFB]">Auto-Block Threats</Label>
                    <p className="text-sm text-[#9CA3AF]">
                      Automatically block detected threats
                    </p>
                  </div>
                  <Switch
                    checked={settings.autoBlock}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, autoBlock: v })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-[#F9FAFB]">Require VPN</Label>
                    <p className="text-sm text-[#9CA3AF]">
                      Require VPN for remote access
                    </p>
                  </div>
                  <Switch
                    checked={settings.vpnRequired}
                    onCheckedChange={(v) =>
                      setSettings({ ...settings, vpnRequired: v })
                    }
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#111827] border-gray-800 lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-[#F9FAFB] flex items-center gap-2">
                  <Lock className="h-5 w-5 text-[#F59E0B]" />
                  Change Master Password
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-[#9CA3AF]">Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter current password"
                        className="bg-[#1F2937] border-gray-700 text-[#F9FAFB] pr-10"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 text-[#9CA3AF] hover:text-[#F9FAFB]"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[#9CA3AF]">New Password</Label>
                    <Input
                      type="password"
                      placeholder="Enter new password"
                      className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                    />
                  </div>
                </div>
                <Button className="mt-4 bg-gradient-to-r from-[#F59E0B] to-[#EF4444] text-white">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
