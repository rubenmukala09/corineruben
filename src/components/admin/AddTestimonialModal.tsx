import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Upload,
  X,
  Loader2,
  FileText,
  Video,
  Check,
  Image as ImageIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const testimonialSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(100, { message: "Name must be less than 100 characters" }),
    location: z.string().trim().max(100).optional(),
    type: z.enum(["text", "video"]),
    story: z.string().trim().optional(),
    videoUrl: z.string().url().optional().or(z.literal("")),
    rating: z.number().min(1).max(5),
    status: z.enum(["pending", "approved"]),
    featured: z.boolean(),
    email: z.string().email({ message: "Valid email is required" }),
  })
  .refine(
    (data) => {
      if (data.type === "text" && (!data.story || data.story.length < 1)) {
        return false;
      }
      return true;
    },
    {
      message: "Testimonial text is required",
      path: ["story"],
    }
  )
  .refine(
    (data) => {
      if (data.type === "text" && data.story && data.story.length > 500) {
        return false;
      }
      return true;
    },
    {
      message: "Testimonial must be less than 500 characters",
      path: ["story"],
    }
  );

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface AddTestimonialModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function AddTestimonialModal({
  open,
  onOpenChange,
  onSuccess,
}: AddTestimonialModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      type: "text",
      rating: 5,
      status: "pending",
      featured: false,
    },
  });

  const testimonialType = watch("type");
  const story = watch("story") || "";
  const isPublished = watch("status") === "approved";

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Photo must be less than 2MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Error",
        description: "Please upload a valid image file (JPG or PNG)",
        variant: "destructive",
      });
      return;
    }

    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (100MB)
    if (file.size > 100 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "Video must be less than 100MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    const validTypes = ["video/mp4", "video/quicktime", "video/x-msvideo"];
    if (!validTypes.includes(file.type)) {
      toast({
        title: "Error",
        description: "Please upload MP4, MOV, or AVI format",
        variant: "destructive",
      });
      return;
    }

    setVideoFile(file);
  };

  const uploadFile = async (file: File, bucket: string, path: string) => {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) throw error;
    return data;
  };

  const onSubmit = async (data: TestimonialFormData) => {
    try {
      setSaving(true);

      // Upload photo if provided
      let photoUrl = null;
      if (photoFile) {
        const photoPath = `testimonials/${Date.now()}-${photoFile.name}`;
        await uploadFile(photoFile, "veteran-docs", photoPath);
        const { data: urlData } = supabase.storage
          .from("veteran-docs")
          .getPublicUrl(photoPath);
        photoUrl = urlData.publicUrl;
      }

      // Upload video if provided
      let videoUrlFinal = data.videoUrl || null;
      if (videoFile && testimonialType === "video") {
        const videoPath = `testimonials/videos/${Date.now()}-${videoFile.name}`;
        await uploadFile(videoFile, "veteran-docs", videoPath);
        const { data: urlData } = supabase.storage
          .from("veteran-docs")
          .getPublicUrl(videoPath);
        videoUrlFinal = urlData.publicUrl;
      }

      // Insert testimonial
      const { error } = await supabase.from("testimonials").insert({
        name: data.name,
        location: data.location || "",
        story: testimonialType === "text" ? data.story : "",
        email: data.email,
        rating: rating,
        status: data.status,
        submitted_at: new Date().toISOString(),
        // Note: featured field would need to be added to the database schema
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Testimonial saved successfully",
      });

      // Reset form and close modal
      setTimeout(() => {
        reset();
        setPhotoFile(null);
        setPhotoPreview(null);
        setVideoFile(null);
        setRating(5);
        onOpenChange(false);
        onSuccess();
      }, 500);
    } catch (error: any) {
      console.error("Error saving testimonial:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save testimonial",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleClose = () => {
    if (!saving) {
      reset();
      setPhotoFile(null);
      setPhotoPreview(null);
      setVideoFile(null);
      setRating(5);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-[600px] max-h-[90vh] overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4, type: "spring", damping: 25, stiffness: 300 }}
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Add New Testimonial</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
            {/* Customer Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Customer Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="John Smith"
                {...register("name")}
                className={cn(
                  "transition-all duration-200",
                  errors.name && "border-red-500 animate-shake"
                )}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.name.message}
                </motion.p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="john@example.com"
                {...register("email")}
                className={cn(
                  "transition-all duration-200",
                  errors.email && "border-red-500 animate-shake"
                )}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500"
                >
                  {errors.email.message}
                </motion.p>
              )}
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-sm font-medium">
                Location (optional)
              </Label>
              <Input
                id="location"
                placeholder="Dayton, OH"
                {...register("location")}
                className="transition-all duration-200"
              />
              <p className="text-xs text-muted-foreground">Format: City, State</p>
            </div>

            {/* Testimonial Type */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Testimonial Type</Label>
              <RadioGroup
                value={testimonialType}
                onValueChange={(value) => setValue("type", value as "text" | "video")}
                className="grid grid-cols-2 gap-4"
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Label
                    htmlFor="text"
                    className={cn(
                      "flex flex-col items-center justify-center gap-3 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200",
                      testimonialType === "text"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value="text" id="text" className="sr-only" />
                    <FileText
                      className={cn(
                        "h-8 w-8 transition-colors",
                        testimonialType === "text" ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span className="font-medium">Text Testimonial</span>
                  </Label>
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Label
                    htmlFor="video"
                    className={cn(
                      "flex flex-col items-center justify-center gap-3 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200",
                      testimonialType === "video"
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <RadioGroupItem value="video" id="video" className="sr-only" />
                    <Video
                      className={cn(
                        "h-8 w-8 transition-colors",
                        testimonialType === "video" ? "text-primary" : "text-muted-foreground"
                      )}
                    />
                    <span className="font-medium">Video Testimonial</span>
                  </Label>
                </motion.div>
              </RadioGroup>
            </div>

            {/* Text Testimonial Fields */}
            <AnimatePresence mode="wait">
              {testimonialType === "text" && (
                <motion.div
                  key="text-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Testimonial Text */}
                  <div className="space-y-2">
                    <Label htmlFor="story" className="text-sm font-medium">
                      Testimonial Text <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="story"
                      placeholder="Share your experience..."
                      {...register("story")}
                      className={cn(
                        "min-h-[120px] resize-none transition-all duration-200",
                        errors.story && "border-red-500 animate-shake"
                      )}
                      maxLength={500}
                    />
                    <div className="flex items-center justify-between text-xs">
                      {errors.story && (
                        <span className="text-red-500">{errors.story.message}</span>
                      )}
                      <span
                        className={cn(
                          "ml-auto",
                          story.length > 450 ? "text-orange-500" : "text-muted-foreground"
                        )}
                      >
                        {story.length}/500
                      </span>
                    </div>
                  </div>

                  {/* Star Rating */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Star Rating</Label>
                    <div className="flex items-center gap-4">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.button
                            key={star}
                            type="button"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => {
                              setRating(star);
                              setValue("rating", star);
                            }}
                            className="focus:outline-none"
                          >
                            <Star
                              className={cn(
                                "h-8 w-8 transition-all duration-200",
                                star <= (hoverRating || rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              )}
                            />
                          </motion.button>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {rating} out of 5 stars
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Video Testimonial Fields */}
              {testimonialType === "video" && (
                <motion.div
                  key="video-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Upload Video */}
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Upload Video</Label>
                    <div
                      className={cn(
                        "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200",
                        videoFile
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      {videoFile ? (
                        <div className="space-y-3">
                          <Check className="h-12 w-12 text-green-500 mx-auto" />
                          <p className="text-sm font-medium">{videoFile.name}</p>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setVideoFile(null)}
                          >
                            Remove
                          </Button>
                        </div>
                      ) : (
                        <label className="cursor-pointer block">
                          <input
                            type="file"
                            accept="video/mp4,video/quicktime,video/x-msvideo"
                            onChange={handleVideoChange}
                            className="sr-only"
                          />
                          <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                          <p className="text-sm font-medium mb-1">
                            Drop video here or click to browse
                          </p>
                          <p className="text-xs text-muted-foreground">
                            MP4, MOV, AVI • Max 100MB
                          </p>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* OR Video URL */}
                  <div className="space-y-2">
                    <Label htmlFor="videoUrl" className="text-sm font-medium">
                      OR Paste Video URL
                    </Label>
                    <Input
                      id="videoUrl"
                      placeholder="https://youtube.com/watch?v=..."
                      {...register("videoUrl")}
                      className="transition-all duration-200"
                    />
                    <p className="text-xs text-muted-foreground">
                      Supports YouTube and Vimeo
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Customer Photo */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Customer Photo</Label>
              <div className="flex items-center gap-4">
                {photoPreview ? (
                  <div className="relative">
                    <Avatar className="h-20 w-20 border-2 border-border">
                      <AvatarImage src={photoPreview} alt="Preview" />
                    </Avatar>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => {
                        setPhotoFile(null);
                        setPhotoPreview(null);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <Avatar className="h-20 w-20 border-2 border-dashed border-border">
                    <AvatarFallback>
                      <ImageIcon className="h-8 w-8 text-muted-foreground" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handlePhotoChange}
                    className="sr-only"
                  />
                  <Button type="button" variant="outline" size="sm" asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {photoPreview ? "Change Photo" : "Upload Photo"}
                    </span>
                  </Button>
                </label>
              </div>
              <p className="text-xs text-muted-foreground">JPG or PNG • Max 2MB</p>
            </div>

            {/* Status */}
            <div className="flex items-center justify-between p-4 rounded-lg border">
              <div className="space-y-0.5">
                <Label htmlFor="status" className="text-sm font-medium">
                  Status
                </Label>
                <p className="text-xs text-muted-foreground">
                  {isPublished ? "Visible to everyone" : "Hidden from public"}
                </p>
              </div>
              <Switch
                id="status"
                checked={isPublished}
                onCheckedChange={(checked) =>
                  setValue("status", checked ? "approved" : "pending")
                }
              />
            </div>

            {/* Featured Checkbox */}
            <AnimatePresence>
              {isPublished && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-start gap-3 p-4 rounded-lg border bg-accent/20"
                >
                  <Checkbox
                    id="featured"
                    checked={watch("featured")}
                    onCheckedChange={(checked) => setValue("featured", checked as boolean)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                      Featured on Homepage
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Featured testimonials appear prominently on the homepage
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Footer */}
            <DialogFooter className="gap-2 sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={saving}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving} className="min-w-[140px]">
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Testimonial"
                )}
              </Button>
            </DialogFooter>
          </form>
        </motion.div>
      </DialogContent>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </Dialog>
  );
}
