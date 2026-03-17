import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquarePlus, Loader2, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface RequestBookDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  customerName: string;
}

export function RequestBookDialog({ open, onOpenChange, email, customerName }: RequestBookDialogProps) {
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) {
      toast.error("Please enter a book topic.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from("book_requests").insert({
        email,
        customer_name: customerName,
        topic: topic.trim().slice(0, 200),
        description: description.trim().slice(0, 1000),
      });
      if (error) throw error;

      toast.success("Thank you! Your book suggestion has been submitted.");
      setTopic("");
      setDescription("");
      onOpenChange(false);
    } catch {
      toast.error("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageSquarePlus className="h-5 w-5 text-primary" />
            Suggest a Book
          </DialogTitle>
          <DialogDescription>
            Tell us what topic you'd like us to cover next. We read every suggestion!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Topic / Title Idea</label>
            <Input
              placeholder="e.g. Cryptocurrency Wallet Safety"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              maxLength={200}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Brief Description (optional)</label>
            <Textarea
              placeholder="What should the book cover? Any specific areas you'd like addressed?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={1000}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Submit Suggestion
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
