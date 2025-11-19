import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Save, CreditCard, Receipt } from "lucide-react";

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
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Billing Settings</h1>
          <p className="text-muted-foreground">Configure your business billing and payment settings</p>
        </div>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Receipt className="h-5 w-5" />
              Company Information
            </CardTitle>
            <CardDescription>Details that appear on invoices and receipts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                  placeholder="Your Company LLC"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxId">Tax ID / EIN</Label>
                <Input
                  id="taxId"
                  value={settings.taxId}
                  onChange={(e) => setSettings({ ...settings, taxId: e.target.value })}
                  placeholder="XX-XXXXXXX"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Business Address</Label>
              <Textarea
                id="companyAddress"
                value={settings.companyAddress}
                onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                placeholder="123 Main St, City, State ZIP"
                rows={3}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="companyPhone">Phone Number</Label>
                <Input
                  id="companyPhone"
                  value={settings.companyPhone}
                  onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })}
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyEmail">Billing Email</Label>
                <Input
                  id="companyEmail"
                  type="email"
                  value={settings.companyEmail}
                  onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })}
                  placeholder="billing@company.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Invoice Settings</CardTitle>
            <CardDescription>Configure invoice numbering and payment terms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="invoicePrefix">Invoice Number Prefix</Label>
                <Input
                  id="invoicePrefix"
                  value={settings.invoicePrefix}
                  onChange={(e) => setSettings({ ...settings, invoicePrefix: e.target.value })}
                  placeholder="INV-"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceStartNumber">Starting Number</Label>
                <Input
                  id="invoiceStartNumber"
                  type="number"
                  value={settings.invoiceStartNumber}
                  onChange={(e) => setSettings({ ...settings, invoiceStartNumber: e.target.value })}
                  placeholder="1000"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Payment Terms (days)</Label>
                <Input
                  id="paymentTerms"
                  type="number"
                  value={settings.paymentTerms}
                  onChange={(e) => setSettings({ ...settings, paymentTerms: e.target.value })}
                  placeholder="30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="latePaymentFee">Late Payment Fee (%)</Label>
                <Input
                  id="latePaymentFee"
                  type="number"
                  value={settings.latePaymentFee}
                  onChange={(e) => setSettings({ ...settings, latePaymentFee: e.target.value })}
                  placeholder="5"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Automatic Invoicing</Label>
                <p className="text-sm text-muted-foreground">
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Gateway
            </CardTitle>
            <CardDescription>Configure Stripe payment integration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stripePublishableKey">Stripe Publishable Key</Label>
              <Input
                id="stripePublishableKey"
                value={settings.stripePublishableKey}
                onChange={(e) => setSettings({ ...settings, stripePublishableKey: e.target.value })}
                placeholder="pk_test_..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stripeSecretKey">Stripe Secret Key</Label>
              <Input
                id="stripeSecretKey"
                type="password"
                value={settings.stripeSecretKey}
                onChange={(e) => setSettings({ ...settings, stripeSecretKey: e.target.value })}
                placeholder="sk_test_..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tax Settings</CardTitle>
            <CardDescription>Configure tax rates for invoices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="taxRate">Default Tax Rate (%)</Label>
              <Input
                id="taxRate"
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({ ...settings, taxRate: e.target.value })}
                placeholder="8.5"
              />
              <p className="text-sm text-muted-foreground">
                This rate will be applied to all taxable items on invoices
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
