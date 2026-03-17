import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  ArrowLeft,
  Sparkles,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  BookOpen,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface UpdateLog {
  id: string;
  book_id: string;
  chapter_id: string | null;
  changes_summary: string | null;
  updated_at: string;
  status?: "pending" | "approved" | "rejected";
  proposed_content?: string | null;
  chapter_title?: string | null;
}

interface Chapter {
  id: string;
  chapter_number: number;
  chapter_title: string;
}

const STATUS_COLORS = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  approved: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  rejected: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function BookAIUpdates() {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();

  const [selectedChapter, setSelectedChapter] = useState<string>("all");
  const [updateInstructions, setUpdateInstructions] = useState("");
  const [expandedLog, setExpandedLog] = useState<string | null>(null);
  const [approveTarget, setApproveTarget] = useState<UpdateLog | null>(null);
  const [rejectTarget, setRejectTarget] = useState<UpdateLog | null>(null);
  const [triggerOpen, setTriggerOpen] = useState(false);

  const { data: book } = useQuery({
    queryKey: ["admin-book-title", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("id, title, slug")
        .eq("id", id!)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const { data: chapters = [] } = useQuery<Chapter[]>({
    queryKey: ["admin-book-chapters", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("book_content")
        .select("id, chapter_number, chapter_title")
        .eq("book_id", id!)
        .order("chapter_number");
      if (error) throw error;
      return data as Chapter[];
    },
  });

  const { data: logs = [], isLoading } = useQuery<UpdateLog[]>({
    queryKey: ["admin-book-update-logs", id],
    queryFn: async () => {
      let query = supabase
        .from("update_logs")
        .select("*")
        .eq("book_id", id!)
        .order("updated_at", { ascending: false });

      const { data, error } = await query;
      if (error) throw error;

      // Join chapter titles
      const enriched = (data ?? []).map((log: any) => {
        const ch = chapters.find((c) => c.id === log.chapter_id);
        return { ...log, chapter_title: ch?.chapter_title ?? null };
      });

      return enriched;
    },
    enabled: chapters.length >= 0,
  });

  const triggerMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke(
        "update-book-content",
        {
          body: {
            book_id: id,
            chapter_id: selectedChapter === "all" ? null : selectedChapter,
            instructions: updateInstructions || null,
          },
        }
      );
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-book-update-logs", id],
      });
      toast.success("AI update triggered — check back for results");
      setUpdateInstructions("");
      setTriggerOpen(false);
    },
    onError: (e: any) =>
      toast.error(e.message ?? "Failed to trigger AI update"),
  });

  const approveMutation = useMutation({
    mutationFn: async (log: UpdateLog) => {
      if (!log.chapter_id || !log.proposed_content) return;
      // Apply proposed content to book_content
      const { error: applyError } = await supabase
        .from("book_content")
        .update({
          content_html: log.proposed_content,
          last_ai_update: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("id", log.chapter_id);
      if (applyError) throw applyError;

      // Mark log as approved
      const { error: logError } = await supabase
        .from("update_logs")
        .update({ status: "approved" } as any)
        .eq("id", log.id);
      if (logError) throw logError;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-book-update-logs", id],
      });
      toast.success("Change approved and applied to book");
      setApproveTarget(null);
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to approve"),
  });

  const rejectMutation = useMutation({
    mutationFn: async (logId: string) => {
      const { error } = await supabase
        .from("update_logs")
        .update({ status: "rejected" } as any)
        .eq("id", logId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-book-update-logs", id],
      });
      toast.success("Change rejected");
      setRejectTarget(null);
    },
    onError: () => toast.error("Failed to reject"),
  });

  const filteredLogs =
    selectedChapter === "all"
      ? logs
      : logs.filter((l) => l.chapter_id === selectedChapter);

  const pendingCount = logs.filter((l) => l.status === "pending").length;

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-[#9CA3AF] hover:text-[#F9FAFB]"
          >
            <Link to="/admin/books">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Books
            </Link>
          </Button>
          <div>
            <h1 className="text-xl font-bold text-[#F9FAFB] flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              AI Update Controls
            </h1>
            {book && (
              <p className="text-sm text-[#9CA3AF]">{book.title}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {pendingCount > 0 && (
            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
              {pendingCount} pending review
            </Badge>
          )}
          <Button
            onClick={() => setTriggerOpen(true)}
            className="bg-gradient-to-r from-purple-600 to-[#3B82F6] text-white hover:opacity-90"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Trigger Update
          </Button>
        </div>
      </div>

      {/* Trigger panel */}
      {triggerOpen && (
        <Card className="bg-[#111827] border-purple-800/40">
          <CardHeader>
            <CardTitle className="text-[#F9FAFB] flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-purple-400" />
              Trigger AI Content Update
            </CardTitle>
            <CardDescription className="text-[#9CA3AF]">
              The AI will analyze the selected chapter(s) and propose updated
              content. You must approve changes before they go live.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Chapter to Update</Label>
              <Select
                value={selectedChapter}
                onValueChange={setSelectedChapter}
              >
                <SelectTrigger className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1F2937] border-gray-700">
                  <SelectItem value="all">All Chapters</SelectItem>
                  {chapters.map((ch) => (
                    <SelectItem key={ch.id} value={ch.id}>
                      {ch.chapter_number}. {ch.chapter_title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">
                Custom Instructions{" "}
                <span className="text-[#6B7280]">(optional)</span>
              </Label>
              <Textarea
                value={updateInstructions}
                onChange={(e) => setUpdateInstructions(e.target.value)}
                rows={4}
                placeholder="e.g. 'Update statistics to 2026 figures', 'Add a new section on AI-generated phishing emails', 'Simplify language for seniors'…"
                className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300"
                onClick={() => setTriggerOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={() => triggerMutation.mutate()}
                disabled={triggerMutation.isPending}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {triggerMutation.isPending ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Triggering…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Run AI Update
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Update Logs */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader className="flex flex-row items-center justify-between pb-3">
          <CardTitle className="text-[#F9FAFB]">Update History</CardTitle>
          <Select
            value={selectedChapter}
            onValueChange={setSelectedChapter}
          >
            <SelectTrigger className="w-[200px] bg-[#1F2937] border-gray-700 text-[#F9FAFB]">
              <SelectValue placeholder="Filter by chapter" />
            </SelectTrigger>
            <SelectContent className="bg-[#1F2937] border-gray-700">
              <SelectItem value="all">All Chapters</SelectItem>
              {chapters.map((ch) => (
                <SelectItem key={ch.id} value={ch.id}>
                  {ch.chapter_number}. {ch.chapter_title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-[#9CA3AF]">Loading…</div>
          ) : filteredLogs.length === 0 ? (
            <div className="p-10 text-center">
              <Clock className="h-10 w-10 mx-auto mb-2 text-gray-700" />
              <p className="text-[#9CA3AF]">No update history yet</p>
              <p className="text-xs text-[#6B7280] mt-1">
                Trigger an AI update above to get started
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {filteredLogs.map((log) => {
                const status = (log.status ?? "approved") as
                  | "pending"
                  | "approved"
                  | "rejected";
                const expanded = expandedLog === log.id;
                return (
                  <div key={log.id} className="p-4">
                    <div
                      className="flex items-start gap-3 cursor-pointer"
                      onClick={() =>
                        setExpandedLog(expanded ? null : log.id)
                      }
                    >
                      {status === "pending" && (
                        <AlertTriangle className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      )}
                      {status === "approved" && (
                        <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                      )}
                      {status === "rejected" && (
                        <XCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="outline"
                            className={`text-xs capitalize ${STATUS_COLORS[status]}`}
                          >
                            {status}
                          </Badge>
                          {log.chapter_title && (
                            <span className="text-xs text-[#9CA3AF]">
                              <BookOpen className="h-3 w-3 inline mr-1" />
                              {log.chapter_title}
                            </span>
                          )}
                          <span className="text-xs text-[#6B7280] ml-auto">
                            {new Date(log.updated_at).toLocaleString()}
                          </span>
                        </div>
                        {log.changes_summary && (
                          <p className="text-sm text-[#D1D5DB] mt-1">
                            {log.changes_summary}
                          </p>
                        )}
                      </div>
                      {expanded ? (
                        <ChevronUp className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
                      )}
                    </div>

                    {expanded && (
                      <div className="mt-3 ml-8 space-y-3">
                        {log.proposed_content && (
                          <div className="space-y-1">
                            <p className="text-xs text-[#6B7280] font-medium uppercase tracking-wide">
                              Proposed Content
                            </p>
                            <pre className="text-xs text-[#9CA3AF] bg-[#0D1117] rounded p-3 overflow-auto max-h-48 font-mono whitespace-pre-wrap">
                              {log.proposed_content}
                            </pre>
                          </div>
                        )}

                        {status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              onClick={() => setApproveTarget(log)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve & Apply
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-red-700 text-red-400 hover:bg-red-900/20"
                              onClick={() => setRejectTarget(log)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Approve dialog */}
      <AlertDialog
        open={!!approveTarget}
        onOpenChange={() => setApproveTarget(null)}
      >
        <AlertDialogContent className="bg-[#111827] border-gray-700 text-[#F9FAFB]">
          <AlertDialogHeader>
            <AlertDialogTitle>Approve and apply change?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#9CA3AF]">
              The proposed content will overwrite the current chapter content
              immediately. This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() =>
                approveTarget && approveMutation.mutate(approveTarget)
              }
            >
              Approve
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject dialog */}
      <AlertDialog
        open={!!rejectTarget}
        onOpenChange={() => setRejectTarget(null)}
      >
        <AlertDialogContent className="bg-[#111827] border-gray-700 text-[#F9FAFB]">
          <AlertDialogHeader>
            <AlertDialogTitle>Reject this change?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#9CA3AF]">
              The proposed content will be discarded. The current chapter
              content will remain unchanged.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() =>
                rejectTarget && rejectMutation.mutate(rejectTarget.id)
              }
            >
              Reject
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
