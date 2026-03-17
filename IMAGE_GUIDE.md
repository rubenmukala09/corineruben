# 📸 Image Guide for Home Page

This guide shows you exactly what images you need, where to get them, and how to add them to your website.

## 🎯 Quick Start

1. **Download images** from the free stock photo sites listed below
2. **Save images** to the `src/assets/` folder
3. **Replace placeholder paths** in the code
4. **Test** to make sure images load correctly

---

## 📋 Images Needed for Home Page

### 1. **Hero Section Images**

#### Main Hero Background
- **What**: Large background image for the main hero section
- **Content Ideas**:
  - Senior using tablet/smartphone confidently
  - Family video call showing multiple generations
  - Happy Ohio family with technology
- **Specs**:
  - Size: 1920x1080px (16:9 ratio)
  - Format: JPG or WebP
  - Quality: High resolution
- **Where to Save**: `src/assets/hero-family-technology.jpg`
- **Search Terms**: "senior smartphone", "family video call", "multi-generational technology"

---

### 2. **How It Works Section Images**

#### AI Monitoring Dashboard (Step 1)
- **What**: Visual representation of AI security monitoring
- **Content Ideas**:
  - Abstract tech dashboard with clean design
  - Security shield with digital elements
  - AI protection interface (modern, not scary)
- **Specs**:
  - Size: 400x300px (4:3 ratio)
  - Format: PNG or WebP (transparent background works well)
  - Quality: Medium-high resolution
- **Where to Save**: `src/assets/ai-monitoring-dashboard.jpg` or `.png`
- **Search Terms**: "ai dashboard", "cybersecurity interface", "digital protection"

#### Workshop Training (Step 2)
- **What**: Friendly instructor teaching seniors
- **Content Ideas**:
  - Workshop classroom with engaged students
  - One-on-one training session
  - Instructor helping senior with computer
- **Specs**:
  - Size: 400x300px (4:3 ratio)
  - Format: JPG or WebP
  - Quality: Medium-high resolution
- **Where to Save**: `src/assets/workshop-training.jpg`
- **Search Terms**: "senior computer class", "technology workshop", "instructor teaching seniors"

#### Customer Support (Step 3)
- **What**: Friendly customer support representative
- **Content Ideas**:
  - Person answering phone with smile
  - Team member helping customer
  - Supportive, approachable staff photo
- **Specs**:
  - Size: 400x300px (4:3 ratio)
  - Format: JPG or WebP
  - Quality: Medium-high resolution
- **Where to Save**: `src/assets/customer-support.jpg`
- **Search Terms**: "customer service representative", "friendly phone support", "help desk"

---

### 3. **Happy Families Section**

#### Protected Families Image
- **What**: Multi-generational family using technology happily
- **Content Ideas**:
  - Grandparent video calling grandchild
  - Family gathered around computer/tablet
  - Multiple generations enjoying technology together
- **Specs**:
  - Size: 800x600px (4:3 ratio)
  - Format: JPG or WebP
  - Quality: High resolution
- **Where to Save**: `src/assets/happy-family-technology.jpg`
- **Search Terms**: "family video chat", "grandparent grandchild computer", "multi-generational technology"

---

## 🌐 Where to Get FREE Quality Images

### Best Free Stock Photo Sites

