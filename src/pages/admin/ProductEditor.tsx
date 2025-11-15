import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save, Eye, Upload, X, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

const ProductEditor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isNew = !id || id === "new";

  const [productData, setProductData] = useState({
    name: "",
    shortDescription: "",
    description: "",
    productType: "physical",
    price: "",
    compareAtPrice: "",
    cost: "",
    sku: "",
    trackInventory: true,
    stockQuantity: "",
    lowStockThreshold: "10",
    allowOverselling: false,
    weight: "",
    weightUnit: "oz",
    length: "",
    width: "",
    height: "",
    shippingClass: "standard",
    downloadFile: null,
    downloadLimit: "",
    onSale: false,
    salePrice: "",
    saleStartDate: "",
    saleEndDate: "",
    veteranDiscount: true,
    status: "draft",
    visibility: "public",
    categories: [] as string[],
    tags: "",
    featured: false,
    seoTitle: "",
    metaDescription: "",
    urlSlug: "",
  });

  const [images, setImages] = useState<string[]>([]);
  const [profitMargin, setProfitMargin] = useState(0);

  const calculateProfitMargin = () => {
    const price = parseFloat(productData.price) || 0;
    const cost = parseFloat(productData.cost) || 0;
    if (price > 0) {
      const margin = ((price - cost) / price) * 100;
      setProfitMargin(margin);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Handle file upload
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      setImages([...images, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const getMarginColor = () => {
    if (profitMargin > 30) return "text-success";
    if (profitMargin >= 15) return "text-yellow-500";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4">
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate("/admin/ecommerce/products")}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{isNew ? "New Product" : "Edit Product"}</h1>
                <p className="text-sm text-muted-foreground">
                  Last saved: {new Date().toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Draft
              </Button>
              <Button variant="outline">
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
              <Button>Publish Product</Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Editor */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Basic Information */}
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Basic Information</h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      placeholder="USB Data Blocker - 2 Pack"
                      value={productData.name}
                      onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                      maxLength={100}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {productData.name.length}/100 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="shortDescription">Short Description</Label>
                    <Textarea
                      id="shortDescription"
                      placeholder="Brief description for product cards..."
                      value={productData.shortDescription}
                      onChange={(e) => setProductData({ ...productData, shortDescription: e.target.value })}
                      maxLength={150}
                      rows={2}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {productData.shortDescription.length}/150 characters
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="description">Product Description</Label>
                    <RichTextEditor
                      content={productData.description}
                      onChange={(value) => setProductData({ ...productData, description: value })}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Recommended: 100-300 words
                    </p>
                  </div>
                </div>
              </Card>

              {/* Product Images */}
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Product Images</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {images.map((image, index) => (
                      <div key={index} className="group relative aspect-square overflow-hidden rounded-lg border">
                        <img src={image} alt={`Product ${index + 1}`} className="h-full w-full object-cover" />
                        {index === 0 && (
                          <Badge className="absolute left-2 top-2">Main</Badge>
                        )}
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    {images.length < 5 && (
                      <label className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed hover:border-primary">
                        <Upload className="mb-2 h-8 w-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Upload Image</span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handleImageUpload}
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload up to 5 images. First image will be the main product image. Max 2MB each.
                  </p>
                </div>
              </Card>

              {/* Product Type */}
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Product Type</h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:border-primary">
                      <input
                        type="radio"
                        name="productType"
                        value="physical"
                        checked={productData.productType === "physical"}
                        onChange={(e) => setProductData({ ...productData, productType: e.target.value })}
                      />
                      <div>
                        <div className="font-medium">Physical Product</div>
                        <div className="text-sm text-muted-foreground">Requires shipping</div>
                      </div>
                    </label>
                    <label className="flex flex-1 cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:border-primary">
                      <input
                        type="radio"
                        name="productType"
                        value="digital"
                        checked={productData.productType === "digital"}
                        onChange={(e) => setProductData({ ...productData, productType: e.target.value })}
                      />
                      <div>
                        <div className="font-medium">Digital Product</div>
                        <div className="text-sm text-muted-foreground">Instant download</div>
                      </div>
                    </label>
                  </div>
                </div>
              </Card>

              {/* Pricing & Inventory */}
              <Card className="p-6">
                <h2 className="mb-4 text-xl font-semibold">Pricing & Inventory</h2>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="price">Price *</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="12.99"
                        value={productData.price}
                        onChange={(e) => {
                          setProductData({ ...productData, price: e.target.value });
                          calculateProfitMargin();
                        }}
                        onBlur={calculateProfitMargin}
                      />
                    </div>
                    <div>
                      <Label htmlFor="compareAtPrice">Compare at Price</Label>
                      <Input
                        id="compareAtPrice"
                        type="number"
                        placeholder="19.99"
                        value={productData.compareAtPrice}
                        onChange={(e) => setProductData({ ...productData, compareAtPrice: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cost">Cost per Item</Label>
                      <Input
                        id="cost"
                        type="number"
                        placeholder="6.50"
                        value={productData.cost}
                        onChange={(e) => {
                          setProductData({ ...productData, cost: e.target.value });
                          calculateProfitMargin();
                        }}
                        onBlur={calculateProfitMargin}
                      />
                    </div>
                  </div>

                  {productData.price && productData.cost && (
                    <div className="rounded-lg border p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Profit Margin:</span>
                        <span className={`font-semibold ${getMarginColor()}`}>
                          {profitMargin.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  )}

                  {productData.productType === "physical" && (
                    <>
                      <Separator />
                      <div>
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                          id="sku"
                          placeholder="PROD-001"
                          value={productData.sku}
                          onChange={(e) => setProductData({ ...productData, sku: e.target.value })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Track Inventory</Label>
                          <p className="text-sm text-muted-foreground">Monitor stock levels</p>
                        </div>
                        <Switch
                          checked={productData.trackInventory}
                          onCheckedChange={(checked) =>
                            setProductData({ ...productData, trackInventory: checked })
                          }
                        />
                      </div>

                      {productData.trackInventory && (
                        <div className="space-y-4 rounded-lg border p-4">
                          <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                              <Label htmlFor="stockQuantity">Quantity in Stock</Label>
                              <Input
                                id="stockQuantity"
                                type="number"
                                placeholder="45"
                                value={productData.stockQuantity}
                                onChange={(e) => setProductData({ ...productData, stockQuantity: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="lowStockThreshold">Low Stock Threshold</Label>
                              <Input
                                id="lowStockThreshold"
                                type="number"
                                placeholder="10"
                                value={productData.lowStockThreshold}
                                onChange={(e) => setProductData({ ...productData, lowStockThreshold: e.target.value })}
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Checkbox
                              id="allowOverselling"
                              checked={productData.allowOverselling}
                              onCheckedChange={(checked) =>
                                setProductData({ ...productData, allowOverselling: checked as boolean })
                              }
                            />
                            <Label htmlFor="allowOverselling" className="font-normal">
                              Allow selling when out of stock
                            </Label>
                          </div>
                        </div>
                      )}

                      <Separator />
                      <h3 className="font-semibold">Shipping Details</h3>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <Label htmlFor="weight">Weight</Label>
                            <Input
                              id="weight"
                              type="number"
                              placeholder="2.4"
                              value={productData.weight}
                              onChange={(e) => setProductData({ ...productData, weight: e.target.value })}
                            />
                          </div>
                          <div className="w-24">
                            <Label htmlFor="weightUnit">Unit</Label>
                            <Select
                              value={productData.weightUnit}
                              onValueChange={(value) => setProductData({ ...productData, weightUnit: value })}
                            >
                              <SelectTrigger id="weightUnit">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="oz">oz</SelectItem>
                                <SelectItem value="lb">lb</SelectItem>
                                <SelectItem value="g">g</SelectItem>
                                <SelectItem value="kg">kg</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-3">
                        <div>
                          <Label htmlFor="length">Length (in)</Label>
                          <Input
                            id="length"
                            type="number"
                            placeholder="6"
                            value={productData.length}
                            onChange={(e) => setProductData({ ...productData, length: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="width">Width (in)</Label>
                          <Input
                            id="width"
                            type="number"
                            placeholder="4"
                            value={productData.width}
                            onChange={(e) => setProductData({ ...productData, width: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor="height">Height (in)</Label>
                          <Input
                            id="height"
                            type="number"
                            placeholder="2"
                            value={productData.height}
                            onChange={(e) => setProductData({ ...productData, height: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="shippingClass">Shipping Class</Label>
                        <Select
                          value={productData.shippingClass}
                          onValueChange={(value) => setProductData({ ...productData, shippingClass: value })}
                        >
                          <SelectTrigger id="shippingClass">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">Standard</SelectItem>
                            <SelectItem value="heavy">Heavy/Bulky</SelectItem>
                            <SelectItem value="fragile">Fragile</SelectItem>
                            <SelectItem value="small">Small Packet</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {productData.productType === "digital" && (
                    <>
                      <Separator />
                      <div>
                        <Label htmlFor="downloadFile">Download File</Label>
                        <div className="mt-2 flex flex-col gap-2">
                          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 hover:border-primary">
                            <Upload className="h-5 w-5" />
                            <span>Upload File or Click to Browse</span>
                            <input type="file" className="hidden" />
                          </label>
                          <span className="text-center text-sm text-muted-foreground">OR</span>
                          <Input placeholder="Paste external URL (Google Drive, Dropbox, etc.)" />
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">Max 50MB. Accepts: PDF, ZIP, DOC, XLS, etc.</p>
                      </div>
                      <div>
                        <Label htmlFor="downloadLimit">Download Limit</Label>
                        <Input
                          id="downloadLimit"
                          type="number"
                          placeholder="Unlimited (leave empty)"
                          value={productData.downloadLimit}
                          onChange={(e) => setProductData({ ...productData, downloadLimit: e.target.value })}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Number of downloads allowed per purchase</p>
                      </div>
                    </>
                  )}
                </div>
              </Card>
            </div>
          </div>

          {/* Right Sidebar - Publishing Options */}
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Product Status</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={productData.status}
                    onValueChange={(value) => setProductData({ ...productData, status: value })}
                  >
                    <SelectTrigger id="status">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="visibility">Visibility</Label>
                  <Select
                    value={productData.visibility}
                    onValueChange={(value) => setProductData({ ...productData, visibility: value })}
                  >
                    <SelectTrigger id="visibility">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="hidden">Hidden</SelectItem>
                      <SelectItem value="password">Password Protected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Organization</h2>
              <div className="space-y-4">
                <div>
                  <Label>Categories</Label>
                  <div className="mt-2 space-y-2">
                    {["Security Tools", "Educational", "Training", "Bundles", "Accessories"].map((cat) => (
                      <div key={cat} className="flex items-center gap-2">
                        <Checkbox id={cat} />
                        <Label htmlFor={cat} className="font-normal">
                          {cat}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    placeholder="security, USB, protection"
                    value={productData.tags}
                    onChange={(e) => setProductData({ ...productData, tags: e.target.value })}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">Comma-separated</p>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="featured"
                    checked={productData.featured}
                    onCheckedChange={(checked) => setProductData({ ...productData, featured: checked as boolean })}
                  />
                  <Label htmlFor="featured" className="font-normal">
                    Featured Product
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="veteranDiscount"
                    checked={productData.veteranDiscount}
                    onCheckedChange={(checked) =>
                      setProductData({ ...productData, veteranDiscount: checked as boolean })
                    }
                  />
                  <Label htmlFor="veteranDiscount" className="font-normal">
                    10% Veteran Discount
                  </Label>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">SEO</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    placeholder={productData.name || "Product name"}
                    value={productData.seoTitle}
                    onChange={(e) => setProductData({ ...productData, seoTitle: e.target.value })}
                    maxLength={60}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">{productData.seoTitle.length}/60 characters</p>
                </div>
                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    placeholder="Brief description for search engines"
                    value={productData.metaDescription}
                    onChange={(e) => setProductData({ ...productData, metaDescription: e.target.value })}
                    maxLength={160}
                    rows={3}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">{productData.metaDescription.length}/160 characters</p>
                </div>
                <div>
                  <Label htmlFor="urlSlug">URL Slug</Label>
                  <Input
                    id="urlSlug"
                    placeholder="auto-generated-from-name"
                    value={productData.urlSlug}
                    onChange={(e) => setProductData({ ...productData, urlSlug: e.target.value })}
                  />
                  <p className="mt-1 text-xs text-muted-foreground">/shop/{productData.urlSlug || "product-url"}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="mb-4 text-lg font-semibold">Publishing Checklist</h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className={`h-2 w-2 rounded-full ${productData.name ? "bg-success" : "bg-muted"}`} />
                  <span className={productData.name ? "text-foreground" : "text-muted-foreground"}>Product name</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`h-2 w-2 rounded-full ${productData.price ? "bg-success" : "bg-muted"}`} />
                  <span className={productData.price ? "text-foreground" : "text-muted-foreground"}>Price set</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`h-2 w-2 rounded-full ${images.length > 0 ? "bg-success" : "bg-muted"}`} />
                  <span className={images.length > 0 ? "text-foreground" : "text-muted-foreground"}>Image uploaded</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className={`h-2 w-2 rounded-full ${productData.description ? "bg-success" : "bg-muted"}`} />
                  <span className={productData.description ? "text-foreground" : "text-muted-foreground"}>
                    Description added
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductEditor;
