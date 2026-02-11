import { useCallback, useMemo, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import {
  buildReportText,
  calculateScanCost,
  GuestScanAnalysis,
} from "@/lib/guestScannerUtils";
import { toast } from "sonner";

export type GuestScanStatus =
  | "idle"
  | "ready"
  | "paying"
  | "uploading"
  | "analyzing"
  | "completed"
  | "expired"
  | "error";

interface StartScanPayload {
  scanId: string;
  filePath: string;
}

const ANALYSIS_TIMEOUT_MS = 120000;

export const useGuestScanner = () => {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<GuestScanAnalysis | null>(null);
  const [status, setStatus] = useState<GuestScanStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);
  const [scanId, setScanId] = useState<string | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  const cost = useMemo(() => {
    if (!file) return 0;
    return calculateScanCost(file.size).cost;
  }, [file]);

  const resetProgressTimer = () => {
    if (progressTimerRef.current) {
      window.clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
  };

  const startProgress = (start: number, cap: number) => {
    resetProgressTimer();
    setProgress(start);
    progressTimerRef.current = window.setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 6;
        if (next >= cap) return cap;
        return next;
      });
    }, 900);
  };

  const clearFile = useCallback(() => {
    setFile(null);
    setAnalysis(null);
    setError(null);
    setStatus("idle");
    setProgress(0);
    setExpiresAt(null);
    setScanId(null);
  }, []);

  const prepareFile = useCallback((nextFile: File) => {
    setFile(nextFile);
    setAnalysis(null);
    setError(null);
    setStatus("ready");
    setProgress(0);
    setExpiresAt(null);
    setScanId(null);
  }, []);

  const startScan = useCallback(
    async ({ scanId, filePath }: StartScanPayload) => {
      if (!file) return;

      setStatus("uploading");
      setError(null);
      startProgress(10, 35);

      try {
        const { error: uploadError } = await supabase.storage
          .from("guest-scans")
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type || undefined,
          });

        if (uploadError) throw uploadError;

        setStatus("analyzing");
        startProgress(40, 90);

        const analysisResponse = await Promise.race([
          supabase.functions.invoke("analyze-file", {
            body: { scanId },
          }),
          new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Analysis timed out.")), ANALYSIS_TIMEOUT_MS)
          ),
        ]);

        const { data, error: fnError } = analysisResponse as {
          data: any;
          error: any;
        };

        if (fnError) throw fnError;
        if (!data?.analysis) throw new Error("No analysis results returned.");

        setAnalysis(data.analysis);
        setExpiresAt(data.expiresAt ? new Date(data.expiresAt) : new Date(Date.now() + 10 * 60 * 1000));
        setScanId(scanId);
        setStatus("completed");
        setProgress(100);
        resetProgressTimer();
      } catch (err: any) {
        const message = err?.message || "Scan failed. Please try again.";
        setStatus("error");
        setError(message);
        resetProgressTimer();
        toast.error(message);
      }
    },
    [file]
  );

  const markExpired = useCallback(() => {
    setStatus("expired");
    toast("Your data has been permanently deleted.");
  }, []);

  const restartScan = useCallback(() => {
    setAnalysis(null);
    setError(null);
    setStatus(file ? "ready" : "idle");
    setProgress(0);
    setExpiresAt(null);
    setScanId(null);
  }, [file]);

  const buildReport = useCallback(() => {
    if (!analysis || !file) return "";
    return buildReportText(analysis, file, new Date().toLocaleString());
  }, [analysis, file]);

  return {
    file,
    cost,
    analysis,
    status,
    error,
    progress,
    expiresAt,
    scanId,
    prepareFile,
    clearFile,
    startScan,
    restartScan,
    markExpired,
    buildReport,
    setStatus,
  };
};

export default useGuestScanner;
