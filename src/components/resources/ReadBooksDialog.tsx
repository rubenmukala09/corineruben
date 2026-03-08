import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Loader2, KeyRound, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface ReadBooksDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ReadBooksDialog({ open, onOpenChange }: ReadBooksDialogProps) {
  const [email, setEmail] = useState("");
  const [accessId, setAccessId] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !accessId.trim()) {
      toast.error("Please enter both your email and Access ID.");
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("validate-book-access", {
        body: { email: email.trim(), accessId: accessId.trim().toUpperCase() },
      });

      if (error) throw new Error(error.message);
      if (!data?.valid) {
        toast.error(data?.error || "Invalid credentials.");
        setLoading(false);
        return;
      }

      // Store session in sessionStorage (not persistent)
      sessionStorage.setItem(
        "bookReaderSession",
        JSON.stringify({
          bookIds: data.bookIds,
          customerName: data.customerName,
          email: email.trim(),
        })
      );

      onOpenChange(false);
      navigate("/reader");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Validation failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Read Your Books
          </DialogTitle>
          <DialogDescription>
            Enter the email you used to purchase and your Access ID to start reading.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              Email Address
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <KeyRound className="h-3.5 w-3.5 text-muted-foreground" />
              Access ID
            </label>
            <Input
              type="text"
              placeholder="e.g. A7K9X2M4P1"
              value={accessId}
              onChange={(e) => setAccessId(e.target.value.toUpperCase())}
              required
              maxLength={12}
              className="font-mono tracking-widest text-center text-lg"
            />
            <p className="text-xs text-muted-foreground">
              You received this ID via email after your purchase.
            </p>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                <BookOpen className="h-4 w-4 mr-2" />
                Open My Books
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
