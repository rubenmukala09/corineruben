import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/AdminLayout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  PenSquare,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Clock,
  Check,
  X,
  Download,
  ChevronLeft,
  ChevronRight,
  FileText,
  TrendingUp,
  Users,
  FileCheck,
  FileClock,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Article {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: "AI Scams" | "Business AI" | "Family Safety" | "News";
  status: "draft" | "scheduled" | "published";
  publishedDate?: string;
  scheduledDate?: string;
  featuredImage?: string;
  views: number;
  createdAt: string;
}

const categoryColors = {
  "AI Scams": "bg-blue-100 text-blue-700",
  "Business AI": "bg-purple-100 text-purple-700",
  "Family Safety": "bg-green-100 text-green-700",
  News: "bg-teal-100 text-teal-700",
};


export default function ArticlesAdmin() {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Fetch articles from database
  const { data: articlesData, isLoading, refetch } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          *,
          author:profiles(first_name, last_name, profile_photo_url)
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data.map(article => ({
        id: article.id,
        title: article.title,
        content: article.content,
        author: {
          name: article.author ? `${article.author.first_name || ''} ${article.author.last_name || ''}`.trim() : 'Unknown',
          avatar: article.author?.profile_photo_url
        },
        category: article.category as Article['category'],
        status: article.status as Article['status'],
        publishedDate: article.published_at,
        scheduledDate: article.scheduled_for,
        featuredImage: article.featured_image_url,
        views: article.views || 0,
        createdAt: article.created_at
      }));
    }
  });

  // Add realtime updates
  useEffect(() => {
    const channel = supabase
      .channel('articles-updates')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'articles' }, () => {
        refetch();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);

  // Update local state when data changes
  useEffect(() => {
    if (articlesData) {
      setArticles(articlesData);
    }
  }, [articlesData]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);

  useEffect(() => {
    applyFiltersAndSort();
  }, [articles, searchQuery, categoryFilter, statusFilter, dateFilter, sortBy]);

  const applyFiltersAndSort = () => {
    let filtered = [...articles];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.author.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter((article) => article.category === categoryFilter);
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((article) => article.status === statusFilter);
    }

    // Apply date filter
    if (dateFilter !== "all") {
      const now = new Date();
      const filterDate = new Date();

      switch (dateFilter) {
        case "7days":
          filterDate.setDate(now.getDate() - 7);
          break;
        case "30days":
          filterDate.setDate(now.getDate() - 30);
          break;
        case "90days":
          filterDate.setDate(now.getDate() - 90);
          break;
      }

      if (dateFilter !== "all") {
        filtered = filtered.filter(
          (article) => new Date(article.createdAt) >= filterDate
        );
      }
    }

    // Apply sort
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "oldest":
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case "views":
        filtered.sort((a, b) => b.views - a.views);
        break;
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredArticles(filtered);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const pageIds = paginatedArticles.map((a) => a.id);
      setSelectedIds(new Set(pageIds));
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleSelectOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelectedIds(newSelected);
  };

  const handleBulkDelete = () => {
    setArticles((prev) => prev.filter((a) => !selectedIds.has(a.id)));
    toast({
      title: "Success",
      description: `${selectedIds.size} articles deleted`,
    });
    setSelectedIds(new Set());
  };

  const handleBulkStatusChange = (newStatus: "draft" | "published") => {
    setArticles((prev) =>
      prev.map((a) => (selectedIds.has(a.id) ? { ...a, status: newStatus } : a))
    );
    toast({
      title: "Success",
      description: `${selectedIds.size} articles updated to ${newStatus}`,
    });
    setSelectedIds(new Set());
  };

  const handleDelete = (id: string) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
    toast({
      title: "Success",
      description: "Article deleted",
    });
    setDeleteDialogOpen(false);
    setArticleToDelete(null);
  };

  const handleExport = (format: "csv" | "excel" | "pdf") => {
    toast({
      title: "Export Started",
      description: `Exporting articles as ${format.toUpperCase()}...`,
    });
    // Implement actual export logic here
  };

  const getStatusBadge = (article: Article) => {
    switch (article.status) {
      case "published":
        return (
          <Badge className="bg-green-100 text-green-700">
            <Check className="h-3 w-3 mr-1" />
            Published
          </Badge>
        );
      case "draft":
        return <Badge className="bg-gray-100 text-gray-700">Draft</Badge>;
      case "scheduled":
        return (
          <Badge className="bg-yellow-100 text-yellow-700">
            <Clock className="h-3 w-3 mr-1" />
            Scheduled
          </Badge>
        );
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  const getCategoryCounts = () => {
    const counts: Record<string, number> = {};
    articles.forEach((article) => {
      counts[article.category] = (counts[article.category] || 0) + 1;
    });
    return counts;
  };

  const stats = {
    total: articles.length,
    published: articles.filter((a) => a.status === "published").length,
    drafts: articles.filter((a) => a.status === "draft").length,
    scheduled: articles.filter((a) => a.status === "scheduled").length,
    totalViews: articles.reduce((sum, a) => sum + a.views, 0),
  };

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedArticles = filteredArticles.slice(startIndex, endIndex);

  const categoryCounts = getCategoryCounts();

  return (
    <AdminLayout>
      <div>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mt-4">
            <h1 className="text-3xl font-bold text-foreground">Blog Articles</h1>
            <Button
              size="lg"
              onClick={() => navigate("/admin/content/articles/new")}
              className="hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200"
            >
              <PenSquare className="h-5 w-5 mr-2" />
              Create Article
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Articles</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-100">
                  <FileCheck className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold text-green-600">{stats.published}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gray-100">
                  <FileText className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold text-gray-600">{stats.drafts}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-100">
                  <FileClock className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                  <p className="text-2xl font-bold text-yellow-600">{stats.scheduled}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {formatViews(stats.totalViews)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters & Search */}
          <div className="bg-background border rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="AI Scams">
                    AI Scams {categoryCounts["AI Scams"] && `(${categoryCounts["AI Scams"]})`}
                  </SelectItem>
                  <SelectItem value="Business AI">
                    Business AI{" "}
                    {categoryCounts["Business AI"] && `(${categoryCounts["Business AI"]})`}
                  </SelectItem>
                  <SelectItem value="Family Safety">
                    Family Safety{" "}
                    {categoryCounts["Family Safety"] &&
                      `(${categoryCounts["Family Safety"]})`}
                  </SelectItem>
                  <SelectItem value="News">
                    News {categoryCounts["News"] && `(${categoryCounts["News"]})`}
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>

              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="views">Most Views</SelectItem>
                  <SelectItem value="title">A-Z Title</SelectItem>
                </SelectContent>
              </Select>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => handleExport("csv")}>
                    Export as CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("excel")}>
                    Export as Excel
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleExport("pdf")}>
                    Export as PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Bulk Actions Toolbar */}
          <AnimatePresence>
            {selectedIds.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 flex items-center justify-between sticky top-20 z-10"
              >
                <div className="flex items-center gap-4">
                  <span className="font-medium text-foreground">
                    {selectedIds.size} articles selected
                  </span>
                  <div className="flex gap-2">
                    <Select onValueChange={(category) => console.log(category)}>
                      <SelectTrigger className="w-[180px] h-9">
                        <SelectValue placeholder="Change Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AI Scams">AI Scams</SelectItem>
                        <SelectItem value="Business AI">Business AI</SelectItem>
                        <SelectItem value="Family Safety">Family Safety</SelectItem>
                        <SelectItem value="News">News</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkStatusChange("published")}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      Publish
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleBulkStatusChange("draft")}
                    >
                      Set to Draft
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-500 hover:text-red-600"
                      onClick={handleBulkDelete}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Selected
                    </Button>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedIds(new Set())}
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear Selection
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table */}
          {loading ? (
            <div className="bg-background border rounded-lg p-8 text-center">
              <div className="animate-pulse">Loading articles...</div>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="bg-background border rounded-lg p-12 text-center">
              {searchQuery || categoryFilter !== "all" || statusFilter !== "all" ? (
                <>
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                  <p className="text-muted-foreground mb-6">Try different keywords</p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setCategoryFilter("all");
                      setStatusFilter("all");
                      setDateFilter("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                </>
              ) : (
                <>
                  <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Articles Yet</h3>
                  <p className="text-muted-foreground mb-6">
                    Create your first article to share with your audience
                  </p>
                  <Button onClick={() => navigate("/admin/content/articles/new")}>
                    <PenSquare className="h-4 w-4 mr-2" />
                    Create Article
                  </Button>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="bg-background border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="w-12">
                        <Checkbox
                          checked={
                            paginatedArticles.length > 0 &&
                            paginatedArticles.every((a) => selectedIds.has(a.id))
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-16">Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence mode="popLayout">
                      {paginatedArticles.map((article, index) => (
                        <motion.tr
                          key={article.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                          className={cn(
                            "border-b transition-colors hover:bg-muted/50 cursor-pointer",
                            selectedIds.has(article.id) && "bg-accent/20",
                            index % 2 === 0 ? "bg-background" : "bg-muted/20"
                          )}
                          onClick={() => navigate(`/admin/content/articles/${article.id}`)}
                        >
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Checkbox
                              checked={selectedIds.has(article.id)}
                              onCheckedChange={(checked) =>
                                handleSelectOne(article.id, checked as boolean)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            {article.featuredImage ? (
                              <img
                                src={article.featuredImage}
                                alt={article.title}
                                className="w-[60px] h-[40px] object-cover rounded"
                              />
                            ) : (
                              <div className="w-[60px] h-[40px] bg-muted rounded flex items-center justify-center">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="font-medium hover:text-primary max-w-md truncate">
                              {article.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={article.author.avatar} />
                                <AvatarFallback className="text-xs">
                                  {article.author.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{article.author.name}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={categoryColors[article.category]}>
                              {article.category}
                            </Badge>
                          </TableCell>
                          <TableCell>{getStatusBadge(article)}</TableCell>
                          <TableCell className="text-sm">
                            {article.status === "published" && article.publishedDate
                              ? format(new Date(article.publishedDate), "MMM d, yyyy")
                              : article.status === "scheduled" && article.scheduledDate
                              ? `Scheduled for ${format(
                                  new Date(article.scheduledDate),
                                  "MMM d"
                                )}`
                              : "-"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Eye className="h-3.5 w-3.5" />
                              {formatViews(article.views)}
                            </div>
                          </TableCell>
                          <TableCell
                            className="text-right"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  navigate(`/admin/content/articles/${article.id}`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => window.open(`/articles/${article.id}`, "_blank")}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-600"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setArticleToDelete(article.id);
                                  setDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredArticles.length)} of{" "}
                  {filteredArticles.length} articles
                </div>
                <div className="flex items-center gap-4">
                  <Select
                    value={itemsPerPage.toString()}
                    onValueChange={(value) => {
                      setItemsPerPage(parseInt(value));
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger className="w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="20">20 / page</SelectItem>
                      <SelectItem value="50">50 / page</SelectItem>
                      <SelectItem value="100">100 / page</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter(
                        (page) =>
                          page === 1 ||
                          page === totalPages ||
                          Math.abs(page - currentPage) <= 1
                      )
                      .map((page, index, array) => (
                        <>
                          {index > 0 && array[index - 1] !== page - 1 && (
                            <span key={`ellipsis-${page}`} className="px-2">
                              ...
                            </span>
                          )}
                          <Button
                            key={page}
                            size="sm"
                            variant={currentPage === page ? "default" : "outline"}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </Button>
                        </>
                      ))}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
                </div>
              </div>
            </>
          )}

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete this article. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => articleToDelete && handleDelete(articleToDelete)}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AdminLayout>
  );
}
