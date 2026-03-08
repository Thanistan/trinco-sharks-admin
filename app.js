// =====================================================
//   SAVORIA RESTAURANT — Shared Data & Utilities
// =====================================================

// --- Default Menu Data (used if localStorage is empty) ---
const DEFAULT_MENU = [
  {
    id: 1, name: "Truffle Wagyu Burger",
    category: "Burger",
    price: 18.99, rating: 4.9, reviews: 234,
    description: "Premium wagyu beef patty with black truffle aioli, aged cheddar, caramelized onions on a brioche bun.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    badge: "Bestseller", available: true
  },
  {
    id: 2, name: "Margherita Royale",
    category: "Pizza",
    price: 16.50, rating: 4.8, reviews: 189,
    description: "San Marzano tomato sauce, fresh buffalo mozzarella, basil, extra virgin olive oil on wood-fired dough.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=500&q=80",
    badge: "Popular", available: true
  },
  {
    id: 3, name: "Saffron Chicken Rice",
    category: "Rice",
    price: 14.99, rating: 4.7, reviews: 156,
    description: "Aromatic basmati rice with saffron-marinated chicken, toasted almonds, golden raisins, and herb yogurt.",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=500&q=80",
    badge: "Chef's Pick", available: true
  },
  {
    id: 4, name: "Mango Passion Cooler",
    category: "Drinks",
    price: 6.50, rating: 4.9, reviews: 312,
    description: "Fresh Alphonso mango blended with passion fruit, mint, lime and sparkling water. Served over crushed ice.",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500&q=80",
    badge: "New", available: true
  },
  {
    id: 5, name: "BBQ Smokehouse Burger",
    category: "Burger",
    price: 16.99, rating: 4.6, reviews: 178,
    description: "Slow-smoked beef patty, house BBQ sauce, crispy onion rings, cheddar, pickles on a pretzel bun.",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&q=80",
    badge: null, available: true
  },
  {
    id: 6, name: "Pepperoni Volcano",
    category: "Pizza",
    price: 17.50, rating: 4.8, reviews: 203,
    description: "Loaded with premium pepperoni, spicy jalapeños, three-cheese blend, and our secret hot honey drizzle.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=500&q=80",
    badge: "Spicy 🌶", available: true
  },
  {
    id: 7, name: "Seafood Paella",
    category: "Rice",
    price: 22.99, rating: 4.9, reviews: 127,
    description: "Spanish saffron rice with tiger prawns, mussels, calamari, chorizo, roasted peppers, and saffron broth.",
    image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=500&q=80",
    badge: "Premium", available: true
  },
  {
    id: 8, name: "Cold Brew Espresso Float",
    category: "Drinks",
    price: 7.99, rating: 4.8, reviews: 287,
    description: "24-hour cold brew concentrate, vanilla bean gelato, chocolate shavings. A dessert in a glass.",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80",
    badge: null, available: true
  },
  {
    id: 9, name: "Mushroom Swiss Melt",
    category: "Burger",
    price: 15.50, rating: 4.5, reviews: 145,
    description: "Wild mushroom sauté, melted Swiss cheese, garlic aioli, arugula on a toasted sourdough bun.",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500&q=80",
    badge: "Veggie", available: true
  },
  {
    id: 10, name: "Four Cheese Dream",
    category: "Pizza",
    price: 15.99, rating: 4.7, reviews: 198,
    description: "Mozzarella, gorgonzola, parmesan, ricotta on a thin crisp base with honey drizzle and fresh thyme.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80",
    badge: null, available: true
  },
  {
    id: 11, name: "Lamb Biryani",
    category: "Rice",
    price: 19.99, rating: 4.9, reviews: 167,
    description: "Slow-cooked tender lamb with aged basmati, whole spices, crispy onions, served with mint raita.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500&q=80",
    badge: "Bestseller", available: true
  },
  {
    id: 12, name: "Berry Hibiscus Lemonade",
    category: "Drinks",
    price: 5.99, rating: 4.7, reviews: 223,
    description: "House-made hibiscus syrup, mixed berries, fresh lemon juice, topped with sparkling water and mint.",
    image: "https://images.unsplash.com/photo-1464347744102-11db6282a4a0?w=500&q=80",
    badge: null, available: true
  }
];

// =====================================================
//   DATA LAYER — localStorage wrappers
// =====================================================

const DB = {
  getMenu() {
    const stored = localStorage.getItem('sav_menu');
    return stored ? JSON.parse(stored) : DEFAULT_MENU;
  },
  saveMenu(items) {
    localStorage.setItem('sav_menu', JSON.stringify(items));
  },
  getCart() {
    const stored = localStorage.getItem('sav_cart');
    return stored ? JSON.parse(stored) : [];
  },
  saveCart(cart) {
    localStorage.setItem('sav_cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
  },
  getOrders() {
    const stored = localStorage.getItem('sav_orders');
    return stored ? JSON.parse(stored) : [];
  },
  saveOrders(orders) {
    localStorage.setItem('sav_orders', JSON.stringify(orders));
  },
  addOrder(order) {
    const orders = DB.getOrders();
    orders.unshift(order);
    DB.saveOrders(orders);
    return order;
  },
  clearCart() {
    localStorage.removeItem('sav_cart');
    window.dispatchEvent(new Event('cartUpdated'));
  }
};

// =====================================================
//   CART UTILITIES
// =====================================================

const Cart = {
  getAll()     { return DB.getCart(); },
  count()      { return DB.getCart().reduce((s, i) => s + i.qty, 0); },
  total()      { return DB.getCart().reduce((s, i) => s + i.price * i.qty, 0); },

  add(item) {
    const cart = DB.getCart();
    const existing = cart.find(c => c.id === item.id);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ ...item, qty: 1 });
    }
    DB.saveCart(cart);
    showToast(`🛒 ${item.name} added to cart!`);
  },

  remove(id) {
    const cart = DB.getCart().filter(c => c.id !== id);
    DB.saveCart(cart);
  },

  updateQty(id, qty) {
    const cart = DB.getCart();
    const item = cart.find(c => c.id === id);
    if (item) {
      item.qty = qty;
      if (item.qty <= 0) return Cart.remove(id);
    }
    DB.saveCart(cart);
  },

  clear() { DB.clearCart(); }
};

