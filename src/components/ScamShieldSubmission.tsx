import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Loader2,
  Shield,
  AlertTriangle,
  CheckCircle,
  Upload,
  X,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

const scamSubmissionSchema = z.object({
  submitterName: z.string().min(2, "Name must be at least 2 characters"),
  submitterEmail: z.string().email("Invalid email address"),
  submitterPhone: z.string().optional(),
  submissionType: z.enum([
    "email",
    "text",
    "call",
    "social",
    "website",
    "other",
  ]),
  suspiciousContent: z.string().min(10, "Please provide more details"),
  senderInfo: z.string().optional(),
  urgency: z.enum(["low", "medium", "high", "emergency"]),
});

type ScamSubmissionData = z.infer<typeof scamSubmissionSchema>;

interface ScamShieldSubmissionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface AnalysisResult {
  riskLevel: "low" | "medium" | "high" | "critical";
  confidence: number;
  threats: string[];
  recommendations: string[];
  summary: string;
}

export const ScamShieldSubmission = ({
  open,
  onOpenChange,
}: ScamShieldSubmissionProps) => {
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null,
  );
  const [attachments, setAttachments] = useState<File[]>([]);

  const form = useForm<ScamSubmissionData>({
    resolver: zodResolver(scamSubmissionSchema),
    defaultValues: {
      submitterName: "",
      submitterEmail: "",
      submitterPhone: "",
      submissionType: "email",
      suspiciousContent: "",
      senderInfo: "",
      urgency: "medium",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((f) => f.size <= 10 * 1024 * 1024); // 10MB limit

    if (validFiles.length !== files.length) {
      toast({
        title: "Some files were too large",
        description: "Maximum file size is 10MB per file",
        variant: "destructive",
      });
    }

    setAttachments((prev) => [...prev, ...validFiles].slice(0, 5)); // Max 5 files
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const analyzeWithAI = async (
    content: string,
    type: string,
  ): Promise<AnalysisResult> => {
    const { data, error } = await supabase.functions.invoke("analyze-scam", {
      body: {
        content,
        type,
        timestamp: new Date().toISOString(),
      },
    });

    if (error) throw error;
    return data;
  };

  const handleSubmit = async (data: ScamSubmissionData) => {
    setIsAnalyzing(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // Analyze content with AI
      const analysis = await analyzeWithAI(
        data.suspiciousContent,
        data.submissionType,
      );
      setAnalysisResult(analysis);

      // Upload attachments if any
      const attachmentUrls: string[] = [];
      if (attachments.length > 0 && user) {
        for (const file of attachments) {
          const fileExt = file.name.split(".").pop();
          const fileName = `${user.id}/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from("scam-submissions")
            .upload(fileName, file);

          if (!uploadError) {
            attachmentUrls.push(fileName);
          }
        }
      }

      // Save submission to database
      const submissionNumber = `SCAM-${Date.now().toString().slice(-8)}`;
      const { error: dbError } = await supabase
        .from("scam_submissions")
        .insert({
          submission_number: submissionNumber,
          user_id: user?.id,
          submitter_name: data.submitterName,
          submitter_email: data.submitterEmail,
          submitter_phone: data.submitterPhone,
          submission_type: data.submissionType,
          suspicious_content: data.suspiciousContent,
          sender_info: data.senderInfo,
          urgency: data.urgency,
          risk_level: analysis.riskLevel,
          ai_confidence: analysis.confidence,
          threats_detected: analysis.threats,
          recommendations: analysis.recommendations,
          analysis_summary: analysis.summary,
          attachments: attachmentUrls,
          status: "analyzed",
        });

      if (dbError) throw dbError;

      toast({
        title: "Analysis Complete!",
        description: `Submission ${submissionNumber} has been analyzed. Check your email for the full report.`,
      });

      // Track analytics
      const { trackFormSubmit, trackConversion } =
        await import("@/utils/analyticsTracker");
      trackFormSubmit("scam_submission", {
        type: data.submissionType,
        riskLevel: analysis.riskLevel,
        urgency: data.urgency,
      });
      trackConversion("scam_analysis", 0);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Please try again or contact support";
      console.error("Submission error:", error);
      toast({
        title: "Submission Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "text-red-600 bg-red-100 border-red-300";
      case "high":
        return "text-orange-600 bg-orange-100 border-orange-300";
      case "medium":
        return "text-yellow-600 bg-yellow-100 border-yellow-300";
      case "low":
        return "text-green-600 bg-green-100 border-green-300";
      default:
        return "text-muted-foreground bg-muted border-border";
    }
  };

  const handleClose = () => {
    form.reset();
    setAnalysisResult(null);
    setAttachments([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold">
                ScamShield Analysis
              </DialogTitle>
              <DialogDescription>
                Submit suspicious content for AI-powered threat detection
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {!analysisResult ? (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-6"
            >
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Never click suspicious links or download unknown attachments.
                  Forward the content here for safe analysis.
                </AlertDescription>
              </Alert>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="submitterName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Name *</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Your full name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="submitterEmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your Email *</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="Your email address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="submissionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type of Suspicious Contact *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="email">Email</SelectItem>
                          <SelectItem value="text">Text/SMS</SelectItem>
                          <SelectItem value="call">Phone Call</SelectItem>
                          <SelectItem value="social">
                            Social Media Message
                          </SelectItem>
                          <SelectItem value="website">
                            Suspicious Website
                          </SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Urgency Level *</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select urgency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">
                            Low - Just checking
                          </SelectItem>
                          <SelectItem value="medium">
                            Medium - Suspicious
                          </SelectItem>
                          <SelectItem value="high">
                            High - Likely scam
                          </SelectItem>
                          <SelectItem value="emergency">
                            Emergency - Need immediate help
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="senderInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sender Information (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Phone number, email, or account name"
                      />
                    </FormControl>
                    <FormDescription>
                      Any information about who contacted you
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="suspiciousContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Suspicious Content *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Paste the full message, email content, or describe the phone call..."
                        rows={6}
                        className="font-mono text-sm"
                      />
                    </FormControl>
                    <FormDescription>
                      Copy and paste the entire message exactly as received
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <FormLabel>Attachments (Optional)</FormLabel>
                <div className="flex items-center gap-3">
                  <Input
                    type="file"
                    multiple
                    accept=".jpg,.jpeg,.png,.pdf,.eml,.msg"
                    onChange={handleFileChange}
                    disabled={attachments.length >= 5}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                  />
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </div>
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    {attachments.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-2 bg-muted rounded-lg"
                      >
                        <span className="text-sm truncate flex-1">
                          {file.name}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground">
                  Screenshots, forwarded emails, or other evidence (Max 5 files,
                  10MB each)
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isAnalyzing}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isAnalyzing} className="flex-1">
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing with AI...
                    </>
                  ) : (
                    <>
                      <Shield className="mr-2 h-4 w-4" />
                      Analyze Threat
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="space-y-6">
            <Alert
              className={`border-2 ${getRiskColor(analysisResult.riskLevel)}`}
            >
              <div className="flex items-start gap-3">
                {analysisResult.riskLevel === "critical" ||
                analysisResult.riskLevel === "high" ? (
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">
                      Risk Level: {analysisResult.riskLevel.toUpperCase()}
                    </h3>
                    <Badge variant="outline">
                      {Math.round(analysisResult.confidence * 100)}% Confidence
                    </Badge>
                  </div>
                  <p className="text-sm">{analysisResult.summary}</p>
                </div>
              </div>
            </Alert>

            {analysisResult.threats.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive" />
                  Threats Detected:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {analysisResult.threats.map((threat, idx) => (
                    <li key={idx} className="text-muted-foreground">
                      {threat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {analysisResult.recommendations.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Recommendations:
                </h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  {analysisResult.recommendations.map((rec, idx) => (
                    <li key={idx} className="text-muted-foreground">
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                A detailed report has been sent to your email. Our team will
                follow up within 24 hours if needed.
              </AlertDescription>
            </Alert>

            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
