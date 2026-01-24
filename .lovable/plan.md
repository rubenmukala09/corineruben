

# Hero Images & Decorative Photos Enhancement Plan

## Overview
Update 3 hero images with better InVision Network branding and add natural, high-quality decorative photos throughout the Training and Business pages.

---

## Section 1: Hero Images to Generate/Update

### 1.1 Contact Page Hero
**Current Issue:** The "InVision Network" branding on the wall is not clearly visible

**Generation Prompt:**
```
Professional African American woman with curly hair at a welcoming reception desk, 
warm smile, modern office lobby with frosted glass wall prominently displaying 
"InVision Network" logo, warm golden hour lighting, photorealistic DSLR quality, 
16:9 aspect ratio
```

### 1.2 Business Page Hero  
**Current Issue:** Too "cyber" looking, needs to be more natural and professional

**Generation Prompt:**
```
Diverse group of business professionals collaborating around a conference table 
with laptops and tablets, modern bright office with large windows and natural light, 
subtle "InVision Network" signage visible on glass partition, warm authentic smiles, 
photorealistic DSLR quality, no futuristic/sci-fi elements, 16:9 aspect ratio
```

### 1.3 Training Page Hero
**Current Issue:** Needs a nicer, more inspiring image for the learning context

**Generation Prompt:**
```
Seniors and family members learning together in a bright community center classroom, 
natural sunlight through windows, instructor demonstrating on whiteboard, 
genuine expressions of engagement and curiosity, warm hopeful atmosphere, 
subtle InVision Network banner visible, photorealistic DSLR quality, 16:9 aspect ratio
```

---

## Section 2: Decorative Photos for Training Page

Add 4 natural, high-quality decorative photos throughout the Training page sections:

| Location | Existing Asset to Use | Purpose |
|----------|----------------------|---------|
| Why Families Trust Section | `community-training.jpg` | Right-side floating accent |
| How It Works Section | `workshop-instructor.jpg` | Left-side background decoration |
| Scam Prevention Workshops | `workshop-seniors-learning.jpg` | Background pattern |
| Trust Pillars Grid | `senior-learning.jpg` | Corner accent image |

**Implementation Style:**
- Use `opacity-20` for subtle background accents
- Apply `hidden lg:block` to show only on desktop (keep mobile clean)
- Use `aria-hidden="true"` for accessibility
- Round corners with `rounded-2xl overflow-hidden`

---

## Section 3: Decorative Photos for Business Page

Add 4 natural, professional photos throughout the Business page:

| Location | Existing Asset to Use | Purpose |
|----------|----------------------|---------|
| What We Build Section | `business-professionals-office.jpg` | Right-side accent |
| Website Insurance Section | `security-expert.jpg` | Left floating decoration |
| AI Services Section | `team-collaboration.jpg` | Background element |
| AI Insurance Section | `business-team-office.jpg` | Section divider accent |

**Implementation Style:**
- Same opacity and visibility rules as Training page
- Positioned with `absolute` within section containers
- Natural photos only - no AI-generated or cyber/futuristic imagery

---

## Section 4: File Changes Summary

### New Assets to Generate
| File | Description |
|------|-------------|
| `hero-branded-contact-new.jpg` | Replace with new reception scene |
| `hero-branded-business-new.jpg` | Replace with natural office scene |
| `hero-nature-training.jpg` | Replace with new community learning scene |

### Files to Modify

**`src/pages/Training.tsx`**
- Add imports for 4 decorative images
- Insert decorative image components in 4 sections:
  - Lines ~440: "Why Families Trust" section
  - Lines ~543: "How It Works" section  
  - Lines ~632: "Scam Prevention Workshops" section
  - Lines ~580: Trust pillars area

**`src/pages/Business.tsx`**
- Add imports for 4 decorative images
- Insert decorative image components in 4 sections:
  - Lines ~257: "What We Build" section
  - Lines ~877: "Website Insurance" section
  - Lines ~1200: "AI Services" section
  - Lines ~1339: "AI Insurance" section

**`src/config/professionalHeroImages.ts`**
- Update alt text for new hero images

---

## Section 5: Technical Implementation Details

### Decorative Image Component Pattern
```tsx
{/* Decorative Image - Desktop Only */}
<div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 w-64 h-64 rounded-2xl overflow-hidden opacity-20 pointer-events-none">
  <img 
    src={decorativeImage} 
    alt="" 
    className="w-full h-full object-cover"
    aria-hidden="true"
  />
</div>
```

### Image Import Pattern
```tsx
import communityTraining from "@/assets/community-training.jpg";
import workshopInstructor from "@/assets/workshop-instructor.jpg";
import seniorLearning from "@/assets/senior-learning.jpg";
import workshopSeniorsLearning from "@/assets/workshop-seniors-learning.jpg";
```

---

## Section 6: Image Selection Criteria

All decorative photos will meet these requirements:
- Natural, photorealistic appearance (NOT AI-generated looking)
- Warm, authentic human expressions
- Good lighting and composition
- Professional but approachable
- Diverse representation
- No cyber/futuristic/sci-fi elements
- Subtle InVision Network branding where appropriate

---

## Section 7: Expected Outcomes

1. **Contact Page:** Clear, prominent InVision Network branding on reception wall
2. **Business Page:** Professional, warm office environment (not cyber/tech heavy)
3. **Training Page:** Inspiring learning environment with hope and empowerment
4. **Both Pages:** Enhanced visual richness with tasteful decorative photos that add depth without distraction

