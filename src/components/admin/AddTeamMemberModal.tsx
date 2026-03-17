import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import {
  Camera,
  Upload,
  X,
  Linkedin,
  Mail,
  Phone as PhoneIcon,
  Bold,
  Italic,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AddTeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (member: any) => void;
  onUpdate?: (member: any) => void;
  nextOrderNumber: number;
  editMember?: any;
}

export function AddTeamMemberModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  nextOrderNumber,
  editMember,
}: AddTeamMemberModalProps) {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const isEditMode = !!editMember;
  const isFounder = editMember?.isFounder;

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    linkedin: "",
    email: "",
    phone: "",
    displayOnAbout: true,
    displayEmail: false,
    displayPhone: false,
    displayOrder: nextOrderNumber,
  });

  const [photo, setPhoto] = useState<string | null>(null);
  const [photoZoom, setPhotoZoom] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDragging, setIsDragging] = useState(false);

  // Load edit data when modal opens
  useEffect(() => {
    if (editMember && isOpen) {
      setFormData({
        name: editMember.name || "",
        title: editMember.role || "",
        bio: editMember.bio || "",
        linkedin: editMember.linkedin || "",
        email: editMember.email || "",
        phone: editMember.phone || "",
        displayOnAbout: editMember.showOnAbout ?? true,
        displayEmail: editMember.displayEmail ?? false,
        displayPhone: editMember.displayPhone ?? false,
        displayOrder: editMember.displayOrder || nextOrderNumber,
      });
      setPhoto(editMember.avatar || null);
      setPhotoZoom(1);
    }
  }, [editMember, isOpen, nextOrderNumber]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload an image smaller than 2MB",
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPG or PNG image",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPhoto(e.target?.result as string);
      setPhotoZoom(1);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handlePhoneChange = (value: string) => {
    // Auto-format phone number
    const cleaned = value.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length >= 6) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
    } else if (cleaned.length >= 3) {
      formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    const nameParts = formData.name.trim().split(/\s+/);
    if (nameParts.length < 2) {
      newErrors.name = "Please enter first and last name";
    }

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }

    // LinkedIn validation
    if (
      formData.linkedin &&
      !formData.linkedin.match(/^https?:\/\/(www\.)?linkedin\.com\//)
    ) {
      newErrors.linkedin = "Please enter a valid LinkedIn URL";
    }

    // Email validation
    if (formData.email && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    // Founder validation
    if (isFounder && formData.displayOrder !== 1) {
      toast({
        title: "Invalid Order",
        description: "The founder must have display order 1",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const memberData = {
      id: editMember?.id || Math.random().toString(36).substring(7),
      name: formData.name,
      role: formData.title,
      bio: formData.bio,
      linkedin: formData.linkedin,
      email: formData.email,
      phone: formData.phone,
      avatar: photo || "/placeholder.svg",
      displayOrder: formData.displayOrder,
      showOnAbout: formData.displayOnAbout,
      displayEmail: formData.displayEmail,
      displayPhone: formData.displayPhone,
      status: editMember?.status || "active",
      department: editMember?.department || "Team",
      location: editMember?.location || "",
      joinDate: editMember?.joinDate || new Date().toISOString(),
      isFounder: editMember?.isFounder || false,
    };

    if (isEditMode && onUpdate) {
      onUpdate(memberData);
    } else {
      onAdd(memberData);
    }

    setIsSaving(false);
    setShowSuccess(true);

    // Show success animation then close
    setTimeout(() => {
      setShowSuccess(false);
      handleClose();
      toast({
        title: isEditMode ? "Team Member Updated" : "Team Member Added",
        description: `${formData.name} has been ${isEditMode ? "updated" : "added to the team"}`,
      });
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      name: "",
      title: "",
      bio: "",
      linkedin: "",
      email: "",
      phone: "",
      displayOnAbout: true,
      displayEmail: false,
      displayPhone: false,
      displayOrder: nextOrderNumber,
    });
    setPhoto(null);
    setPhotoZoom(1);
    setErrors({});
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            {isEditMode ? "Edit Team Member" : "Add Team Member"}
            {isFounder && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                Founder
              </Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {isFounder ? (
              <span className="text-muted-foreground">
                This is the founder profile. Display order must remain 1.
              </span>
            ) : (
              <span>
                {isEditMode
                  ? "Update team member information and visibility settings"
                  : "Add a new member to your team and control their visibility on the About page"}
              </span>
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Left Side - Form */}
            <div className="space-y-6">
              {/* Profile Photo */}
              <div className="space-y-3">
                <Label>Profile Photo</Label>
                <div className="flex flex-col items-center gap-4">
                  {/* Upload Area */}
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => !photo && fileInputRef.current?.click()}
                    className={cn(
                      "relative cursor-pointer transition-all duration-300",
                      isDragging && "scale-105",
                    )}
                  >
                    <Avatar
                      className={cn(
                        "h-[200px] w-[200px] border-4 transition-all",
                        photo
                          ? "border-background ring-2 ring-border"
                          : "border-dashed border-muted-foreground/50 hover:border-primary",
                        isDragging &&
                          "border-primary border-solid ring-4 ring-primary/20",
                      )}
                    >
                      {photo ? (
                        <AvatarImage
                          src={photo}
                          style={{ transform: `scale(${photoZoom})` }}
                          className="transition-transform"
                        />
                      ) : (
                        <AvatarFallback
                          className={cn(
                            "bg-muted transition-colors",
                            isDragging && "bg-primary/10",
                          )}
                        >
                          <div className="flex flex-col items-center gap-2 text-center">
                            <Camera className="h-16 w-16 text-muted-foreground" />
                            <div className="text-xs text-muted-foreground px-4">
                              <p className="font-medium">Drag & drop</p>
                              <p>or click to upload</p>
                            </div>
                          </div>
                        </AvatarFallback>
                      )}
                    </Avatar>
                  </div>

                  {photo ? (
                    <>
                      {/* Zoom Slider */}
                      <div className="w-full space-y-2">
                        <Label className="text-xs">Zoom & Position</Label>
                        <Slider
                          value={[photoZoom]}
                          onValueChange={(value) => setPhotoZoom(value[0])}
                          min={1}
                          max={2}
                          step={0.1}
                          className="w-full"
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 w-full">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          className="flex-1"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Change Photo
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setPhoto(null);
                            setPhotoZoom(1);
                          }}
                          className="flex-1"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground text-center">
                        Drag the image to reposition • Adjust zoom slider
                      </p>
                    </>
                  ) : (
                    <div className="text-center space-y-2 w-full">
                      <p className="text-sm font-medium text-muted-foreground">
                        Size: 200×200px (circular)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Accepts JPG or PNG • Max 2MB
                      </p>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              </div>

              <Separator />

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Full Name"
                  className={errors.name ? "border-destructive" : ""}
                />
                {errors.name && (
                  <p className="text-xs text-destructive">{errors.name}</p>
                )}
              </div>

              {/* Job Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Job Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  placeholder="Security Specialist"
                  className={errors.title ? "border-destructive" : ""}
                />
                {errors.title && (
                  <p className="text-xs text-destructive">{errors.title}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Examples: Lead Analyst, Training Coordinator
                </p>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, bio: e.target.value }))
                  }
                  placeholder="Brief description of expertise and background..."
                  maxLength={500}
                  rows={4}
                  className="resize-none"
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" type="button">
                      <Bold className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" type="button">
                      <Italic className="h-3 w-3" />
                    </Button>
                  </div>
                  <p
                    className={cn(
                      "text-xs",
                      formData.bio.length > 450
                        ? "text-destructive font-semibold"
                        : "text-muted-foreground",
                    )}
                  >
                    {formData.bio.length}/500
                  </p>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn Profile</Label>
                <div className="relative">
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        linkedin: e.target.value,
                      }))
                    }
                    placeholder="https://linkedin.com/in/..."
                    className={cn(
                      errors.linkedin && "border-destructive",
                      formData.linkedin.match(
                        /^https?:\/\/(www\.)?linkedin\.com\//,
                      ) && "pr-10",
                    )}
                  />
                  {formData.linkedin.match(
                    /^https?:\/\/(www\.)?linkedin\.com\//,
                  ) && (
                    <Linkedin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-600" />
                  )}
                </div>
                {errors.linkedin && (
                  <p className="text-xs text-destructive">{errors.linkedin}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="name@invisionnetwork.org"
                  className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
                <div className="flex items-center justify-between">
                  <Label htmlFor="displayEmail" className="text-sm font-normal">
                    Display email on About page
                  </Label>
                  <Switch
                    id="displayEmail"
                    checked={formData.displayEmail}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        displayEmail: checked,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="space-y-3">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder="(937) 000-0000"
                />
                <div className="flex items-center justify-between">
                  <Label htmlFor="displayPhone" className="text-sm font-normal">
                    Display phone on About page
                  </Label>
                  <Switch
                    id="displayPhone"
                    checked={formData.displayPhone}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        displayPhone: checked,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Display on About Page */}
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div>
                  <Label
                    htmlFor="displayOnAbout"
                    className="text-base font-semibold"
                  >
                    Display on About Page?
                  </Label>
                  <p className="text-sm text-muted-foreground mt-1">
                    You can enable this later
                  </p>
                </div>
                <Switch
                  id="displayOnAbout"
                  checked={formData.displayOnAbout}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      displayOnAbout: checked,
                    }))
                  }
                />
              </div>

              {/* Display Order */}
              <div className="space-y-2">
                <Label htmlFor="displayOrder">Display Order</Label>
                <Input
                  id="displayOrder"
                  type="number"
                  min="1"
                  value={formData.displayOrder}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      displayOrder: parseInt(e.target.value) || 1,
                    }))
                  }
                  disabled={isFounder}
                />
                {isFounder ? (
                  <p className="text-xs text-muted-foreground">
                    Founder must always be first
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Lower numbers appear first
                  </p>
                )}
              </div>
            </div>

            {/* Right Side - Live Preview */}
            <div className="space-y-4">
              <div className="sticky top-0">
                <Label className="text-lg font-semibold">Preview</Label>
                <p className="text-sm text-muted-foreground mb-4">
                  How this will look on the About page
                </p>

                <Card className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center space-y-4">
                      {/* Avatar */}
                      <Avatar className="h-32 w-32 border-4 border-background ring-2 ring-border">
                        {photo ? (
                          <AvatarImage
                            src={photo}
                            style={{ transform: `scale(${photoZoom})` }}
                          />
                        ) : (
                          <AvatarFallback className="text-2xl">
                            {formData.name
                              ? formData.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")
                              : "?"}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      {/* Name & Title */}
                      <div>
                        <h3 className="text-xl font-bold">
                          {formData.name || "Full Name"}
                        </h3>
                        <p className="text-muted-foreground">
                          {formData.title || "Job Title"}
                        </p>
                      </div>

                      {/* Bio */}
                      {formData.bio && (
                        <p className="text-sm text-muted-foreground">
                          {formData.bio}
                        </p>
                      )}

                      {/* Contact Info */}
                      <div className="space-y-2 w-full">
                        {formData.linkedin && (
                          <a
                            href={formData.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-blue-600 hover:underline justify-center"
                          >
                            <Linkedin className="h-4 w-4" />
                            Connect on LinkedIn
                          </a>
                        )}
                        {formData.displayEmail && formData.email && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                            <Mail className="h-4 w-4" />
                            {formData.email}
                          </div>
                        )}
                        {formData.displayPhone && formData.phone && (
                          <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
                            <PhoneIcon className="h-4 w-4" />
                            {formData.phone}
                          </div>
                        )}
                      </div>

                      {/* Visibility Badge */}
                      {!formData.displayOnAbout && (
                        <Badge variant="secondary">
                          Hidden from About page
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t">
          <Button variant="outline" onClick={handleClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSaving}
            className="min-w-[160px]"
          >
            {showSuccess ? (
              <span className="flex items-center gap-2">
                <span className="animate-scale-in">✓</span>
                Saved!
              </span>
            ) : isSaving ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                Saving...
              </span>
            ) : isEditMode ? (
              "Save Changes"
            ) : (
              "Add Team Member"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
