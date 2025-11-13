import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Loader2, 
  Shield, 
  CheckCircle2, 
  Upload, 
  ArrowLeft, 
  ArrowRight,
  Users,
  Heart,
  BarChart3,
  GraduationCap,
  Code,
  XCircle,
  AlertCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { z } from "zod";

const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const emailSchema = z.string().email("Invalid email address");
const phoneSchema = z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Phone must be in format XXX-XXX-XXXX");

const Signup = () => {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Validation states
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [phoneValid, setPhoneValid] = useState<boolean | null>(null);
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState("");

  // Step 2 - Basic Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressZip, setAddressZip] = useState("");

  // Senior/Family fields
  const [relationship, setRelationship] = useState("");
  const [emergencyContactName, setEmergencyContactName] = useState("");
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("");
  const [medicalConditions, setMedicalConditions] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState("English");

  // Caregiver fields
  const [certificationNumber, setCertificationNumber] = useState("");
  const [certificationType, setCertificationType] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [availableHours, setAvailableHours] = useState("");
  const [availabilityMornings, setAvailabilityMornings] = useState(false);
  const [availabilityAfternoons, setAvailabilityAfternoons] = useState(false);
  const [availabilityEvenings, setAvailabilityEvenings] = useState(false);
  const [availabilityNights, setAvailabilityNights] = useState(false);
  const [availabilityWeekends, setAvailabilityWeekends] = useState(false);
  const [reference1Name, setReference1Name] = useState("");
  const [reference1Phone, setReference1Phone] = useState("");
  const [reference1Email, setReference1Email] = useState("");
  const [reference2Name, setReference2Name] = useState("");
  const [reference2Phone, setReference2Phone] = useState("");
  const [reference2Email, setReference2Email] = useState("");
  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState(false);

  // Healthcare Professional fields
  const [licenseNumber, setLicenseNumber] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [medicalSpecialty, setMedicalSpecialty] = useState("");
  const [hospitalAffiliation, setHospitalAffiliation] = useState("");
  const [deaNumber, setDeaNumber] = useState("");
  const [yearsInPractice, setYearsInPractice] = useState("");

  // Analyst fields
  const [department, setDepartment] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  // Trainer fields
  const [trainingSpecialization, setTrainingSpecialization] = useState("");
  const [certifications, setCertifications] = useState("");
  const [yearsTrainingExperience, setYearsTrainingExperience] = useState("");
  const [availableTrainingDates, setAvailableTrainingDates] = useState("");

  // Developer fields
  const [developerRole, setDeveloperRole] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [developerYearsExperience, setDeveloperYearsExperience] = useState("");
  const [githubPortfolioUrl, setGithubPortfolioUrl] = useState("");

  // Terms
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeBackgroundCheck, setAgreeBackgroundCheck] = useState(false);

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  // Real-time email validation
  const validateEmail = (value: string) => {
    if (!value) {
      setEmailValid(null);
      setEmailError("");
      return;
    }
    try {
      emailSchema.parse(value);
      setEmailValid(true);
      setEmailError("");
    } catch (error: any) {
      setEmailValid(false);
      setEmailError("Please enter a valid email address");
    }
  };

  // Real-time phone validation
  const validatePhone = (value: string) => {
    if (!value) {
      setPhoneValid(null);
      setPhoneError("");
      return;
    }
    try {
      phoneSchema.parse(value);
      setPhoneValid(true);
      setPhoneError("");
    } catch (error: any) {
      setPhoneValid(false);
      setPhoneError("Format: XXX-XXX-XXXX");
    }
  };

  // Real-time password validation
  const validatePassword = (value: string) => {
    if (!value) {
      setPasswordValid(null);
      setPasswordError("");
      return;
    }
    try {
      passwordSchema.parse(value);
      setPasswordValid(true);
      setPasswordError("");
    } catch (error: any) {
      setPasswordValid(false);
      if (error.errors && error.errors[0]) {
        setPasswordError(error.errors[0].message);
      } else {
        setPasswordError("8+ chars, uppercase, number, special character");
      }
    }
  };

  // Real-time password match validation
  const validatePasswordMatch = (confirmValue: string) => {
    if (!confirmValue) {
      setPasswordMatch(null);
      setPasswordMatchError("");
      return;
    }
    if (password === confirmValue) {
      setPasswordMatch(true);
      setPasswordMatchError("");
    } else {
      setPasswordMatch(false);
      setPasswordMatchError("Passwords do not match");
    }
  };

  const validateStep2 = () => {
    try {
      emailSchema.parse(email);
      phoneSchema.parse(phone);
      passwordSchema.parse(password);
      
      if (password !== confirmPassword) {
        toast({ 
          title: "🔒 Password Mismatch", 
          description: "Passwords do not match. Please check and try again.", 
          variant: "destructive" 
        });
        return false;
      }
      if (!firstName || !lastName || !dateOfBirth || !addressStreet || !addressCity || !addressState || !addressZip) {
        toast({ 
          title: "📝 Missing Information", 
          description: "Please fill in all required fields to continue", 
          variant: "destructive" 
        });
        return false;
      }
      return true;
    } catch (error: any) {
      let errorTitle = "❌ Validation Error";
      let errorMessage = error.message;
      
      if (error.message?.includes("email")) {
        errorTitle = "📧 Invalid Email";
        errorMessage = "Please enter a valid email address";
      } else if (error.message?.includes("phone")) {
        errorTitle = "📞 Invalid Phone";
        errorMessage = "Phone must be in format XXX-XXX-XXXX";
      } else if (error.message?.includes("password")) {
        errorTitle = "🔒 Password Requirements";
        errorMessage = "Password must be 8+ characters with uppercase, number, and special character";
      }
      
      toast({ title: errorTitle, description: errorMessage, variant: "destructive" });
      return false;
    }
  };

  const validateStep3 = () => {
    if (selectedRole === "senior") {
      if (!relationship || !specialization) {
        toast({ 
          title: "⚠️ Missing Information", 
          description: "Please select organization type and industry", 
          variant: "destructive" 
        });
        return false;
      }
    } else if (selectedRole === "caregiver") {
      if (!certificationNumber || !certificationType || !yearsExperience || !availableHours ||
          !reference1Name || !reference1Phone || !reference1Email ||
          !reference2Name || !reference2Phone || !reference2Email || !backgroundCheckConsent) {
        toast({ 
          title: "⚠️ Missing Information", 
          description: "Please complete all support specialist requirements including references and background check consent", 
          variant: "destructive" 
        });
        return false;
      }
    } else if (selectedRole === "healthcare") {
      if (!licenseNumber || !licenseType || !medicalSpecialty || !yearsInPractice) {
        toast({ 
          title: "⚠️ Missing Information", 
          description: "Please provide all security specialist credentials", 
          variant: "destructive" 
        });
        return false;
      }
    } else if (selectedRole === "analyst") {
      if (!department || !specialization || !educationLevel) {
        toast({ 
          title: "⚠️ Missing Information", 
          description: "Please fill in all required analyst information", 
          variant: "destructive" 
        });
        return false;
      }
    } else if (selectedRole === "trainer") {
      if (!trainingSpecialization || !certifications || !yearsTrainingExperience) {
        toast({ 
          title: "⚠️ Missing Information", 
          description: "Please provide all trainer qualifications", 
          variant: "destructive" 
        });
        return false;
      }
    } else if (selectedRole === "developer") {
      if (!developerRole || techStack.length === 0 || !developerYearsExperience) {
        toast({ 
          title: "⚠️ Missing Information", 
          description: "Please complete all developer/IT requirements", 
          variant: "destructive" 
        });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !selectedRole) {
      toast({ 
        title: "⚠️ Role Required", 
        description: "Please select a role to continue", 
        variant: "destructive" 
      });
      return;
    }
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    
    // Success notification for completing a step
    if (step < totalSteps - 1) {
      toast({
        title: "✓ Progress Saved",
        description: `Step ${step} completed successfully`,
      });
    }
    
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!agreeTerms || !agreePrivacy) {
      toast({ 
        title: "⚠️ Agreement Required", 
        description: "Please agree to Terms and Privacy Policy to continue", 
        variant: "destructive" 
      });
      return;
    }

    if ((selectedRole === "caregiver" || selectedRole === "healthcare") && !agreeBackgroundCheck) {
      toast({ 
        title: "⚠️ Consent Required", 
        description: "Background check consent is required for this role", 
        variant: "destructive" 
      });
      return;
    }

    setIsLoading(true);

    try {
      // Generate application reference
      const appRef = `APP-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/portal`,
          data: {
            first_name: firstName,
            last_name: lastName,
            username: email, // Use email as username for trigger
          },
        },
      });

      if (authError) {
        // Handle specific Supabase auth errors
        if (authError.message.includes("already registered")) {
          throw new Error("EMAIL_EXISTS");
        } else if (authError.message.includes("Password")) {
          throw new Error("PASSWORD_INVALID");
        } else if (authError.message.includes("Email")) {
          throw new Error("EMAIL_INVALID");
        }
        throw authError;
      }
      if (!authData.user) throw new Error("ACCOUNT_CREATION_FAILED");

      // Update profile (trigger creates basic profile)
      const { error: profileError } = await supabase
        .from("profiles")
        .update({
          username: email,
          first_name: firstName,
          last_name: lastName,
          phone,
          date_of_birth: dateOfBirth,
          address_street: addressStreet,
          address_city: addressCity,
          address_state: addressState,
          address_zip: addressZip,
          account_status: "pending",
          application_reference: appRef,
        })
        .eq('id', authData.user.id);

      if (profileError) throw profileError;

      // Create role-specific profile
      if (selectedRole === "senior") {
        const { error } = await supabase.from("senior_client_profiles").insert({
          user_id: authData.user.id,
          relationship,
          emergency_contact_name: emergencyContactName,
          emergency_contact_phone: emergencyContactPhone,
          medical_conditions: medicalConditions,
          preferred_language: preferredLanguage,
        });
        if (error) throw error;
      } else if (selectedRole === "caregiver") {
        const { error } = await supabase.from("caregiver_profiles").insert({
          user_id: authData.user.id,
          certification_number: certificationNumber,
          certification_type: certificationType,
          years_experience: parseInt(yearsExperience),
          available_hours_per_week: parseInt(availableHours),
          availability_mornings: availabilityMornings,
          availability_afternoons: availabilityAfternoons,
          availability_evenings: availabilityEvenings,
          availability_nights: availabilityNights,
          availability_weekends: availabilityWeekends,
          reference1_name: reference1Name,
          reference1_phone: reference1Phone,
          reference1_email: reference1Email,
          reference2_name: reference2Name,
          reference2_phone: reference2Phone,
          reference2_email: reference2Email,
          background_check_consent: backgroundCheckConsent,
        });
        if (error) throw error;
      } else if (selectedRole === "healthcare") {
        const { error } = await supabase.from("healthcare_professional_profiles").insert({
          user_id: authData.user.id,
          license_number: licenseNumber,
          license_type: licenseType,
          medical_specialty: medicalSpecialty,
          hospital_affiliation: hospitalAffiliation,
          dea_number: deaNumber,
          years_in_practice: parseInt(yearsInPractice),
        });
        if (error) throw error;
      } else if (selectedRole === "analyst") {
        const { error } = await supabase.from("analyst_profiles").insert({
          user_id: authData.user.id,
          department,
          specialization,
          education_level: educationLevel,
          linkedin_url: linkedinUrl,
        });
        if (error) throw error;
      } else if (selectedRole === "trainer") {
        const { error } = await supabase.from("trainer_profiles").insert({
          user_id: authData.user.id,
          training_specialization: trainingSpecialization,
          certifications: certifications.split(',').map(c => c.trim()),
          years_training_experience: parseInt(yearsTrainingExperience),
          available_training_dates: availableTrainingDates,
        });
        if (error) throw error;
      } else if (selectedRole === "developer") {
        const { error } = await supabase.from("developer_profiles").insert({
          user_id: authData.user.id,
          developer_role: developerRole,
          tech_stack: techStack,
          years_experience: parseInt(developerYearsExperience),
          github_portfolio_url: githubPortfolioUrl,
        });
        if (error) throw error;
      }

      // Sign out user immediately (they can't login until approved)
      await supabase.auth.signOut();

      toast({
        title: "🎉 Application Submitted!",
        description: `Your application (${appRef}) has been submitted for admin review. Check your email for updates!`,
      });

      navigate(`/application-pending?ref=${appRef}`);
    } catch (error: any) {
      let errorMessage = "An unexpected error occurred. Please try again.";
      let errorTitle = "Application Error";
      
      // Handle specific error codes
      switch (error.message) {
        case "EMAIL_EXISTS":
          errorTitle = "📧 Email Already Registered";
          errorMessage = "This email is already in use. Please login or use a different email.";
          break;
        case "PASSWORD_INVALID":
          errorTitle = "🔒 Invalid Password";
          errorMessage = "Password must be 8+ characters with uppercase, number, and special character.";
          break;
        case "EMAIL_INVALID":
          errorTitle = "📧 Invalid Email";
          errorMessage = "Please enter a valid email address.";
          break;
        case "ACCOUNT_CREATION_FAILED":
          errorTitle = "⚠️ Account Creation Failed";
          errorMessage = "We couldn't create your account. Please try again or contact support.";
          break;
        default:
          if (error.message?.includes("duplicate key")) {
            errorTitle = "⚠️ Duplicate Application";
            errorMessage = "An application with this information already exists. Contact support if this is an error.";
          } else if (error.message?.includes("address_city")) {
            errorTitle = "📝 Missing Address Information";
            errorMessage = "Please fill in all address fields completely.";
          } else if (error.message) {
            errorTitle = "⚠️ Validation Error";
            errorMessage = error.message;
          }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4 py-8">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-accent/10" />
      
      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-3 group mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-glow-purple">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-xl font-bold gradient-text-primary">InVision Network</h1>
              <p className="text-xs text-muted-foreground">Application Portal</p>
            </div>
          </Link>
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Join Our Network</h2>
            <p className="text-muted-foreground">All applications are reviewed and approved by our admin team</p>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
        </div>

        <Card className="p-8 lg:p-10 shadow-2xl border-2 bg-card/80 backdrop-blur-2xl">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-3 gradient-text-primary">Select Your Role</h2>
                <p className="text-muted-foreground text-lg">Choose the role that best describes you</p>
              </div>

              {/* Veterans Discount Banner */}
              <Card className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
                <div className="flex items-center gap-3 text-sm">
                  <div className="flex-shrink-0 text-2xl">🇺🇸</div>
                  <div className="flex-1">
                    <p className="font-semibold">Veterans & First Responders: 10% OFF</p>
                    <p className="text-xs text-muted-foreground">Active duty, veterans, reservists, and first responders receive automatic discount at checkout</p>
                  </div>
                </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { 
                    value: "senior", 
                    label: "Client/Customer", 
                    desc: "Individual or organization seeking AI protection services",
                    icon: Users,
                    gradient: "from-blue-500/20 to-cyan-500/20",
                    iconBg: "from-blue-500 to-cyan-500"
                  },
                  { 
                    value: "caregiver", 
                    label: "Support Specialist", 
                    desc: "Technical support and customer service professional",
                    icon: Heart,
                    gradient: "from-pink-500/20 to-rose-500/20",
                    iconBg: "from-pink-500 to-rose-500"
                  },
                  { 
                    value: "healthcare", 
                    label: "Security Specialist", 
                    desc: "Cybersecurity and AI safety professional",
                    icon: Shield,
                    gradient: "from-green-500/20 to-emerald-500/20",
                    iconBg: "from-green-500 to-emerald-500"
                  },
                  { 
                    value: "analyst", 
                    label: "Data Analyst", 
                    desc: "AI/ML specialist and quality assurance analyst",
                    icon: BarChart3,
                    gradient: "from-purple-500/20 to-violet-500/20",
                    iconBg: "from-purple-500 to-violet-500"
                  },
                  { 
                    value: "trainer", 
                    label: "Trainer", 
                    desc: "AI security and cybersecurity training specialist",
                    icon: GraduationCap,
                    gradient: "from-orange-500/20 to-amber-500/20",
                    iconBg: "from-orange-500 to-amber-500"
                  },
                  { 
                    value: "developer", 
                    label: "Developer/IT", 
                    desc: "Software developer or IT professional",
                    icon: Code,
                    gradient: "from-indigo-500/20 to-blue-500/20",
                    iconBg: "from-indigo-500 to-blue-500"
                  },
                ].map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.value;
                  
                  return (
                    <Card
                      key={role.value}
                      className={`relative p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group ${
                        isSelected 
                          ? 'border-2 border-primary shadow-glow-purple bg-gradient-to-br ' + role.gradient
                          : 'border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedRole(role.value)}
                    >
                      {/* Selection Indicator */}
                      <div className={`absolute top-3 right-3 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        isSelected 
                          ? 'border-primary bg-primary' 
                          : 'border-muted-foreground/30 bg-transparent'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </div>

                      {/* Icon */}
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${role.iconBg} mb-4 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Content */}
                      <div>
                        <h3 className="text-xl font-bold mb-2">{role.label}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{role.desc}</p>
                      </div>

                      {/* Hover Effect */}
                      <div className={`absolute inset-0 rounded-lg bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-100 transition-opacity -z-10`} />
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Basic Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
                <p className="text-muted-foreground">Tell us about yourself</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Input 
                    id="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => {
                      setEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                    className={`pr-10 ${emailValid === true ? 'border-green-500' : emailValid === false ? 'border-red-500' : ''}`}
                    required 
                  />
                  {emailValid === true && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                  {emailValid === false && (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </div>
                {emailError && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {emailError}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number * (XXX-XXX-XXXX)</Label>
                <div className="relative">
                  <Input 
                    id="phone" 
                    value={phone} 
                    onChange={(e) => {
                      setPhone(e.target.value);
                      validatePhone(e.target.value);
                    }}
                    placeholder="555-555-5555"
                    className={`pr-10 ${phoneValid === true ? 'border-green-500' : phoneValid === false ? 'border-red-500' : ''}`}
                    required 
                  />
                  {phoneValid === true && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                  )}
                  {phoneValid === false && (
                    <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                  )}
                </div>
                {phoneError && (
                  <p className="text-xs text-red-500 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {phoneError}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Input 
                      id="password" 
                      type="password" 
                      value={password} 
                      onChange={(e) => {
                        setPassword(e.target.value);
                        validatePassword(e.target.value);
                        if (confirmPassword) validatePasswordMatch(confirmPassword);
                      }}
                      className={`pr-10 ${passwordValid === true ? 'border-green-500' : passwordValid === false ? 'border-red-500' : ''}`}
                      required 
                    />
                    {passwordValid === true && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                    {passwordValid === false && (
                      <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {passwordError ? (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {passwordError}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">Min 8 chars, 1 uppercase, 1 number, 1 special character</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <div className="relative">
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      value={confirmPassword} 
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        validatePasswordMatch(e.target.value);
                      }}
                      className={`pr-10 ${passwordMatch === true ? 'border-green-500' : passwordMatch === false ? 'border-red-500' : ''}`}
                      required 
                    />
                    {passwordMatch === true && (
                      <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
                    )}
                    {passwordMatch === false && (
                      <XCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500" />
                    )}
                  </div>
                  {passwordMatchError && (
                    <p className="text-xs text-red-500 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {passwordMatchError}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input id="dateOfBirth" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
              </div>

              <div className="space-y-4">
                <Label>Address *</Label>
                <Input placeholder="Street Address" value={addressStreet} onChange={(e) => setAddressStreet(e.target.value)} required />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="City" value={addressCity} onChange={(e) => setAddressCity(e.target.value)} required />
                  <Input placeholder="State" value={addressState} onChange={(e) => setAddressState(e.target.value)} required />
                </div>
                <Input placeholder="ZIP Code" value={addressZip} onChange={(e) => setAddressZip(e.target.value)} required />
              </div>
            </div>
          )}

          {/* Step 3: Role-Specific Fields */}
          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Additional Information</h2>
                <p className="text-muted-foreground">Role-specific details</p>
              </div>

              {/* Client/Customer Fields */}
              {selectedRole === "senior" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Organization Type *</Label>
                    <Select value={relationship} onValueChange={setRelationship}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select organization type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Individual</SelectItem>
                        <SelectItem value="spouse">Small Business (1-50 employees)</SelectItem>
                        <SelectItem value="child">Medium Business (51-500 employees)</SelectItem>
                        <SelectItem value="other">Enterprise (500+ employees)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Industry/Sector *</Label>
                    <Input id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="e.g., Healthcare, Finance, Retail, Technology" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalConditions">Primary Security Concerns (Optional)</Label>
                    <Textarea id="medicalConditions" value={medicalConditions} onChange={(e) => setMedicalConditions(e.target.value)} rows={3} placeholder="e.g., Phishing attacks, AI scams, data protection, employee training needs" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredLanguage">Preferred Communication Language</Label>
                    <Select value={preferredLanguage} onValueChange={setPreferredLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Español">Español</SelectItem>
                        <SelectItem value="Français">Français</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {/* Support Specialist Fields */}
              {selectedRole === "caregiver" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="certificationNumber">Certification ID/Number *</Label>
                      <Input id="certificationNumber" value={certificationNumber} onChange={(e) => setCertificationNumber(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certificationType">IT Certification Type *</Label>
                      <Select value={certificationType} onValueChange={setCertificationType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CompTIA A+">CompTIA A+</SelectItem>
                          <SelectItem value="ITIL">ITIL Foundation</SelectItem>
                          <SelectItem value="HDI">HDI Support Center</SelectItem>
                          <SelectItem value="Microsoft">Microsoft Certified</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="yearsExperience">Years of Experience *</Label>
                      <Input id="yearsExperience" type="number" value={yearsExperience} onChange={(e) => setYearsExperience(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="availableHours">Available Hours/Week *</Label>
                      <Input id="availableHours" type="number" value={availableHours} onChange={(e) => setAvailableHours(e.target.value)} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Availability *</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Mornings", checked: availabilityMornings, setter: setAvailabilityMornings },
                        { label: "Afternoons", checked: availabilityAfternoons, setter: setAvailabilityAfternoons },
                        { label: "Evenings", checked: availabilityEvenings, setter: setAvailabilityEvenings },
                        { label: "Nights", checked: availabilityNights, setter: setAvailabilityNights },
                        { label: "Weekends", checked: availabilityWeekends, setter: setAvailabilityWeekends },
                      ].map((slot) => (
                        <div key={slot.label} className="flex items-center space-x-2">
                          <Checkbox id={slot.label} checked={slot.checked} onCheckedChange={(checked) => slot.setter(checked as boolean)} />
                          <Label htmlFor={slot.label}>{slot.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Reference 1 *</Label>
                    <div className="grid gap-2">
                      <Input placeholder="Name" value={reference1Name} onChange={(e) => setReference1Name(e.target.value)} required />
                      <Input placeholder="Phone" value={reference1Phone} onChange={(e) => setReference1Phone(e.target.value)} required />
                      <Input placeholder="Email" type="email" value={reference1Email} onChange={(e) => setReference1Email(e.target.value)} required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Reference 2 *</Label>
                    <div className="grid gap-2">
                      <Input placeholder="Name" value={reference2Name} onChange={(e) => setReference2Name(e.target.value)} required />
                      <Input placeholder="Phone" value={reference2Phone} onChange={(e) => setReference2Phone(e.target.value)} required />
                      <Input placeholder="Email" type="email" value={reference2Email} onChange={(e) => setReference2Email(e.target.value)} required />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox id="backgroundCheck" checked={backgroundCheckConsent} onCheckedChange={(checked) => setBackgroundCheckConsent(checked as boolean)} required />
                    <Label htmlFor="backgroundCheck">I consent to a background check *</Label>
                  </div>
                </div>
              )}

              {/* Security Specialist Fields */}
              {selectedRole === "healthcare" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">Certification ID *</Label>
                      <Input id="licenseNumber" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseType">Security Certification *</Label>
                      <Select value={licenseType} onValueChange={setLicenseType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select certification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CISSP">CISSP</SelectItem>
                          <SelectItem value="CEH">CEH (Certified Ethical Hacker)</SelectItem>
                          <SelectItem value="Security+">CompTIA Security+</SelectItem>
                          <SelectItem value="CISM">CISM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalSpecialty">Security Specialization *</Label>
                    <Input id="medicalSpecialty" value={medicalSpecialty} onChange={(e) => setMedicalSpecialty(e.target.value)} placeholder="e.g., Network Security, AI Safety, Penetration Testing" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalAffiliation">Current/Previous Organization</Label>
                    <Input id="hospitalAffiliation" value={hospitalAffiliation} onChange={(e) => setHospitalAffiliation(e.target.value)} placeholder="Company or institution name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearsInPractice">Years of Experience *</Label>
                    <Input id="yearsInPractice" type="number" value={yearsInPractice} onChange={(e) => setYearsInPractice(e.target.value)} required />
                  </div>
                </div>
              )}

              {/* Analyst Fields */}
              {selectedRole === "analyst" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department *</Label>
                    <Select value={department} onValueChange={setDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="data-analytics">AI/ML Analytics</SelectItem>
                        <SelectItem value="quality-assurance">Security Quality Assurance</SelectItem>
                        <SelectItem value="research">Threat Research</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization *</Label>
                    <Input id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} placeholder="e.g., AI Security, Scam Detection, Data Analysis" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="educationLevel">Education Level *</Label>
                    <Select value={educationLevel} onValueChange={setEducationLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select education level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
                    <Input id="linkedinUrl" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
                  </div>
                </div>
              )}

              {/* Trainer Fields */}
              {selectedRole === "trainer" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="trainingSpecialization">Training Specialization *</Label>
                    <Input id="trainingSpecialization" value={trainingSpecialization} onChange={(e) => setTrainingSpecialization(e.target.value)} placeholder="e.g., Cybersecurity, AI Safety, Scam Prevention" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifications">Certifications * (comma-separated)</Label>
                    <Input id="certifications" value={certifications} onChange={(e) => setCertifications(e.target.value)} placeholder="e.g., CISSP, CEH, Security+" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearsTrainingExperience">Years of Training Experience *</Label>
                    <Input id="yearsTrainingExperience" type="number" value={yearsTrainingExperience} onChange={(e) => setYearsTrainingExperience(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availableTrainingDates">Available Training Dates</Label>
                    <Textarea id="availableTrainingDates" value={availableTrainingDates} onChange={(e) => setAvailableTrainingDates(e.target.value)} rows={3} placeholder="List your availability for conducting training sessions" />
                  </div>
                </div>
              )}

              {/* Developer Fields */}
              {selectedRole === "developer" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="developerRole">Role *</Label>
                    <Select value={developerRole} onValueChange={setDeveloperRole}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="frontend">Frontend Developer</SelectItem>
                        <SelectItem value="backend">Backend Developer</SelectItem>
                        <SelectItem value="fullstack">Full Stack Developer</SelectItem>
                        <SelectItem value="devops">DevOps Engineer</SelectItem>
                        <SelectItem value="it-support">IT Support</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tech Stack/Skills *</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["React", "TypeScript", "Node.js", "Python", "SQL", "AWS", "Docker", "Git"].map((tech) => (
                        <div key={tech} className="flex items-center space-x-2">
                          <Checkbox
                            id={tech}
                            checked={techStack.includes(tech)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setTechStack([...techStack, tech]);
                              } else {
                                setTechStack(techStack.filter(t => t !== tech));
                              }
                            }}
                          />
                          <Label htmlFor={tech}>{tech}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="developerYearsExperience">Years of Experience *</Label>
                    <Input id="developerYearsExperience" type="number" value={developerYearsExperience} onChange={(e) => setDeveloperYearsExperience(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="githubPortfolioUrl">GitHub/Portfolio URL</Label>
                    <Input id="githubPortfolioUrl" value={githubPortfolioUrl} onChange={(e) => setGithubPortfolioUrl(e.target.value)} />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Terms & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Review & Submit</h2>
                <p className="text-muted-foreground">Please review and accept the terms</p>
              </div>

              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold">Application Summary</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Name:</strong> {firstName} {lastName}</p>
                  <p><strong>Email:</strong> {email}</p>
                  <p><strong>Role:</strong> {selectedRole}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox id="agreeTerms" checked={agreeTerms} onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} required />
                  <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                    I agree to the <Link to="/terms-of-service" className="text-primary hover:underline">Terms of Service</Link> *
                  </Label>
                </div>
                <div className="flex items-start space-x-2">
                  <Checkbox id="agreePrivacy" checked={agreePrivacy} onCheckedChange={(checked) => setAgreePrivacy(checked as boolean)} required />
                  <Label htmlFor="agreePrivacy" className="text-sm cursor-pointer">
                    I agree to the <Link to="/privacy-policy" className="text-primary hover:underline">Privacy Policy</Link> *
                  </Label>
                </div>
                {(selectedRole === "caregiver" || selectedRole === "healthcare") && (
                  <div className="flex items-start space-x-2">
                    <Checkbox id="agreeBackgroundCheckFinal" checked={agreeBackgroundCheck} onCheckedChange={(checked) => setAgreeBackgroundCheck(checked as boolean)} required />
                    <Label htmlFor="agreeBackgroundCheckFinal" className="text-sm cursor-pointer">
                      I consent to a background check *
                    </Label>
                  </div>
                )}
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  What happens next?
                </h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your application will be reviewed by our admin team</li>
                  <li>• Estimated review time: 24-48 hours</li>
                  <li>• You'll receive an email notification once approved</li>
                  <li>• After approval, you can login to your dashboard</li>
                </ul>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            {step > 1 && (
              <Button type="button" variant="outline" onClick={handleBack} disabled={isLoading}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div className="ml-auto">
              {step < totalSteps ? (
                <Button type="button" onClick={handleNext} disabled={isLoading}>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} disabled={isLoading} className="bg-gradient-to-r from-primary to-accent">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/auth" className="text-primary font-semibold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;