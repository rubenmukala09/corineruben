import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Layers,
  Sparkles,
  Archive,
  Eye,
  MoreVertical,
  TrendingUp,
  DollarSign,
  Users,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

type BookStatus = "published" | "draft" | "archived";

interface Book {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  total_pages: number | null;
  price: number | null;
  bulk_price: number | null;
  status: BookStatus;
  created_at: string;
  updated_at: string;
}

interface BookStats {
  total_purchases: number;
  total_revenue: number;
  active_access_ids: number;
}

const STATUS_COLORS: Record<BookStatus, string> = {
  published: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  draft: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  archived: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

export default function BooksAdmin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [archiveTarget, setArchiveTarget] = useState<Book | null>(null);

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["admin-books"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Book[];
    },
  });

  const { data: stats } = useQuery({
    queryKey: ["admin-books-stats"],
    queryFn: async () => {
      const [purchasesRes, accessRes] = await Promise.all([
        supabase
          .from("purchases")
          .select("book_id, payment_status")
          .eq("payment_status", "paid"),
        supabase
          .from("access_ids")
          .select("book_id, status")
          .eq("status", "assigned"),
      ]);

      const purchases = purchasesRes.data ?? [];
      const accessIds = accessRes.data ?? [];

      return {
        total_purchases: purchases.length,
        active_access_ids: accessIds.length,
      };
    },
  });

  const archiveMutation = useMutation({
    mutationFn: async (bookId: string) => {
      const { error } = await supabase
        .from("books")
        .update({ status: "archived", updated_at: new Date().toISOString() })
        .eq("id", bookId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      toast.success("Book archived");
      setArchiveTarget(null);
    },
    onError: () => toast.error("Failed to archive book"),
  });

  const toggleStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: BookStatus;
    }) => {
      const { error } = await supabase
        .from("books")
        .update({ status, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      toast.success(`Book ${status === "published" ? "published" : "set to draft"}`);
    },
    onError: () => toast.error("Failed to update status"),
  });

  const filtered = books.filter((b) => {
    const matchSearch =
      !search ||
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.slug.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const publishedCount = books.filter((b) => b.status === "published").length;
  const draftCount = books.filter((b) => b.status === "draft").length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#F9FAFB] flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-[#06B6D4]" />
            Digital Library
          </h1>
          <p className="text-[#9CA3AF] text-sm mt-1">
            Manage books, chapters, access IDs, and AI content updates
          </p>
        </div>
        <Button
          onClick={() => navigate("/admin/books/new")}
          className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:opacity-90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Book
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Books",
            value: books.length,
            icon: BookOpen,
            color: "text-[#06B6D4]",
          },
          {
            label: "Published",
            value: publishedCount,
            icon: Eye,
            color: "text-emerald-400",
          },
          {
            label: "Total Purchases",
            value: stats?.total_purchases ?? 0,
            icon: TrendingUp,
            color: "text-purple-400",
          },
          {
            label: "Active Access IDs",
            value: stats?.active_access_ids ?? 0,
            icon: Users,
            color: "text-yellow-400",
          },
        ].map((s) => (
          <Card key={s.label} className="bg-[#111827] border-gray-800">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#F9FAFB]">{s.value}</p>
                <p className="text-xs text-[#9CA3AF]">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#9CA3AF]" />
          <Input
            placeholder="Search books…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-[#111827] border-gray-700 text-[#F9FAFB] placeholder:text-[#6B7280]"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[150px] bg-[#111827] border-gray-700 text-[#F9FAFB]">
            <SelectValue placeholder="All status" />
          </SelectTrigger>
          <SelectContent className="bg-[#1F2937] border-gray-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Books Table */}
      <Card className="bg-[#111827] border-gray-800">
        <CardHeader className="pb-3">
          <CardTitle className="text-[#F9FAFB] text-sm font-medium">
            {filtered.length} book{filtered.length !== 1 ? "s" : ""}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="p-8 text-center text-[#9CA3AF]">Loading…</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center">
              <BookOpen className="h-12 w-12 text-gray-700 mx-auto mb-3" />
              <p className="text-[#9CA3AF]">No books found</p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4 border-gray-700 text-gray-300"
                onClick={() => navigate("/admin/books/new")}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add your first book
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-800">
              {filtered.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center gap-4 p-4 hover:bg-gray-800/30 transition-colors"
                >
                  {/* Cover */}
                  <div className="w-12 h-16 rounded bg-gray-800 flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {book.cover_image ? (
                      <img
                        src={book.cover_image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <BookOpen className="h-6 w-6 text-gray-600" />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium text-[#F9FAFB] truncate">
                        {book.title}
                      </span>
                      <Badge
                        className={`text-xs border ${STATUS_COLORS[book.status]} capitalize`}
                        variant="outline"
                      >
                        {book.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-[#9CA3AF] mt-0.5">
                      /{book.slug} &bull;{" "}
                      {book.total_pages ? `${book.total_pages} pages` : "—"}{" "}
                      &bull; ${book.price ?? "—"} &bull; Bulk: $
                      {book.bulk_price ?? "—"}
                    </p>
                    {book.description && (
                      <p className="text-xs text-[#6B7280] mt-1 line-clamp-1">
                        {book.description}
                      </p>
                    )}
                  </div>

                  {/* Quick actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
                      asChild
                    >
                      <Link to={`/admin/books/${book.id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
                      asChild
                    >
                      <Link to={`/admin/books/${book.id}/chapters`}>
                        <Layers className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
                      asChild
                    >
                      <Link to={`/admin/books/${book.id}/ai-updates`}>
                        <Sparkles className="h-4 w-4" />
                      </Link>
                    </Button>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-[#9CA3AF] hover:text-[#F9FAFB] hover:bg-gray-800"
                        >
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                      >
                        <DropdownMenuItem
                          className="cursor-pointer hover:bg-gray-700"
                          onClick={() =>
                            window.open(`/resources/${book.slug}`, "_blank")
                          }
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Preview
                        </DropdownMenuItem>
                        {book.status !== "published" && (
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-700 text-emerald-400"
                            onClick={() =>
                              toggleStatusMutation.mutate({
                                id: book.id,
                                status: "published",
                              })
                            }
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Publish
                          </DropdownMenuItem>
                        )}
                        {book.status === "published" && (
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-700 text-yellow-400"
                            onClick={() =>
                              toggleStatusMutation.mutate({
                                id: book.id,
                                status: "draft",
                              })
                            }
                          >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Set to Draft
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuSeparator className="bg-gray-700" />
                        {book.status !== "archived" && (
                          <DropdownMenuItem
                            className="cursor-pointer hover:bg-gray-700 text-red-400"
                            onClick={() => setArchiveTarget(book)}
                          >
                            <Archive className="h-4 w-4 mr-2" />
                            Archive
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Archive confirmation */}
      <AlertDialog
        open={!!archiveTarget}
        onOpenChange={() => setArchiveTarget(null)}
      >
        <AlertDialogContent className="bg-[#111827] border-gray-700 text-[#F9FAFB]">
          <AlertDialogHeader>
            <AlertDialogTitle>Archive "{archiveTarget?.title}"?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#9CA3AF]">
              The book will be hidden from the public site. Existing access IDs
              and purchases will remain intact. You can republish at any time.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() =>
                archiveTarget && archiveMutation.mutate(archiveTarget.id)
              }
            >
              Archive
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
