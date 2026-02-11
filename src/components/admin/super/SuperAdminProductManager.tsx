import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminAudit } from '@/hooks/useAdminAudit';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BookOpen,
  Upload,
  Plus,
  Loader2,
  Package,
  DollarSign,
  FileText,
  Image,
  Trash2,
  RefreshCw,
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string | null;
  base_price: number;
  status: string;
  sku: string;
  file_url?: string | null;
  cover_image_url?: string | null;
  product_type?: string | null;
  created_at: string;
  sales_count: number | null;
}

export default function SuperAdminProductManager() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const { logAction } = useAdminAudit();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    productType: 'digital',
  });
  const [productFile, setProductFile] = useState<File | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch products',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSku = () => {
    return `PROD-${Date.now().toString(36).toUpperCase()}`;
  };

  const handleCreateProduct = async () => {
    if (!formData.name || !formData.price) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(10);

      let fileUrl = null;
      let coverUrl = null;

      // Upload product file if provided
      if (productFile) {
        setUploadProgress(30);
        const fileExt = productFile.name.split('.').pop();
        const fileName = `${generateSku()}.${fileExt}`;
        
        const { data: fileData, error: fileError } = await supabase.storage
          .from('digital-products')
          .upload(`products/${fileName}`, productFile);

        if (fileError) throw fileError;
        fileUrl = fileData?.path;
        setUploadProgress(50);
      }

      // Upload cover image if provided
      if (coverImage) {
        setUploadProgress(60);
        const imgExt = coverImage.name.split('.').pop();
        const imgName = `${generateSku()}-cover.${imgExt}`;
        
        const { data: imgData, error: imgError } = await supabase.storage
          .from('digital-products')
          .upload(`covers/${imgName}`, coverImage);

        if (imgError) throw imgError;
        
        const { data: { publicUrl } } = supabase.storage
          .from('digital-products')
          .getPublicUrl(`covers/${imgName}`);
        
        coverUrl = publicUrl;
        setUploadProgress(80);
      }

      // Get first partner for partner_id requirement
      const { data: partners } = await supabase
        .from('partners')
        .select('id')
        .limit(1);

      const partnerId = partners?.[0]?.id;

      if (!partnerId) {
        // Create a default partner if none exists
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error('Not authenticated');

        const { data: newPartner, error: partnerError } = await supabase
          .from('partners')
          .insert({
            user_id: user.id,
            business_name: 'InVision Network',
            business_email: user.email || 'admin@invision.network',
            partner_type: 'retail',
            status: 'active'
          })
          .select()
          .single();

        if (partnerError) throw partnerError;
        
        const { error: productError } = await supabase
          .from('products')
          .insert({
            name: formData.name,
            description: formData.description,
            base_price: parseFloat(formData.price),
            sku: generateSku(),
            slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
            status: 'active',
            partner_id: newPartner.id,
          });

        if (productError) throw productError;
      } else {
        const { error: productError } = await supabase
          .from('products')
          .insert({
            name: formData.name,
            description: formData.description,
            base_price: parseFloat(formData.price),
            sku: generateSku(),
            slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
            status: 'active',
            partner_id: partnerId,
          });

        if (productError) throw productError;
      }

      setUploadProgress(100);
      
      await logAction('create_product', 'product', undefined, {
        name: formData.name,
        price: formData.price,
        type: formData.productType,
      });

      toast({
        title: 'Product Created',
        description: `${formData.name} has been added to your store`,
      });

      // Reset form
      setFormData({ name: '', description: '', price: '', productType: 'digital' });
      setProductFile(null);
      setCoverImage(null);
      setShowAddDialog(false);
      fetchProducts();
    } catch (error: any) {
      console.error('Error creating product:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to create product',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  const getProductTypeBadge = (type: string | null) => {
    const types: Record<string, { color: string; icon: React.ReactNode }> = {
      digital: { color: 'bg-blue-500', icon: <FileText className="w-3 h-3" /> },
      book: { color: 'bg-purple-500', icon: <BookOpen className="w-3 h-3" /> },
      physical: { color: 'bg-green-500', icon: <Package className="w-3 h-3" /> },
      subscription: { color: 'bg-orange-500', icon: <RefreshCw className="w-3 h-3" /> },
    };

    const config = types[type || 'digital'] || types.digital;
    
    return (
      <Badge className={`${config.color} flex items-center gap-1`}>
        {config.icon}
        {type || 'digital'}
      </Badge>
    );
  };

  return (
    <Card className="bg-[#111827] border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Product & Book Manager
            </CardTitle>
            <CardDescription className="text-gray-400">
              Upload and manage digital products, books, and downloads
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={fetchProducts}
              className="border-gray-700 text-gray-300 hover:bg-gray-800"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1F2937] border-gray-700 text-white max-w-lg">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Upload a new book or digital product to your store
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Cybersecurity Essentials Guide"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD) *</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        placeholder="29.99"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="bg-gray-800 border-gray-700 pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Product Type</Label>
                    <Select
                      value={formData.productType}
                      onValueChange={(value) => setFormData({ ...formData, productType: value })}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-700">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700">
                        <SelectItem value="digital">Digital Download</SelectItem>
                        <SelectItem value="book">E-Book</SelectItem>
                        <SelectItem value="physical">Physical Product</SelectItem>
                        <SelectItem value="subscription">Subscription</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your product..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-gray-800 border-gray-700 min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-purple-500 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                        className="hidden"
                        id="cover-upload"
                      />
                      <label htmlFor="cover-upload" className="cursor-pointer">
                        <Image className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                        <p className="text-sm text-gray-400">
                          {coverImage ? coverImage.name : 'Click to upload cover image'}
                        </p>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Product File (PDF, EPUB, etc.)</Label>
                    <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center hover:border-purple-500 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.epub,.mobi,.zip"
                        onChange={(e) => setProductFile(e.target.files?.[0] || null)}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto text-gray-500 mb-2" />
                        <p className="text-sm text-gray-400">
                          {productFile ? productFile.name : 'Click to upload product file'}
                        </p>
                      </label>
                    </div>
                  </div>
                  {uploading && (
                    <div className="space-y-2">
                      <Progress value={uploadProgress} className="h-2" />
                      <p className="text-xs text-gray-400 text-center">Uploading... {uploadProgress}%</p>
                    </div>
                  )}
                </div>
                <DialogFooter>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddDialog(false)}
                    className="border-gray-600"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleCreateProduct}
                    disabled={uploading}
                    className="bg-gradient-to-r from-purple-500 to-pink-500"
                  >
                    {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Create Product
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-300">No Products Yet</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first product</p>
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Product
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <Card key={product.id} className="bg-gray-800/50 border-gray-700 overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  {product.cover_image_url ? (
                    <img 
                      src={product.cover_image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <BookOpen className="w-12 h-12 text-purple-400" />
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-white truncate">{product.name}</h3>
                    {getProductTypeBadge(product.product_type)}
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                    {product.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-400">
                      ${product.base_price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.sales_count || 0} sales
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
        {products.length > 6 && (
          <div className="mt-4 text-center">
            <Button variant="outline" className="border-gray-700 text-gray-300">
              View All {products.length} Products
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
