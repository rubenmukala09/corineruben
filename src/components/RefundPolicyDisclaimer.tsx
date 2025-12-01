import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Shield } from "lucide-react";

interface RefundPolicyDisclaimerProps {
  onAcknowledge: (acknowledged: boolean) => void;
  type?: 'digital' | 'physical' | 'service' | 'subscription';
}

export function RefundPolicyDisclaimer({ onAcknowledge, type = 'digital' }: RefundPolicyDisclaimerProps) {
  const [acknowledged, setAcknowledged] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChange = (checked: boolean) => {
    setAcknowledged(checked);
    onAcknowledge(checked);
  };

  const getPolicySummary = () => {
    switch (type) {
      case 'digital':
        return "30-day money-back guarantee on all digital products";
      case 'physical':
        return "14-day return window for unused physical products";
      case 'service':
        return "Cancel within 24 hours for full refund";
      case 'subscription':
        return "Cancel anytime - no refund for partial months";
      default:
        return "30-day money-back guarantee";
    }
  };

  const getFullPolicy = () => {
    switch (type) {
      case 'digital':
        return (
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Digital Products Refund Policy:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>30-day money-back guarantee</li>
              <li>Full refund if you're not satisfied</li>
              <li>No questions asked</li>
              <li>Refunds processed within 5-7 business days</li>
            </ul>
          </div>
        );
      case 'physical':
        return (
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Physical Products Return Policy:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>14-day return window from delivery date</li>
              <li>Items must be unused and in original packaging</li>
              <li>Free return shipping for defective items</li>
              <li>Return shipping paid by customer for other returns</li>
              <li>Refunds processed within 5-7 business days after receiving return</li>
            </ul>
          </div>
        );
      case 'service':
        return (
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Service Cancellation Policy:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cancel within 24 hours of booking for full refund</li>
              <li>50% refund for cancellations 24-48 hours before appointment</li>
              <li>No refund for cancellations less than 24 hours before</li>
              <li>Reschedule free up to 48 hours before appointment</li>
            </ul>
          </div>
        );
      case 'subscription':
        return (
          <div className="space-y-2 text-sm">
            <h4 className="font-semibold">Subscription Terms:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Cancel anytime from your account portal</li>
              <li>No refund for partial months</li>
              <li>Pro-rated refunds for annual plans (unused months)</li>
              <li>Access continues until end of billing period</li>
              <li>No cancellation fees</li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4 border border-border rounded-lg p-4 bg-muted/30">
      <div className="flex items-start gap-3">
        <Shield className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-sm">Money-Back Guarantee</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {getPolicySummary()}
            </p>
          </div>

          <Collapsible open={expanded} onOpenChange={setExpanded}>
            <CollapsibleTrigger className="flex items-center gap-2 text-sm text-primary hover:underline">
              View full refund policy
              <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-3">
              <Alert>
                <AlertDescription>
                  {getFullPolicy()}
                </AlertDescription>
              </Alert>
            </CollapsibleContent>
          </Collapsible>

          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              id="refund-policy"
              checked={acknowledged}
              onCheckedChange={handleChange}
            />
            <Label
              htmlFor="refund-policy"
              className="text-sm font-normal cursor-pointer leading-tight"
            >
              I have read and agree to the refund policy
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
