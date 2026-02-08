import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  calculateScanCost,
  formatFileSize,
  GUEST_SCAN_PRICING,
  validateGuestScanFile,
} from "@/lib/guestScannerUtils";
import { cn } from "@/lib/utils";
import {
  Check,
  Folder,
  Globe,
  Loader2,
  Paperclip,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import type { GuestScanStatus } from "@/hooks/useGuestScanner";

const ACCEPTED_FILE_TYPES =
  ".pdf,.jpg,.jpeg,.png,.mp4,.mp3,.wav,application/pdf,image/jpeg,image/png,video/mp4,audio/mpeg,audio/mp3,audio/wav,audio/x-wav";

interface SmartCommandCenterProps {
  file: File | null;
  status: GuestScanStatus;
  onFileSelect: (file: File) => void;
  onClearFile: () => void;
  onRequestPayment: () => void;
  onSendText?: (message: string) => void;
}

export const SmartCommandCenter = ({
  file,
  status,
  onFileSelect,
  onClearFile,
  onRequestPayment,
  onSendText,
}: SmartCommandCenterProps) => {
  const [input, setInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isProcessing = status === "uploading" || status === "analyzing";
  const isPaying = status === "paying";
  const isBusy = isProcessing || isPaying;
  const canAnalyze = Boolean(file && status === "ready");
  const hasText = input.trim().length > 0;

  const fileMeta = useMemo(() => {
    if (!file) return null;
    const size = formatFileSize(file.size);
    const cost = calculateScanCost(file.size);
    return {
      size,
      cost,
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
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setIsDragging(false);
      const dropped = event.dataTransfer.files?.[0];
      if (dropped) handleFile(dropped);
    },
    [handleFile]
  );

  useEffect(() => {
    const handleWindowDragOver = (event: DragEvent) => {
      if (event.dataTransfer?.types?.includes("Files")) {
        setIsDragging(true);
      }
    };
    const handleWindowDragLeave = (event: DragEvent) => {
      if (event.relatedTarget === null) {
        setIsDragging(false);
      }
    };
    const handleWindowDrop = () => setIsDragging(false);

    window.addEventListener("dragover", handleWindowDragOver);
    window.addEventListener("dragleave", handleWindowDragLeave);
    window.addEventListener("drop", handleWindowDrop);
    window.addEventListener("dragend", handleWindowDrop);

    return () => {
      window.removeEventListener("dragover", handleWindowDragOver);
      window.removeEventListener("dragleave", handleWindowDragLeave);
      window.removeEventListener("drop", handleWindowDrop);
      window.removeEventListener("dragend", handleWindowDrop);
    };
  }, []);

  const handleBrowse = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files?.[0];
    if (selected) handleFile(selected);
    if (event.target) event.target.value = "";
  };

  const handlePrimaryAction = () => {
    if (isBusy) return;
    if (file) {
      if (canAnalyze) onRequestPayment();
      return;
    }
    if (!hasText) return;
    onSendText?.(input.trim());
    setInput("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handlePrimaryAction();
    }
  };

  const openFileDialog = () => fileInputRef.current?.click();

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "relative w-full max-w-[600px] rounded-2xl border border-white/10 bg-[#121212] shadow-[0_20px_50px_rgba(0,0,0,0.3)]",
          "h-16 sm:h-20 px-4 py-2 sm:px-5 sm:py-3",
          "flex flex-col justify-between",
          isDragging && "ring-2 ring-[#4ADE80] shadow-[0_0_18px_rgba(74,222,128,0.45)]"
        )}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
      >
        <div className="flex items-center gap-2 min-w-0">
          {file && fileMeta && (
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 text-[12px] font-medium text-[#121212] max-w-[280px]">
              <span className="truncate">{file.name}</span>
              <span className="text-[#121212]/60">•</span>
              <span className="whitespace-nowrap">{fileMeta.cost.formatted}</span>
              <button
                type="button"
                onClick={onClearFile}
                className="ml-1 rounded-full p-0.5 text-[#121212]/60 hover:text-[#121212]"
                aria-label="Remove file"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-sm text-white/90 placeholder:text-[#666666] focus:outline-none"
            placeholder="Drop file to scan or type a message..."
            disabled={isBusy}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-white/60 hover:text-white transition"
              onClick={openFileDialog}
              aria-label="Attach file"
              disabled={isBusy}
            >
              <Paperclip className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              className="text-white/60 hover:text-white transition"
              aria-label="Browse"
              onClick={openFileDialog}
              disabled={isBusy}
            >
              <Folder className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              className="text-white/60 hover:text-white transition"
              aria-label="Web"
              disabled={isBusy}
            >
              <Globe className="h-[18px] w-[18px]" />
            </button>
            <button
              type="button"
              className="text-white/60 hover:text-white transition"
              aria-label="Settings"
              disabled={isBusy}
            >
              <Settings className="h-[18px] w-[18px]" />
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrimaryAction}
            disabled={isBusy || (file ? !canAnalyze : !hasText)}
            className={cn(
              "h-9 w-9 rounded-full bg-[#4ADE80] text-[#121212] flex items-center justify-center",
              "shadow-[0_0_18px_rgba(74,222,128,0.55)] transition-transform",
              "disabled:opacity-60 disabled:cursor-not-allowed"
            )}
            aria-label={file ? "Scan file" : "Send message"}
          >
            {isBusy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : file ? (
              <ShieldCheck className="h-4 w-4" />
            ) : (
              <Check className="h-4 w-4" />
            )}
          </button>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={ACCEPTED_FILE_TYPES}
          onChange={handleBrowse}
        />
      </div>

      <p className="mt-3 text-[14px] text-[#555555] tracking-[0.5px] text-center">
        Anonymous Scan • ${GUEST_SCAN_PRICING.minimumCharge.toFixed(2)} Minimum • Auto-deleted in 10m
      </p>

      {validationError && (
        <p className="mt-2 text-xs text-rose-600">{validationError}</p>
      )}
    </div>
  );
};

export default SmartCommandCenter;
