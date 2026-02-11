import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";
import { SITE } from "@/config/site";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const applicationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .max(50, { message: "First name must be less than 50 characters" }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .max(50, { message: "Last name must be less than 50 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(20, { message: "Phone number must be less than 20 characters" })
    .regex(/^[0-9\s\-\+\(\)]+$/, { message: "Invalid phone number format" }),
  position: z
    .string()
    .min(1, { message: "Please select a position" }),
  coverLetter: z
    .string()
    .trim()
    .min(100, { message: "Cover letter must be at least 100 characters" })
    .max(2000, { message: "Cover letter must be less than 2000 characters" }),
  linkedIn: z
    .string()
    .trim()
    .optional()
    .refine(
      (val) => !val || val === "" || val.includes("linkedin.com"),
      { message: "Please enter a valid LinkedIn URL" }
    ),
  availability: z
    .string()
    .trim()
    .min(1, { message: "Please indicate your availability" })
    .max(500, { message: "Availability must be less than 500 characters" }),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface ApplicationFormProps {
  positions: string[];
}

export const ApplicationForm = ({ positions }: ApplicationFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isVeteran, setIsVeteran] = useState(false);
  const [veteranDocFile, setVeteranDocFile] = useState<File | null>(null);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
  });

  const selectedPosition = watch("position");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }

    // Validate file type
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document",
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Resume must be less than 5MB",
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }

    setResumeFile(file);
  };

  const handleVeteranDocChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) {
      return;
    }

    // Validate file type (accept images and PDFs)
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp"
    ];

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or image (JPG, PNG)",
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "File must be less than 5MB",
        variant: "destructive",
      });
      e.target.value = "";
      return;
    }

    setVeteranDocFile(file);
  };

  const uploadVeteranDoc = async (): Promise<string | null> => {
    if (!veteranDocFile) return null;

    setIsUploadingDoc(true);
    try {
      const fileExt = veteranDocFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `application-docs/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('veteran-docs')
        .upload(filePath, veteranDocFile);

      if (uploadError) throw uploadError;

      return filePath;
    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: "Failed to upload veteran document",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsUploadingDoc(false);
    }
  };

  const onSubmit = async (data: ApplicationFormData) => {
    if (!resumeFile) {
      toast({
        title: "Resume required",
        description: "Please upload your resume",
        variant: "destructive",
      });
      return;
    }

    if (isVeteran && !veteranDocFile) {
      toast({
        title: "Verification required",
        description: "Please upload veteran verification document (DD-214, VA ID, etc.)",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload resume to storage first
      const fileExt = resumeFile.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const resumePath = `resumes/${fileName}`;

      const { error: resumeUploadError } = await supabase.storage
        .from('veteran-docs')
        .upload(resumePath, resumeFile);

      if (resumeUploadError) {
        throw new Error("Failed to upload resume");
      }

      // Upload veteran document if applicable
      let veteranDocPath = null;
      if (isVeteran && veteranDocFile) {
        veteranDocPath = await uploadVeteranDoc();
        if (!veteranDocPath) {
          throw new Error("Failed to upload veteran document");
        }
      }

      // Save application to database
      const { data: application, error: dbError } = await supabase
        .from('job_applications')
        .insert({
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          position: data.position,
          cover_letter: data.coverLetter,
          linkedin_url: data.linkedIn || null,
          availability: data.availability,
          resume_url: resumePath,
          is_veteran: isVeteran,
          veteran_doc_url: veteranDocPath,
          status: 'pending'
        })
        .select()
        .single();

      if (dbError) {
        console.error('Database error:', dbError);
        throw new Error("Failed to save application");
      }

      // Track analytics
      const { trackFormSubmit, trackConversion } = await import("@/utils/analyticsTracker");
      trackFormSubmit("job_application_form", { 
        position: data.position,
        isVeteran 
      });
      trackConversion("job_application_submission");

      // Encode data for WhatsApp message
      const message = `New Job Application:

Name: ${encodeURIComponent(data.firstName)} ${encodeURIComponent(data.lastName)}
Email: ${encodeURIComponent(data.email)}
Phone: ${encodeURIComponent(data.phone)}
Position: ${encodeURIComponent(data.position)}
LinkedIn: ${encodeURIComponent(data.linkedIn || "Not provided")}
Availability: ${encodeURIComponent(data.availability)}
Veteran Status: ${isVeteran ? "Yes (Verification uploaded)" : "No"}

Cover Letter:
${encodeURIComponent(data.coverLetter)}

Resume: ${encodeURIComponent(resumeFile.name)}`;

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/${SITE.phone.whatsapp}?text=${message}`;
      window.open(whatsappUrl, "_blank");

      setIsSubmitted(true);
      toast({
        title: "Application sent!",
        description: "We'll review your application and get back to you soon.",
      });

      // Reset form
      reset();
      setResumeFile(null);
      setIsVeteran(false);
      setVeteranDocFile(null);
      
      // Reset submitted state after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="p-12 text-center bg-primary/5 border-primary/20">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-primary" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-4">Application Sent!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for your interest in joining InVision Network. We'll review your application and contact you soon.
        </p>
        <Button onClick={() => setIsSubmitted(false)}>Submit Another Application</Button>
      </Card>
    );
  }

  return (
    <Card className="p-10 shadow-2xl border-2 border-border/50 bg-gradient-to-b from-card to-card/80 backdrop-blur-xl rounded-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h3 className="text-xl font-bold text-foreground">Personal Information</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-bold">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                {...register("firstName")}
                className={cn(
                  "h-14 text-base border-2 rounded-xl",
                  errors.firstName ? "border-destructive" : ""
                )}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-bold">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                {...register("lastName")}
                className={cn(
                  "h-14 text-base border-2 rounded-xl",
                  errors.lastName ? "border-destructive" : ""
                )}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <h3 className="text-xl font-bold text-foreground">Contact Information</h3>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-bold">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={cn(
                  "h-14 text-base border-2 rounded-xl",
                  errors.email ? "border-destructive" : ""
                )}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-bold">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="(937) 301-8749"
                className={cn(
                  "h-14 text-base border-2 rounded-xl",
                  errors.phone ? "border-destructive" : ""
                )}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-6">
            <Label htmlFor="linkedIn" className="text-sm font-bold">LinkedIn Profile (Optional)</Label>
            <Input
              id="linkedIn"
              {...register("linkedIn")}
              placeholder="https://linkedin.com/in/yourprofile"
              className={cn(
                "h-14 text-base border-2 rounded-xl",
                errors.linkedIn ? "border-destructive" : ""
              )}
            />
            {errors.linkedIn && (
              <p className="text-sm text-destructive">{errors.linkedIn.message}</p>
            )}
          </div>
        </div>

        {/* Position */}
        <div className="space-y-2">
          <Label htmlFor="position" className="text-sm font-bold">
            Position Applying For <span className="text-destructive">*</span>
          </Label>
          <Select onValueChange={(value) => setValue("position", value)}>
            <SelectTrigger className={cn(
              "h-14 text-base border-2 rounded-xl",
              errors.position ? "border-destructive" : ""
            )}>
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.position && (
            <p className="text-sm text-destructive">{errors.position.message}</p>
          )}
        </div>

        {/* Resume Upload */}
        <div className="space-y-2">
          <Label htmlFor="resume" className="text-sm font-bold">
            Resume <span className="text-destructive">*</span>
          </Label>
          {resumeFile ? (
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl border-2 border-green-500/30">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium flex-1 truncate">{resumeFile.name}</span>
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => setResumeFile(null)}
                className="hover:bg-destructive/10"
              >
                Remove
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-primary/50 rounded-xl cursor-pointer hover:bg-primary/5 hover:border-primary transition-all group">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Upload className="w-7 h-7 text-primary" />
              </div>
              <div className="text-center">
                <span className="text-base font-bold text-primary block">Upload Resume</span>
                <span className="text-sm text-muted-foreground block mt-1">PDF or Word document (Max 5MB)</span>
              </div>
              <Input
                id="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Availability */}
        <div className="space-y-2">
          <Label htmlFor="availability" className="text-sm font-bold">
            Availability <span className="text-destructive">*</span>
          </Label>
          <Input
            id="availability"
            {...register("availability")}
            placeholder="e.g., Immediate, 2 weeks notice, Part-time only"
            className={cn(
              "h-14 text-base border-2 rounded-xl",
              errors.availability ? "border-destructive" : ""
            )}
          />
          {errors.availability && (
            <p className="text-sm text-destructive">{errors.availability.message}</p>
          )}
        </div>

        {/* Cover Letter */}
        <div className="space-y-2">
          <Label htmlFor="coverLetter" className="text-sm font-bold">
            Cover Letter <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="coverLetter"
            {...register("coverLetter")}
            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            rows={8}
            className={cn(
              "text-base border-2 rounded-xl resize-none",
              errors.coverLetter ? "border-destructive" : ""
            )}
          />
          {errors.coverLetter && (
            <p className="text-sm text-destructive">{errors.coverLetter.message}</p>
          )}
          <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg">
            Minimum 100 characters, maximum 2000 characters
          </p>
        </div>

        {/* Veteran Status */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 p-6 space-y-6 shadow-lg">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">🇺🇸</span>
                  <Label htmlFor="veteran-status" className="text-lg font-bold text-foreground">
                    Veteran/First Responder Status
                  </Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  We prioritize veterans and first responders. Receive 10% priority consideration.
                </p>
              </div>
              <Switch
                id="veteran-status"
                checked={isVeteran}
                onCheckedChange={setIsVeteran}
                disabled={isSubmitting}
                className="data-[state=checked]:bg-primary"
              />
            </div>

            {isVeteran && (
              <div className="space-y-4 pt-6 border-t-2 border-primary/20 mt-6">
                <div className="space-y-2">
                  <Label htmlFor="veteran-doc" className="text-sm font-bold">
                    Verification Document <span className="text-destructive">*</span>
                  </Label>
                  {veteranDocFile ? (
                    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-green-500/10 to-green-500/5 rounded-xl border-2 border-green-500/30">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <span className="text-sm font-medium flex-1 truncate">{veteranDocFile.name}</span>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => setVeteranDocFile(null)}
                        className="hover:bg-destructive/10"
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center gap-3 p-6 border-2 border-dashed border-primary/50 rounded-xl cursor-pointer hover:bg-primary/5 hover:border-primary transition-all group">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Upload className="w-7 h-7 text-primary" />
                      </div>
                      <div className="text-center">
                        <span className="text-base font-bold text-primary block">Upload Verification</span>
                        <span className="text-sm text-muted-foreground block mt-1">DD-214, VA ID, military ID, or first responder badge</span>
                        <span className="text-xs text-muted-foreground block mt-1">PDF, JPG, PNG (Max 5MB)</span>
                      </div>
                      <Input
                        id="veteran-doc"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png,.webp"
                        onChange={handleVeteranDocChange}
                        className="hidden"
                        disabled={isSubmitting || isUploadingDoc}
                      />
                    </label>
                  )}
                  <div className="bg-blue-500/10 border border-blue-500/20 p-3 rounded-xl mt-2">
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      <strong className="font-bold">Priority Consideration:</strong> Upload verification for 10% priority consideration. Documents are confidential and used only for verification.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setResumeFile(null);
              setIsVeteran(false);
              setVeteranDocFile(null);
            }}
            disabled={isSubmitting}
            className="flex-1 h-14 text-base font-semibold border-2"
          >
            Clear Form
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting || isUploadingDoc} 
            className="flex-1 h-14 text-base font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
          >
            {isSubmitting || isUploadingDoc ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                {isUploadingDoc ? "Uploading..." : "Submitting..."}
              </>
            ) : (
              <>
                <CheckCircle className="mr-2 h-5 w-5" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};
