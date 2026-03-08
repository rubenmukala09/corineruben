import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Star, ThumbsUp } from "lucide-react";
import { format } from "date-fns";

interface ProductReviewsProps {
  courseId?: string;
  productId?: string;
}

function StarRating({ rating, onRate, interactive = false }: { rating: number; onRate?: (r: number) => void; interactive?: boolean }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
        >
          <Star className={`h-5 w-5 ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
        </button>
      ))}
    </div>
  );
}

export function ProductReviews({ courseId, productId }: ProductReviewsProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 0, title: "", review_text: "" });

  const queryKey = ["reviews", courseId || productId];

  const { data: reviews } = useQuery({
    queryKey,
    queryFn: async () => {
      let query = supabase.from("product_reviews").select("*").eq("status", "approved").order("created_at", { ascending: false });
      if (courseId) query = query.eq("course_id", courseId);
      if (productId) query = query.eq("product_id", productId);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const avgRating = reviews?.length ? (reviews.reduce((sum: number, r: any) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0";

  const submitReview = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("product_reviews").insert({
        user_id: user!.id,
        course_id: courseId || null,
        product_id: productId || null,
        rating: newReview.rating,
        title: newReview.title.trim() || null,
        review_text: newReview.review_text.trim() || null,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Review submitted! It will appear after approval.");
      queryClient.invalidateQueries({ queryKey });
      setShowForm(false);
      setNewReview({ rating: 0, title: "", review_text: "" });
    },
    onError: () => toast.error("Failed to submit review"),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold">{avgRating}</span>
          <div>
            <StarRating rating={Math.round(Number(avgRating))} />
            <p className="text-sm text-muted-foreground">{reviews?.length || 0} reviews</p>
          </div>
        </div>
        {user && (
          <Button variant="outline" onClick={() => setShowForm(!showForm)}>
            Write a Review
          </Button>
        )}
      </div>

      {showForm && (
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Your Rating</p>
              <StarRating rating={newReview.rating} onRate={(r) => setNewReview({ ...newReview, rating: r })} interactive />
            </div>
            <Input placeholder="Review title (optional)" value={newReview.title} onChange={(e) => setNewReview({ ...newReview, title: e.target.value })} />
            <Textarea placeholder="Share your experience..." value={newReview.review_text} onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })} />
            <Button onClick={() => submitReview.mutate()} disabled={newReview.rating === 0 || submitReview.isPending}>
              {submitReview.isPending ? "Submitting..." : "Submit Review"}
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {reviews?.map((review: any) => (
          <Card key={review.id}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={review.rating} />
                {review.is_verified_purchase && <span className="text-xs text-green-600 font-medium">Verified Purchase</span>}
              </div>
              {review.title && <h4 className="font-medium">{review.title}</h4>}
              {review.review_text && <p className="text-sm text-muted-foreground mt-1">{review.review_text}</p>}
              <p className="text-xs text-muted-foreground mt-2">{format(new Date(review.created_at), "MMM d, yyyy")}</p>
            </CardContent>
          </Card>
        ))}
        {!reviews?.length && <p className="text-center text-muted-foreground py-4">No reviews yet. Be the first!</p>}
      </div>
    </div>
  );
}
