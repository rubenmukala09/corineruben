import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Shield, CheckCircle2, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { z } from "zod";
import invisionLogo from "@/assets/shield-logo.png";
import type { UserRole } from "@/hooks/useUserRole";

const INVISION_DOMAIN = "@invisionnetwork.org";

const emailSchema = z.string()
  .email("Invalid email address")
  .refine(
    (email) => email.toLowerCase().endsWith(INVISION_DOMAIN),
    { message: `Only ${INVISION_DOMAIN} email addresses are allowed` }
  );

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const phoneSchema = z.string()
  .regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in format XXX-XXX-XXXX")
  .optional()
  .or(z.literal(""));

const STAFF_ROLES: { value: UserRole; label: string; description: string }[] = [
  { value: 'secretary', label: 'Office Manager', description: 'Manage clients, appointments, and communications' },
  { value: 'training_coordinator', label: 'Training Coordinator', description: 'Create content, manage training programs' },
  { value: 'business_consultant', label: 'Business Consultant', description: 'Work with business clients and services' },
  { value: 'support_specialist', label: 'Support Specialist', description: 'Handle technical support and troubleshooting' },
  { value: 'staff', label: 'General Staff', description: 'Standard staff member access' },
];

export default function StaffSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");

  // Validation state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const validateEmail = (value: string) => {
    try {
      emailSchema.parse(value);
      setEmailError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setEmailError(error.errors[0].message);
      }
      return false;
    }
  };

  const validatePassword = (value: string) => {
    try {
      passwordSchema.parse(value);
      setPasswordError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordError(error.errors[0].message);
      }
      return false;
    }
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const validatePhone = (value: string) => {
    if (!value) {
      setPhoneError("");
      return true;
    }
    try {
      phoneSchema.parse(value);
      setPhoneError("");
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPhoneError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    const isPhoneValid = validatePhone(phone);

    if (!isEmailValid || !isPasswordValid || !isConfirmPasswordValid || !isPhoneValid) {
      setIsLoading(false);
      return;
    }

    if (!firstName.trim() || !lastName.trim()) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please provide your first and last name.",
      });
      setIsLoading(false);
      return;
    }

    if (!selectedRole) {
      toast({
        variant: "destructive",
        title: "Role Required",
        description: "Please select your role within the organization.",
      });
      setIsLoading(false);
      return;
    }

    try {
      // Create auth account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email.toLowerCase().trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/login`,
          data: {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
          }
        }
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("Failed to create user account");
      }

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          username: email.split('@')[0],
          email: email.toLowerCase().trim(),
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          phone: phone || null,
          account_status: 'active'
        });

      if (profileError) {
        console.error('Profile creation error:', profileError);
      }

      // Assign role
      const { error: roleError } = await supabase
        .from('user_roles')
        .insert({
          user_id: authData.user.id,
          role: selectedRole
        });

      if (roleError) {
        console.error('Role assignment error:', roleError);
        throw new Error("Failed to assign role. Please contact an administrator.");
      }

      // Send welcome email
      try {
        await supabase.functions.invoke('send-welcome-email', {
          body: {
            email: email.toLowerCase().trim(),
            firstName: firstName.trim(),
            role: selectedRole,
            roleDisplayName: STAFF_ROLES.find(r => r.value === selectedRole)?.label || 'Staff Member'
          }
        });
      } catch (emailError) {
        console.error('Welcome email error:', emailError);
        // Don't fail signup if email fails
      }

      toast({
        title: "Account Created Successfully!",
        description: "Welcome to InVision Network. You can now sign in with your credentials.",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error: any) {
      console.error('Signup error:', error);
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "An error occurred during signup. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4 overflow-y-auto">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-4">
            <img src={invisionLogo} alt="InVision Network" className="h-16 mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-foreground mb-2">Staff Registration</h1>
          <p className="text-muted-foreground">Create your InVision Network staff account</p>
        </div>

        <Card className="p-8 shadow-xl border-border/50 bg-card/95 backdrop-blur">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Email Address <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="your.name@invisionnetwork.org"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  validateEmail(e.target.value);
                }}
                onBlur={(e) => validateEmail(e.target.value)}
                required
                className={emailError ? "border-destructive" : ""}
              />
              {emailError && (
                <p className="text-sm text-destructive flex items-center gap-1">
                  {emailError}
                </p>
              )}
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">
                  First Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">
                  Last Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-foreground">
                Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="XXX-XXX-XXXX"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  validatePhone(e.target.value);
                }}
                onBlur={(e) => validatePhone(e.target.value)}
                className={phoneError ? "border-destructive" : ""}
              />
              {phoneError && (
                <p className="text-sm text-destructive">{phoneError}</p>
              )}
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="role" className="text-foreground">
                Your Role <span className="text-destructive">*</span>
              </Label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {STAFF_ROLES.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{role.label}</span>
                        <span className="text-xs text-muted-foreground">{role.description}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter a strong password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    validatePassword(e.target.value);
                    if (confirmPassword) validateConfirmPassword(confirmPassword);
                  }}
                  onBlur={(e) => validatePassword(e.target.value)}
                  required
                  className={passwordError ? "border-destructive pr-10" : "pr-10"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {passwordError && (
                <p className="text-sm text-destructive">{passwordError}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirm Password <span className="text-destructive">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    validateConfirmPassword(e.target.value);
                  }}
                  onBlur={(e) => validateConfirmPassword(e.target.value)}
                  required
                  className={confirmPasswordError ? "border-destructive pr-10" : "pr-10"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              {confirmPasswordError && (
                <p className="text-sm text-destructive">{confirmPasswordError}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <Shield className="mr-2 h-4 w-4" />
                  Create Staff Account
                </>
              )}
            </Button>

            {/* Links */}
            <div className="space-y-2 text-center text-sm">
              <Link to="/login" className="text-primary hover:underline flex items-center justify-center gap-1">
                <ArrowLeft className="h-3 w-3" />
                Already have an account? Sign in
              </Link>
              <Link to="/signup" className="text-muted-foreground hover:text-foreground block">
                Not a staff member? Register as a client
              </Link>
            </div>
          </form>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <Shield className="h-4 w-4 inline mr-1" />
          Your information is secure and protected
        </div>
      </div>
    </div>
  );
}
