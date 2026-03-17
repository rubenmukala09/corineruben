import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Send, CheckCircle, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TranslationRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const LANGUAGES = [
  "Spanish",
  "French",
  "German",
  "Chinese (Simplified)",
  "Chinese (Traditional)",
  "Portuguese",
  "Arabic",
  "Japanese",
  "Korean",
  "Italian",
  "Russian",
  "Hindi",
  "Other",
];

export const TranslationRequestDialog = ({
  isOpen,
  onClose,
}: TranslationRequestDialogProps) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("");
  const [bookTitle, setBookTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !language) return;

    setIsSubmitting(true);
    try {
      // Send notification to admin via contact edge function
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: fullName,
          email: email,
          phone: "",
          interest: "Book Translation Request",
          message: `Language: ${language}\nBook: ${bookTitle || "Any available"}\nNotes: ${notes || "None"}`,
          hearAbout: "resources-page",
          contactMethod: "email",
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      toast.success("Translation request sent! We'll respond within 1-3 business days.");

      setTimeout(() => {
        setIsSubmitted(false);
        setFullName("");
        setEmail("");
        setLanguage("");
        setBookTitle("");
        setNotes("");
        onClose();
      }, 2500);
    } catch (error) {
      console.error("Translation request error:", error);
      toast.error("Failed to send request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="h-1.5 bg-gradient-to-r from-primary via-accent to-primary" />
        <div className="p-6">
          <DialogTitle className="text-xl font-black flex items-center gap-2 mb-1">
            <Globe className="w-5 h-5 text-primary" />
            Request a Translation
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mb-5">
            We'll prepare your book in your preferred language within 1-3
            business days.
          </DialogDescription>

          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-lg font-bold mb-2">Request Sent!</h3>
              <p className="text-sm text-muted-foreground">
                We'll email you when your translation is ready.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label className="text-sm font-semibold">
                  Full Name <span className="text-primary">*</span>
                </Label>
                <Input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="mt-1 h-11 rounded-xl bg-background/50 border-border/50"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold">
                  Email <span className="text-primary">*</span>
                </Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="mt-1 h-11 rounded-xl bg-background/50 border-border/50"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold">
                  Language <span className="text-primary">*</span>
                </Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="mt-1 h-11 rounded-xl bg-background/50 border-border/50">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-semibold">
                  Book Title{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Input
                  value={bookTitle}
                  onChange={(e) => setBookTitle(e.target.value)}
                  placeholder="Specific book or 'All available'"
                  className="mt-1 h-11 rounded-xl bg-background/50 border-border/50"
                />
              </div>

              <div>
                <Label className="text-sm font-semibold">
                  Additional Notes{" "}
                  <span className="text-muted-foreground text-xs">
                    (optional)
                  </span>
                </Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any special requests..."
                  rows={2}
                  className="mt-1 rounded-xl bg-background/50 border-border/50 resize-none"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-12"
                disabled={isSubmitting || !fullName || !email || !language}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
