# InterPrep - UI Style Guide

## 🎨 Brand Identity

### App Name
**InterPrep** - Interview Preparation Platform

### Tagline Options
- "Master Your Interview Skills with AI"
- "Ace Your Interviews with AI-Powered Practice"
- "Get Interview-Ready with AI-Powered Practice & Feedback"

---

## 🎨 Color Palette

### Primary Colors
```css
--color-primary-100: #dddfff  /* Light purple */
--color-primary-200: #cac5fe  /* Purple */
--color-light-100: #d6e0ff    /* Light blue */
--color-light-400: #6870a6    /* Medium blue-gray */
--color-light-600: #4f557d    /* Dark blue-gray */
--color-light-800: #24273a    /* Very dark blue */
```

### Background Colors
```css
--color-dark-100: #020408     /* Almost black */
--color-dark-200: #27282f     /* Dark gray */
--color-dark-300: #242633     /* Dark blue-gray */
```

### Status Colors
```css
--color-success-100: #49de50  /* Green */
--color-destructive-100: #f75353  /* Red */
```

---

## ✨ Typography

### Headings
```tsx
<h2 className="gradient-text">Your Heading</h2>
// Large gradient heading

<h3 className="gradient-text">Section Title</h3>
// Medium gradient heading
```

### Hero Title
```tsx
<h2 className="hero-title">
  Ace Your Interviews with{" "}
  <span className="gradient-text">AI-Powered</span> Practice
</h2>
```

### Body Text
- Default: `text-light-100`
- Secondary: `text-light-400`
- Muted: `text-light-100/90`

---

## 🧩 Component Styles

### Buttons

#### Primary Button
```tsx
<Button className="btn-primary btn-enhanced">
  🚀 Start Your Interview Journey
</Button>
```

#### Secondary Button
```tsx
<Button className="btn-secondary">
  Learn More
</Button>
```

### Cards

#### Interview Card
```tsx
<div className="card-interview">
  {/* Content */}
</div>
// Includes hover effects automatically
```

#### Call to Action Card
```tsx
<section className="card-cta hero-section">
  {/* Content */}
</section>
```

### Navigation
```tsx
<nav className="nav-enhanced">
  <Link href="/" className="nav-brand">
    <Image src="/logo.svg" alt="InterPrep Logo" />
    <h2 className="gradient-text">InterPrep</h2>
  </Link>
</nav>
```

---

## 🎭 Sections

### Section with Icon
```tsx
<section className="section-enhanced">
  <div className="flex items-center gap-3">
    <div className="section-icon">📚</div>
    <h2 className="gradient-text">Your Interview History</h2>
  </div>
  {/* Content */}
</section>
```

### Empty State
```tsx
<div className="empty-state">
  <p className="text-lg">🎯 You haven't taken any interviews yet</p>
  <p className="text-sm text-light-400 mt-2">
    Start your first interview to track your progress!
  </p>
</div>
```

---

## 🎬 Animations

### Available Animations
```css
animate-float        /* Floating effect (3s) */
animate-bounce-slow  /* Subtle bounce (2s) */
animate-fadeIn       /* Fade in effect */
```

### Usage Examples
```tsx
{/* Floating image */}
<Image className="hero-image" />

{/* Bouncing icon */}
<div className="section-icon">✨</div>

{/* Fade in section */}
<section className="section-enhanced">
```

---

## 🎨 Gradient Effects

### Text Gradient
```tsx
<h2 className="gradient-text">InterPrep</h2>
```
Creates: Purple → Blue gradient

### Background Gradients
```css
blue-gradient-dark  /* Dark purple to black */
dark-gradient       /* Dark gray gradient */
blue-gradient       /* White to purple */
border-gradient     /* Gray gradient for borders */
```

---

## 💫 Hover Effects

### Scale on Hover
```tsx
<Button className="btn-enhanced">
  {/* Scales to 1.05 on hover */}
</Button>

<div className="card-interview">
  {/* Scales to 1.02 on hover */}
</div>
```

### Shadow on Hover
All enhanced buttons and cards get shadow effects automatically:
- `shadow-lg`
- `shadow-primary-200/50` (for buttons)
- `shadow-primary-200/20` (for cards)

---

## 📐 Layout

### Root Layout
```tsx
<div className="root-layout">
  {/* Max width, centered, responsive padding */}
</div>
```

### Auth Layout
```tsx
<div className="auth-layout">
  {/* Centered authentication forms */}
</div>
```

### Interviews Section
```tsx
<div className="interviews-section">
  {/* Flex wrap, responsive grid */}
</div>
```

---

## 🎯 Icon Usage

### Recommended Emojis
- 🚀 Start/Launch
- 📚 History/Learning
- 🎯 Goals/Target
- ✨ New/Create
- 🔍 Search/Explore
- 💡 Ideas/Tips
- 🎭 Practice/Performance
- 📊 Analytics/Stats

### Implementation
```tsx
<div className="section-icon">📚</div>
```

---

## 🔧 Utility Classes

### Spacing
- `gap-3` - Small gap (12px)
- `gap-6` - Medium gap (24px)
- `gap-12` - Large gap (48px)

### Flex
- `flex-center` - Center items
- `items-center` - Vertical center
- `justify-between` - Space between

### Responsive
- `max-sm:` - Mobile styles
- `max-lg:` - Tablet styles
- `md:` - Desktop styles

---

## 📱 Responsive Design

### Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

### Key Responsive Patterns
```tsx
{/* Hero title: 4xl on mobile, 5xl on desktop */}
<h2 className="text-4xl md:text-5xl">

{/* Hide on mobile */}
<div className="max-sm:hidden">

{/* Full width on mobile, flex on desktop */}
<div className="max-sm:w-full">
```

---

## 🎨 Best Practices

1. **Always use gradient-text for main headings**
2. **Add section-icon for visual interest**
3. **Use empty-state for better UX**
4. **Apply btn-enhanced to primary CTAs**
5. **Maintain consistent spacing with gap utilities**
6. **Use semantic emojis for better communication**
7. **Keep animations subtle and purposeful**
8. **Test responsiveness across devices**

---

## 🚀 Quick Start Examples

### Landing Page Hero
```tsx
<section className="card-cta hero-section">
  <div className="flex flex-col gap-6 max-w-lg">
    <h2 className="hero-title">
      Ace Your Interviews with{" "}
      <span className="gradient-text">AI-Powered</span> Practice
    </h2>
    <p className="text-lg text-light-100/90">
      Practice real interview scenarios and receive instant feedback
    </p>
    <Button className="btn-primary btn-enhanced">
      🚀 Start Your Interview Journey
    </Button>
  </div>
  <Image src="/robot.png" className="hero-image" />
</section>
```

### Section Header
```tsx
<div className="flex items-center gap-3">
  <div className="section-icon">📚</div>
  <h2 className="gradient-text">Your Interview History</h2>
</div>
```

### Navigation
```tsx
<nav className="nav-enhanced">
  <Link href="/" className="nav-brand">
    <Image src="/logo.svg" width={38} height={32} />
    <h2 className="gradient-text">InterPrep</h2>
  </Link>
</nav>
```

---

**Last Updated:** October 13, 2025
**Version:** 1.0.0
