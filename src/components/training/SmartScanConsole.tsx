import { useCallback, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  calculateScanCost,
  formatFileSize,
  getFileTypeLabel,
  GUEST_SCAN_PRICING,
  validateGuestScanFile,
} from "@/lib/guestScannerUtils";
import {
  ArrowUpRight,
  CreditCard,
  FileText,
  Loader2,
  ShieldCheck,
  UploadCloud,
  X,
} from "lucide-react";
import type { GuestScanStatus } from "@/hooks/useGuestScanner";

const ACCEPTED_FILE_TYPES =
  ".pdf,.jpg,.jpeg,.png,.mp4,.mp3,.wav,application/pdf,image/jpeg,image/png,video/mp4,audio/mpeg,audio/mp3,audio/wav,audio/x-wav";

const statusCopy: Record<GuestScanStatus, { label: string; tone: string }> = {
  idle: { label: "Waiting for input", tone: "text-white/50" },
  ready: { label: "File ready for secure checkout", tone: "text-emerald-300" },
  paying: { label: "Secure checkout in progress", tone: "text-sky-300" },
  uploading: { label: "Uploading to secure vault", tone: "text-cyan-300" },
  analyzing: { label: "Running AI threat analysis", tone: "text-amber-300" },
  completed: { label: "Analysis complete", tone: "text-emerald-300" },
  expired: { label: "Results expired", tone: "text-white/50" },
  error: { label: "Scan failed. Try again.", tone: "text-rose-300" },
};

interface SmartScanConsoleProps {
  file: File | null;
  status: GuestScanStatus;
  onFileSelect: (file: File) => void;
  onClearFile: () => void;
  onRequestPayment: () => void;
  onSendText?: (message: string) => void;
}

