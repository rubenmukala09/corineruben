import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, CheckCircle } from "lucide-react";

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

  const onSubmit = async (data: ApplicationFormData) => {
    if (!resumeFile) {
      toast({
        title: "Resume required",
        description: "Please upload your resume",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Encode data for WhatsApp message
      const message = `New Job Application:

Name: ${encodeURIComponent(data.firstName)} ${encodeURIComponent(data.lastName)}
Email: ${encodeURIComponent(data.email)}
Phone: ${encodeURIComponent(data.phone)}
Position: ${encodeURIComponent(data.position)}
LinkedIn: ${encodeURIComponent(data.linkedIn || "Not provided")}
Availability: ${encodeURIComponent(data.availability)}

Cover Letter:
${encodeURIComponent(data.coverLetter)}

Resume: ${encodeURIComponent(resumeFile.name)}`;

      // Open WhatsApp with pre-filled message
      const whatsappUrl = `https://wa.me/19375550199?text=${message}`;
      window.open(whatsappUrl, "_blank");

      setIsSubmitted(true);
      toast({
        title: "Application sent!",
        description: "We'll review your application and get back to you soon.",
      });

      // Reset form
      reset();
      setResumeFile(null);
      
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
    <Card className="p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">
                First Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="firstName"
                {...register("firstName")}
                placeholder="John"
                className={errors.firstName ? "border-destructive" : ""}
              />
              {errors.firstName && (
                <p className="text-sm text-destructive">{errors.firstName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">
                Last Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="lastName"
                {...register("lastName")}
                placeholder="Doe"
                className={errors.lastName ? "border-destructive" : ""}
              />
              {errors.lastName && (
                <p className="text-sm text-destructive">{errors.lastName.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                placeholder="john.doe@example.com"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Phone <span className="text-destructive">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="(937) 555-0199"
                className={errors.phone ? "border-destructive" : ""}
              />
              {errors.phone && (
                <p className="text-sm text-destructive">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="linkedIn">LinkedIn Profile (Optional)</Label>
            <Input
              id="linkedIn"
              {...register("linkedIn")}
              placeholder="https://linkedin.com/in/yourprofile"
              className={errors.linkedIn ? "border-destructive" : ""}
            />
            {errors.linkedIn && (
              <p className="text-sm text-destructive">{errors.linkedIn.message}</p>
            )}
          </div>
        </div>

        {/* Position */}
        <div className="space-y-2">
          <Label htmlFor="position">
            Position Applying For <span className="text-destructive">*</span>
          </Label>
          <Select onValueChange={(value) => setValue("position", value)}>
            <SelectTrigger className={errors.position ? "border-destructive" : ""}>
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
          <Label htmlFor="resume">
            Resume <span className="text-destructive">*</span>
          </Label>
          <div className="flex items-center gap-4">
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
            {resumeFile && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="w-4 h-4 text-primary" />
                {resumeFile.name}
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            PDF or Word document, max 5MB
          </p>
        </div>

        {/* Availability */}
        <div className="space-y-2">
          <Label htmlFor="availability">
            Availability <span className="text-destructive">*</span>
          </Label>
          <Input
            id="availability"
            {...register("availability")}
            placeholder="e.g., Immediate, 2 weeks notice, Part-time only"
            className={errors.availability ? "border-destructive" : ""}
          />
          {errors.availability && (
            <p className="text-sm text-destructive">{errors.availability.message}</p>
          )}
        </div>

        {/* Cover Letter */}
        <div className="space-y-2">
          <Label htmlFor="coverLetter">
            Cover Letter <span className="text-destructive">*</span>
          </Label>
          <Textarea
            id="coverLetter"
            {...register("coverLetter")}
            placeholder="Tell us why you're interested in this position and what makes you a great fit..."
            rows={8}
            className={errors.coverLetter ? "border-destructive" : ""}
          />
          {errors.coverLetter && (
            <p className="text-sm text-destructive">{errors.coverLetter.message}</p>
          )}
          <p className="text-xs text-muted-foreground">
            Minimum 100 characters, maximum 2000 characters
          </p>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              reset();
              setResumeFile(null);
            }}
            disabled={isSubmitting}
          >
            Clear Form
          </Button>
          <Button type="submit" disabled={isSubmitting} size="lg">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
};
