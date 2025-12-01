import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, CheckCircle, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface VeteranIdUploadProps {
  isVeteran: boolean;
  onFileUpload: (file: File | null) => void;
  uploadedFile?: File | null;
}

export function VeteranIdUpload({ isVeteran, onFileUpload, uploadedFile }: VeteranIdUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File too large. Maximum size is 5MB.");
        return;
      }

      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error("Invalid file type. Please upload JPG, PNG, or PDF.");
        return;
      }

      onFileUpload(file);

      // Create preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }

      toast.success("ID uploaded successfully");
    }
  };

  const handleRemove = () => {
    onFileUpload(null);
    setPreview(null);
  };

  if (!isVeteran) return null;

  return (
    <div className="space-y-4">
      <Alert className="bg-primary/5 border-primary/20">
        <CheckCircle className="h-4 w-4 text-primary" />
        <AlertDescription>
          <strong>Veteran Verification Required:</strong> Please upload a photo of your military/veteran ID, VA card, or DD-214 for verification. This helps us confirm your 10% discount eligibility.
        </AlertDescription>
      </Alert>

      <div className="space-y-2">
        <Label htmlFor="veteranId" className="text-base font-semibold">
          Upload Veteran ID *
        </Label>
        <p className="text-sm text-muted-foreground mb-2">
          Accepted formats: JPG, PNG, PDF (Max 5MB)
        </p>
        
        {!uploadedFile ? (
          <div className="relative">
            <Input
              id="veteranId"
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
              className="cursor-pointer file:cursor-pointer"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Camera className="w-5 h-5" />
                <Upload className="w-5 h-5" />
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-border rounded-lg p-4 bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-success" />
                <div>
                  <p className="font-medium text-sm">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemove}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="ID Preview"
                  className="max-h-32 rounded border border-border object-contain"
                />
              </div>
            )}
          </div>
        )}

        <p className="text-xs text-muted-foreground">
          🔒 Your ID is encrypted and stored securely. Only used for verification purposes.
        </p>
      </div>
    </div>
  );
}
