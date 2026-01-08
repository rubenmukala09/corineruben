import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Save, CreditCard, Receipt, Building2, FileText } from "lucide-react";

export default function BillingSettings() {
  const [settings, setSettings] = useState({
    companyName: "",
    companyAddress: "",
    companyPhone: "",
    companyEmail: "",
    taxId: "",
    taxRate: "",
    invoicePrefix: "INV-",
    invoiceStartNumber: "1000",
    paymentTerms: "30",
    autoInvoicing: false,
    latePaymentFee: "",
    stripePublishableKey: "",
    stripeSecretKey: "",
  });

  const handleSave = () => {
    toast.success("Billing settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-[#F9FAFB]">Billing Settings</h2>
          <p className="text-[#9CA3AF]">Configure your business billing and payment settings</p>
        </div>
        <Button onClick={handleSave} className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Company Information */}
        <Card className="bg-[#1F2937] border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F9FAFB]">
              <Building2 className="h-5 w-5 text-[#06B6D4]" />
              Company Information
            </CardTitle>
            <CardDescription className="text-[#9CA3AF]">
              Details that appear on invoices and receipts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Company Name</Label>
                <Input
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  placeholder="Your Company LLC"
                  className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Tax ID / EIN</Label>
                <Input
                  value={settings.taxId}
                  onChange={(e) => setSettings({ ...settings, taxId: e.target.value })}
                  placeholder="XX-XXXXXXX"
                  className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-[#9CA3AF]">Business Address</Label>
              <Textarea
                value={settings.companyAddress}
                onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                placeholder="123 Main St, City, State ZIP"
                rows={3}
                className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Phone Number</Label>
                <Input
                  value={settings.companyPhone}
                  onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                  placeholder="(937) 000-0000"
                  className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Billing Email</Label>
                <Input
                  type="email"
                  value={settings.companyEmail}
                  onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                  placeholder="billing@company.com"
                  className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Settings */}
        <Card className="bg-[#1F2937] border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F9FAFB]">
              <FileText className="h-5 w-5 text-[#10B981]" />
              Invoice Settings
            </CardTitle>
            <CardDescription className="text-[#9CA3AF]">
              Configure invoice numbering and payment terms
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Invoice Number Prefix</Label>
                <Input
                  value={settings.invoicePrefix}
                  onChange={(e) => setSettings({ ...settings, invoicePrefix: e.target.value })}
                  placeholder="INV-"
                  className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Starting Number</Label>
                <Input
                  type="number"
                  value={settings.invoiceStartNumber}
                  onChange={(e) => setSettings({ ...settings, invoiceStartNumber: e.target.value })}
                  placeholder="1000"
                  className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Payment Terms (days)</Label>
                <Input
                  type="number"
                  value={settings.paymentTerms}
                  onChange={(e) => setSettings({ ...settings, paymentTerms: e.target.value })}
                  placeholder="30"
                  className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-[#9CA3AF]">Late Payment Fee (%)</Label>
                <Input
                  type="number"
                  value={settings.latePaymentFee}
                  onChange={(e) => setSettings({ ...settings, latePaymentFee: e.target.value })}
                  placeholder="5"
                  className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#111827] rounded-lg border border-gray-600">
              <div className="space-y-0.5">
                <Label className="text-[#F9FAFB]">Automatic Invoicing</Label>
                <p className="text-sm text-[#9CA3AF]">
                  Automatically generate invoices for completed services
                </p>
              </div>
              <Switch
                checked={settings.autoInvoicing}
                onCheckedChange={(checked) => setSettings({ ...settings, autoInvoicing: checked })}
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Gateway */}
        <Card className="bg-[#1F2937] border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F9FAFB]">
              <CreditCard className="h-5 w-5 text-[#8B5CF6]" />
              Payment Gateway
            </CardTitle>
            <CardDescription className="text-[#9CA3AF]">
              Configure Stripe payment integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[#9CA3AF]">Stripe Publishable Key</Label>
              <Input
                value={settings.stripePublishableKey}
                onChange={(e) => setSettings({ ...settings, stripePublishableKey: e.target.value })}
                placeholder="pk_test_..."
                className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-[#9CA3AF]">Stripe Secret Key</Label>
              <Input
                type="password"
                value={settings.stripeSecretKey}
                onChange={(e) => setSettings({ ...settings, stripeSecretKey: e.target.value })}
                placeholder="sk_test_..."
                className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Tax Settings */}
        <Card className="bg-[#1F2937] border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[#F9FAFB]">
              <Receipt className="h-5 w-5 text-[#F97316]" />
              Tax Settings
            </CardTitle>
            <CardDescription className="text-[#9CA3AF]">
              Configure tax rates for invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label className="text-[#9CA3AF]">Default Tax Rate (%)</Label>
              <Input
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                placeholder="8.5"
                className="bg-[#111827] border-gray-600 text-[#F9FAFB]"
              />
              <p className="text-sm text-[#9CA3AF]">
                This rate will be applied to all taxable items on invoices
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
