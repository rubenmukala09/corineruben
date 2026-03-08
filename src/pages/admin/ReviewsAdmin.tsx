import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { toast } from "sonner";
import { Star, Check, X } from "lucide-react";
import { format } from "date-fns";

export default function ReviewsAdmin() {
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase.from("product_reviews").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("product_reviews").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Review updated");
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
    },
  });

  const pendingCount = reviews?.filter((r: any) => r.status === "pending").length || 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Reviews & Ratings</h1>
        <p className="text-muted-foreground">{pendingCount} pending reviews need moderation</p>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rating</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">Loading...</TableCell></TableRow>
              ) : !reviews?.length ? (
                <TableRow><TableCell colSpan={6} className="text-center py-8">No reviews yet</TableCell></TableRow>
              ) : (
                reviews.map((review: any) => (
                  <TableRow key={review.id}>
                    <TableCell>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className={`h-4 w-4 ${s <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-[150px] truncate">{review.title || "—"}</TableCell>
                    <TableCell className="max-w-[200px] truncate text-muted-foreground">{review.review_text || "—"}</TableCell>
                    <TableCell>
                      <Badge variant={review.status === "approved" ? "default" : review.status === "rejected" ? "destructive" : "secondary"}>
                        {review.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{format(new Date(review.created_at), "MMM d")}</TableCell>
                    <TableCell>
                      {review.status === "pending" && (
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className="text-green-600" onClick={() => updateStatus.mutate({ id: review.id, status: "approved" })}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="ghost" className="text-destructive" onClick={() => updateStatus.mutate({ id: review.id, status: "rejected" })}>
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
