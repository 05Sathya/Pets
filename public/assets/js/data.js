/* ============================================================
   BEST FOR PETS — data.js
   Brand data, categories, products, services, coupons, areas
   ============================================================ */

const BRAND = {
  name: "Best For Pets",
  tagline: "Chennai's Trusted Pet Care Family — Grooming, Food & Everything Your Pet Needs.",
  city: "Chennai",
  phone: "+91 89397 87787",
  whatsapp: "918939787787",
  email: "contact@bestforpet.in",
  deliveryRadiusKm: 10,
  deliveryTime: "30–45 min",
  minOrder: 299,
  freeDeliveryAbove: 999,
  deliveryCharge: 49,
  rating: 4.8,
  reviews: 2300,
  stores: ["Maduravoyal (Flagship)", "Ambattur", "Mogappair West", "Velappanchavadi", "Mogappair East", "Ramapuram", "Vanagaram"],
  storeLat: 13.0660,   // Maduravoyal flagship
  storeLng: 80.1640
};

const STORE_HOURS_DISPLAY = {
  Monday: "8:00 AM – 10:00 PM",
  Tuesday: "8:00 AM – 10:00 PM",
  Wednesday: "8:00 AM – 10:00 PM",
  Thursday: "8:00 AM – 10:00 PM",
  Friday: "8:00 AM – 10:00 PM",
  Saturday: "8:00 AM – 10:00 PM",
  Sunday: "8:00 AM – 10:00 PM"
};

/* Chennai areas for the location search (lat/lng + serviceability vs 10 km radius) */
const CHENNAI_AREAS = [
  { area: "Maduravoyal", pincode: "600095", lat: 13.0660, lng: 80.1640 },
  { area: "Ambattur", pincode: "600053", lat: 13.1143, lng: 80.1548 },
  { area: "Mogappair West", pincode: "600037", lat: 13.0850, lng: 80.1750 },
  { area: "Mogappair East", pincode: "600037", lat: 13.0900, lng: 80.1850 },
  { area: "Velappanchavadi", pincode: "600077", lat: 13.0490, lng: 80.1190 },
  { area: "Ramapuram", pincode: "600089", lat: 13.0180, lng: 80.1820 },
  { area: "Vanagaram", pincode: "600095", lat: 13.0530, lng: 80.1480 },
  { area: "Anna Nagar", pincode: "600040", lat: 13.0850, lng: 80.2101 },
  { area: "Koyambedu", pincode: "600107", lat: 13.0694, lng: 80.1948 },
  { area: "Porur", pincode: "600116", lat: 13.0382, lng: 80.1565 },
  { area: "Valasaravakkam", pincode: "600087", lat: 13.0410, lng: 80.1740 },
  { area: "Avadi", pincode: "600054", lat: 13.1147, lng: 80.0997 },
  { area: "Vadapalani", pincode: "600026", lat: 13.0500, lng: 80.2121 },
  { area: "T. Nagar", pincode: "600017", lat: 13.0418, lng: 80.2341 },
  { area: "Adyar", pincode: "600020", lat: 13.0012, lng: 80.2565 },
  { area: "Velachery", pincode: "600042", lat: 12.9815, lng: 80.2180 },
  { area: "Tambaram", pincode: "600045", lat: 12.9249, lng: 80.1000 },
  { area: "OMR Thoraipakkam", pincode: "600097", lat: 12.9407, lng: 80.2339 },
  { area: "Sholinganallur", pincode: "600119", lat: 12.9010, lng: 80.2279 },
  { area: "Mylapore", pincode: "600004", lat: 13.0339, lng: 80.2676 }
];

