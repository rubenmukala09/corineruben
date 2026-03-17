import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  ArrowLeft,
  Save,
  BookOpen,
  Layers,
  Sparkles,
  Trash2,
  Plus,
  GripVertical,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

interface BookForm {
  title: string;
  slug: string;
  description: string;
  cover_image: string;
  total_pages: number | "";
  price: number | "";
  bulk_price: number | "";
  status: "published" | "draft" | "archived";
}

interface Chapter {
  id?: string;
  chapter_number: number;
  chapter_title: string;
  content_html: string;
  page_start: number | "";
  page_end: number | "";
}

const EMPTY_FORM: BookForm = {
  title: "",
  slug: "",
  description: "",
  cover_image: "",
  total_pages: "",
  price: "",
  bulk_price: "",
  status: "draft",
};

function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function BookEditor() {
  const { id } = useParams<{ id: string }>();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState<BookForm>(EMPTY_FORM);
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [expandedChapter, setExpandedChapter] = useState<number | null>(0);
  const [deleteChapterIdx, setDeleteChapterIdx] = useState<number | null>(null);
  const [autoSlug, setAutoSlug] = useState(isNew);

  // Load existing book
  const { isLoading } = useQuery({
    queryKey: ["admin-book", id],
    enabled: !isNew,
    queryFn: async () => {
      const [bookRes, chaptersRes] = await Promise.all([
        supabase.from("books").select("*").eq("id", id!).single(),
        supabase
          .from("book_content")
          .select("*")
          .eq("book_id", id!)
          .order("chapter_number"),
      ]);
      if (bookRes.error) throw bookRes.error;
      return { book: bookRes.data, chapters: chaptersRes.data ?? [] };
    },
    onSuccess: ({ book, chapters: chs }) => {
      setForm({
        title: book.title ?? "",
        slug: book.slug ?? "",
        description: book.description ?? "",
        cover_image: book.cover_image ?? "",
        total_pages: book.total_pages ?? "",
        price: book.price ?? "",
        bulk_price: book.bulk_price ?? "",
        status: book.status ?? "draft",
      });
      setChapters(
        chs.map((c: any) => ({
          id: c.id,
          chapter_number: c.chapter_number,
          chapter_title: c.chapter_title ?? "",
          content_html: c.content_html ?? "",
          page_start: c.page_start ?? "",
          page_end: c.page_end ?? "",
        }))
      );
      setAutoSlug(false);
    },
  } as any);

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && form.title) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [form.title, autoSlug]);

  const saveMutation = useMutation({
    mutationFn: async () => {
      const bookPayload = {
        title: form.title,
        slug: form.slug,
        description: form.description || null,
        cover_image: form.cover_image || null,
        total_pages: form.total_pages === "" ? null : Number(form.total_pages),
        price: form.price === "" ? null : Number(form.price),
        bulk_price: form.bulk_price === "" ? null : Number(form.bulk_price),
        status: form.status,
        updated_at: new Date().toISOString(),
      };

      let bookId = id;
      if (isNew) {
        const { data, error } = await supabase
          .from("books")
          .insert(bookPayload)
          .select("id")
          .single();
        if (error) throw error;
        bookId = data.id;
      } else {
        const { error } = await supabase
          .from("books")
          .update(bookPayload)
          .eq("id", bookId!);
        if (error) throw error;
      }

      // Upsert chapters
      for (const ch of chapters) {
        const chPayload = {
          book_id: bookId,
          chapter_number: ch.chapter_number,
          chapter_title: ch.chapter_title,
          content_html: ch.content_html,
          page_start: ch.page_start === "" ? null : Number(ch.page_start),
          page_end: ch.page_end === "" ? null : Number(ch.page_end),
          updated_at: new Date().toISOString(),
        };

        if (ch.id) {
          const { error } = await supabase
            .from("book_content")
            .update(chPayload)
            .eq("id", ch.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("book_content")
            .insert(chPayload);
          if (error) throw error;
        }
      }

      return bookId;
    },
    onSuccess: (bookId) => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      queryClient.invalidateQueries({ queryKey: ["admin-book", bookId] });
      toast.success(isNew ? "Book created!" : "Book saved!");
      if (isNew) navigate(`/admin/books/${bookId}`);
    },
    onError: (e: any) => toast.error(e.message ?? "Failed to save"),
  });

  const addChapter = () => {
    const nextNum =
      chapters.length > 0
        ? Math.max(...chapters.map((c) => c.chapter_number)) + 1
        : 1;
    setChapters((prev) => [
      ...prev,
      {
        chapter_number: nextNum,
        chapter_title: `Chapter ${nextNum}`,
        content_html: "",
        page_start: "",
        page_end: "",
      },
    ]);
    setExpandedChapter(chapters.length);
  };

  const removeChapter = async (idx: number) => {
    const ch = chapters[idx];
    if (ch.id) {
      const { error } = await supabase
        .from("book_content")
        .delete()
        .eq("id", ch.id);
      if (error) {
        toast.error("Failed to delete chapter");
        return;
      }
    }
    setChapters((prev) => prev.filter((_, i) => i !== idx));
    setDeleteChapterIdx(null);
    toast.success("Chapter deleted");
  };

  const updateChapter = (idx: number, field: keyof Chapter, value: any) => {
    setChapters((prev) =>
      prev.map((c, i) => (i === idx ? { ...c, [field]: value } : c))
    );
  };

  if (!isNew && isLoading) {
    return (
      <div className="p-8 text-center text-[#9CA3AF]">Loading book…</div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
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
          <h1 className="text-xl font-bold text-[#F9FAFB]">
            {isNew ? "New Book" : form.title || "Edit Book"}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {!isNew && (
            <>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Link to={`/admin/books/${id}/chapters`}>
                  <Layers className="h-4 w-4 mr-2" />
                  Chapters
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-gray-700 text-gray-300 hover:bg-gray-800"
              >
                <Link to={`/admin/books/${id}/ai-updates`}>
                  <Sparkles className="h-4 w-4 mr-2" />
                  AI Updates
                </Link>
              </Button>
            </>
          )}
          <Button
            onClick={() => saveMutation.mutate()}
            disabled={saveMutation.isPending || !form.title || !form.slug}
            className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white hover:opacity-90"
          >
            <Save className="h-4 w-4 mr-2" />
            {saveMutation.isPending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="metadata" className="space-y-4">
        <TabsList className="bg-[#1F2937] border border-gray-700">
          <TabsTrigger value="metadata">
            <BookOpen className="h-4 w-4 mr-2" />
            Metadata
          </TabsTrigger>
          <TabsTrigger value="chapters">
            <Layers className="h-4 w-4 mr-2" />
            Chapters ({chapters.length})
          </TabsTrigger>
        </TabsList>

        {/* Metadata Tab */}
        <TabsContent value="metadata">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 bg-[#111827] border-gray-800">
              <CardHeader>
                <CardTitle className="text-[#F9FAFB]">Book Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-gray-300">Title *</Label>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm({ ...form, title: e.target.value })
                    }
                    placeholder="e.g. Digital Self-Defense Guide"
                    className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Slug *</Label>
                  <div className="flex gap-2">
                    <Input
                      value={form.slug}
                      onChange={(e) => {
                        setAutoSlug(false);
                        setForm({ ...form, slug: e.target.value });
                      }}
                      placeholder="digital-self-defense"
                      className="bg-[#1F2937] border-gray-700 text-[#F9FAFB] font-mono text-sm"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 whitespace-nowrap"
                      onClick={() => {
                        setAutoSlug(true);
                        setForm({ ...form, slug: slugify(form.title) });
                      }}
                    >
                      Auto
                    </Button>
                  </div>
                  <p className="text-xs text-[#6B7280]">
                    URL: /resources/{form.slug || "…"}
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Description</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    rows={4}
                    placeholder="Brief description shown on the book card and detail page…"
                    className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Cover Image URL</Label>
                  <Input
                    value={form.cover_image}
                    onChange={(e) =>
                      setForm({ ...form, cover_image: e.target.value })
                    }
                    placeholder="https://…/cover.jpg"
                    className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                  />
                  {form.cover_image && (
                    <img
                      src={form.cover_image}
                      alt="Cover preview"
                      className="mt-2 h-32 w-auto rounded border border-gray-700 object-contain"
                    />
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="bg-[#111827] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-[#F9FAFB]">Publish</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Status</Label>
                    <Select
                      value={form.status}
                      onValueChange={(v) =>
                        setForm({
                          ...form,
                          status: v as BookForm["status"],
                        })
                      }
                    >
                      <SelectTrigger className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1F2937] border-gray-700">
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#111827] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-[#F9FAFB]">Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Single Price ($)</Label>
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      value={form.price}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          price: e.target.value === "" ? "" : Number(e.target.value),
                        })
                      }
                      placeholder="19.99"
                      className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Bulk Price ($)</Label>
                    <Input
                      type="number"
                      min={0}
                      step={0.01}
                      value={form.bulk_price}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          bulk_price:
                            e.target.value === "" ? "" : Number(e.target.value),
                        })
                      }
                      placeholder="14.99"
                      className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-300">Total Pages</Label>
                    <Input
                      type="number"
                      min={1}
                      value={form.total_pages}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          total_pages:
                            e.target.value === "" ? "" : Number(e.target.value),
                        })
                      }
                      placeholder="140"
                      className="bg-[#1F2937] border-gray-700 text-[#F9FAFB]"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Chapters Tab */}
        <TabsContent value="chapters">
          <Card className="bg-[#111827] border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-[#F9FAFB]">Chapters</CardTitle>
                <CardDescription className="text-[#9CA3AF]">
                  Edit chapter content inline. Changes are saved with the book.
                </CardDescription>
              </div>
              <Button
                size="sm"
                onClick={addChapter}
                className="bg-[#3B82F6] hover:bg-[#2563EB] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Chapter
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {chapters.length === 0 && (
                <div className="py-10 text-center text-[#9CA3AF]">
                  <Layers className="h-10 w-10 mx-auto mb-2 text-gray-700" />
                  <p>No chapters yet.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-3 border-gray-700 text-gray-300"
                    onClick={addChapter}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add first chapter
                  </Button>
                </div>
              )}
              {chapters.map((ch, idx) => (
                <div
                  key={idx}
                  className="border border-gray-700 rounded-lg overflow-hidden"
                >
                  <div
                    className="flex items-center gap-3 px-4 py-3 bg-[#1F2937] cursor-pointer hover:bg-gray-700/50"
                    onClick={() =>
                      setExpandedChapter(expandedChapter === idx ? null : idx)
                    }
                  >
                    <GripVertical className="h-4 w-4 text-gray-600 flex-shrink-0" />
                    <span className="text-xs font-mono text-[#06B6D4] w-8 flex-shrink-0">
                      {String(ch.chapter_number).padStart(2, "0")}
                    </span>
                    <span className="flex-1 text-[#F9FAFB] text-sm font-medium">
                      {ch.chapter_title || "Untitled"}
                    </span>
                    <span className="text-xs text-[#6B7280]">
                      {ch.page_start && ch.page_end
                        ? `pp. ${ch.page_start}–${ch.page_end}`
                        : ""}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-500 hover:text-red-400 hover:bg-red-500/10 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteChapterIdx(idx);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    {expandedChapter === idx ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>

                  {expandedChapter === idx && (
                    <div className="p-4 space-y-4 bg-[#111827]">
                      <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-1 space-y-2">
                          <Label className="text-gray-400 text-xs">
                            Chapter #
                          </Label>
                          <Input
                            type="number"
                            min={1}
                            value={ch.chapter_number}
                            onChange={(e) =>
                              updateChapter(
                                idx,
                                "chapter_number",
                                Number(e.target.value)
                              )
                            }
                            className="bg-[#1F2937] border-gray-700 text-[#F9FAFB] text-sm"
                          />
                        </div>
                        <div className="col-span-2 space-y-2">
                          <Label className="text-gray-400 text-xs">Title</Label>
                          <Input
                            value={ch.chapter_title}
                            onChange={(e) =>
                              updateChapter(idx, "chapter_title", e.target.value)
                            }
                            className="bg-[#1F2937] border-gray-700 text-[#F9FAFB] text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-400 text-xs">
                            Page Start
                          </Label>
                          <Input
                            type="number"
                            min={1}
                            value={ch.page_start}
                            onChange={(e) =>
                              updateChapter(
                                idx,
                                "page_start",
                                e.target.value === "" ? "" : Number(e.target.value)
                              )
                            }
                            className="bg-[#1F2937] border-gray-700 text-[#F9FAFB] text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-400 text-xs">
                            Page End
                          </Label>
                          <Input
                            type="number"
                            min={1}
                            value={ch.page_end}
                            onChange={(e) =>
                              updateChapter(
                                idx,
                                "page_end",
                                e.target.value === "" ? "" : Number(e.target.value)
                              )
                            }
                            className="bg-[#1F2937] border-gray-700 text-[#F9FAFB] text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-gray-400 text-xs">
                          Content (HTML / Markdown)
                        </Label>
                        <Textarea
                          value={ch.content_html}
                          onChange={(e) =>
                            updateChapter(idx, "content_html", e.target.value)
                          }
                          rows={12}
                          placeholder="<h2>Introduction</h2><p>…</p>"
                          className="bg-[#1F2937] border-gray-700 text-[#F9FAFB] font-mono text-sm resize-y"
                        />
                        <p className="text-xs text-[#6B7280]">
                          {ch.content_html.length.toLocaleString()} characters
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Delete chapter confirmation */}
      <AlertDialog
        open={deleteChapterIdx !== null}
        onOpenChange={() => setDeleteChapterIdx(null)}
      >
        <AlertDialogContent className="bg-[#111827] border-gray-700 text-[#F9FAFB]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete chapter?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#9CA3AF]">
              This will permanently delete this chapter and its content.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 border-gray-700 text-gray-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={() =>
                deleteChapterIdx !== null && removeChapter(deleteChapterIdx)
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
