import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, CheckCircle2, AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const WHITELISTED_EMAILS = [
  { email: 'ruben@invisionnetwork.org', role: 'Admin', description: 'Full system access' },
  { email: 'hello@invisionnetwork.org', role: 'Secretary', description: 'Client management & messages' },
  { email: 'training@invisionnetwork.org', role: 'Training Coordinator', description: 'Training programs & ScamShield' },
  { email: 'consulting@invisionnetwork.org', role: 'Business Consultant', description: 'Business clients & AI services' },
  { email: 'support@invisionnetwork.org', role: 'Support Specialist', description: 'Client support (view only)' }
];

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Must contain uppercase letter")
  .regex(/[a-z]/, "Must contain lowercase letter")
  .regex(/[0-9]/, "Must contain number")
  .regex(/[^A-Za-z0-9]/, "Must contain special character");

interface AccountStatus {
  email: string;
  exists: boolean;
  created: boolean;
}

export default function Setup() {
  const [passwords, setPasswords] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [accountStatuses, setAccountStatuses] = useState<AccountStatus[]>([]);

  const togglePasswordVisibility = (email: string) => {
    setShowPasswords(prev => ({ ...prev, [email]: !prev[email] }));
  };

  const handlePasswordChange = (email: string, password: string) => {
    setPasswords(prev => ({ ...prev, [email]: password }));
  };

  const validatePassword = (password: string): string | null => {
    try {
      passwordSchema.parse(password);
      return null;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0].message;
      }
      return "Invalid password";
    }
  };

  const createAccounts = async () => {
    setIsLoading(true);
    const statuses: AccountStatus[] = [];

    try {
      // Validate all passwords first
      for (const { email } of WHITELISTED_EMAILS) {
        const password = passwords[email];
        if (!password) {
          toast.error(`Password required for ${email}`);
          setIsLoading(false);
          return;
        }

        const error = validatePassword(password);
        if (error) {
          toast.error(`${email}: ${error}`);
          setIsLoading(false);
          return;
        }
      }

      // Create accounts
      for (const { email } of WHITELISTED_EMAILS) {
        const password = passwords[email];

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/portal`,
          }
        });

        if (error) {
          if (error.message.includes("already registered")) {
            statuses.push({ email, exists: true, created: false });
            toast.info(`${email} already exists`);
          } else {
            statuses.push({ email, exists: false, created: false });
            toast.error(`Failed to create ${email}: ${error.message}`);
          }
        } else if (data.user) {
          statuses.push({ email, exists: false, created: true });
          
          // Assign role to the new user based on email
          const roleMap: Record<string, string> = {
            'ruben@invisionnetwork.org': 'admin',
            'hello@invisionnetwork.org': 'secretary',
            'training@invisionnetwork.org': 'training_coordinator',
            'consulting@invisionnetwork.org': 'business_consultant',
            'support@invisionnetwork.org': 'support_specialist'
          };
          
          const assignedRole = roleMap[email];
          if (assignedRole) {
            try {
              const { error: roleError } = await supabase.rpc('assign_role_by_email', {
                target_email: email,
                target_role: assignedRole
              });
              
              if (roleError) {
                console.error(`Failed to assign role to ${email}:`, roleError);
                toast.error(`Created account but failed to assign role for ${email}`);
              } else {
                toast.success(`Created account and assigned ${WHITELISTED_EMAILS.find(e => e.email === email)?.role} role to ${email}`);
              }
            } catch (roleError) {
              console.error(`Error assigning role to ${email}:`, roleError);
            }
          }
        }
      }

      setAccountStatuses(statuses);

      const allCreated = statuses.every(s => s.created || s.exists);
      if (allCreated) {
        toast.success("🎉 All accounts are ready!", {
          description: "You can now log in with any of these accounts.",
        });
      }

    } catch (error: any) {
      console.error("Setup error:", error);
      toast.error("Setup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl shadow-2xl">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            InVision Network Setup
          </CardTitle>
          <CardDescription className="text-base">
            Create accounts for the 5 authorized team members
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Instructions
            </h3>
            <ul className="text-sm text-blue-800 space-y-1 ml-6 list-disc">
              <li>Set a strong password for each account (min 8 chars, uppercase, lowercase, number, special char)</li>
              <li>Save these passwords securely - you'll need them to log in</li>
              <li>Accounts will be created instantly</li>
              <li>If an account already exists, you can skip it</li>
            </ul>
          </div>

          {/* Account Forms */}
          <div className="space-y-4">
            {WHITELISTED_EMAILS.map(({ email, role, description }) => {
              const status = accountStatuses.find(s => s.email === email);
              const passwordError = passwords[email] ? validatePassword(passwords[email]) : null;

              return (
                <div 
                  key={email}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    status?.created ? 'border-green-500 bg-green-50' :
                    status?.exists ? 'border-blue-500 bg-blue-50' :
                    'border-gray-200 hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-gray-900">{email}</h4>
                        {status?.created && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                        {status?.exists && (
                          <div className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                            Already Exists
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{role} • {description}</p>
                    </div>
                  </div>

                  {!status?.exists && !status?.created && (
                    <div className="space-y-2">
                      <Label htmlFor={`password-${email}`} className="text-sm">
                        Password
                      </Label>
                      <div className="relative">
                        <Input
                          id={`password-${email}`}
                          type={showPasswords[email] ? "text" : "password"}
                          value={passwords[email] || ""}
                          onChange={(e) => handlePasswordChange(email, e.target.value)}
                          placeholder="Enter strong password"
                          className={passwordError ? "border-red-500" : ""}
                        />
                        <button
                          type="button"
                          onClick={() => togglePasswordVisibility(email)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPasswords[email] ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                      {passwordError && (
                        <p className="text-xs text-red-600">{passwordError}</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Create Button */}
          <Button
            onClick={createAccounts}
            disabled={isLoading || Object.keys(passwords).length === 0}
            className="w-full h-12 text-lg"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Creating Accounts...
              </>
            ) : (
              <>
                <Shield className="w-5 h-5 mr-2" />
                Create All Accounts
              </>
            )}
          </Button>

          {/* Status Summary */}
          {accountStatuses.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-3">Setup Summary:</h4>
              <div className="space-y-2">
                {accountStatuses.map(status => (
                  <div key={status.email} className="flex items-center gap-2 text-sm">
                    {status.created ? (
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    ) : status.exists ? (
                      <AlertCircle className="w-4 h-4 text-blue-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-red-600" />
                    )}
                    <span className="font-mono">{status.email}</span>
                    <span className="text-gray-600">
                      {status.created ? '✓ Created' : status.exists ? '✓ Already exists' : '✗ Failed'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          {accountStatuses.length > 0 && accountStatuses.every(s => s.created || s.exists) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-green-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Setup Complete!
              </h3>
              <p className="text-sm text-green-800">
                All accounts are ready. You can now:
              </p>
              <ul className="text-sm text-green-800 space-y-1 ml-6 list-disc">
                <li>Go to <Link to="/auth" className="font-semibold underline">/auth</Link> to log in</li>
                <li>Use the email and password you just set</li>
                <li>Complete 2FA verification (check email for code)</li>
                <li>Access your role-specific dashboard</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}