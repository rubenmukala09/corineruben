import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Star,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import type { JobPosition } from "@/config/jobPositions";

interface JobCardProps {
  job: JobPosition;
  onApply: (job: JobPosition) => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`relative rounded-2xl border bg-card/90 backdrop-blur-xl overflow-hidden transition-all duration-500 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.15)] ${
        job.featured
          ? "border-primary/40 shadow-[0_8px_40px_-12px_hsl(var(--primary)/0.25)]"
          : "border-border/50 hover:border-primary/25"
      }`}
    >
      {job.featured && (
        <div className="h-1 w-full bg-gradient-to-r from-primary to-accent absolute top-0 left-0 right-0" />
      )}

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-1.5 leading-tight">{job.title}</h3>
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="outline" className="text-xs">
                <Briefcase className="w-3 h-3 mr-1" />
                {job.department}
              </Badge>
              <Badge variant="outline" className="text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                {job.location}
              </Badge>
              <Badge variant="secondary" className="text-xs">
                <Clock className="w-3 h-3 mr-1" />
                {job.type}
              </Badge>
            </div>
          </div>
          {job.featured && (
            <Badge variant="default" className="gap-1 text-xs flex-shrink-0 ml-2">
              <Star className="w-3 h-3" />
              Hot
            </Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {job.description}
        </p>

        {/* Salary */}
        <div className="flex items-center gap-1 text-primary font-semibold text-sm mb-4">
          <DollarSign className="w-4 h-4" />
          {job.salary}
        </div>

        {/* Expanded details */}
        {expanded && (
          <div className="space-y-4 mb-4 pt-3 border-t border-border/50 animate-in fade-in slide-in-from-top-2 duration-300">
            {/* Responsibilities */}
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-primary" />
                What You'll Do
              </h4>
              <ul className="space-y-1.5">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div>
              <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                Requirements
              </h4>
              <ul className="space-y-1.5">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to have */}
            {job.niceToHave && job.niceToHave.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  Nice to Have
                </h4>
                <ul className="space-y-1.5">
                  {job.niceToHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Role perks */}
            {job.perks && job.perks.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.perks.map((perk, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {perk}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            className="flex-1"
            size="sm"
            onClick={() => onApply(job)}
          >
            Apply Now →
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-xs gap-1 text-muted-foreground"
          >
            {expanded ? (
              <>
                Less <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                Details <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
