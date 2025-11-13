import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import confetti from "canvas-confetti";
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
  AlertCircle,
  Eye,
  EyeOff
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

function Signup() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successEmail, setSuccessEmail] = useState("");
  const [successCompany, setSuccessCompany] = useState("");
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

  // Business fields
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [website, setWebsite] = useState("");
  
  // Business contact information fields
  const [fullName, setFullName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPhone, setBusinessPhone] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  
  // Business service interests
  const [serviceAIReceptionist, setServiceAIReceptionist] = useState(false);
  const [serviceWebsite, setServiceWebsite] = useState(false);
  const [serviceInsurance, setServiceInsurance] = useState(false);
  const [serviceCybersecurity, setServiceCybersecurity] = useState(false);
  const [servicePhysicalSecurity, setServicePhysicalSecurity] = useState(false);
  const [serviceOther, setServiceOther] = useState(false);
  const [serviceOtherText, setServiceOtherText] = useState("");
  const [referralSource, setReferralSource] = useState("");
  
  // Business password fields
  const [businessPassword, setBusinessPassword] = useState("");
  const [businessConfirmPassword, setBusinessConfirmPassword] = useState("");
  const [showBusinessPassword, setShowBusinessPassword] = useState(false);
  const [showBusinessConfirmPassword, setShowBusinessConfirmPassword] = useState(false);
  const [emailOptIn, setEmailOptIn] = useState(false);
  
  // Password validation states for business
  const [passwordHasLength, setPasswordHasLength] = useState(false);
  const [passwordHasUppercase, setPasswordHasUppercase] = useState(false);
  const [passwordHasNumber, setPasswordHasNumber] = useState(false);
  const [passwordHasSpecial, setPasswordHasSpecial] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(false);

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

  const totalSteps = selectedRole === "senior" ? 5 : 4;
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

  // Auto-format phone number to (XXX) XXX-XXXX
  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
  };
  
  // Real-time business password validation
  const validateBusinessPassword = (value: string) => {
    setPasswordHasLength(value.length >= 8);
    setPasswordHasUppercase(/[A-Z]/.test(value));
    setPasswordHasNumber(/[0-9]/.test(value));
    setPasswordHasSpecial(/[^A-Za-z0-9]/.test(value));
  };
  
  // Check if business passwords match
  const checkBusinessPasswordsMatch = (confirmValue: string) => {
    setPasswordsMatch(businessPassword && confirmValue && businessPassword === confirmValue);
  };
  
  // Trigger confetti animation
  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 }
    };

    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        spread: 90,
        startVelocity: 55,
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };
  
  // Auto-redirect after success
  useEffect(() => {
    if (showSuccess && selectedRole === "senior") {
      const timer = setTimeout(() => {
        navigate("/auth", { 
          state: { 
            message: "Please verify your email before logging in",
            email: successEmail 
          } 
        });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [showSuccess, selectedRole, navigate, successEmail]);

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
    // For business accounts, validate company info first
    if (selectedRole === "senior") {
      if (!companyName || !industry || !companySize) {
        toast({ 
          title: "📝 Missing Information", 
          description: "Please fill in all required company fields", 
          variant: "destructive" 
        });
        return false;
      }
      return true;
    }
    
    // For staff accounts, validate basic info
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
      // Validate contact information
      if (!fullName || !jobTitle || !businessEmail) {
        toast({ 
          title: "⚠️ Missing Information", 
          description: "Please fill in all required contact fields", 
          variant: "destructive" 
        });
        return false;
      }
      
      // Validate email format
      try {
        emailSchema.parse(businessEmail);
      } catch (error) {
        toast({ 
          title: "📧 Invalid Email", 
          description: "Please enter a valid email address", 
          variant: "destructive" 
        });
        return false;
      }
      
      // Validate phone format
      const phoneDigits = businessPhone.replace(/\D/g, '');
      if (phoneDigits.length !== 10) {
        toast({ 
          title: "📞 Invalid Phone", 
          description: "Please enter a valid 10-digit phone number", 
          variant: "destructive" 
        });
        return false;
      }
      
      return true;
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

  const validateStep4 = () => {
    if (selectedRole === "senior") {
      // Validate at least one service is selected
      const hasService = serviceAIReceptionist || serviceWebsite || serviceInsurance || 
                        serviceCybersecurity || servicePhysicalSecurity || serviceOther;
      
      if (!hasService) {
        toast({ 
          title: "⚠️ No Service Selected", 
          description: "Please select at least one service you're interested in", 
          variant: "destructive" 
        });
        return false;
      }
      
      // If "Other" is checked, require text input
      if (serviceOther && !serviceOtherText.trim()) {
        toast({ 
          title: "⚠️ Missing Details", 
          description: "Please describe the other service you're interested in", 
          variant: "destructive" 
        });
        return false;
      }
      
      // Validate referral source
      if (!referralSource) {
        toast({ 
          title: "⚠️ Missing Information", 
          description: "Please tell us how you heard about us", 
          variant: "destructive" 
        });
        return false;
      }
      
      return true;
    }
    return true;
  };
  
  const validateStep5 = () => {
    if (selectedRole === "senior") {
      // Validate password requirements
      if (!passwordHasLength || !passwordHasUppercase || !passwordHasNumber || !passwordHasSpecial) {
        toast({ 
          title: "🔒 Password Requirements Not Met", 
          description: "Please ensure your password meets all requirements", 
          variant: "destructive" 
        });
        return false;
      }
      
      // Validate passwords match
      if (!passwordsMatch || businessPassword !== businessConfirmPassword) {
        toast({ 
          title: "🔒 Passwords Don't Match", 
          description: "Please make sure both passwords are identical", 
          variant: "destructive" 
        });
        return false;
      }
      
      // Validate terms agreement
      if (!agreeTerms || !agreePrivacy) {
        toast({ 
          title: "⚠️ Agreement Required", 
          description: "Please agree to Terms of Service and Privacy Policy", 
          variant: "destructive" 
        });
        return false;
      }
      
      return true;
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
    if (step === 4 && !validateStep4()) return;
    if (step === 5 && !validateStep5()) return;
    
    // Success notification for completing a step
    if (step < totalSteps - 1) {
      toast({
        title: "✓ Progress Saved",
        description: `Step ${step} completed successfully`,
      });
    }
    
    // Smooth transition
    const formCard = document.querySelector('.form-content');
    if (formCard) {
      formCard.classList.add('slide-out-left');
      setTimeout(() => {
        setStep(step + 1);
        formCard.classList.remove('slide-out-left');
        formCard.classList.add('slide-in-right');
        setTimeout(() => formCard.classList.remove('slide-in-right'), 300);
      }, 300);
    } else {
      setStep(step + 1);
    }
  };

  const handleRoleSelect = (role: string) => {
    setSelectedRole(role);
    setIsFlipping(true);
    
    // Flip animation then proceed
    setTimeout(() => {
      setStep(2);
      setIsFlipping(false);
    }, 800);
  };

  const handleBack = () => {
    // Smooth transition
    const formCard = document.querySelector('.form-content');
    if (formCard) {
      formCard.classList.add('slide-out-right');
      setTimeout(() => {
        setStep(step - 1);
        formCard.classList.remove('slide-out-right');
        formCard.classList.add('slide-in-left');
        setTimeout(() => formCard.classList.remove('slide-in-left'), 300);
      }, 300);
    } else {
      setStep(step - 1);
    }
  };

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

      // Determine which email and password to use based on role
      const signupEmail = selectedRole === "senior" ? businessEmail : email;
      const signupPassword = selectedRole === "senior" ? businessPassword : password;
      const userFirstName = selectedRole === "senior" ? fullName.split(' ')[0] : firstName;
      const userLastName = selectedRole === "senior" ? fullName.split(' ').slice(1).join(' ') : lastName;

      // Create user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/portal`,
          data: {
            first_name: userFirstName,
            last_name: userLastName,
            username: signupEmail, // Use email as username for trigger
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
          username: signupEmail,
          first_name: userFirstName,
          last_name: userLastName,
          phone: selectedRole === "senior" ? businessPhone : phone,
          date_of_birth: selectedRole === "senior" ? null : dateOfBirth,
          address_street: selectedRole === "senior" ? businessAddress : addressStreet,
          address_city: selectedRole === "senior" ? null : addressCity,
          address_state: selectedRole === "senior" ? null : addressState,
          address_zip: selectedRole === "senior" ? null : addressZip,
          account_status: "pending",
          application_reference: appRef,
        })
        .eq('id', authData.user.id);

      if (profileError) throw profileError;

      // Create role-specific profile
      if (selectedRole === "senior") {
        // For business accounts, store company and service information
        const selectedServices = [];
        if (serviceAIReceptionist) selectedServices.push("AI Receptionist");
        if (serviceWebsite) selectedServices.push("Website Design");
        if (serviceInsurance) selectedServices.push("AI Insurance");
        if (serviceCybersecurity) selectedServices.push("Cybersecurity Training");
        if (servicePhysicalSecurity) selectedServices.push("Physical Security Products");
        if (serviceOther) selectedServices.push(`Other: ${serviceOtherText}`);
        
        const { error } = await supabase.from("senior_client_profiles").insert({
          user_id: authData.user.id,
          relationship: companySize, // Store company size in relationship field
          emergency_contact_name: companyName,
          emergency_contact_phone: jobTitle,
          medical_conditions: `Industry: ${industry} | Services: ${selectedServices.join(', ')} | Referral: ${referralSource} | Email opt-in: ${emailOptIn}`,
          preferred_language: "English",
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

      // For business accounts, show success screen
      if (selectedRole === "senior") {
        setSuccessEmail(signupEmail);
        setSuccessCompany(companyName);
        setShowSuccess(true);
        triggerConfetti();
        return; // Don't navigate immediately
      }

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
  
  const handleResendVerification = async () => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: successEmail,
      });
      
      if (error) throw error;
      
      toast({
        title: "✓ Email Sent",
        description: "Verification email has been resent to " + successEmail,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to resend verification email. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const handleGoToEmail = () => {
    const emailDomain = successEmail.split('@')[1];
    const emailProviders: { [key: string]: string } = {
      'gmail.com': 'https://mail.google.com',
      'yahoo.com': 'https://mail.yahoo.com',
      'outlook.com': 'https://outlook.live.com',
      'hotmail.com': 'https://outlook.live.com',
      'icloud.com': 'https://www.icloud.com/mail',
    };
    
    const url = emailProviders[emailDomain] || 'https://mail.google.com';
    window.open(url, '_blank');
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
          <style>{`
            @keyframes slideOutLeft {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(-30px); opacity: 0; }
            }
            @keyframes slideInRight {
              from { transform: translateX(30px); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutRight {
              from { transform: translateX(0); opacity: 1; }
              to { transform: translateX(30px); opacity: 0; }
            }
            @keyframes slideInLeft {
              from { transform: translateX(-30px); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            @keyframes checkmarkScale {
              0% { transform: scale(0); opacity: 0; }
              50% { transform: scale(1.2); }
              100% { transform: scale(1); opacity: 1; }
            }
            .slide-out-left { animation: slideOutLeft 0.3s ease forwards; }
            .slide-in-right { animation: slideInRight 0.3s ease forwards; }
            .slide-out-right { animation: slideOutRight 0.3s ease forwards; }
            .slide-in-left { animation: slideInLeft 0.3s ease forwards; }
            .checkmark-animate { animation: checkmarkScale 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
          `}</style>
          
          {/* Success Screen for Business Accounts */}
          {showSuccess && selectedRole === "senior" ? (
            <div className="text-center py-8 space-y-6">
              {/* Animated Checkmark */}
              <div className="flex justify-center">
                <div className="checkmark-animate w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-16 h-16 text-white" strokeWidth={3} />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-green-600">Account Created!</h2>
                <p className="text-lg text-muted-foreground">Check your email for verification link</p>
              </div>

              {/* Account Details */}
              <div className="max-w-md mx-auto p-6 bg-muted/30 rounded-lg border border-border space-y-3">
                <div className="text-left space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-muted-foreground">Email sent to:</span>
                    <span className="text-sm font-mono">{successEmail}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-muted-foreground">Company:</span>
                    <span className="text-sm font-semibold">{successCompany}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-muted-foreground">Account type:</span>
                    <span className="text-sm font-semibold">Business</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto pt-4">
                <Button 
                  onClick={handleGoToEmail}
                  className="h-12 px-6 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
                >
                  Go to Email
                </Button>
                <Button 
                  onClick={handleResendVerification}
                  variant="outline"
                  className="h-12 px-6"
                >
                  Resend Verification Email
                </Button>
              </div>

              {/* Auto-redirect Message */}
              <div className="pt-4">
                <p className="text-sm text-muted-foreground">
                  Redirecting to login in 5 seconds...
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* Regular Form Content */}
          {/* Step 1: Role Selection */}
          {step === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-3 gradient-text-primary">Choose Account Type</h2>
                <p className="text-muted-foreground text-lg">Select the option that best describes you</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Business Account Card */}
                <div 
                  className="relative h-[400px] cursor-pointer"
                  style={{ perspective: '1000px' }}
                  onClick={() => handleRoleSelect("senior")}
                >
                  <div 
                    className={`relative w-full h-full transition-all duration-600 ${
                      isFlipping && selectedRole === "senior" ? '[transform:rotateY(180deg)]' : ''
                    }`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s'
                    }}
                  >
                    {/* Front of card */}
                    <Card
                      className={`absolute w-full h-full p-10 border-2 border-border transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(168,85,247,0.5)] hover:border-purple-600 hover:border-2 group`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="text-7xl group-hover:animate-bounce transition-all">💼</div>
                      </div>

                      {/* Content */}
                      <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold">Business Account</h3>
                        <p className="text-muted-foreground">
                          Get AI solutions, websites, or insurance for your business
                        </p>
                      </div>

                      {/* Button */}
                      <Button
                        type="button"
                        className="w-full mt-6 h-12 text-base font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 transition-all"
                      >
                        Create Business Account
                      </Button>

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-purple-600/10 -z-10" />
                    </Card>

                    {/* Back of card */}
                    <Card
                      className="absolute w-full h-full p-10 border-2 border-purple-600 bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="text-center">
                        <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                        <p className="text-lg font-semibold text-purple-600">Loading...</p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Staff/Partner Account Card */}
                <div 
                  className="relative h-[400px] cursor-pointer"
                  style={{ perspective: '1000px' }}
                  onClick={() => handleRoleSelect("staff")}
                >
                  <div 
                    className={`relative w-full h-full transition-all duration-600 ${
                      isFlipping && selectedRole === "staff" ? '[transform:rotateY(180deg)]' : ''
                    }`}
                    style={{ 
                      transformStyle: 'preserve-3d',
                      transition: 'transform 0.6s'
                    }}
                  >
                    {/* Front of card */}
                    <Card
                      className={`absolute w-full h-full p-10 border-2 border-border transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_50px_rgba(20,184,166,0.5)] hover:border-teal-600 hover:border-2 group`}
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                      {/* Icon */}
                      <div className="flex justify-center mb-6">
                        <div className="text-7xl group-hover:animate-bounce transition-all">👤</div>
                      </div>

                      {/* Content */}
                      <div className="text-center space-y-3">
                        <h3 className="text-2xl font-bold">Staff Access</h3>
                        <p className="text-muted-foreground">
                          Request access to InVision Network internal systems
                        </p>
                      </div>

                      {/* Button */}
                      <Button
                        type="button"
                        className="w-full mt-6 h-12 text-base font-semibold bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 transition-all"
                      >
                        Request Staff Access
                      </Button>

                      {/* Note */}
                      <p className="text-xs text-muted-foreground text-center mt-3 italic">
                        Requires admin approval
                      </p>

                      {/* Glow effect */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-teal-600/10 -z-10" />
                    </Card>

                    {/* Back of card */}
                    <Card
                      className="absolute w-full h-full p-10 border-2 border-teal-600 bg-gradient-to-br from-teal-500/20 to-teal-600/20 flex items-center justify-center"
                      style={{ 
                        backfaceVisibility: 'hidden',
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <div className="text-center">
                        <Loader2 className="w-12 h-12 text-teal-600 animate-spin mx-auto mb-4" />
                        <p className="text-lg font-semibold text-teal-600">Loading...</p>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Indicator for Business Signup */}
          {selectedRole === "senior" && step > 1 && (
            <div className="mb-8">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {[
                  { num: 2, label: "Company Info" },
                  { num: 3, label: "Contact" },
                  { num: 4, label: "Services" },
                  { num: 5, label: "Password" }
                ].map((s, idx) => (
                  <div key={s.num} className="flex items-center flex-1">
                    <div className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                        step >= s.num 
                          ? 'bg-purple-600 text-white' 
                          : 'bg-gray-200 text-gray-400'
                      }`}>
                        {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num - 1}
                      </div>
                      <span className={`text-xs mt-2 font-medium ${
                        step >= s.num ? 'text-purple-600' : 'text-gray-400'
                      }`}>
                        {s.label}
                      </span>
                    </div>
                    {idx < 3 && (
                      <div className={`flex-1 h-1 mx-2 transition-all ${
                        step > s.num ? 'bg-purple-600' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Company Information (Business only) */}
          {step === 2 && selectedRole === "senior" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Company Information</h2>
                <p className="text-muted-foreground">Tell us about your business</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input 
                  id="companyName" 
                  value={companyName} 
                  onChange={(e) => setCompanyName(e.target.value)} 
                  placeholder="Your Company LLC"
                  required 
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={industry} onValueChange={setIndustry} required>
                  <SelectTrigger id="industry" className="h-12">
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="legal">Legal</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="professional-services">Professional Services</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Company Size *</Label>
                <RadioGroup value={companySize} onValueChange={setCompanySize} required>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1-10" id="size1" />
                    <Label htmlFor="size1" className="font-normal cursor-pointer">1-10 employees</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="11-50" id="size2" />
                    <Label htmlFor="size2" className="font-normal cursor-pointer">11-50 employees</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="51-200" id="size3" />
                    <Label htmlFor="size3" className="font-normal cursor-pointer">51-200 employees</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="201-500" id="size4" />
                    <Label htmlFor="size4" className="font-normal cursor-pointer">201-500 employees</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="500+" id="size5" />
                    <Label htmlFor="size5" className="font-normal cursor-pointer">500+ employees</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website (Optional)</Label>
                <Input 
                  id="website" 
                  type="url"
                  value={website} 
                  onChange={(e) => setWebsite(e.target.value)} 
                  placeholder="https://yourcompany.com"
                  className="h-12"
                />
              </div>
            </div>
          )}

          {/* Step 3: Contact Information (Business only) */}
          {step === 3 && selectedRole === "senior" && (
            <div className="space-y-6 form-content">
              <div>
                <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                <p className="text-muted-foreground">Tell us about the primary contact</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name *</Label>
                <Input 
                  id="fullName" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                  placeholder="John Smith"
                  required 
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input 
                  id="jobTitle" 
                  value={jobTitle} 
                  onChange={(e) => setJobTitle(e.target.value)} 
                  placeholder="CEO / Manager / etc."
                  required 
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessEmail">Business Email *</Label>
                <div className="relative">
                  <Input 
                    id="businessEmail" 
                    type="email" 
                    value={businessEmail} 
                    onChange={(e) => {
                      setBusinessEmail(e.target.value);
                      validateEmail(e.target.value);
                    }}
                    placeholder="john@company.com"
                    className={`h-12 pr-10 ${emailValid === true ? 'border-green-500' : emailValid === false ? 'border-red-500' : ''}`}
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
                <p className="text-xs text-muted-foreground">This will be used for login</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessPhone">Phone Number *</Label>
                <Input 
                  id="businessPhone" 
                  value={businessPhone} 
                  onChange={(e) => {
                    const formatted = formatPhoneNumber(e.target.value);
                    setBusinessPhone(formatted);
                  }}
                  placeholder="(937) 555-1234"
                  className="h-12"
                  required 
                  maxLength={14}
                />
                <p className="text-xs text-muted-foreground">Auto-formatted as you type</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAddress">Business Address (Optional)</Label>
                <Textarea 
                  id="businessAddress" 
                  value={businessAddress} 
                  onChange={(e) => setBusinessAddress(e.target.value)} 
                  placeholder="Street, City, State, ZIP"
                  rows={3}
                  className="resize-none"
                />
              </div>
            </div>
          )}

          {/* Step 4: Service Interest (Business only) */}
          {step === 4 && selectedRole === "senior" && (
            <div className="space-y-6 form-content">
              <div>
                <h2 className="text-2xl font-bold mb-2">What services are you interested in?</h2>
                <p className="text-muted-foreground">Select all that apply</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="serviceAIReceptionist" 
                    checked={serviceAIReceptionist} 
                    onCheckedChange={(checked) => setServiceAIReceptionist(checked as boolean)} 
                  />
                  <Label htmlFor="serviceAIReceptionist" className="text-base cursor-pointer leading-tight">
                    <span className="font-semibold">AI Receptionist</span>
                    <span className="text-muted-foreground ml-2">($149/month)</span>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="serviceWebsite" 
                    checked={serviceWebsite} 
                    onCheckedChange={(checked) => setServiceWebsite(checked as boolean)} 
                  />
                  <Label htmlFor="serviceWebsite" className="text-base cursor-pointer leading-tight">
                    <span className="font-semibold">Website Design</span>
                    <span className="text-muted-foreground ml-2">(from $1,500)</span>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="serviceInsurance" 
                    checked={serviceInsurance} 
                    onCheckedChange={(checked) => setServiceInsurance(checked as boolean)} 
                  />
                  <Label htmlFor="serviceInsurance" className="text-base cursor-pointer leading-tight">
                    <span className="font-semibold">AI Insurance</span>
                    <span className="text-muted-foreground ml-2">($199-799/month)</span>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="serviceCybersecurity" 
                    checked={serviceCybersecurity} 
                    onCheckedChange={(checked) => setServiceCybersecurity(checked as boolean)} 
                  />
                  <Label htmlFor="serviceCybersecurity" className="text-base cursor-pointer leading-tight">
                    <span className="font-semibold">Cybersecurity Training</span>
                    <span className="text-muted-foreground ml-2">($79-399/session)</span>
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="servicePhysicalSecurity" 
                    checked={servicePhysicalSecurity} 
                    onCheckedChange={(checked) => setServicePhysicalSecurity(checked as boolean)} 
                  />
                  <Label htmlFor="servicePhysicalSecurity" className="text-base cursor-pointer leading-tight">
                    <span className="font-semibold">Physical Security Products</span>
                  </Label>
                </div>

                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <Checkbox 
                      id="serviceOther" 
                      checked={serviceOther} 
                      onCheckedChange={(checked) => setServiceOther(checked as boolean)} 
                    />
                    <Label htmlFor="serviceOther" className="text-base cursor-pointer leading-tight font-semibold">
                      Other:
                    </Label>
                  </div>
                  {serviceOther && (
                    <Input 
                      placeholder="Please describe the service you're interested in"
                      value={serviceOtherText}
                      onChange={(e) => setServiceOtherText(e.target.value)}
                      className="ml-8"
                    />
                  )}
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <Label htmlFor="referralSource">How did you hear about us? *</Label>
                <Select value={referralSource} onValueChange={setReferralSource} required>
                  <SelectTrigger id="referralSource" className="h-12">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="google">Google Search</SelectItem>
                    <SelectItem value="social-media">Social Media</SelectItem>
                    <SelectItem value="referral">Referral</SelectItem>
                    <SelectItem value="advertisement">Advertisement</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span><strong>No payment required now.</strong> We'll contact you with a custom quote based on your selections.</span>
                </p>
              </div>
            </div>
          )}

          {/* Step 5: Create Password (Business only) */}
          {step === 5 && selectedRole === "senior" && (
            <div className="space-y-6 form-content">
              <div>
                <h2 className="text-2xl font-bold mb-2">Secure Your Account</h2>
                <p className="text-muted-foreground">Create a strong password to protect your account</p>
              </div>

              {/* Create Password */}
              <div className="space-y-2">
                <Label htmlFor="businessPassword">Create Password *</Label>
                <div className="relative">
                  <Input 
                    id="businessPassword" 
                    type={showBusinessPassword ? "text" : "password"}
                    value={businessPassword} 
                    onChange={(e) => {
                      setBusinessPassword(e.target.value);
                      validateBusinessPassword(e.target.value);
                      if (businessConfirmPassword) {
                        checkBusinessPasswordsMatch(businessConfirmPassword);
                      }
                    }}
                    className="h-12 pr-10"
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowBusinessPassword(!showBusinessPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showBusinessPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>

                {/* Password Requirements */}
                <div className="space-y-2 mt-3">
                  <div className={`flex items-center gap-2 text-sm ${passwordHasLength ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordHasLength ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${passwordHasUppercase ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordHasUppercase ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>One uppercase letter</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${passwordHasNumber ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordHasNumber ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>One number</span>
                  </div>
                  <div className={`flex items-center gap-2 text-sm ${passwordHasSpecial ? 'text-green-600' : 'text-muted-foreground'}`}>
                    {passwordHasSpecial ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>One special character</span>
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="businessConfirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Input 
                    id="businessConfirmPassword" 
                    type={showBusinessConfirmPassword ? "text" : "password"}
                    value={businessConfirmPassword} 
                    onChange={(e) => {
                      setBusinessConfirmPassword(e.target.value);
                      checkBusinessPasswordsMatch(e.target.value);
                    }}
                    className={`h-12 pr-10 ${passwordsMatch ? 'border-green-500' : businessConfirmPassword ? 'border-red-500' : ''}`}
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowBusinessConfirmPassword(!showBusinessConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showBusinessConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {businessConfirmPassword && (
                  <div className={`flex items-center gap-2 text-sm ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                    {passwordsMatch ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    <span>{passwordsMatch ? 'Passwords match' : 'Passwords do not match'}</span>
                  </div>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="space-y-4 pt-4 border-t">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="agreeTermsBusiness" 
                    checked={agreeTerms} 
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)} 
                    required 
                  />
                  <Label htmlFor="agreeTermsBusiness" className="text-sm cursor-pointer leading-tight">
                    I agree to the <Link to="/terms-of-service" className="text-primary hover:underline font-semibold">Terms of Service</Link> and <Link to="/privacy-policy" className="text-primary hover:underline font-semibold">Privacy Policy</Link> *
                  </Label>
                </div>

                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="emailOptIn" 
                    checked={emailOptIn} 
                    onCheckedChange={(checked) => setEmailOptIn(checked as boolean)} 
                  />
                  <Label htmlFor="emailOptIn" className="text-sm cursor-pointer leading-tight">
                    Send me AI safety tips and company updates
                  </Label>
                </div>
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
              <Button type="button" variant="outline" onClick={handleBack} disabled={isLoading} className="h-12 px-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            <div className="ml-auto">
              {step < totalSteps ? (
                <Button 
                  type="button" 
                  onClick={handleNext} 
                  disabled={isLoading}
                  className="h-12 px-8 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4 ml-2 arrow-icon" />
                </Button>
              ) : (
                <Button type="button" onClick={handleSubmit} disabled={isLoading} className="h-12 px-8 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {selectedRole === "senior" ? "Creating Account..." : "Submitting..."}
                    </>
                  ) : (
                    selectedRole === "senior" ? "Create Account" : "Submit Application"
                  )}
                </Button>
              )}
            </div>
          </div>
            </>
          )}
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