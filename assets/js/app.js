/* ============================================================
   BEST FOR PETS — app.js
   Shared state, location gate, layout shell, cart logic
   ============================================================ */

/* ---------- storage helpers ---------- */
const Store = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  },
  set(key, val) { localStorage.setItem(key, JSON.stringify(val)); },
  del(key) { localStorage.removeItem(key); }
};

/* ---------- money & misc ---------- */
const rupee = n => "₹" + Number(n).toLocaleString("en-IN", { maximumFractionDigits: 0 });

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371, toRad = d => d * Math.PI / 180;
  const dLat = toRad(lat2 - lat1), dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) * 10) / 10;
}

function getProduct(id) { return PRODUCTS.find(p => p.id === id); }
function getCategory(slug) { return CATEGORIES.find(c => c.slug === slug); }

/* ---------- LOCATION GATE (run on protected pages) ---------- */
function locationGate() {
  const loc = Store.get("dittomart_location");
  if (!loc || !loc.latitude || !loc.longitude) { window.location.href = "location.html"; return false; }
  if (loc.serviceable === false) { window.location.href = "not-serviceable.html"; return false; }
  return true;
}

/* ---------- CART ---------- */
const Cart = {
  items() { return Store.get("dittomart_cart", []); },
  save(items) { Store.set("dittomart_cart", items); updateCartBadges(); },
  count() { return this.items().reduce((s, i) => s + i.qty, 0); },
  subtotal() { return this.items().reduce((s, i) => s + i.price * i.qty, 0); },
  add(id, variantLabel = null, qty = 1) {
    const p = getProduct(id); if (!p) return;
    const variant = variantLabel ? p.variants.find(v => v.label === variantLabel) : p.variants[Math.min(1, p.variants.length - 1) === 1 && p.variants.length > 1 ? p.variants.findIndex(v => v.price === p.price) : 0] || p.variants[0];
    const useVar = variant || { label: p.unit, price: p.price };
    const key = p.id + "::" + useVar.label;
    const items = this.items();
    const found = items.find(i => i.key === key);
    if (found) found.qty += qty;
    else items.push({ key, id: p.id, name: p.name, variant: useVar.label, price: useVar.price, mrp: (variant && variant.mrp) || p.mrp, qty, image: p.img, foodType: p.foodType, edible: p.edible });
    this.save(items);
    toast(`${p.name} added to cart`, "shopping-cart");
    bounceCartIcon();
  },
  setQty(key, qty) {
    let items = this.items();
    if (qty <= 0) items = items.filter(i => i.key !== key);
    else { const it = items.find(i => i.key === key); if (it) it.qty = qty; }
    this.save(items);
  },
  qtyOf(id) { return this.items().filter(i => i.id === id).reduce((s, i) => s + i.qty, 0); },
  clear() { this.save([]); }
};

function updateCartBadges() {
  const n = Cart.count();
  document.querySelectorAll("[data-cart-badge]").forEach(b => {
    b.textContent = n;
    b.classList.toggle("hidden", n === 0);
  });
}
function bounceCartIcon() {
  document.querySelectorAll("[data-cart-icon]").forEach(el => {
    el.classList.remove("cart-bounce"); void el.offsetWidth; el.classList.add("cart-bounce");
  });
}

/* ---------- TOAST ---------- */
function toast(msg, icon = "check-circle") {
  let wrap = document.getElementById("toast-wrap");
  if (!wrap) {
    wrap = document.createElement("div");
    wrap.id = "toast-wrap";
    wrap.className = "fixed left-1/2 -translate-x-1/2 bottom-24 lg:bottom-8 z-[120] flex flex-col gap-2 items-center w-full px-6 pointer-events-none";
    document.body.appendChild(wrap);
  }
  const t = document.createElement("div");
  t.className = "toast-pop flex items-center gap-2.5 bg-ink text-cream text-sm font-semibold px-4 py-3 rounded-2xl shadow-xl max-w-sm";
  t.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4 text-amber shrink-0"></i><span>${msg}</span>`;
  wrap.appendChild(t);
  if (window.lucide) lucide.createIcons({ attrs: {}, nameAttr: "data-lucide" });
  setTimeout(() => { t.classList.add("toast-out"); setTimeout(() => t.remove(), 350); }, 2400);
}

