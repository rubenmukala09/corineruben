import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2, ExternalLink, Image as ImageIcon, GripVertical } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ExternalLink {
  id: string;
  title: string;
  description: string | null;
  external_url: string;
  image_url: string | null;
  category: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export default function ExternalLinksManagement() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<ExternalLink | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    external_url: "",
    image_url: "",
    category: "Security News",
    is_active: true,
  });

  // Fetch external links
  const { data: links, isLoading } = useQuery({
    queryKey: ['external-security-links'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('external_security_links')
        .select('*')
        .order('display_order', { ascending: true })
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ExternalLink[];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { data: result, error } = await supabase
        .from('external_security_links')
        .insert([{ 
          ...data,
          display_order: links?.length || 0 
        }])
        .select()
        .single();
      
      if (error) throw error;
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['external-security-links'] });
      toast({
        title: "Success",
        description: "External link created successfully",
      });
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<typeof formData> }) => {
      const { error } = await supabase
        .from('external_security_links')
        .update(data)
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['external-security-links'] });
      toast({
        title: "Success",
        description: "External link updated successfully",
      });
      setDialogOpen(false);
      setEditingLink(null);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('external_security_links')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['external-security-links'] });
      toast({
        title: "Success",
        description: "External link deleted successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      external_url: "",
      image_url: "",
      category: "Security News",
      is_active: true,
    });
  };

  const handleEdit = (link: ExternalLink) => {
    setEditingLink(link);
    setFormData({
      title: link.title,
      description: link.description || "",
      external_url: link.external_url,
      image_url: link.image_url || "",
      category: link.category,
      is_active: link.is_active,
    });
    setDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingLink) {
      updateMutation.mutate({ id: editingLink.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleToggleActive = (link: ExternalLink) => {
    updateMutation.mutate({
      id: link.id,
      data: { is_active: !link.is_active }
    });
  };

  const activeLinksCount = links?.filter(l => l.is_active).length || 0;
  const canAddMore = activeLinksCount < 10;

  return (
    <AdminLayout>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">External Security Links</h1>
            <p className="text-muted-foreground mt-1">
              Manage external article links displayed on Resources page ({activeLinksCount}/10 active)
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) {
              setEditingLink(null);
              resetForm();
            }
          }}>
            <DialogTrigger asChild>
              <Button disabled={!canAddMore && !editingLink}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Link
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingLink ? 'Edit' : 'Add'} External Link</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="AI Scams Rising in 2025"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="external_url">External URL *</Label>
                  <Input
                    id="external_url"
                    type="url"
                    value={formData.external_url}
                    onChange={(e) => setFormData({ ...formData, external_url: e.target.value })}
                    placeholder="https://example.com/article"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief summary of the article..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="image_url">Image URL</Label>
                  <Input
                    id="image_url"
                    type="url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image_url && (
                    <div className="mt-2">
                      <img 
                        src={formData.image_url} 
                        alt="Preview"
                        className="w-full max-w-md h-48 object-cover rounded-lg border"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="Security News"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="is_active">Active (visible on website)</Label>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {editingLink ? 'Update' : 'Create'} Link
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Links List */}
      <div className="space-y-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-start gap-4">
                <Skeleton className="w-24 h-24 rounded" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            </Card>
          ))
        ) : links && links.length === 0 ? (
          <Card className="p-12">
            <div className="text-center text-muted-foreground">
              <ExternalLink className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium mb-2">No external links yet</p>
              <p className="text-sm">Add your first external security article link to get started</p>
            </div>
          </Card>
        ) : (
          links?.map((link, index) => (
            <Card key={link.id} className={`p-6 ${!link.is_active ? 'opacity-50' : ''}`}>
              <div className="flex items-start gap-4">
                {/* Drag handle */}
                <div className="flex-shrink-0 cursor-move text-muted-foreground hover:text-foreground">
                  <GripVertical className="w-5 h-5" />
                </div>

                {/* Image */}
                <div className="flex-shrink-0">
                  {link.image_url ? (
                    <img 
                      src={link.image_url} 
                      alt={link.title}
                      className="w-24 h-24 object-cover rounded-lg border"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{link.title}</h3>
                        {link.is_active ? (
                          <Badge variant="default" className="text-xs">Active</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs">Inactive</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">{link.category}</Badge>
                      </div>
                      {link.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                          {link.description}
                        </p>
                      )}
                      <a 
                        href={link.external_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:underline inline-flex items-center gap-1"
                      >
                        {link.external_url.substring(0, 50)}...
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleActive(link)}
                      >
                        {link.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(link)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete External Link</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{link.title}"? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(link.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Display Order: {index + 1} • Created: {new Date(link.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {!canAddMore && links && links.length > 0 && (
        <Card className="p-4 mt-6 bg-muted">
          <p className="text-sm text-muted-foreground text-center">
            <strong>Maximum reached:</strong> You have 10 active links. Deactivate an existing link to add more.
          </p>
        </Card>
      )}
    </AdminLayout>
  );
}