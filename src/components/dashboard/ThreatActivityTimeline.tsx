import { Shield, Mail, Phone, MessageSquare, QrCode, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockThreatActivity = [
  {
    id: 1,
    type: "email",
    title: "Phishing Email Blocked",
    description: "Fake bank notification intercepted",
    time: "2 hours ago",
    severity: "high",
    status: "blocked"
  },
  {
    id: 2,
    type: "sms",
    title: "SMS Scam Detected",
    description: "Package delivery scam from unknown sender",
    time: "5 hours ago",
    severity: "medium",
    status: "blocked"
  },
  {
    id: 3,
    type: "call",
    title: "Suspicious Call Flagged",
    description: "Potential IRS impersonation attempt",
    time: "Yesterday",
    severity: "high",
    status: "warned"
  },
  {
    id: 4,
    type: "qr",
    title: "Malicious QR Blocked",
    description: "Fake parking payment redirect",
    time: "2 days ago",
    severity: "medium",
    status: "blocked"
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case "email": return Mail;
    case "sms": return MessageSquare;
    case "call": return Phone;
    case "qr": return QrCode;
    default: return AlertTriangle;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high": return "text-red-500 bg-red-500/10";
    case "medium": return "text-orange-500 bg-orange-500/10";
    case "low": return "text-yellow-500 bg-yellow-500/10";
    default: return "text-muted-foreground bg-muted";
  }
};

export function ThreatActivityTimeline() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-primary" />
            Recent Threat Activity
          </CardTitle>
          <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            All Clear
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-1">
        {mockThreatActivity.map((threat, index) => {
          const Icon = getIcon(threat.type);
          return (
            <div
              key={threat.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${getSeverityColor(threat.severity)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm truncate">{threat.title}</p>
                  <Badge 
                    variant="secondary" 
                    className={`text-xs shrink-0 ${
                      threat.status === "blocked" 
                        ? "bg-green-500/20 text-green-600" 
                        : "bg-yellow-500/20 text-yellow-600"
                    }`}
                  >
                    {threat.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{threat.description}</p>
                <p className="text-xs text-muted-foreground/60 mt-1">{threat.time}</p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