/* ---------- HEADER / NAV / FOOTER SHELL ---------- */
function getArea() {
  const loc = Store.get("dittomart_location");
  return loc && loc.area ? loc.area : "Select area";
}

function renderHeader(opts = {}) {
  const mount = document.getElementById("app-header"); if (!mount) return;
  const user = Store.get("dittomart_user", { loggedIn: false });
  const search = opts.search ? `
    <div class="hidden md:flex flex-1 max-w-xl mx-4 relative">
      <i data-lucide="search" class="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-ink/40"></i>
      <input id="hdr-search" type="text" placeholder="Search food, toys, litter…"
        class="w-full bg-cream-deep border-2 border-ink/10 focus:border-cherry rounded-full pl-11 pr-4 py-2.5 text-sm font-medium outline-none transition-colors" />
    </div>` : `<div class="flex-1"></div>`;
  mount.innerHTML = `
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm border-b border-ink/5">
    <div class="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center gap-3">
      <a href="home.html" class="shrink-0 flex items-center gap-2">
        <img src="assets/images/logo.png" alt="Best For Pets" class="h-9 w-auto object-contain" onerror="this.outerHTML='<span class=&quot;font-display font-bold text-cherry text-xl&quot;>Best For Pets</span>'"/>
      </a>
      <a href="location.html" class="hidden sm:flex items-center gap-1.5 text-xs font-bold text-ink/70 hover:text-cherry transition-colors shrink-0">
        <span class="w-7 h-7 rounded-full bg-blush flex items-center justify-center"><i data-lucide="map-pin" class="w-3.5 h-3.5 text-cherry"></i></span>
        <span class="flex flex-col leading-tight text-left"><span class="text-[10px] uppercase tracking-wide text-ink/40">Delivering to</span><span class="truncate max-w-[110px]">${getArea()}</span></span>
      </a>
      ${search}
      <nav class="hidden lg:flex items-center gap-5 text-sm font-bold text-ink/70 mr-2">
        <a href="home.html" class="hover:text-cherry transition-colors">Home</a>
        <a href="category.html" class="hover:text-cherry transition-colors">Shop</a>
        <a href="tracking.html" class="hover:text-cherry transition-colors">Track Order</a>
      </nav>
      <a href="cart.html" data-cart-icon class="relative w-10 h-10 rounded-full bg-cherry text-white flex items-center justify-center hover:scale-105 transition-transform shrink-0">
        <i data-lucide="shopping-cart" class="w-5 h-5"></i>
        <span data-cart-badge class="hidden absolute -top-1 -right-1 bg-amber text-ink text-[10px] font-extrabold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 border-2 border-white">0</span>
      </a>
      <a href="${user.loggedIn ? "profile.html" : "login.html"}" class="w-10 h-10 rounded-full bg-cream-deep border border-ink/10 text-ink flex items-center justify-center hover:border-cherry hover:text-cherry transition-colors shrink-0">
        <i data-lucide="${user.loggedIn ? "user-round-check" : "user-round"}" class="w-5 h-5"></i>
      </a>
    </div>
    <a href="location.html" class="sm:hidden flex items-center gap-1.5 px-4 pb-2 text-[11px] font-bold text-ink/60">
      <i data-lucide="map-pin" class="w-3 h-3 text-cherry"></i> Delivering to <span class="text-cherry">${getArea()}</span> · ${BRAND.deliveryTime}
    </a>
  </header>`;
}