export const SmartScanConsole = ({
  file,
  status,
  onFileSelect,
  onClearFile,
  onRequestPayment,
  onSendText,
}: SmartScanConsoleProps) => {
  const [input, setInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isProcessing = status === "uploading" || status === "analyzing";
  const canAnalyze = Boolean(file && status === "ready");
  const statusMeta = statusCopy[status] ?? statusCopy.idle;

  const fileMeta = useMemo(() => {
    if (!file) return null;
    const size = formatFileSize(file.size);
    const cost = calculateScanCost(file.size);
    return {
      size,
      cost,
      type: getFileTypeLabel(file),
    };
  }, [file]);

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

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const dropped = event.dataTransfer.files?.[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile],
  );

  const handleBrowse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) handleFile(selected);
    if (event.target) event.target.value = "";
  };

  const handleClearFile = () => {
    setValidationError(null);
    onClearFile();
  };

  const handlePrimaryAction = () => {
    if (isProcessing) return;
    if (file) {
      if (canAnalyze) onRequestPayment();
      return;
    }

    const trimmed = input.trim();
    if (!trimmed) return;
    onSendText?.(trimmed);
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handlePrimaryAction();
    }
  };

  const openFileDialog = () => fileInputRef.current?.click();

  return (
    <div className="relative">
      <div
        className={cn(
          "relative premium-frosted-dark rounded-[28px] border border-white/10 p-4 md:p-6 shadow-[0_35px_80px_rgba(3,8,20,0.55)]",
          isDragging && "ring-2 ring-cyan-300/60",
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_50%),radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.12)_0%,rgba(15,23,42,0)_45%)] pointer-events-none" />

        {isDragging && (
          <div className="absolute inset-3 rounded-[22px] border-2 border-dashed border-cyan-300/70 bg-cyan-400/10 backdrop-blur-sm flex items-center justify-center text-sm font-semibold text-cyan-100 pointer-events-none">
            Drop file to attach for analysis
          </div>
        )}

        <div
          className={cn("relative", file && "md:pr-[300px]")}
          style={{ minHeight: file ? "220px" : "auto" }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-11 w-11 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
                <ShieldCheck className="h-5 w-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/50">
                  Smart Hub
                </p>
                <p className="text-lg font-semibold text-white">
                  Secure Threat Command Console
                </p>
              </div>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <Badge className="bg-white/10 text-white/70 border border-white/10">
                Anonymous Guest Session
              </Badge>
              <Badge className="bg-white/10 text-white/70 border border-white/10">
                10-Minute TTL Auto-Deletion
              </Badge>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-3 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)]">
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={handleKeyDown}
              rows={2}
              placeholder="Ask a question or drop a file for threat analysis..."
              className="w-full resize-none bg-transparent text-base text-white/90 placeholder:text-white/40 focus:outline-none"
              disabled={isProcessing}
            />
          </div>

          {file && fileMeta && (
            <div className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3">
              <div className="h-10 w-10 rounded-xl bg-white/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-white/70" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-white truncate">
                  {file.name}
                </p>
                <p className="text-xs text-white/50">
                  {fileMeta.type} | {fileMeta.size.formatted}
                </p>
              </div>
              <button
                type="button"
                onClick={handleClearFile}
                className="h-9 w-9 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition"
                aria-label="Remove file"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}

          {validationError && (
            <p className="mt-3 text-sm text-rose-200">{validationError}</p>
          )}

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-xs text-white/55">
              <span>
                PDF, JPG, PNG, MP4, MP3, WAV up to{" "}
                {GUEST_SCAN_PRICING.maxFileSizeMb}MB
              </span>
              <span className="hidden sm:inline">|</span>
              <span>
                ${GUEST_SCAN_PRICING.ratePerMb.toFixed(2)}/MB with $
                {GUEST_SCAN_PRICING.minimumCharge.toFixed(2)} minimum
              </span>
            </div>

            <div className="flex items-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept={ACCEPTED_FILE_TYPES}
                onChange={handleBrowse}
              />
              <Button
                type="button"
                variant="outlineLight"
                size="sm"
                className="h-10 px-4 text-white/90 border-white/15 bg-white/5 hover:bg-white/10"
                onClick={openFileDialog}
                disabled={isProcessing}
              >
                <UploadCloud className="h-4 w-4" />
                Browse
              </Button>
              <Button
                type="button"
                size="sm"
                className={cn(
                  "h-10 px-4 text-slate-950 shadow-[0_10px_25px_rgba(8,15,35,0.35)]",
                  file
                    ? "bg-emerald-300 hover:bg-emerald-200"
                    : "bg-white hover:bg-white/90",
                )}
                onClick={handlePrimaryAction}
                disabled={
                  isProcessing ||
                  (file ? !canAnalyze : input.trim().length === 0)
                }
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Scanning...
                  </>
                ) : file ? (
                  <>
                    <ShieldCheck className="h-4 w-4" />
                    Scan & Analyze
                  </>
                ) : (
                  <>
                    <ArrowUpRight className="h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 lg:hidden">
            <Badge className="bg-white/10 text-white/70 border border-white/10">
              Anonymous Guest Session
            </Badge>
            <Badge className="bg-white/10 text-white/70 border border-white/10">
              10-Minute TTL Auto-Deletion
            </Badge>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <span className={cn("status-dot", statusMeta.tone)} />
              <span>{statusMeta.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-3 w-3" />
              <span>Stripe checkout required before analysis.</span>
            </div>
          </div>
        </div>

        {fileMeta && file && (
          <div className="relative mt-4 w-full md:mt-0 md:absolute md:right-4 md:top-4 md:w-[260px]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl shadow-[0_18px_40px_rgba(3,8,20,0.4)]">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-white/50">
                <span>Stripe Preview</span>
                <Badge className="bg-emerald-400/20 text-emerald-100 border border-emerald-300/30">
                  Live
                </Badge>
              </div>
              <div className="mt-3 text-3xl font-semibold text-white">
                {fileMeta.cost.formatted}
              </div>
              <p className="mt-1 text-xs text-white/60">
                Size {fileMeta.cost.sizeMb.toFixed(2)} MB | $
                {GUEST_SCAN_PRICING.ratePerMb.toFixed(2)}/MB min $
                {GUEST_SCAN_PRICING.minimumCharge.toFixed(2)}
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-white/55">
                <ShieldCheck className="h-3 w-3 text-emerald-200" />
                <span>Secure checkout unlocks analysis instantly.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartScanConsole;
