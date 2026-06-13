# Best For Pets — Next.js Version 2.0

## Setup Instructions

This project has been migrated from HTML to **Next.js 14** for better performance, maintainability, and developer experience.

### Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run development server:**
   ```bash
   npm run dev
   ```

3. **Open in browser:**
   Navigate to `http://localhost:3000`

### Project Structure

```
app/
├── layout.jsx           # Root layout with metadata
├── globals.css          # Global styles & animations
├── page.jsx             # Home page (splash screen)
├── login/page.jsx       # Login page
├── product/page.jsx     # Product listing
├── cart/page.jsx        # Shopping cart
├── profile/page.jsx     # User profile
├── orders/page.jsx      # Order history
├── category/page.jsx    # Product categories
├── payment/page.jsx     # Payment page
├── payment-processing/  # Payment processing
├── payment-failed/      # Payment failure page
├── order-success/       # Order confirmation
├── address/page.jsx     # Delivery address
├── coupon/page.jsx      # Coupons page
├── tracking/page.jsx    # Order tracking
└── not-serviceable/     # Service unavailable

lib/
├── store.js             # Storage utilities
└── cart.js              # Cart logic

public/                  # Static assets (images, etc.)

package.json             # Dependencies & scripts
next.config.js           # Next.js configuration
tailwind.config.js       # Tailwind CSS config
postcss.config.js        # PostCSS configuration
```

### Features

✅ **File-based Routing** - Automatic routing based on folder structure  
✅ **Server & Client Components** - Mix SSR and client-side rendering  
✅ **Tailwind CSS** - Pre-configured styling  
✅ **Image Optimization** - Next.js Image component ready  
✅ **localStorage Support** - Client-side state management  
✅ **Responsive Design** - Mobile-first approach  

### Next Steps

1. Copy your image assets to `public/` folder
2. Add your `logo.png` to `public/` folder
3. Update page components with actual content from HTML files
4. Move any custom CSS from `assets/css/` to component files or `globals.css`
5. Migrate JavaScript logic from `assets/js/` to React hooks and utilities

### Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Important Notes

- All HTML files use `'use client'` directive (Client Components) for now
- localStorage calls are wrapped with browser detection
- Tailwind classes replace inline CSS
- Links should use Next.js `Link` component for navigation
- Images should use Next.js `Image` component when possible

---

**Best For Pets** — Quality is our priority 🐾