function renderBottomNav(active) {
  const mount = document.getElementById("app-bottomnav"); if (!mount) return;
  const tabs = [
    { id: "home", label: "Home", icon: "house", href: "home.html" },
    { id: "categories", label: "Shop", icon: "layout-grid", href: "category.html" },
    { id: "cart", label: "Cart", icon: "shopping-cart", href: "cart.html", badge: true },
    { id: "orders", label: "Orders", icon: "package", href: "orders.html" },
    { id: "profile", label: "Profile", icon: "user-round", href: "profile.html" }
  ];
  mount.innerHTML = `
  <nav class="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-ink/10 shadow-[0_-4px_20px_rgba(35,38,47,0.08)]">
    <div class="grid grid-cols-5 h-16">
      ${tabs.map(t => `
        <a href="${t.href}" class="relative flex flex-col items-center justify-center gap-0.5 ${active === t.id ? "text-cherry" : "text-ink/45"}">
          ${active === t.id ? '<span class="absolute top-0 w-8 h-1 rounded-b-full bg-cherry"></span>' : ""}
          <span class="relative">
            <i data-lucide="${t.icon}" class="w-5 h-5"></i>
            ${t.badge ? '<span data-cart-badge class="hidden absolute -top-1.5 -right-2 bg-amber text-ink text-[9px] font-extrabold min-w-[16px] h-4 rounded-full flex items-center justify-center px-1">0</span>' : ""}
          </span>
          <span class="text-[10px] font-bold">${t.label}</span>
        </a>`).join("")}
    </div>
  </nav>`;
}

function renderWhatsApp() {
  const mount = document.getElementById("app-whatsapp"); if (!mount) return;
  mount.innerHTML = `
  <a href="https://wa.me/${BRAND.whatsapp}?text=Hi, I have a question about my order" target="_blank" rel="noopener"
     class="fixed bottom-20 lg:bottom-6 right-4 z-40 w-13 h-13 p-3.5 rounded-full bg-[#25D366] text-white shadow-lg shadow-green-600/30 hover:scale-110 transition-transform wa-pulse"
     aria-label="Chat on WhatsApp">
    <i data-lucide="message-circle" class="w-6 h-6"></i>
  </a>`;
}