const CATEGORIES = [
  { slug: "food-treats",  name: "Food & Treats",      icon: "bone",          color: "#E63946", img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=600&fit=crop", desc: "Dry, wet, fresh & prescription diets" },
  { slug: "health",       name: "Health & Wellness",  icon: "heart-pulse",   color: "#0E9594", img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop", desc: "Supplements, tick & flea, first-aid" },
  { slug: "toys",         name: "Toys & Enrichment",  icon: "volleyball",    color: "#FFB627", img: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=600&h=600&fit=crop", desc: "Chew, plush, training & interactive" },
  { slug: "beds",         name: "Beds & Accessories", icon: "lamp-desk",     color: "#8B5A8B", img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&h=600&fit=crop", desc: "Beds, carriers, collars & bowls" },
  { slug: "grooming",     name: "Grooming Essentials",icon: "scissors",      color: "#FF6F61", img: "https://images.unsplash.com/photo-1581888227599-779811939961?w=600&h=600&fit=crop", desc: "Brushes, clippers, wipes & sprays" },
  { slug: "litter",       name: "Litter & Cleaning",  icon: "spray-can",     color: "#5A8B5A", img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop", desc: "Cat litter, pee pads, odour care" }
];

const SERVICES = [
  { name: "Pet Grooming",   icon: "scissors",   desc: "Expert grooming for health, hygiene & comfort", color: "#E63946" },
  { name: "Healthy Meals",  icon: "salad",      desc: "Curated nutrition for every pet's needs",       color: "#0E9594" },
  { name: "Veterinary Care",icon: "stethoscope",desc: "In-store vet consultations, no hospital queues",color: "#FFB627" },
  { name: "Pet Spa",        icon: "bath",       desc: "Relaxing pampering sessions",                   color: "#8B5A8B" },
  { name: "Pet Boarding",   icon: "home",       desc: "Safe, supervised stays while you're away",      color: "#FF6F61" }
];

/* foodType used only on edible items; non-edible = "other" (dot hidden in UI) */
const PRODUCTS = [
  /* ------- FOOD & TREATS ------- */
  { id: "BFP-001", name: "Pedigree Adult Chicken & Veg", cat: "food-treats", price: 650, mrp: 720, unit: "3 kg", foodType: "non-veg", edible: true, rating: 4.7, orders: 412, bestseller: true,
    img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600&h=600&fit=crop",
    desc: "Complete & balanced dry food for adult dogs with chicken, vegetables and essential nutrients for shiny coat and strong digestion.",
    variants: [{ label: "1.2 kg", price: 290, mrp: 320 }, { label: "3 kg", price: 650, mrp: 720 }, { label: "10 kg", price: 1899, mrp: 2100 }] },
  { id: "BFP-002", name: "Royal Canin Puppy Starter", cat: "food-treats", price: 1200, mrp: 1320, unit: "2 kg", foodType: "non-veg", edible: true, rating: 4.9, orders: 318, bestseller: true,
    img: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop",
    desc: "Specially formulated starter mousse-to-kibble nutrition supporting immunity and healthy growth in puppies up to 12 months.",
    variants: [{ label: "1 kg", price: 650, mrp: 700 }, { label: "2 kg", price: 1200, mrp: 1320 }, { label: "4 kg", price: 2250, mrp: 2480 }] },
  { id: "BFP-003", name: "Whiskas Tuna in Jelly", cat: "food-treats", price: 450, mrp: 495, unit: "1 kg", foodType: "non-veg", edible: true, rating: 4.6, orders: 276, bestseller: true,
    img: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=600&fit=crop",
    desc: "Irresistible tuna chunks in jelly for adult cats — complete nutrition with taurine for healthy eyes and heart.",
    variants: [{ label: "480 g", price: 240, mrp: 260 }, { label: "1 kg", price: 450, mrp: 495 }] },
  { id: "BFP-004", name: "Drools Chicken Treats", cat: "food-treats", price: 220, mrp: 250, unit: "350 g", foodType: "non-veg", edible: true, rating: 4.5, orders: 198, bestseller: false,
    img: "https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=600&h=600&fit=crop",
    desc: "Real chicken training treats — soft, bite-sized and protein-rich. Perfect reward for good boys and girls.",
    variants: [{ label: "350 g", price: 220, mrp: 250 }] },
  { id: "BFP-005", name: "Farmina Vet Life Renal Diet", cat: "food-treats", price: 1850, mrp: 1990, unit: "2 kg", foodType: "non-veg", edible: true, rating: 4.8, orders: 64, bestseller: false,
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=600&fit=crop",
    desc: "Prescription renal-support diet recommended by veterinarians. Consult our in-store vet before switching diets.",
    variants: [{ label: "2 kg", price: 1850, mrp: 1990 }] },
  { id: "BFP-006", name: "Fresh Chicken & Rice Meal Bowl", cat: "food-treats", price: 149, mrp: 180, unit: "300 g bowl", foodType: "non-veg", edible: true, rating: 4.9, orders: 521, bestseller: true,
    img: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&h=600&fit=crop",
    desc: "Freshly cooked in our Healthy Meals kitchen daily — slow-cooked chicken, rice, carrots & pumpkin. No preservatives.",
    variants: [{ label: "300 g", price: 149, mrp: 180 }, { label: "500 g", price: 229, mrp: 270 }] },
  { id: "BFP-007", name: "Veg Pumpkin & Lentil Meal Bowl", cat: "food-treats", price: 129, mrp: 150, unit: "300 g bowl", foodType: "veg", edible: true, rating: 4.4, orders: 142, bestseller: false,
    img: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=600&h=600&fit=crop",
    desc: "Gentle vegetarian bowl with pumpkin, lentils and brown rice — great for sensitive tummies and senior pets.",
    variants: [{ label: "300 g", price: 129, mrp: 150 }] },
  { id: "BFP-008", name: "Tetra Bits Goldfish Food", cat: "food-treats", price: 180, mrp: 199, unit: "100 g", foodType: "other", edible: true, rating: 4.6, orders: 88, bestseller: false,
    img: "https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=600&h=600&fit=crop",
    desc: "Complete granule food for goldfish & fancy carp with colour-enhancing nutrients and clean-water formula.",
    variants: [{ label: "100 g", price: 180, mrp: 199 }] },

  /* ------- HEALTH & WELLNESS ------- */
  { id: "BFP-101", name: "Himalaya Erina-EP Tick & Flea Shampoo", cat: "health", price: 240, mrp: 270, unit: "200 ml", foodType: "other", edible: false, rating: 4.6, orders: 233, bestseller: true,
    img: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&h=600&fit=crop",
    desc: "Herbal anti-tick & flea shampoo that soothes skin and leaves the coat soft and fresh-smelling.",
    variants: [{ label: "200 ml", price: 240, mrp: 270 }, { label: "450 ml", price: 410, mrp: 460 }] },
  { id: "BFP-102", name: "Omega 3-6-9 Coat Supplement", cat: "health", price: 540, mrp: 599, unit: "200 ml syrup", foodType: "other", edible: true, rating: 4.7, orders: 121, bestseller: false,
    img: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?w=600&h=600&fit=crop",
    desc: "Salmon-oil based supplement for glossy coat, reduced shedding and joint support. Vet recommended.",
    variants: [{ label: "200 ml", price: 540, mrp: 599 }] },
  { id: "BFP-103", name: "Pet First-Aid Kit (Travel)", cat: "health", price: 699, mrp: 799, unit: "12-piece kit", foodType: "other", edible: false, rating: 4.5, orders: 57, bestseller: false,
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=600&h=600&fit=crop",
    desc: "Compact kit with antiseptic wipes, bandage rolls, tick remover and digital thermometer — every parent should keep one.",
    variants: [{ label: "12-piece", price: 699, mrp: 799 }] },
  { id: "BFP-104", name: "Calcium + Vitamin Chews", cat: "health", price: 380, mrp: 420, unit: "60 chews", foodType: "other", edible: true, rating: 4.6, orders: 146, bestseller: false,
    img: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?w=600&h=600&fit=crop",
    desc: "Tasty daily chews supporting bones, teeth and growth in puppies and lactating mothers.",
    variants: [{ label: "60 chews", price: 380, mrp: 420 }] },

  /* ------- TOYS & ENRICHMENT ------- */
  { id: "BFP-201", name: "Tough Rope Chew Toy", cat: "toys", price: 250, mrp: 299, unit: "Medium", foodType: "other", edible: false, rating: 4.7, orders: 301, bestseller: true,
    img: "https://images.unsplash.com/photo-1535930891776-0c2dfb7fda1a?w=600&h=600&fit=crop",
    desc: "Triple-knot cotton rope for tug-of-war and dental health. Survives even the most determined chewers.",
    variants: [{ label: "Small", price: 180, mrp: 210 }, { label: "Medium", price: 250, mrp: 299 }, { label: "Large", price: 340, mrp: 390 }] },
  { id: "BFP-202", name: "Interactive Treat Puzzle Board", cat: "toys", price: 549, mrp: 649, unit: "Level 2", foodType: "other", edible: false, rating: 4.8, orders: 96, bestseller: false,
    img: "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600&h=600&fit=crop",
    desc: "Slow-feeding puzzle that keeps smart pups busy — slide, flip and sniff to win treats. Reduces anxiety chewing.",
    variants: [{ label: "Level 1", price: 449, mrp: 520 }, { label: "Level 2", price: 549, mrp: 649 }] },
  { id: "BFP-203", name: "Feather Wand Cat Teaser", cat: "toys", price: 199, mrp: 230, unit: "1 pc", foodType: "other", edible: false, rating: 4.6, orders: 178, bestseller: false,
    img: "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=600&h=600&fit=crop",
    desc: "Telescopic wand with natural feathers and bell — guaranteed zoomies for indoor cats.",
    variants: [{ label: "1 pc", price: 199, mrp: 230 }] },
  { id: "BFP-204", name: "Squeaky Plush Elephant", cat: "toys", price: 320, mrp: 360, unit: "Soft plush", foodType: "other", edible: false, rating: 4.5, orders: 134, bestseller: false,
    img: "https://images.unsplash.com/photo-1591946614720-90a587da4a36?w=600&h=600&fit=crop",
    desc: "Cuddly squeaker plush with reinforced stitching — comfort toy for crate time and naps.",
    variants: [{ label: "Soft plush", price: 320, mrp: 360 }] },

  /* ------- BEDS & ACCESSORIES ------- */
  { id: "BFP-301", name: "Orthopedic Donut Bed", cat: "beds", price: 1299, mrp: 1599, unit: "Medium", foodType: "other", edible: false, rating: 4.8, orders: 167, bestseller: true,
    img: "https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?w=600&h=600&fit=crop",
    desc: "Calming faux-fur donut bed with memory foam base — supports joints and melts anxiety away.",
    variants: [{ label: "Small", price: 999, mrp: 1199 }, { label: "Medium", price: 1299, mrp: 1599 }, { label: "Large", price: 1699, mrp: 1999 }] },
  { id: "BFP-302", name: "Airline-Approved Pet Carrier", cat: "beds", price: 1899, mrp: 2200, unit: "Up to 8 kg", foodType: "other", edible: false, rating: 4.6, orders: 73, bestseller: false,
    img: "https://images.unsplash.com/photo-1544568100-847a948585b9?w=600&h=600&fit=crop",
    desc: "Ventilated, escape-proof soft carrier with seatbelt loop and washable mat for safe trips.",
    variants: [{ label: "Up to 8 kg", price: 1899, mrp: 2200 }] },
  { id: "BFP-303", name: "Reflective Nylon Collar + Leash Set", cat: "beds", price: 449, mrp: 520, unit: "Medium", foodType: "other", edible: false, rating: 4.7, orders: 244, bestseller: false,
    img: "https://images.unsplash.com/photo-1567612529009-ded3690f5a41?w=600&h=600&fit=crop",
    desc: "High-visibility night-safe collar and 1.2 m leash with padded handle. Adjustable, chew-resistant.",
    variants: [{ label: "Small", price: 349, mrp: 410 }, { label: "Medium", price: 449, mrp: 520 }, { label: "Large", price: 549, mrp: 620 }] },
  { id: "BFP-304", name: "Anti-Skid Stainless Bowl Set", cat: "beds", price: 399, mrp: 450, unit: "2 × 700 ml", foodType: "other", edible: false, rating: 4.5, orders: 156, bestseller: false,
    img: "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?w=600&h=600&fit=crop",
    desc: "Rust-free food & water bowls with silicone anti-skid base — dishwasher safe.",
    variants: [{ label: "2 × 700 ml", price: 399, mrp: 450 }] },

  /* ------- GROOMING ESSENTIALS ------- */
  { id: "BFP-401", name: "Slicker Brush (Self-Cleaning)", cat: "grooming", price: 349, mrp: 399, unit: "1 pc", foodType: "other", edible: false, rating: 4.7, orders: 209, bestseller: true,
    img: "https://images.unsplash.com/photo-1581888227599-779811939961?w=600&h=600&fit=crop",
    desc: "One-click self-cleaning slicker that removes loose fur and tangles — used by our own groomers.",
    variants: [{ label: "1 pc", price: 349, mrp: 399 }] },
  { id: "BFP-402", name: "Cordless Pet Hair Clipper Kit", cat: "grooming", price: 1499, mrp: 1799, unit: "Kit", foodType: "other", edible: false, rating: 4.6, orders: 81, bestseller: false,
    img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?w=600&h=600&fit=crop",
    desc: "Low-noise rechargeable clipper with 4 guard combs, scissors and nail file — salon finish at home.",
    variants: [{ label: "Kit", price: 1499, mrp: 1799 }] },
  { id: "BFP-403", name: "Aloe Grooming Wipes", cat: "grooming", price: 199, mrp: 230, unit: "80 wipes", foodType: "other", edible: false, rating: 4.5, orders: 187, bestseller: false,
    img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop",
    desc: "Gentle paraben-free wipes for paws, face and coat — perfect after walks on Chennai roads.",
    variants: [{ label: "80 wipes", price: 199, mrp: 230 }] },
  { id: "BFP-404", name: "Detangling Conditioning Spray", cat: "grooming", price: 329, mrp: 370, unit: "250 ml", foodType: "other", edible: false, rating: 4.4, orders: 92, bestseller: false,
    img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=600&fit=crop",
    desc: "Leave-in coconut conditioning mist that loosens mats and adds shine between baths.",
    variants: [{ label: "250 ml", price: 329, mrp: 370 }] },

  /* ------- LITTER & CLEANING ------- */
  { id: "BFP-501", name: "Clumping Cat Litter (Lavender)", cat: "litter", price: 499, mrp: 560, unit: "5 kg", foodType: "other", edible: false, rating: 4.7, orders: 264, bestseller: true,
    img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop",
    desc: "99% dust-free bentonite litter with fast clumping and gentle lavender odour control.",
    variants: [{ label: "5 kg", price: 499, mrp: 560 }, { label: "10 kg", price: 899, mrp: 1020 }] },
  { id: "BFP-502", name: "Puppy Training Pee Pads", cat: "litter", price: 549, mrp: 620, unit: "50 pads", foodType: "other", edible: false, rating: 4.6, orders: 173, bestseller: false,
    img: "https://images.unsplash.com/photo-1548199569-3e1c6aa8f469?w=600&h=600&fit=crop",
    desc: "Super-absorbent 5-layer pads with attractant for faster toilet training. Leak-proof backing.",
    variants: [{ label: "50 pads", price: 549, mrp: 620 }, { label: "100 pads", price: 999, mrp: 1150 }] },
  { id: "BFP-503", name: "Pet Odour Remover Spray", cat: "litter", price: 299, mrp: 340, unit: "500 ml", foodType: "other", edible: false, rating: 4.5, orders: 118, bestseller: false,
    img: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=600&h=600&fit=crop",
    desc: "Enzyme-based spray that destroys odour at the source — safe on sofas, carpets and car seats.",
    variants: [{ label: "500 ml", price: 299, mrp: 340 }] },
  { id: "BFP-504", name: "Litter Scoop + Mat Combo", cat: "litter", price: 379, mrp: 430, unit: "Combo", foodType: "other", edible: false, rating: 4.4, orders: 67, bestseller: false,
    img: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?w=600&h=600&fit=crop",
    desc: "Deep-slot scoop with honeycomb trapper mat that stops litter tracking across the house.",
    variants: [{ label: "Combo", price: 379, mrp: 430 }] }
];

const COUPONS = [
  { code: "PAWS50",  desc: "₹50 off on orders above ₹499",       type: "flat",    value: 50,  min: 499 },
  { code: "PET10",   desc: "10% off up to ₹100, above ₹599",      type: "percent", value: 10,  min: 599, cap: 100 },
  { code: "FIRSTPET",desc: "₹100 off your first order above ₹699",type: "flat",    value: 100, min: 699 }
];

const TESTIMONIALS = [
  { quote: "Bruno's food order 35 minutes-la veetuku vandhuchu. Romba fresh-ah, packing-um neat-ah irundhuchu!", name: "Priya Raghavan", area: "Mogappair West", stars: 5 },
  { quote: "Their in-store vet at Maduravoyal is so patient. Last 8 months-ah idhe la dhaan order panren — never disappointed.", name: "Karthik S.", area: "Ambattur", stars: 5 },
  { quote: "Grooming appointment + food delivery — everything one place. Chennai-la idhu maari pet service vera enga irukku?", name: "Divya & Simba", area: "Porur", stars: 5 }
];

const FREQUENTLY_TOGETHER = {
  "food-treats": ["BFP-304", "BFP-004", "BFP-104"],
  "health": ["BFP-403", "BFP-101", "BFP-102"],
  "toys": ["BFP-004", "BFP-201", "BFP-303"],
  "beds": ["BFP-303", "BFP-304", "BFP-301"],
  "grooming": ["BFP-101", "BFP-403", "BFP-404"],
  "litter": ["BFP-503", "BFP-504", "BFP-501"]
};
