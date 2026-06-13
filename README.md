# Best For Pets — Hyperlocal E-Commerce Website (v1)

**Chennai's Trusted Pet Care Family — Grooming, Food & Everything Your Pet Needs.**

---

## 🎨 DESIGN DECISION FOR Best For Pets

| Design Element | Selected Direction |
|---|---|
| Category | Pet Care Store · Pet Supplies · Grooming · Veterinary Services |
| Variant Picked | PT1 "Playful Coral" — **logo-override applied** → "Cherry & Cream" |
| Selection Reason | Logo uploaded → 2 dominant colors extracted (cherry red lettering #E63946, ink-black pet illustrations #23262F) and used to override PT1's default coral, per brand-first rule. Warm cream base keeps the pet-store playful DNA and avoids "aggressive red" feel. |
| Layout Pattern | Pattern B — Split Hero (60/40 headline + blob image card) |
| Color Palette | Primary **#E63946** (Cherry, from logo) · Base **#FFF6EC** (Cream) · Secondary **#23262F** (Ink, from logo) · Accent **#0E9594** (Teal, from variant pool) |
| Font Pairing | Display: **Fraunces** (Black/Bold) · Body: **Manrope** |
| Unique Accent | **#FFB627** Amber highlights + paw-print floaters, blob morphs, marquee ticker, and soft 16–32px rounded UI to reinforce warmth & playfulness |

---

## 🚀 Setup

1. Extract this ZIP anywhere.
2. Double-click **`index.html`** — the site opens in your browser.
3. No build step, no npm, no server. Internet needed only for Tailwind/Lucide/Google Fonts CDNs and Unsplash product imagery.

**Demo cheats:** OTP is `123456` · Coupons: `PAWS50`, `PET10`, `FIRSTPET` · Payment succeeds 80% of the time (retry on failure) · ~10% of checkouts simulate a backend "store closed" rejection.

## 🧭 Full customer journey test

`index.html` (splash) → `location.html` (GPS/search gate) → `home.html` → `category.html` → `product.html` → `cart.html` (+coupon) → `login.html` (OTP) → `address.html` (GPS-mandatory) → `payment.html` (UPI/Card/Wallet) → `payment-processing.html` → `order-success.html` (confetti) → `tracking.html` (live timeline) → `orders.html` / `profile.html`.

## 📁 Folder structure

```
bestforpets-website/
├── index.html               Splash (1.5s → location gate or home)
├── location.html            Blocking location gate (GPS + area search)
├── not-serviceable.html     Out-of-area screen
├── home.html                Split hero, Buy Again, categories, services, bestsellers, offers, testimonials
├── category.html            Product list + food-type chips + filters + sort + skeletons
├── product.html             Gallery, variants, qty, frequently-bought-together
├── cart.html                Items, coupon engine, free-delivery progress, GST bill
├── coupon.html              Offers listing → 1-tap apply to cart
├── address.html             Saved addresses + add-new (lat/lng mandatory, serviceability re-check)
├── login.html               10-digit phone + 6-box OTP (mock 123456)
├── payment.html             UPI first / Card / Wallet (NO COD) + store-closed simulation
├── payment-processing.html  3s animated gateway → 80% success / 20% fail
├── payment-failed.html      Retry / change method
├── order-success.html       DM-XXXXXX ID, confetti, save-to-favorites
├── tracking.html            5-step animated timeline (5s/step), partner card, map preview, reorder CTA
├── orders.html              History + 1-tap Reorder + Track
├── profile.html             User, wallet, favorite orders, addresses, support
├── assets/
│   ├── css/styles.css       Theme vars + all keyframe animations
│   ├── js/data.js           Brand, 20 Chennai areas (geo), 6 categories, 28 products, coupons, testimonials
│   ├── js/app.js            Shared shell (header/nav/footer), cart, location gate, product cards
│   ├── js/animations.js     Scroll reveals, confetti, counters, paw floaters, skeletons
│   └── images/logo.png      Brand logo (also used as favicon on every page)
└── README.md
```

## 🛠 Tech stack

HTML5 · Tailwind CSS (CDN) · Lucide icons (CDN) · Google Fonts (Fraunces + Manrope) · Vanilla JS only · localStorage state (`dittomart_*` keys) · URL params for product/category routing.

## 📐 Design rationale (3 lines)

1. **Aesthetic direction:** "Cherry & Cream playground" — warm cream canvas with confident cherry CTAs and ink contrast blocks, so the UI feels like the logo came alive (never plain white).
2. **Palette source:** extracted directly from the uploaded logo (cherry lettering + black dog/cat marks), with teal + amber accents from the variant pool for trust badges and offers.
3. **Font pairing:** Fraunces' friendly high-contrast serif gives premium pet-boutique personality; Manrope keeps body text crisp and bilingual-ready.

## 👩‍💻 Notes for the dev team (production conversion)

- Replace `CHENNAI_AREAS` mock geocoding with Google Places Autocomplete + Geocoding API; keep the same `applyCoords()` contract (lat/lng mandatory, 10 km haversine serviceability).
- Swap localStorage `dittomart_*` keys for real APIs: cart, auth (OTP), addresses, orders, coupons. Schemas already match the SaaS spec.
- `payment-processing.html`'s random 80/20 and payment.html's 10% store-closed are demo simulations — wire to the real gateway + backend store-hours rejection.
- Tracking timeline advances every 5s for demo; bind to order-status webhooks/polling in production.
- Pin Tailwind to a compiled build (CDN is for prototyping only) and self-host fonts for offline resilience.
- Product images use Unsplash URLs — replace with merchant CDN assets (square ≥600px).
