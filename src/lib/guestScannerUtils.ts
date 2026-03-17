export const GUEST_SCAN_PRICING = {
  ratePerMb: 0.1,
  minimumCharge: 0.5,
  maxFileSizeMb: 500,
};

const MB = 1024 * 1024;

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "video/mp4",
  "audio/mpeg",
  "audio/mp3",
  "audio/wav",
  "audio/x-wav",
];

const ALLOWED_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".mp4",
  ".mp3",
  ".wav",
];

export const getFileExtension = (fileName: string) =>
  fileName.slice(Math.max(0, fileName.lastIndexOf("."))).toLowerCase();

export const sanitizeFileName = (fileName: string) =>
  fileName
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_")
    .slice(0, 120);

const roundUpToCents = (value: number) => Math.ceil(value * 100) / 100;

export const formatFileSize = (bytes: number) => {
  const sizeMb = bytes / MB;
  return {
    sizeMb,
    formatted: `${sizeMb.toFixed(2)} MB`,
  };
};

export const calculateScanCost = (bytes: number) => {
  const { sizeMb } = formatFileSize(bytes);
  const rawCost = sizeMb * GUEST_SCAN_PRICING.ratePerMb;
  const cost = Math.max(
    GUEST_SCAN_PRICING.minimumCharge,
    roundUpToCents(rawCost),
  );
  return {
    sizeMb,
    cost,
    formatted: `$${cost.toFixed(2)}`,
  };
};

export const validateGuestScanFile = (file: File) => {
  if (file.size > GUEST_SCAN_PRICING.maxFileSizeMb * MB) {
    return {
      valid: false,
      error: `File exceeds ${GUEST_SCAN_PRICING.maxFileSizeMb}MB limit.`,
    };
  }

  const extension = getFileExtension(file.name);
  const mimeType = (file.type || "").toLowerCase();

  if (
    ALLOWED_MIME_TYPES.includes(mimeType) ||
    ALLOWED_EXTENSIONS.includes(extension)
  ) {
    return { valid: true };
  }

  return {
    valid: false,
    error:
      "Unsupported file type. Please upload PDF, JPG, PNG, MP4, MP3, or WAV.",
  };
};

export const getFileTypeLabel = (file: File) => {
  if (file.type) return file.type;
  const extension = getFileExtension(file.name);
  return extension ? extension.replace(".", "").toUpperCase() : "Unknown";
};

export interface GuestScanAnalysis {
  threatLevel: "safe" | "warning" | "danger";
  confidence: number;
  summary: string;
  findings: string[];
  recommendations: string[];
  indicators: {
    phishing: string[];
    malware: string[];
    deepfake: string[];
    voiceClone: string[];
    suspiciousLinks: string[];
  };
}

export const buildReportText = (
  analysis: GuestScanAnalysis,
  file: File,
  scannedAt: string,
) => {
  const { formatted } = formatFileSize(file.size);
  const lines = [
    "InVision Network - Guest Scan Report",
    "-----------------------------------",
    `File: ${file.name}`,
    `Type: ${getFileTypeLabel(file)}`,
    `Size: ${formatted}`,
    `Scanned At: ${scannedAt}`,
    "",
    `Threat Level: ${analysis.threatLevel.toUpperCase()}`,
    `Confidence: ${Math.round(analysis.confidence * 100)}%`,
    "",
    "Summary:",
    analysis.summary,
    "",
    "Findings:",
    ...analysis.findings.map((item) => `- ${item}`),
    "",
    "Recommendations:",
    ...analysis.recommendations.map((item) => `- ${item}`),
  ];

  if (analysis.indicators.suspiciousLinks.length > 0) {
    lines.push("", "Suspicious Links:");
    lines.push(
      ...analysis.indicators.suspiciousLinks.map((link) => `- ${link}`),
    );
  }

  return lines.join("\n");
};