function renderFooter() {
  const mount = document.getElementById("app-footer"); if (!mount) return;
  mount.innerHTML = `
  <footer class="bg-ink text-cream mt-16">
    <div class="max-w-7xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      <div>
        <div class="bg-cream rounded-2xl p-3 inline-block mb-4"><img src="assets/images/logo.png" alt="Best For Pets" class="h-10 w-auto"/></div>
        <p class="text-sm text-cream/70 leading-relaxed">${BRAND.tagline}</p>
        <p class="text-xs text-cream/50 mt-3">7 stores across Chennai · Open daily 8 AM – 10 PM</p>
      </div>
      <div>
        <h4 class="font-display font-bold text-amber mb-4">Quick Links</h4>
        <ul class="space-y-2.5 text-sm text-cream/75">
          <li><a href="home.html" class="hover:text-amber transition-colors">Home</a></li>
          <li><a href="category.html" class="hover:text-amber transition-colors">Shop All</a></li>
          <li><a href="orders.html" class="hover:text-amber transition-colors">My Orders</a></li>
          <li><button onclick="openHoursModal()" class="hover:text-amber transition-colors">Store Hours</button></li>
          <li><a href="#" class="hover:text-amber transition-colors">Privacy Policy</a></li>
          <li><a href="#" class="hover:text-amber transition-colors">Terms of Service</a></li>
        </ul>
      </div>
      <div>
        <h4 class="font-display font-bold text-amber mb-4">Our Stores</h4>
        <ul class="space-y-2 text-sm text-cream/75">${BRAND.stores.map(s => `<li class="flex items-start gap-2"><i data-lucide="paw-print" class="w-3.5 h-3.5 mt-0.5 text-cherry"></i>${s}</li>`).join("")}</ul>
      </div>
      <div>
        <h4 class="font-display font-bold text-amber mb-4">Get in Touch</h4>
        <ul class="space-y-3 text-sm text-cream/75">
          <li class="flex items-center gap-2"><i data-lucide="phone" class="w-4 h-4 text-amber"></i> ${BRAND.phone}</li>
          <li class="flex items-center gap-2"><i data-lucide="mail" class="w-4 h-4 text-amber"></i> ${BRAND.email}</li>
          <li class="flex items-center gap-2"><i data-lucide="truck" class="w-4 h-4 text-amber"></i> ${BRAND.deliveryTime} delivery · ${BRAND.deliveryRadiusKm} km radius</li>
        </ul>
        <div class="flex gap-3 mt-5">
          ${["instagram", "facebook", "youtube"].map(s => `<a href="#" class="w-9 h-9 rounded-full bg-cream/10 hover:bg-cherry flex items-center justify-center transition-colors"><i data-lucide="${s}" class="w-4 h-4"></i></a>`).join("")}
        </div>
      </div>
    </div>
    <div class="border-t border-cream/10 py-5 text-center text-xs text-cream/50 px-4">© 2026 ${BRAND.name} · Quality is our priority 🐾 · Chennai, Tamil Nadu</div>
  </footer>

  <div id="hours-modal" class="hidden fixed inset-0 z-[110] items-center justify-center p-4 bg-ink/60 backdrop-blur-sm">
    <div class="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl modal-pop">
      <div class="flex items-center justify-between mb-4">
        <h3 class="font-display font-bold text-lg text-ink flex items-center gap-2"><i data-lucide="calendar-clock" class="w-5 h-5 text-cherry"></i> Our Store Hours</h3>
        <button onclick="closeHoursModal()" class="w-8 h-8 rounded-full bg-cream-deep flex items-center justify-center hover:bg-blush"><i data-lucide="x" class="w-4 h-4"></i></button>
      </div>
      <div class="space-y-2 text-sm">
        ${Object.entries(STORE_HOURS_DISPLAY).map(([d, h]) => `<div class="flex justify-between py-1.5 border-b border-ink/5"><span class="font-bold text-ink/70">${d}</span><span class="font-semibold text-ink">${h}</span></div>`).join("")}
      </div>
      <p class="text-xs text-ink/50 mt-4 bg-cream-deep rounded-xl p-3">Note: Order timing is managed by our system. If ordering is unavailable at checkout, please try again later.</p>
    </div>
  </div>`;
}
function openHoursModal() { const m = document.getElementById("hours-modal"); m.classList.remove("hidden"); m.classList.add("flex"); }
function closeHoursModal() { const m = document.getElementById("hours-modal"); m.classList.add("hidden"); m.classList.remove("flex"); }

/* ---------- shared shell boot ---------- */
function bootShell({ activeTab = "", search = false } = {}) {
  renderHeader({ search });
  renderBottomNav(activeTab);
  renderWhatsApp();
  renderFooter();
  updateCartBadges();
  if (window.lucide) lucide.createIcons();
}

/* ---------- product card (shared) ---------- */
function foodDot(p, size = "sm") {
  if (!p.edible || !p.foodType || p.foodType === "other" && !p.edible) return "";
  const map = { veg: "#1F8A3B", "non-veg": "#C0392B", other: "#D4A017" };
  const c = map[p.foodType] || map.other;
  const px = size === "lg" ? 18 : 14;
  return `<span title="${p.foodType}" class="inline-flex items-center justify-center border-2 rounded-[3px] bg-white" style="width:${px}px;height:${px}px;border-color:${c}"><span class="rounded-full" style="width:${px / 2.4}px;height:${px / 2.4}px;background:${c}"></span></span>`;
}

