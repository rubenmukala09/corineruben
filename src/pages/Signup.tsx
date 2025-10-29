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
import { Loader2, Shield, CheckCircle2, Upload, ArrowLeft, ArrowRight } from "lucide-react";
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

  const validateStep2 = () => {
    try {
      emailSchema.parse(email);
      phoneSchema.parse(phone);
      passwordSchema.parse(password);
      
      if (password !== confirmPassword) {
        toast({ title: "Error", description: "Passwords do not match", variant: "destructive" });
        return false;
      }
      if (!firstName || !lastName || !dateOfBirth || !addressStreet || !addressCity || !addressState || !addressZip) {
        toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
        return false;
      }
      return true;
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return false;
    }
  };

  const validateStep3 = () => {
    if (selectedRole === "senior") {
      if (!relationship || !emergencyContactName || !emergencyContactPhone) {
        toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
        return false;
      }
    } else if (selectedRole === "caregiver") {
      if (!certificationNumber || !certificationType || !yearsExperience || !availableHours ||
          !reference1Name || !reference1Phone || !reference1Email ||
          !reference2Name || !reference2Phone || !reference2Email || !backgroundCheckConsent) {
        toast({ title: "Error", description: "Please fill all required fields and consent to background check", variant: "destructive" });
        return false;
      }
    } else if (selectedRole === "healthcare") {
      if (!licenseNumber || !licenseType || !medicalSpecialty || !yearsInPractice) {
        toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
        return false;
      }
    } else if (selectedRole === "analyst") {
      if (!department || !specialization || !educationLevel) {
        toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
        return false;
      }
    } else if (selectedRole === "trainer") {
      if (!trainingSpecialization || !certifications || !yearsTrainingExperience) {
        toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
        return false;
      }
    } else if (selectedRole === "developer") {
      if (!developerRole || techStack.length === 0 || !developerYearsExperience) {
        toast({ title: "Error", description: "Please fill all required fields", variant: "destructive" });
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !selectedRole) {
      toast({ title: "Error", description: "Please select a role", variant: "destructive" });
      return;
    }
    if (step === 2 && !validateStep2()) return;
    if (step === 3 && !validateStep3()) return;
    setStep(step + 1);
  };

  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    if (!agreeTerms || !agreePrivacy) {
      toast({ title: "Error", description: "Please agree to Terms and Privacy Policy", variant: "destructive" });
      return;
    }

    if ((selectedRole === "caregiver" || selectedRole === "healthcare") && !agreeBackgroundCheck) {
      toast({ title: "Error", description: "Background check consent required for this role", variant: "destructive" });
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
          },
        },
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error("User creation failed");

      // Create profile
      const { error: profileError } = await supabase
        .from("profiles")
        .insert({
          id: authData.user.id,
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
        });

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
        title: "Application Submitted!",
        description: "Your application has been submitted for review.",
      });

      navigate(`/application-pending?ref=${appRef}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred during signup",
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
              <p className="text-xs text-muted-foreground">Create Account</p>
            </div>
          </Link>
          <Progress value={progress} className="h-2 mb-4" />
          <p className="text-sm text-muted-foreground">Step {step} of {totalSteps}</p>
        </div>

        <Card className="p-8 lg:p-10 shadow-2xl border-2 bg-card/80 backdrop-blur-2xl">
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Select Your Role</h2>
                <p className="text-muted-foreground">Choose the role that best describes you</p>
              </div>

              <RadioGroup value={selectedRole} onValueChange={setSelectedRole}>
                <div className="grid gap-4">
                  {[
                    { value: "senior", label: "Senior/Family Member", desc: "Individual or family seeking care services" },
                    { value: "caregiver", label: "Caregiver/Staff", desc: "Professional caregiver providing care services" },
                    { value: "healthcare", label: "Healthcare Professional", desc: "Medical professional (Doctor, Nurse, etc.)" },
                    { value: "analyst", label: "Analyst", desc: "Data analyst or quality assurance specialist" },
                    { value: "trainer", label: "Trainer", desc: "Training and education specialist" },
                    { value: "developer", label: "Developer/IT", desc: "Software developer or IT professional" },
                  ].map((role) => (
                    <div key={role.value} className="flex items-center space-x-3 p-4 border rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                      <RadioGroupItem value={role.value} id={role.value} />
                      <Label htmlFor={role.value} className="flex-1 cursor-pointer">
                        <div className="font-semibold">{role.label}</div>
                        <div className="text-sm text-muted-foreground">{role.desc}</div>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
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
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number * (XXX-XXX-XXXX)</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="555-555-5555" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <p className="text-xs text-muted-foreground">Min 8 chars, 1 uppercase, 1 number, 1 special character</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password *</Label>
                  <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
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

              {/* Senior/Family Fields */}
              {selectedRole === "senior" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship *</Label>
                    <Select value={relationship} onValueChange={setRelationship}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="self">Self</SelectItem>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="other">Other Family</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">Emergency Contact Name *</Label>
                    <Input id="emergencyContactName" value={emergencyContactName} onChange={(e) => setEmergencyContactName(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactPhone">Emergency Contact Phone *</Label>
                    <Input id="emergencyContactPhone" value={emergencyContactPhone} onChange={(e) => setEmergencyContactPhone(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalConditions">Medical Conditions (Optional)</Label>
                    <Textarea id="medicalConditions" value={medicalConditions} onChange={(e) => setMedicalConditions(e.target.value)} rows={3} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredLanguage">Preferred Language</Label>
                    <Input id="preferredLanguage" value={preferredLanguage} onChange={(e) => setPreferredLanguage(e.target.value)} />
                  </div>
                </div>
              )}

              {/* Caregiver Fields */}
              {selectedRole === "caregiver" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="certificationNumber">Certification Number *</Label>
                      <Input id="certificationNumber" value={certificationNumber} onChange={(e) => setCertificationNumber(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="certificationType">Certification Type *</Label>
                      <Select value={certificationType} onValueChange={setCertificationType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CNA">CNA</SelectItem>
                          <SelectItem value="LPN">LPN</SelectItem>
                          <SelectItem value="RN">RN</SelectItem>
                          <SelectItem value="HHA">HHA</SelectItem>
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

              {/* Healthcare Professional Fields */}
              {selectedRole === "healthcare" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="licenseNumber">License Number *</Label>
                      <Input id="licenseNumber" value={licenseNumber} onChange={(e) => setLicenseNumber(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="licenseType">License Type *</Label>
                      <Select value={licenseType} onValueChange={setLicenseType}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MD">MD</SelectItem>
                          <SelectItem value="NP">NP</SelectItem>
                          <SelectItem value="PA">PA</SelectItem>
                          <SelectItem value="RN">RN</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="medicalSpecialty">Medical Specialty *</Label>
                    <Input id="medicalSpecialty" value={medicalSpecialty} onChange={(e) => setMedicalSpecialty(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hospitalAffiliation">Hospital/Clinic Affiliation</Label>
                    <Input id="hospitalAffiliation" value={hospitalAffiliation} onChange={(e) => setHospitalAffiliation(e.target.value)} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deaNumber">DEA Number</Label>
                      <Input id="deaNumber" value={deaNumber} onChange={(e) => setDeaNumber(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="yearsInPractice">Years in Practice *</Label>
                      <Input id="yearsInPractice" type="number" value={yearsInPractice} onChange={(e) => setYearsInPractice(e.target.value)} required />
                    </div>
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
                        <SelectItem value="data-analytics">Data Analytics</SelectItem>
                        <SelectItem value="quality-assurance">Quality Assurance</SelectItem>
                        <SelectItem value="research">Research</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization *</Label>
                    <Input id="specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
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
                    <Input id="trainingSpecialization" value={trainingSpecialization} onChange={(e) => setTrainingSpecialization(e.target.value)} placeholder="e.g., First Aid, CPR, Dementia Care" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifications">Certifications * (comma-separated)</Label>
                    <Input id="certifications" value={certifications} onChange={(e) => setCertifications(e.target.value)} placeholder="e.g., CPR, First Aid" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="yearsTrainingExperience">Years of Training Experience *</Label>
                    <Input id="yearsTrainingExperience" type="number" value={yearsTrainingExperience} onChange={(e) => setYearsTrainingExperience(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availableTrainingDates">Available Training Dates</Label>
                    <Textarea id="availableTrainingDates" value={availableTrainingDates} onChange={(e) => setAvailableTrainingDates(e.target.value)} rows={3} />
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