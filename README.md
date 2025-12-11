# TEDxNITHamirpur Website

A modern, responsive website for TEDxNITHamirpur built with Next.js 14, React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Pixel-perfect Design**: Carefully crafted UI matching modern TEDx aesthetics
- **Fully Responsive**: Optimized for mobile, tablet, and desktop devices
- **Smooth Animations**: Engaging scroll animations and hover effects using Framer Motion
- **Modern Stack**: Built with Next.js 14 App Router, React 18, and TypeScript
- **Performance Optimized**: Next.js Image component for optimized image loading
- **Accessibility**: Semantic HTML and proper ARIA labels
- **TEDx Branding**: Official TEDx red (#EB0028) and professional styling

## 📋 Sections

1. **Navigation Bar** - Sticky header with smooth scroll navigation
2. **Hero Section** - Eye-catching introduction with CTAs
3. **About Section** - Information about TEDx and NIT Hamirpur
4. **Speakers Section** - Showcase of featured speakers with cards
5. **Events Section** - Detailed schedule timeline
6. **Sponsors Section** - Multi-tier sponsor showcase
7. **Footer** - Contact information, links, and social media

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Colors
The TEDx brand colors are defined in `tailwind.config.ts`:
- Primary Red: `#EB0028`
- Dark Red: `#C70021`

### Content
Update the following files to customize content:
- **Speakers**: `components/Speakers.tsx` - Update the `speakers` array
- **Events**: `components/Events.tsx` - Update the `events` array
- **Sponsors**: `components/Sponsors.tsx` - Update the `sponsors` array

### Images
Replace placeholder images in the Speakers section with actual speaker photos. Images should be:
- Format: JPG or WebP
- Dimensions: 400x400px minimum
- Optimized for web

## 🧩 Tech Stack

- **Framework**: Next.js 14.1
- **UI Library**: React 18.2
- **Language**: TypeScript 5.3
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 11.0
- **Image Optimization**: Next.js Image component

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Project Structure

```
tedx-website/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation component
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Speakers.tsx        # Speakers section
│   ├── Events.tsx          # Events timeline
│   ├── Sponsors.tsx        # Sponsors grid
│   ├── Footer.tsx          # Footer component
│   └── hooks/
│       └── useInView.tsx   # Custom hook for scroll animations
├── public/                 # Static assets
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## 🎯 Features to Add (Future Enhancements)

- [ ] Blog section for past events
- [ ] Video gallery with past talks
- [ ] Online registration form with payment integration
- [ ] Live streaming integration
- [ ] Multi-language support
- [ ] CMS integration for easy content management
- [ ] SEO optimization with metadata
- [ ] Analytics integration

## 📄 License

This project is created for TEDxNITHamirpur. The TEDx brand and logo are trademarks of TED Conferences LLC.

## 🤝 Contributing

For contributions or suggestions, please contact the TEDxNITHamirpur organizing committee.

## 📞 Contact

- **Email**: contact@tedxnithamirpur.com
- **Location**: NIT Hamirpur, Himachal Pradesh
- **Website**: Coming soon!

---

**Note**: This is an independent TEDx event operated under license from TED.