function productCard(p, revealDelay = 0) {
  const inCart = Cart.items().filter(i => i.id === p.id).reduce((s, i) => s + i.qty, 0);
  const off = Math.round((1 - p.price / p.mrp) * 100);
  return `
  <div class="reveal product-card group bg-white rounded-3xl border border-ink/5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col" style="transition-delay:${revealDelay}ms">
    <a href="product.html?id=${p.id}" class="relative block aspect-square overflow-hidden bg-cream-deep">
      <img src="${p.img}" alt="${p.name}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
      ${off > 0 ? `<span class="absolute top-3 left-3 bg-amber text-ink text-[10px] font-extrabold px-2 py-1 rounded-full">${off}% OFF</span>` : ""}
      ${p.bestseller ? `<span class="absolute top-3 right-3 bg-cherry text-white text-[10px] font-extrabold px-2 py-1 rounded-full flex items-center gap-1"><i data-lucide="flame" class="w-3 h-3"></i>${p.orders}+ ordered</span>` : ""}
    </a>
    <div class="p-3.5 flex flex-col flex-1">
      <div class="flex items-start gap-1.5 min-h-[40px]">
        <div class="mt-0.5 shrink-0">${foodDot(p)}</div>
        <a href="product.html?id=${p.id}" class="font-bold text-sm text-ink leading-snug line-clamp-2 hover:text-cherry transition-colors">${p.name}</a>
      </div>
      <p class="text-[11px] text-ink/45 mt-1 font-semibold">${p.unit}</p>
      <div class="flex items-center gap-1 mt-1 text-[11px] font-bold text-ink/60"><i data-lucide="star" class="w-3 h-3 text-amber fill-amber"></i>${p.rating} · ${p.orders} orders</div>
      <div class="mt-auto pt-3 flex items-center justify-between gap-2">
        <div class="leading-tight">
          <span class="font-display font-bold text-ink">${rupee(p.price)}</span>
          ${p.mrp > p.price ? `<span class="block text-[11px] text-ink/40 line-through">${rupee(p.mrp)}</span>` : ""}
        </div>
        <div data-stepper="${p.id}">${inCart > 0 ? stepperHTML(p.id, inCart) : addBtnHTML(p.id)}</div>
      </div>
    </div>
  </div>`;
}
function addBtnHTML(id) {
  return `<button onclick="cardAdd('${id}')" class="add-btn bg-cherry text-white text-xs font-extrabold px-4 py-2 rounded-full hover:bg-cherry-dark active:scale-90 transition-all flex items-center gap-1"><i data-lucide="plus" class="w-3.5 h-3.5"></i>ADD</button>`;
}
function stepperHTML(id, qty) {
  return `<div class="flex items-center gap-2 bg-cherry text-white rounded-full px-1.5 py-1">
    <button onclick="cardStep('${id}',-1)" class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-90 transition"><i data-lucide="minus" class="w-3.5 h-3.5"></i></button>
    <span class="text-xs font-extrabold min-w-[14px] text-center">${qty}</span>
    <button onclick="cardStep('${id}',1)" class="w-6 h-6 flex items-center justify-center rounded-full hover:bg-white/20 active:scale-90 transition"><i data-lucide="plus" class="w-3.5 h-3.5"></i></button>
  </div>`;
}
function cardAdd(id) {
  const p = getProduct(id);
  const def = p.variants.find(v => v.price === p.price) || p.variants[0];
  Cart.add(id, def.label, 1);
  refreshSteppers(id);
}
function cardStep(id, delta) {
  const p = getProduct(id);
  const def = p.variants.find(v => v.price === p.price) || p.variants[0];
  const key = id + "::" + def.label;
  const items = Cart.items();
  let it = items.find(i => i.key === key) || items.find(i => i.id === id);
  if (!it && delta > 0) { Cart.add(id, def.label, 1); refreshSteppers(id); return; }
  if (it) Cart.setQty(it.key, it.qty + delta);
  refreshSteppers(id);
}
function refreshSteppers(id) {
  const qty = Cart.qtyOf(id);
  document.querySelectorAll(`[data-stepper="${id}"]`).forEach(el => {
    el.innerHTML = qty > 0 ? stepperHTML(id, qty) : addBtnHTML(id);
  });
  if (window.lucide) lucide.createIcons();
}
