import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const EnhancedAuth = () => {
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [roleType, setRoleType] = useState<"admin" | "worker">("admin");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [workerId, setWorkerId] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (authMode === "signup") {
        // Only allow admin signup
        if (roleType === "worker") {
          toast({
            title: "Error",
            description: "Workers are created by Admins. Please sign in with your Worker ID or contact an admin.",
            variant: "destructive",
          });
          setLoading(false);
          return;
        }

        // Call secure Edge Function for admin signup
        const { data, error } = await supabase.functions.invoke('worker-signup', {
          body: {
            email,
            password,
            workerId: '',
            roleType: 'admin',
          },
        });

        if (error) throw error;

        if (!data?.success) {
          throw new Error(data?.error || 'Signup failed');
        }

        toast({
          title: "Success!",
          description: "Admin account created successfully. Signing you in...",
        });

        // Now sign in the user
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signInError) throw signInError;

        navigate("/admin");
      } else {
        // Sign in
        if (roleType === "worker") {
          // Worker sign in with Worker ID
          const { data: workerData, error: workerError } = await supabase
            .from("workers")
            .select("id, email")
            .eq("worker_id", workerId)
            .single();

          if (workerError || !workerData) {
            toast({
              title: "Error",
              description: "Invalid Worker ID or password",
              variant: "destructive",
            });
            setLoading(false);
            return;
          }

          // Sign in with the worker's email
          const { data, error } = await supabase.auth.signInWithPassword({
            email: workerData.email || "",
            password,
          });

          if (error) throw error;

          if (data.user) {
            navigate("/worker");
          }
        } else {
          // Admin sign in with email
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;

          if (data.user) {
            navigate("/admin");
          }
        }
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Authentication failed",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background p-4">
      <Card className="w-full max-w-md shadow-strong">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-glow-purple">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-center gradient-text-primary">
            InVision Network
          </CardTitle>
          <CardDescription className="text-center">
            Dual Portal Management System
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as any)} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <div className="mb-6">
              <Label className="text-sm text-muted-foreground mb-3 block">Select Your Role</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRoleType("admin")}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    roleType === "admin"
                      ? "border-primary bg-primary/5 shadow-glow-purple"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-8 h-8" />
                    <span className="font-semibold">Admin</span>
                    <span className="text-xs text-muted-foreground">Email + Password</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRoleType("worker")}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    roleType === "worker"
                      ? "border-primary bg-primary/5 shadow-glow-purple"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <User className="w-8 h-8" />
                    <span className="font-semibold">Worker</span>
                    <span className="text-xs text-muted-foreground">Worker ID + Password</span>
                  </div>
                </button>
              </div>
            </div>

            <TabsContent value="signin">
              <form onSubmit={handleAuth} className="space-y-4">
                {roleType === "admin" ? (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label htmlFor="workerId">Worker ID</Label>
                    <Input
                      id="workerId"
                      type="text"
                      placeholder="INV-0001"
                      value={workerId}
                      onChange={(e) => setWorkerId(e.target.value)}
                      required
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow-purple"
                  disabled={loading}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sign In
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleAuth} className="space-y-4">
                {roleType === "worker" && (
                  <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <p className="text-sm text-amber-700 dark:text-amber-400">
                      Workers are created by Admins. Please contact an administrator or sign in if you already have an account.
                    </p>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={roleType === "worker"}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={roleType === "worker"}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-glow-purple"
                  disabled={loading || roleType === "worker"}
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Create Admin Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedAuth;