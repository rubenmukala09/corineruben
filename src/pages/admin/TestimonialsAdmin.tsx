import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { VideoTestimonialUpload } from "@/components/admin/VideoTestimonialUpload";

import { AddTestimonialModal } from "@/components/admin/AddTestimonialModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  X,
  Download,
  Check,
  Video,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface Testimonial {
  id: string;
  name: string;
  location: string;
  story: string;
  email: string;
  rating: number;
  status: "pending" | "approved" | "rejected";
  submitted_at: string;
  created_at: string;
  featured?: boolean;
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [filteredTestimonials, setFilteredTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState<string | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [videoUploadOpen, setVideoUploadOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [testimonials, searchQuery, filterStatus, sortBy]);

  const fetchTestimonials = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error: any) {
      console.error("Error fetching testimonials:", error);
      toast({
        title: "Error",
        description: "Failed to load testimonials",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...testimonials];

    // Apply search
    if (searchQuery) {
      filtered = filtered.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.story.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filtered = filtered.filter((t) => t.status === filterStatus);
    }

    // Apply sort
    if (sortBy === "newest") {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    } else if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredTestimonials(filtered);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const pageIds = paginatedTestimonials.map((t) => t.id);
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

  const handleBulkPublish = async () => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ status: "approved" })
        .in("id", Array.from(selectedIds));

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedIds.size} testimonials published`,
      });

      setSelectedIds(new Set());
      fetchTestimonials();
    } catch (error) {
      console.error("Error publishing testimonials:", error);
      toast({
        title: "Error",
        description: "Failed to publish testimonials",
        variant: "destructive",
      });
    }
  };

  const handleBulkUnpublish = async () => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .update({ status: "pending" })
        .in("id", Array.from(selectedIds));

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedIds.size} testimonials unpublished`,
      });

      setSelectedIds(new Set());
      fetchTestimonials();
    } catch (error) {
      console.error("Error unpublishing testimonials:", error);
      toast({
        title: "Error",
        description: "Failed to unpublish testimonials",
        variant: "destructive",
      });
    }
  };

  const handleBulkDelete = async () => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .in("id", Array.from(selectedIds));

      if (error) throw error;

      toast({
        title: "Success",
        description: `${selectedIds.size} testimonials deleted`,
      });

      setSelectedIds(new Set());
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonials:", error);
      toast({
        title: "Error",
        description: "Failed to delete testimonials",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("testimonials")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Testimonial deleted",
      });

      setDeleteDialogOpen(false);
      setTestimonialToDelete(null);
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive",
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-700">Published</Badge>;
      case "pending":
        return <Badge className="bg-gray-100 text-gray-700">Draft</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-700">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  const totalPages = Math.ceil(filteredTestimonials.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTestimonials = filteredTestimonials.slice(startIndex, endIndex);

  return (
    <AdminLayout
      title="Testimonials"
      subtitle="Manage customer testimonials and reviews"
      headerActions={
        <Button onClick={() => setAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Testimonial
        </Button>
      }
    >
      <div className="space-y-6">
          <div className="bg-background border rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search testimonials..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="approved">Published</SelectItem>
                  <SelectItem value="pending">Draft</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="oldest">Oldest First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bulk Actions Toolbar */}
          <AnimatePresence>
            {selectedIds.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-6 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="font-medium text-foreground">
                    {selectedIds.size} items selected
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={handleBulkPublish}>
                      <Check className="h-4 w-4 mr-2" />
                      Publish
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleBulkUnpublish}>
                      Unpublish
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
                      Export
                    </Button>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedIds(new Set())}
                >
                  <X className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Table */}
          {loading ? (
            <div className="bg-background border rounded-lg p-8 text-center">
              <div className="animate-pulse">Loading testimonials...</div>
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="bg-background border rounded-lg p-12 text-center">
              <MessageSquare className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Testimonials Yet</h3>
              <p className="text-muted-foreground mb-6">
                Add your first testimonial to showcase customer feedback
              </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setVideoUploadOpen(true)}>
                <Video className="h-4 w-4 mr-2" />
                Upload Video
              </Button>
              <Button onClick={() => setAddModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Testimonial
              </Button>
            </div>
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
                            paginatedTestimonials.length > 0 &&
                            paginatedTestimonials.every((t) => selectedIds.has(t.id))
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead className="w-12"></TableHead>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <AnimatePresence mode="popLayout">
                      {paginatedTestimonials.map((testimonial, index) => (
                        <motion.tr
                          key={testimonial.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{ duration: 0.2, delay: index * 0.02 }}
                          className={`border-b transition-colors hover:bg-muted/50 ${
                            selectedIds.has(testimonial.id) ? "bg-accent/20" : ""
                          } ${index % 2 === 0 ? "bg-background" : "bg-muted/20"}`}
                        >
                          <TableCell>
                            <Checkbox
                              checked={selectedIds.has(testimonial.id)}
                              onCheckedChange={(checked) =>
                                handleSelectOne(testimonial.id, checked as boolean)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                {testimonial.name.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium hover:text-primary cursor-pointer">
                                {testimonial.name}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {testimonial.location}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{renderStars(testimonial.rating)}</TableCell>
                          <TableCell>{getStatusBadge(testimonial.status)}</TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {formatDistanceToNow(new Date(testimonial.created_at), {
                              addSuffix: true,
                            })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() =>
                                  navigate(`/admin/content/testimonials/${testimonial.id}`)
                                }
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-500 hover:text-red-600"
                                onClick={() => {
                                  setTestimonialToDelete(testimonial.id);
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
                  Showing {startIndex + 1}-{Math.min(endIndex, filteredTestimonials.length)} of{" "}
                  {filteredTestimonials.length}
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
        </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this testimonial. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => testimonialToDelete && handleDelete(testimonialToDelete)}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Add Testimonial Modal */}
      <AddTestimonialModal
        open={addModalOpen}
        onOpenChange={setAddModalOpen}
        onSuccess={fetchTestimonials}
      />
      
      {/* Video Upload Modal */}
      <VideoTestimonialUpload
        open={videoUploadOpen}
        onOpenChange={setVideoUploadOpen}
        onSuccess={fetchTestimonials}
      />
    </AdminLayout>
  );
}
