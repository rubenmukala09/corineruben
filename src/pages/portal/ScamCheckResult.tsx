import { useParams, Link } from "react-router-dom";
import { useScamSubmissionById } from "@/hooks/useScamSubmissions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowLeft,
  AlertCircle,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

function getRiskColor(riskLevel: string | null) {
  switch (riskLevel?.toLowerCase()) {
    case "critical":
    case "high":
      return "bg-red-500/20 text-red-600 border-red-500/30";
    case "medium":
      return "bg-yellow-500/20 text-yellow-600 border-yellow-500/30";
    case "low":
      return "bg-green-500/20 text-green-600 border-green-500/30";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getRiskIcon(riskLevel: string | null) {
  switch (riskLevel?.toLowerCase()) {
    case "critical":
    case "high":
      return <ShieldAlert className="w-6 h-6 text-red-500" />;
    case "medium":
      return <AlertTriangle className="w-6 h-6 text-yellow-500" />;
    case "low":
      return <ShieldCheck className="w-6 h-6 text-green-500" />;
    default:
      return <Clock className="w-6 h-6 text-muted-foreground" />;
  }
}

export default function ScamCheckResult() {
  const { id } = useParams<{ id: string }>();
  const {
    data: submission,
    isLoading,
    error,
  } = useScamSubmissionById(id || "");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-violet-500/5 to-purple-500/10 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-violet-500/20 animate-pulse" />
          <p className="text-muted-foreground">Loading analysis results...</p>
        </div>
      </div>
    );
  }

  if (error || !submission) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-violet-500/5 to-purple-500/10 p-6">
        <div className="container max-w-3xl mx-auto">
          <Card className="border-destructive/50">
            <CardContent className="p-8 text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-destructive mb-4" />
              <h2 className="text-xl font-bold mb-2">Analysis Not Found</h2>
              <p className="text-muted-foreground mb-4">
                We couldn't find this scam analysis. It may have been removed or
                the link is invalid.
              </p>
              <Button asChild>
                <Link to="/portal/senior">Return to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isPending = submission.status === "pending" || !submission.analyzed_at;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-violet-500/5 to-purple-500/10 p-6">
      <div className="container max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/portal/senior">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Scam Analysis Results</h1>
            <p className="text-muted-foreground">
              Submitted {format(new Date(submission.created_at), "PPP 'at' p")}
            </p>
          </div>
        </div>

        {isPending ? (
          /* Pending Analysis */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto rounded-full bg-violet-500/20 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-violet-500 animate-pulse" />
                </div>
                <h2 className="text-xl font-bold mb-2">Analysis in Progress</h2>
                <p className="text-muted-foreground mb-4">
                  Our AI is analyzing your submission. This usually takes a few
                  minutes.
                </p>
                <Progress value={33} className="max-w-xs mx-auto" />
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          /* Completed Analysis */
          <>
            {/* Risk Level Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card
                className={`border-2 ${getRiskColor(submission.risk_level)}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-card flex items-center justify-center">
                      {getRiskIcon(submission.risk_level)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-xl font-bold capitalize">
                          {submission.risk_level || "Unknown"} Risk
                        </h2>
                        <Badge className={getRiskColor(submission.risk_level)}>
                          {submission.submission_type}
                        </Badge>
                      </div>
                      {submission.ai_confidence && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>AI Confidence:</span>
                          <Progress
                            value={submission.ai_confidence}
                            className="w-24 h-2"
                          />
                          <span>{submission.ai_confidence}%</span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Analysis Summary */}
            {submission.analysis_summary && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-primary" />
                      Analysis Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      {submission.analysis_summary}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Threats Detected */}
            {submission.threats_detected &&
              submission.threats_detected.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5 text-red-500" />
                        Threats Detected
                      </CardTitle>
                      <CardDescription>
                        Warning signs identified in your submission
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {submission.threats_detected.map((threat, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{threat}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

            {/* Recommendations */}
            {submission.recommendations &&
              submission.recommendations.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="border-green-500/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-5 h-5 text-green-500" />
                        Recommendations
                      </CardTitle>
                      <CardDescription>
                        Steps to protect yourself
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {submission.recommendations.map((rec, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

            {/* Original Submission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Original Submission</CardTitle>
                  <CardDescription>
                    The content you submitted for analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                    {submission.content}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Button asChild variant="outline" className="flex-1">
            <Link to="/portal/senior">Back to Dashboard</Link>
          </Button>
          <Button asChild className="flex-1">
            <Link to="/scam-analysis">Submit Another</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
