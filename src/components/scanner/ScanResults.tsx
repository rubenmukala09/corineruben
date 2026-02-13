import { useMemo } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldAlert,
  ShieldCheck,
  Copy,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AutoDeleteTimer } from "@/components/scanner/AutoDeleteTimer";
import {
  GuestScanAnalysis,
  buildReportText,
  formatFileSize,
  getFileTypeLabel,
} from "@/lib/guestScannerUtils";
import { toast } from "sonner";

interface ScanResultsProps {
  analysis: GuestScanAnalysis;
  file: File;
  expiresAt: Date | string;
  onExpired: () => void;
  onRestart: () => void;
}

const threatConfig = {
  safe: {
    icon: CheckCircle2,
    label: "Safe",
    color: "text-emerald-600",
    badge: "bg-emerald-500/10 text-emerald-700 border-emerald-200",
    panel: "border-emerald-200 bg-emerald-50/60",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    color: "text-amber-600",
    badge: "bg-amber-500/10 text-amber-700 border-amber-200",
    panel: "border-amber-200 bg-amber-50/60",
  },
  danger: {
    icon: ShieldAlert,
    label: "Danger",
    color: "text-rose-600",
    badge: "bg-rose-500/10 text-rose-700 border-rose-200",
    panel: "border-rose-200 bg-rose-50/60",
  },
};

export const ScanResults = ({
  analysis,
  file,
  expiresAt,
  onExpired,
  onRestart,
}: ScanResultsProps) => {
  const config = threatConfig[analysis.threatLevel];
  const ThreatIcon = config.icon;

  const reportText = useMemo(
    () => buildReportText(analysis, file, new Date().toLocaleString()),
    [analysis, file],
  );

  const downloadReport = () => {
    const reportHtml = `
      <html>
        <head>
          <title>InVision Network Scan Report</title>
          <style>
            body { font-family: "Rubik", Arial, sans-serif; padding: 32px; color: #0f172a; }
            h1 { font-size: 24px; margin-bottom: 8px; }
            h2 { font-size: 18px; margin-top: 24px; }
            .meta { font-size: 14px; color: #475569; }
            ul { padding-left: 20px; }
            .badge { display: inline-block; padding: 6px 12px; border-radius: 999px; background: #e2e8f0; }
          </style>
        </head>
        <body>
          <h1>InVision Network Guest Scan Report</h1>
          <div class="meta">Generated ${new Date().toLocaleString()}</div>
          <p><strong>File:</strong> ${file.name}</p>
          <p><strong>Type:</strong> ${getFileTypeLabel(file)}</p>
          <p><strong>Size:</strong> ${formatFileSize(file.size).formatted}</p>
          <p><strong>Threat Level:</strong> ${analysis.threatLevel.toUpperCase()}</p>
          <p><strong>Confidence:</strong> ${Math.round(analysis.confidence * 100)}%</p>
          <h2>Summary</h2>
          <p>${analysis.summary}</p>
          <h2>Findings</h2>
          <ul>${analysis.findings.map((item) => `<li>${item}</li>`).join("")}</ul>
          <h2>Recommendations</h2>
          <ul>${analysis.recommendations.map((item) => `<li>${item}</li>`).join("")}</ul>
          ${
            analysis.indicators.suspiciousLinks.length
              ? `<h2>Suspicious Links</h2><ul>${analysis.indicators.suspiciousLinks
                  .map((link) => `<li>${link}</li>`)
                  .join("")}</ul>`
              : ""
          }
        </body>
      </html>
    `;

    const reportWindow = window.open("", "_blank");
    if (reportWindow) {
      reportWindow.document.open();
      reportWindow.document.write(reportHtml);
      reportWindow.document.close();
      reportWindow.focus();
      reportWindow.print();
      return;
    }

    const blob = new Blob([reportText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "invision-guest-scan-report.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(reportText);
      toast.success("Results copied to clipboard.");
    } catch {
      toast.error("Unable to copy results. Please try again.");
    }
  };

  return (
    <Card className="border border-border/60 bg-white/90 backdrop-blur-xl shadow-xl">
      <div className="p-6 md:p-8 space-y-6">
        <div className={`rounded-2xl border p-5 ${config.panel}`}>
          <div className="flex flex-wrap items-start gap-4 justify-between">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/80 flex items-center justify-center border border-border/60">
                <ThreatIcon className={`w-6 h-6 ${config.color}`} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">
                  Threat Level: {config.label}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {analysis.summary}
                </p>
              </div>
            </div>
            <Badge variant="outline" className={`${config.badge} text-sm`}>
              {Math.round(analysis.confidence * 100)}% Confidence
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <FileText className="w-4 h-4 text-primary" />
            <span>{file.name}</span>
            <span>•</span>
            <span>{formatFileSize(file.size).formatted}</span>
          </div>
          <AutoDeleteTimer expiresAt={expiresAt} onExpire={onExpired} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldCheck className="w-4 h-4 text-primary" />
              Findings
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {analysis.findings.length ? (
                analysis.findings.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))
              ) : (
                <li>• No immediate threats detected.</li>
              )}
            </ul>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldAlert className="w-4 h-4 text-primary" />
              Recommendations
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {analysis.recommendations.map((item, index) => (
                <li key={index}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {analysis.indicators.phishing.length > 0 && (
            <div className="rounded-2xl border border-border/60 p-4 bg-muted/40">
              <p className="text-sm font-semibold text-foreground mb-2">
                Phishing Indicators
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {analysis.indicators.phishing.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.indicators.malware.length > 0 && (
            <div className="rounded-2xl border border-border/60 p-4 bg-muted/40">
              <p className="text-sm font-semibold text-foreground mb-2">
                Malware Signals
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {analysis.indicators.malware.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.indicators.deepfake.length > 0 && (
            <div className="rounded-2xl border border-border/60 p-4 bg-muted/40">
              <p className="text-sm font-semibold text-foreground mb-2">
                Deepfake Indicators
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {analysis.indicators.deepfake.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          )}

          {analysis.indicators.voiceClone.length > 0 && (
            <div className="rounded-2xl border border-border/60 p-4 bg-muted/40">
              <p className="text-sm font-semibold text-foreground mb-2">
                Voice Clone Indicators
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {analysis.indicators.voiceClone.map((item, index) => (
                  <li key={index}>• {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {analysis.indicators.suspiciousLinks.length > 0 && (
          <div className="rounded-2xl border border-border/60 p-4 bg-muted/40">
            <p className="text-sm font-semibold text-foreground mb-2">
              Suspicious Links
            </p>
            <ul className="space-y-1 text-sm text-muted-foreground">
              {analysis.indicators.suspiciousLinks.map((link, index) => (
                <li key={index}>{link}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-col md:flex-row gap-3">
          <Button size="lg" className="flex-1" onClick={downloadReport}>
            <Download className="w-4 h-4 mr-2" />
            Download Report (PDF)
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex-1"
            onClick={copyReport}
          >
            <Copy className="w-4 h-4 mr-2" />
            Copy Results
          </Button>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div className="space-y-1">
            <p>Results available for 10 minutes. Download or copy now.</p>
            <p className="text-xs text-muted-foreground">
              Closing this tab will permanently delete your results.
            </p>
          </div>
          <Button variant="ghost" onClick={onRestart} className="text-primary">
            Run another scan
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ScanResults;
