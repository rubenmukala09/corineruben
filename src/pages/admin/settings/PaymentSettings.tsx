import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { CreditCard, Copy } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PaymentSettings = () => {
  const [mode, setMode] = useState<"test" | "live">("test");
  const [stripeEnabled, setStripeEnabled] = useState(true);
  
  const [testKeys, setTestKeys] = useState({
    publishable: "pk_test_...",
    secret: "sk_test_...",
    webhook: "whsec_...",
  });

  const [liveKeys, setLiveKeys] = useState({
    publishable: "pk_live_...",
    secret: "sk_live_...",
    webhook: "whsec_...",
  });

  const [paymentOptions, setPaymentOptions] = useState({
    saveCards: false,
    applePay: false,
    googlePay: false,
    requestBilling: true,
    requestPhone: true,
  });

  const [taxSettings, setTaxSettings] = useState({
    collectTax: true,
    taxRate: "7.5",
    taxLabel: "Sales Tax",
  });

  const webhookUrl = "https://invisionnetwork.org/api/stripe/webhook";

  const handleTestConnection = () => {
    toast.success("Stripe connection test successful!");
  };

  const handleCopyWebhook = () => {
    navigator.clipboard.writeText(webhookUrl);
    toast.success("Webhook URL copied to clipboard");
  };

  const handleSave = () => {
    toast.success("Payment settings saved!");
  };

  return (
    <div className="space-y-8">
      {/* Payment Gateway */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Payment Gateway</h3>
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5" />
            <div>
              <p className="font-medium">Stripe</p>
              <p className="text-sm text-muted-foreground">Primary payment processor</p>
            </div>
          </div>
          <Switch checked={stripeEnabled} onCheckedChange={setStripeEnabled} />
        </div>
      </div>

      {/* Mode Toggle */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Mode</h3>
        <RadioGroup value={mode} onValueChange={(value: "test" | "live") => setMode(value)}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="test" id="test" />
            <Label htmlFor="test" className="flex items-center gap-2">
              Test Mode
              <Badge variant="secondary">Development</Badge>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="live" id="live" />
            <Label htmlFor="live" className="flex items-center gap-2">
              Live Mode
              <Badge variant="default">Production</Badge>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Stripe Keys */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {mode === "test" ? "Test" : "Live"} Mode Keys
          </h3>
          <Button variant="outline" onClick={handleTestConnection}>
            Test Connection
          </Button>
        </div>

        {mode === "test" && (
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <p className="text-sm font-medium">Test Card Information:</p>
            <p className="text-sm text-muted-foreground">Card: 4242 4242 4242 4242</p>
            <p className="text-sm text-muted-foreground">Exp: Any future date</p>
            <p className="text-sm text-muted-foreground">CVV: Any 3 digits</p>
          </div>
        )}

        <div className="grid gap-4">
          <div className="space-y-2">
            <Label>Publishable Key</Label>
            <Input
              value={mode === "test" ? testKeys.publishable : liveKeys.publishable}
              onChange={(e) =>
                mode === "test"
                  ? setTestKeys({ ...testKeys, publishable: e.target.value })
                  : setLiveKeys({ ...liveKeys, publishable: e.target.value })
              }
              placeholder={`pk_${mode}_...`}
            />
          </div>

          <div className="space-y-2">
            <Label>Secret Key</Label>
            <Input
              type="password"
              value={mode === "test" ? testKeys.secret : liveKeys.secret}
              onChange={(e) =>
                mode === "test"
                  ? setTestKeys({ ...testKeys, secret: e.target.value })
                  : setLiveKeys({ ...liveKeys, secret: e.target.value })
              }
              placeholder={`sk_${mode}_...`}
            />
          </div>
        </div>
      </div>

      {/* Webhook Configuration */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Webhook Configuration</h3>
        
        <div className="space-y-2">
          <Label>Webhook URL</Label>
          <div className="flex gap-2">
            <Input value={webhookUrl} readOnly />
            <Button variant="outline" size="icon" onClick={handleCopyWebhook}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Add this URL to your Stripe Dashboard under Webhooks
          </p>
        </div>

        <div className="space-y-2">
          <Label>Webhook Secret</Label>
          <Input
            type="password"
            value={mode === "test" ? testKeys.webhook : liveKeys.webhook}
            onChange={(e) =>
              mode === "test"
                ? setTestKeys({ ...testKeys, webhook: e.target.value })
                : setLiveKeys({ ...liveKeys, webhook: e.target.value })
            }
            placeholder="whsec_..."
          />
        </div>
      </div>

      {/* Payment Options */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Payment Features</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label htmlFor="saveCards">Save cards for future purchases</Label>
            <Switch
              id="saveCards"
              checked={paymentOptions.saveCards}
              onCheckedChange={(checked) =>
                setPaymentOptions({ ...paymentOptions, saveCards: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="applePay">Enable Apple Pay</Label>
            <Switch
              id="applePay"
              checked={paymentOptions.applePay}
              onCheckedChange={(checked) =>
                setPaymentOptions({ ...paymentOptions, applePay: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="googlePay">Enable Google Pay</Label>
            <Switch
              id="googlePay"
              checked={paymentOptions.googlePay}
              onCheckedChange={(checked) =>
                setPaymentOptions({ ...paymentOptions, googlePay: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="requestBilling">Request billing address</Label>
            <Switch
              id="requestBilling"
              checked={paymentOptions.requestBilling}
              onCheckedChange={(checked) =>
                setPaymentOptions({ ...paymentOptions, requestBilling: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="requestPhone">Request phone number</Label>
            <Switch
              id="requestPhone"
              checked={paymentOptions.requestPhone}
              onCheckedChange={(checked) =>
                setPaymentOptions({ ...paymentOptions, requestPhone: checked })
              }
            />
          </div>
        </div>
      </div>

      {/* Tax Settings */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Tax Settings</h3>
        
        <div className="flex items-center justify-between">
          <Label htmlFor="collectTax">Collect Tax</Label>
          <Switch
            id="collectTax"
            checked={taxSettings.collectTax}
            onCheckedChange={(checked) =>
              setTaxSettings({ ...taxSettings, collectTax: checked })
            }
          />
        </div>

        {taxSettings.collectTax && (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="taxRate">Tax Rate (%)</Label>
              <Input
                id="taxRate"
                value={taxSettings.taxRate}
                onChange={(e) =>
                  setTaxSettings({ ...taxSettings, taxRate: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="taxLabel">Tax Label</Label>
              <Input
                id="taxLabel"
                value={taxSettings.taxLabel}
                onChange={(e) =>
                  setTaxSettings({ ...taxSettings, taxLabel: e.target.value })
                }
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={handleSave} size="lg">
          Save Payment Settings
        </Button>
      </div>
    </div>
  );
};

export default PaymentSettings;
