import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "sonner";
import { Mail } from "lucide-react";

const EmailSettings = () => {
  const [smtpSettings, setSmtpSettings] = useState({
    server: "smtp.gmail.com",
    port: "587",
    encryption: "tls",
    username: "hello@invisionnetwork.org",
    password: "",
    fromName: "InVision Network",
    fromEmail: "hello@invisionnetwork.org",
  });

  const [adminNotifications, setAdminNotifications] = useState({
    newContact: true,
    newOrder: true,
    lowStock: true,
    newUser: false,
    paymentFailed: true,
    newReview: true,
  });

  const [customerNotifications, setCustomerNotifications] = useState({
    orderConfirmed: true,
    orderShipped: true,
    passwordReset: true,
    subscriptionExpiring: true,
    newsletter: true,
  });

  const handleTestEmail = () => {
    toast.success("Test email sent successfully!");
  };

  const handleSave = () => {
    toast.success("Email settings saved!");
  };

  return (
    <div className="space-y-8">
      {/* SMTP Configuration */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">SMTP Configuration</h3>
          <Button variant="outline" onClick={handleTestEmail}>
            <Mail className="mr-2 h-4 w-4" />
            Send Test Email
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="smtpServer">SMTP Server</Label>
            <Input
              id="smtpServer"
              value={smtpSettings.server}
              onChange={(e) =>
                setSmtpSettings({ ...smtpSettings, server: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="smtpPort">SMTP Port</Label>
            <Input
              id="smtpPort"
              value={smtpSettings.port}
              onChange={(e) =>
                setSmtpSettings({ ...smtpSettings, port: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="smtpUsername">Username</Label>
            <Input
              id="smtpUsername"
              type="email"
              value={smtpSettings.username}
              onChange={(e) =>
                setSmtpSettings({ ...smtpSettings, username: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="smtpPassword">Password</Label>
            <Input
              id="smtpPassword"
              type="password"
              value={smtpSettings.password}
              onChange={(e) =>
                setSmtpSettings({ ...smtpSettings, password: e.target.value })
              }
              placeholder="••••••••"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fromName">From Name</Label>
            <Input
              id="fromName"
              value={smtpSettings.fromName}
              onChange={(e) =>
                setSmtpSettings({ ...smtpSettings, fromName: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="fromEmail">From Email</Label>
            <Input
              id="fromEmail"
              type="email"
              value={smtpSettings.fromEmail}
              onChange={(e) =>
                setSmtpSettings({ ...smtpSettings, fromEmail: e.target.value })
              }
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Encryption</Label>
          <RadioGroup
            value={smtpSettings.encryption}
            onValueChange={(value) =>
              setSmtpSettings({ ...smtpSettings, encryption: value })
            }
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="none" id="none" />
              <Label htmlFor="none">None</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ssl" id="ssl" />
              <Label htmlFor="ssl">SSL</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tls" id="tls" />
              <Label htmlFor="tls">TLS (Recommended)</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* Admin Notifications */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Admin Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Choose which events trigger email notifications to administrators
        </p>

        <div className="space-y-3">
          {Object.entries({
            newContact: "New contact form submission",
            newOrder: "New order placed",
            lowStock: "Product low stock alert",
            newUser: "New user signup",
            paymentFailed: "Payment failed",
            newReview: "New review/testimonial",
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={key}>{label}</Label>
              <Switch
                id={key}
                checked={adminNotifications[key as keyof typeof adminNotifications]}
                onCheckedChange={(checked) =>
                  setAdminNotifications({ ...adminNotifications, [key]: checked })
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Customer Notifications */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Customer Notifications</h3>
        <p className="text-sm text-muted-foreground">
          Automated emails sent to customers
        </p>

        <div className="space-y-3">
          {Object.entries({
            orderConfirmed: "Order confirmed",
            orderShipped: "Order shipped",
            passwordReset: "Password reset requested",
            subscriptionExpiring: "Subscription expiring soon",
            newsletter: "Newsletter published",
          }).map(([key, label]) => (
            <div key={key} className="flex items-center justify-between">
              <Label htmlFor={key}>{label}</Label>
              <Switch
                id={key}
                checked={customerNotifications[key as keyof typeof customerNotifications]}
                onCheckedChange={(checked) =>
                  setCustomerNotifications({ ...customerNotifications, [key]: checked })
                }
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button onClick={handleSave} size="lg">
          Save Email Settings
        </Button>
      </div>
    </div>
  );
};

export default EmailSettings;