// =====================================================
//   UI UTILITIES
// =====================================================

function showToast(msg, type = 'success') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = '0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Update all cart count badges on the page
function updateCartBadge() {
  const count = Cart.count();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// --- Dark Mode ---
function initTheme() {
  const saved = localStorage.getItem('sav_theme') || 'light';
  document.documentElement.setAttribute('data-theme', saved);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = saved === 'dark' ? '☀️' : '🌙';
  });
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('sav_theme', next);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

// --- Navbar scroll effect ---
function initNavbar() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
  window.addEventListener('scroll', onScroll, { passive: true });

  // Hamburger
  const ham = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (ham && mobileNav) {
    ham.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      ham.classList.toggle('open');
    });
  }

  // Theme toggles
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  updateCartBadge();
  window.addEventListener('cartUpdated', updateCartBadge);
}

// --- Render a food card ---
function renderFoodCard(item, compact = false) {
  const stars = '★'.repeat(Math.floor(item.rating)) + (item.rating % 1 >= 0.5 ? '☆' : '');
  return `
  <div class="food-card" data-id="${item.id}">
    <div class="food-card-img">
      <img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80'">
      ${item.badge ? `<div class="food-card-badge"><span class="badge badge-amber">${item.badge}</span></div>` : ''}
      <button class="food-card-fav" title="Favourite">♡</button>
    </div>
    <div class="food-card-body">
      <div class="food-card-cat">${item.category}</div>
      <div class="food-card-name">${item.name}</div>
      ${!compact ? `<div class="food-card-desc">${item.description}</div>` : ''}
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;">
        <span class="stars">${stars}</span>
        <span style="font-size:0.8rem;color:var(--text-muted)">${item.rating} (${item.reviews})</span>
      </div>
      <div class="food-card-footer">
        <div class="food-card-price">$${item.price.toFixed(2)}</div>
        <button class="add-to-cart-btn" onclick="Cart.add(${JSON.stringify(item).replace(/"/g, '&quot;')})">
          + Add
        </button>
      </div>
    </div>
  </div>`;
}

// --- Navbar HTML template ---
function navbarHTML(activePage = '') {
  const pages = [
    { href: 'index.html',    label: 'Home'  },
    { href: 'menu.html',     label: 'Menu'  },
    { href: 'cart.html',     label: 'Cart'  },
  ];
  const links = pages.map(p =>
    `<li><a href="${p.href}" class="${activePage === p.label ? 'active' : ''}">${p.label}</a></li>`
  ).join('');
  const mobileLinks = pages.map(p =>
    `<a href="${p.href}" class="${activePage === p.label ? 'active' : ''}">${p.label}</a>`
  ).join('');

  return `
  <nav class="navbar">
    <div class="nav-inner">
      <a href="index.html" class="nav-logo">Sav<span>oria</span></a>
      <ul class="nav-links">${links}</ul>
      <div class="nav-actions">
        <button class="theme-toggle" title="Toggle theme">🌙</button>
        <a href="cart.html" class="cart-btn">
          🛒 Cart <span class="cart-count">0</span>
        </a>
        <button class="hamburger" aria-label="Menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </nav>
  <div class="mobile-nav">
    ${mobileLinks}
    <a href="admin-login.html" style="color:var(--amber);margin-top:8px;">🔐 Admin</a>
  </div>`;
}

// --- Footer HTML template ---
function footerHTML() {
  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <span class="nav-logo">Sav<span style="color:var(--amber)">oria</span></span>
          <p>Crafting unforgettable dining experiences since 2018. Every dish tells a story — made with passion, served with love.</p>
          <div class="footer-social" style="margin-top:20px;">
            <a href="#">📘</a><a href="#">📸</a><a href="#">🐦</a><a href="#">▶️</a>
          </div>
        </div>
        <div>
          <h4>Quick Links</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="menu.html">Menu</a></li>
            <li><a href="cart.html">Cart</a></li>
          </ul>
        </div>
        <div>
          <h4>Categories</h4>
          <ul>
            <li><a href="menu.html?cat=Burger">Burgers</a></li>
            <li><a href="menu.html?cat=Pizza">Pizzas</a></li>
            <li><a href="menu.html?cat=Rice">Rice Dishes</a></li>
            <li><a href="menu.html?cat=Drinks">Drinks</a></li>
          </ul>
        </div>
        <div>
          <h4>Contact</h4>
          <ul>
            <li><a href="#">📍 123 Gourmet Ave, NY</a></li>
            <li><a href="#">📞 +1 (555) 123-4567</a></li>
            <li><a href="#">✉️ hello@savoria.com</a></li>
            <li><a href="#">⏰ 11am – 11pm Daily</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2024 Savoria Restaurant. All rights reserved.</span>
        <span>Made with ❤️ for food lovers</span>
      </div>
    </div>
  </footer>`;
}

// Init on every page
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
});
