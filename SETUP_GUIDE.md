# TEDxNITHamirpur Website - Quick Start Guide

## 📦 Installation Steps

Follow these steps to get the website running on your local machine:

### 1. Install Dependencies
Open your terminal in the project directory and run:

```bash
npm install
```

This will install all required packages including:
- Next.js 14.1
- React 18.2
- TypeScript 5.3
- Tailwind CSS 3.4
- Framer Motion 11.0

### 2. Start Development Server
Once installation is complete, start the development server:

```bash
npm run dev
```

### 3. View the Website
Open your browser and navigate to:
```
http://localhost:3000
```

## 🎨 What You'll See

The website includes the following sections:

### 1. **Navigation Bar**
- Sticky header that becomes visible on scroll
- Links to all sections (Home, About, Speakers, Events, Sponsors, Contact)
- "Get Tickets" CTA button
- Responsive mobile menu

### 2. **Hero Section**
- Large, bold TEDxNITHamirpur branding
- "Ideas Worth Spreading" tagline
- Two call-to-action buttons
- Animated scroll indicator
- Background pattern effect

### 3. **About Section**
- Explanation of TEDx
- Information about NIT Hamirpur
- Event statistics (Attendees, Speakers, Duration)
- This year's theme in a prominent display

### 4. **Speakers Section**
- Grid of 6 featured speakers
- Each speaker card includes:
  - Professional photo (placeholder images currently)
  - Name and title
  - Talk topic
  - Brief description
- Hover effects with image zoom
- "View Full Speaker Lineup" button

### 5. **Events Schedule**
- Timeline layout with event details
- Shows complete day schedule from 9 AM to 5 PM
- Includes:
  - Registration & Welcome
  - Opening Ceremony
  - Three speaking sessions
  - Lunch and coffee breaks
  - Closing ceremony
- "Save the Date" section with date: March 15, 2025

### 6. **Sponsors Section**
- Three tiers: Platinum, Gold, and Silver
- Responsive grid layout
- Hover effects on sponsor cards
- "Become a Sponsor" CTA section

### 7. **Footer**
- TEDx NIT Hamirpur branding
- Quick navigation links
- Contact information (email, phone, address)
- Social media links (Facebook, Twitter, Instagram, LinkedIn, YouTube)
- Email newsletter subscription
- Copyright notice and legal links

## 🎯 Key Features Implemented

### Animations & Interactions
- ✅ Smooth scroll behavior
- ✅ Fade-in animations on scroll (using Framer Motion)
- ✅ Hover effects on buttons, cards, and links
- ✅ Scroll indicator animation
- ✅ Mobile-responsive navigation menu
- ✅ Image zoom on speaker card hover
- ✅ Button scale effects

### Responsive Design
- ✅ Mobile-first approach
- ✅ Breakpoints: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)
- ✅ Hamburger menu for mobile devices
- ✅ Flexible grid layouts
- ✅ Touch-friendly buttons and links

### Performance
- ✅ Next.js Image component for optimized images
- ✅ Code splitting with Next.js App Router
- ✅ CSS compiled with Tailwind
- ✅ Intersection Observer for scroll animations

### Accessibility
- ✅ Semantic HTML5 elements
- ✅ Proper heading hierarchy
- ✅ ARIA labels for social media icons
- ✅ Keyboard navigation support
- ✅ Color contrast compliance

## 🛠️ Customization Guide

### Updating Speaker Information
Edit `components/Speakers.tsx`:

```typescript
const speakers = [
  {
    id: 1,
    name: 'Your Speaker Name',
    title: 'Their Title',
    topic: 'Talk Topic',
    image: '/path/to/image.jpg', // Replace placeholder URLs
    description: 'Brief description',
  },
  // Add more speakers...
]
```

### Updating Event Schedule
Edit `components/Events.tsx`:

```typescript
const events = [
  {
    id: 1,
    time: '09:00 AM',
    title: 'Event Title',
    description: 'Event description',
    type: 'talk', // Options: 'talk', 'break', 'ceremony', 'general'
  },
  // Add more events...
]
```

### Updating Sponsors
Edit `components/Sponsors.tsx`:

```typescript
const sponsors = [
  { 
    id: 1, 
    name: 'Sponsor Name', 
    tier: 'platinum' // Options: 'platinum', 'gold', 'silver'
  },
  // Add more sponsors...
]
```

### Changing Colors
Edit `tailwind.config.ts` to modify the color scheme:

```typescript
colors: {
  tedx: {
    red: '#EB0028',        // Primary TEDx red
    'red-dark': '#C70021',  // Darker shade for hovers
    // Add custom colors...
  }
}
```

### Adding New Sections
1. Create a new component in `components/YourSection.tsx`
2. Import it in `app/page.tsx`
3. Add it between existing sections

## 📱 Testing Checklist

Before deploying, test the following:

- [ ] All navigation links work correctly
- [ ] Smooth scroll to each section
- [ ] Mobile menu opens and closes properly
- [ ] All buttons have hover effects
- [ ] Images load correctly
- [ ] Animations trigger on scroll
- [ ] Responsive on mobile, tablet, and desktop
- [ ] Footer links are functional
- [ ] Forms (if any) submit correctly

## 🚀 Building for Production

When ready to deploy:

```bash
# Build the production version
npm run build

# Start production server locally (for testing)
npm start

# Or deploy to Vercel (recommended)
# Install Vercel CLI: npm i -g vercel
vercel
```

## 📝 Adding Real Images

Replace placeholder images with actual photos:

1. Place images in `public/images/` directory
2. Update image paths in components:
   ```typescript
   image: '/images/speaker-name.jpg'
   ```
3. Recommended image sizes:
   - Speakers: 400x400px
   - Hero background: 1920x1080px
   - Sponsor logos: 300x100px

## 🔧 Troubleshooting

### Port 3000 already in use
```bash
# Use a different port
npm run dev -- -p 3001
```

### Styles not updating
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### TypeScript errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [TEDx Brand Guidelines](https://www.ted.com/about/programs-initiatives/tedx-program/tedx-organizer-guide/branding-promotions/logo-and-design)

## 💡 Tips

1. **Keep the TEDx brand consistent** - Use official colors and fonts
2. **Optimize images** - Compress images before uploading
3. **Test on real devices** - Don't just rely on browser dev tools
4. **Update content regularly** - Keep speaker info and schedules current
5. **Monitor performance** - Use Lighthouse for performance audits

## 📞 Support

For questions or issues:
- Review the README.md file
- Check Next.js documentation
- Contact the development team

---

**Happy coding! 🎉**
