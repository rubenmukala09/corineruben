import { useCallback, useState } from "react";
import { UploadCloud, FileText, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  calculateScanCost,
  formatFileSize,
  GUEST_SCAN_PRICING,
  validateGuestScanFile,
} from "@/lib/guestScannerUtils";

interface GuestScanUploadProps {
  file: File | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

export const GuestScanUpload = ({
  file,
  onFileSelect,
  onClear,
}: GuestScanUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFile = useCallback(
    (nextFile: File) => {
      const validation = validateGuestScanFile(nextFile);
      if (!validation.valid) {
        setValidationError(validation.error || "Unsupported file.");
        return;
      }

      setValidationError(null);
      onFileSelect(nextFile);
    },
    [onFileSelect],
  );

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const dropped = event.dataTransfer.files?.[0];
    if (dropped) handleFile(dropped);
  };

  const onBrowse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) handleFile(selected);
  };

  return (
    <Card className="relative overflow-hidden border border-border/60 bg-white/80 backdrop-blur-xl shadow-xl">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />
      <div className="relative p-6 md:p-8">
        <div
          className={`border-2 border-dashed rounded-2xl p-8 md:p-10 transition-all ${
            isDragging
              ? "border-primary bg-primary/5"
              : "border-border/60 bg-background/60"
          }`}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
        >
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <UploadCloud className="w-8 h-8 text-primary" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">
                Drag & drop your file to scan
              </h3>
              <p className="text-muted-foreground">
                PDF, JPG, PNG, MP4, MP3, WAV up to{" "}
                {GUEST_SCAN_PRICING.maxFileSizeMb}MB
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <label className="inline-flex items-center gap-2">
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.mp4,.mp3,.wav,application/pdf,image/jpeg,image/png,video/mp4,audio/mpeg,audio/mp3,audio/wav"
                  className="hidden"
                  onChange={onBrowse}
                />
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold cursor-pointer shadow-md">
                  <UploadCloud className="w-4 h-4" />
                  Browse files
                </span>
              </label>
              <Badge variant="outline" className="text-sm px-3 py-1">
                $0.10 per MB · $0.50 minimum
              </Badge>
            </div>

            {validationError && (
              <p className="text-sm text-destructive">{validationError}</p>
            )}
          </div>
        </div>

        {file && (
          <div className="mt-6 grid gap-4 md:grid-cols-[1.5fr_1fr]">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border border-border/60">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {file.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatFileSize(file.size).formatted}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClear}
                aria-label="Remove file"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <ShieldCheck className="w-4 h-4" />
                Estimated Cost
              </div>
              <div className="mt-2 text-2xl font-bold text-foreground">
                {calculateScanCost(file.size).formatted}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                File size: {calculateScanCost(file.size).sizeMb.toFixed(2)} MB
              </p>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};

export default GuestScanUpload;
