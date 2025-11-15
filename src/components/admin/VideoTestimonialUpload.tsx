import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Upload, Video, Image as ImageIcon, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface VideoTestimonialUploadProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export function VideoTestimonialUpload({ open, onOpenChange, onSuccess }: VideoTestimonialUploadProps) {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    location: "",
    rating: 5,
    story: "",
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string>("");

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Video must be under 100MB",
          variant: "destructive",
        });
        return;
      }
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
    }
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      toast({
        title: "Video required",
        description: "Please upload a video file",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setProgress(10);

    try {
      // Create testimonial first
      const { data: testimonial, error: testimonialError } = await supabase
        .from("testimonials")
        .insert({
          name: formData.name,
          email: formData.email,
          location: formData.location,
          rating: formData.rating,
          story: formData.story,
          status: "pending",
          has_video: true,
        })
        .select()
        .single();

      if (testimonialError) throw testimonialError;
      setProgress(30);

      // Upload video
      const videoPath = `testimonials/${testimonial.id}/${Date.now()}_${videoFile.name}`;
      const { error: videoError } = await supabase.storage
        .from("testimonial-videos")
        .upload(videoPath, videoFile);

      if (videoError) throw videoError;
      setProgress(60);

      const { data: { publicUrl: videoUrl } } = supabase.storage
        .from("testimonial-videos")
        .getPublicUrl(videoPath);

      // Upload thumbnail if provided
      let thumbnailUrl = null;
      if (thumbnailFile) {
        const thumbPath = `testimonials/${testimonial.id}/thumbnail_${Date.now()}.jpg`;
        const { error: thumbError } = await supabase.storage
          .from("testimonial-images")
          .upload(thumbPath, thumbnailFile);

        if (!thumbError) {
          const { data: { publicUrl } } = supabase.storage
            .from("testimonial-images")
            .getPublicUrl(thumbPath);
          thumbnailUrl = publicUrl;
        }
      }
      setProgress(80);

      // Process video
      await supabase.functions.invoke("process-testimonial-video", {
        body: {
          testimonialId: testimonial.id,
          videoUrl,
          thumbnailUrl,
          fileSize: videoFile.size,
          mimeType: videoFile.type,
        },
      });

      setProgress(100);
      toast({
        title: "Success!",
        description: "Video testimonial uploaded successfully",
      });

      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error: any) {
      console.error("Error uploading video testimonial:", error);
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({ name: "", email: "", location: "", rating: 5, story: "" });
    setVideoFile(null);
    setThumbnailFile(null);
    setVideoPreview("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Video Testimonial</DialogTitle>
          <DialogDescription>Step {step} of 2</DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="rating">Rating</Label>
              <Input
                id="rating"
                type="number"
                min="1"
                max="5"
                value={formData.rating}
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              />
            </div>

            <div>
              <Label htmlFor="story">Story *</Label>
              <Textarea
                id="story"
                value={formData.story}
                onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                rows={4}
                required
              />
            </div>

            <Button
              onClick={() => setStep(2)}
              className="w-full"
              disabled={!formData.name || !formData.email || !formData.location || !formData.story}
            >
              Next: Upload Video
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <Label>Video File * (Max 100MB)</Label>
              <div className="mt-2">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary">
                    {videoPreview ? (
                      <div>
                        <Video className="mx-auto h-12 w-12 text-primary mb-2" />
                        <p className="text-sm font-medium">{videoFile?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(videoFile!.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                        <p className="text-sm">Click to upload video</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            <div>
              <Label>Thumbnail (Optional)</Label>
              <div className="mt-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                  id="thumbnail-upload"
                />
                <label htmlFor="thumbnail-upload">
                  <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary">
                    {thumbnailFile ? (
                      <div>
                        <ImageIcon className="mx-auto h-8 w-8 text-primary mb-1" />
                        <p className="text-xs">{thumbnailFile.name}</p>
                      </div>
                    ) : (
                      <div>
                        <ImageIcon className="mx-auto h-8 w-8 text-muted-foreground mb-1" />
                        <p className="text-xs">Add custom thumbnail</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>

            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-center text-muted-foreground">Uploading... {progress}%</p>
              </div>
            )}

            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setStep(1)} disabled={uploading} className="flex-1">
                Back
              </Button>
              <Button onClick={handleSubmit} disabled={!videoFile || uploading} className="flex-1">
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  "Upload Testimonial"
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}