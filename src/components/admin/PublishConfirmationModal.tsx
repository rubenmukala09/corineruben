import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, Calendar, Globe } from "lucide-react";

interface PublishConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  article: {
    title: string;
    status: "draft" | "scheduled" | "published";
    visibility: "public" | "password" | "private";
    scheduledDate?: string;
    categories: string[];
    tags: string[];
  };
}

export function PublishConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  article,
}: PublishConfirmationModalProps) {
  const isScheduled = article.status === "scheduled";
  const isUpdate = article.status === "published";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {isUpdate ? (
              <>
                <CheckCircle className="h-6 w-6 text-blue-500" />
                Update Article?
              </>
            ) : isScheduled ? (
              <>
                <Calendar className="h-6 w-6 text-yellow-500" />
                Schedule Article?
              </>
            ) : (
              <>
                <Globe className="h-6 w-6 text-green-500" />
                Publish Article?
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            {isUpdate
              ? "Your changes will be published immediately."
              : isScheduled
              ? "Your article will be published at the scheduled time."
              : "Your article will be published immediately and visible to everyone."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Article Info */}
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg line-clamp-2">
                {article.title}
              </h3>
            </div>

            {/* Status & Visibility */}
            <div className="flex items-center gap-3">
              <Badge
                variant={
                  article.status === "published"
                    ? "default"
                    : article.status === "scheduled"
                    ? "secondary"
                    : "outline"
                }
              >
                {article.status === "published"
                  ? "Published"
                  : article.status === "scheduled"
                  ? "Scheduled"
                  : "Draft"}
              </Badge>

              <Badge variant="outline">
                {article.visibility === "public"
                  ? "Public"
                  : article.visibility === "password"
                  ? "Password Protected"
                  : "Private"}
              </Badge>
            </div>

            {/* Scheduled Date */}
            {isScheduled && article.scheduledDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-yellow-50 p-3 rounded-lg">
                <Calendar className="h-4 w-4" />
                <span>
                  Will publish on{" "}
                  {new Date(article.scheduledDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            )}

            {/* Categories */}
            {article.categories.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Categories:</p>
                <div className="flex flex-wrap gap-2">
                  {article.categories.map((cat) => (
                    <Badge key={cat} variant="secondary">
                      {cat}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            {article.tags.length > 0 && (
              <div>
                <p className="text-sm text-muted-foreground mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.slice(0, 5).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {article.tags.length > 5 && (
                    <Badge variant="outline" className="text-xs">
                      +{article.tags.length - 5} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Warning for immediate publish */}
          {!isUpdate && !isScheduled && (
            <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 p-4 rounded-lg">
              <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-900">
                <p className="font-medium mb-1">This article will go live immediately</p>
                <p className="text-amber-700">
                  Make sure you've reviewed all content, SEO settings, and images before
                  publishing.
                </p>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            {isUpdate ? "Update" : isScheduled ? "Schedule" : "Publish Now"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