1. **Unsplash** (https://unsplash.com)
   - ✅ High quality, professional photos
   - ✅ Completely free, no attribution required
   - ✅ Great search functionality
   - 💡 Best for: Hero images, lifestyle photos

2. **Pexels** (https://pexels.com)
   - ✅ Huge library of free stock photos
   - ✅ Good selection of senior/family photos
   - ✅ Videos also available
   - 💡 Best for: People photos, family scenes

3. **Pixabay** (https://pixabay.com)
   - ✅ Large variety of images
   - ✅ Also has illustrations and vectors
   - ✅ Multiple sizes available
   - 💡 Best for: Abstract tech visuals, backgrounds

4. **Freepik** (https://freepik.com)
   - ✅ Photos, vectors, and PSD files
   - ⚠️ Free with attribution (or paid plan)
   - 💡 Best for: Graphics, icons, illustrations

### Recommended Search Terms by Category

**For Seniors & Technology**:
- "senior using smartphone"
- "elderly woman tablet"
- "grandfather video call"
- "senior learning computer"

**For Families**:
- "family video chat"
- "multi-generational technology"
- "grandparent grandchild laptop"
- "family on phone call"

**For Workshops/Training**:
- "computer class seniors"
- "technology workshop"
- "instructor teaching elderly"
- "learning computer skills"

**For Customer Support**:
- "friendly customer service"
- "phone support representative"
- "help desk professional"
- "customer care agent"

**For Abstract/Tech**:
- "cybersecurity concept"
- "ai technology abstract"
- "digital protection"
- "tech dashboard interface"

---

## 🛠️ How to Add Images to Your Website

### Step 1: Download the Image
1. Go to one of the free stock photo sites above
2. Search using recommended terms
3. Download the image in the recommended size
4. Rename it to match the suggested filename

### Step 2: Save to Assets Folder
1. Open your project folder
2. Navigate to `src/assets/`
3. Save the downloaded image there
4. Example: `src/assets/hero-family-technology.jpg`

### Step 3: Update the Code

The placeholder components are already set up in:
`src/components/home/ImagePlaceholders.tsx`

**Example**: To replace the Hero Background image:

```tsx
// Find this in ImagePlaceholders.tsx:
<OptimizedImage
  src="/assets/hero-family-technology.jpg" // ← Replace this path
  alt="Ohio family safely using technology together"
  priority={true}
  objectFit="cover"
  className={className}
/>

// Change to your actual filename:
<OptimizedImage
  src="/assets/my-actual-hero-image.jpg" // ← Your new filename
  alt="Ohio family safely using technology together"
  priority={true}
  objectFit="cover"
  className={className}
/>
```

### Step 4: Test
1. Start your development server: `npm run dev`
2. Open the home page
3. Scroll through to see all images
4. Check that they load correctly

---

## 📐 Image Optimization Tips

### Before Uploading:
1. **Resize images** to recommended dimensions (don't use 5000px images for 400px display)
2. **Compress images** using TinyPNG (https://tinypng.com) or Squoosh (https://squoosh.app)
3. **Choose the right format**:
   - JPG for photos
   - PNG for graphics with transparency
   - WebP for best compression (modern browsers)

### Recommended File Sizes:
- Hero images: < 500 KB
- Section images: < 200 KB
- Icons/small images: < 50 KB

---

## 🎨 Image Specifications Summary

| Section | Size | Format | Where to Save |
|---------|------|--------|---------------|
| Hero Background | 1920x1080px | JPG/WebP | `src/assets/hero-family-technology.jpg` |
| AI Monitoring | 400x300px | PNG/WebP | `src/assets/ai-monitoring-dashboard.png` |
| Workshop Training | 400x300px | JPG/WebP | `src/assets/workshop-training.jpg` |
| Customer Support | 400x300px | JPG/WebP | `src/assets/customer-support.jpg` |
| Happy Family | 800x600px | JPG/WebP | `src/assets/happy-family-technology.jpg` |

---

## 🔧 Troubleshooting

### Image Not Showing?
1. Check the file path is correct
2. Make sure the image is in `src/assets/` folder
3. Check the filename matches exactly (case-sensitive!)
4. Clear browser cache and refresh

### Image Looks Pixelated?
1. Download a higher resolution version
2. Make sure the image is at least the recommended size
3. Use JPG quality 80-90% when saving

### Image Takes Too Long to Load?
1. Compress the image using TinyPNG or Squoosh
2. Reduce image dimensions if they're too large
3. Convert to WebP format for better compression

---

## 📞 Need Help?

If you need help finding the right images or adding them to your site, just ask! I can help you:
- Find specific images
- Optimize images for web
- Fix any issues with image loading
- Add more image placeholders anywhere you need them

---

## ✅ Checklist

Use this to track your progress:

- [ ] Downloaded hero background image
- [ ] Downloaded AI monitoring image
- [ ] Downloaded workshop training image
- [ ] Downloaded customer support image
- [ ] Downloaded happy family image
- [ ] Saved all images to `src/assets/` folder
- [ ] Updated paths in `ImagePlaceholders.tsx`
- [ ] Tested all images load correctly
- [ ] Optimized image file sizes
- [ ] Checked images look good on mobile

---

**Pro Tip**: Start with the hero background image first—it has the biggest visual impact and will help you see the design come together! 🎉
