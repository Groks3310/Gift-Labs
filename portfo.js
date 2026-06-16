// ===== LOCK SCROLL =====
document.body.style.overflow = "hidden";

// ===== REFS =====
const loader = document.getElementById("pageLoader");
const introScreen = document.getElementById("introScreen");
const enterBtn = document.getElementById("enterBtn");
const siteShell = document.getElementById("siteShell");
const introBg = document.getElementById("introBg");
const navbar = document.getElementById("navbar");
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarBackdrop = document.getElementById("sidebarBackdrop");
const scrollProgress = document.getElementById("scrollProgress");
const cursorGlow = document.getElementById("cursorGlow");

// ===== GALLERY IMAGES — organized by project =====
const galleryImages = [
  // Lulu Artistry
  { src: "images/luluArtistry/lulu1.png",  caption: "Lulu Artistry — Beauty Store",       category: "Lulu Artistry" },
  { src: "images/luluArtistry/lulu2.png",  caption: "Lulu Artistry — Product Listings",   category: "Lulu Artistry" },
  { src: "images/luluArtistry/lulu3.png",  caption: "Lulu Artistry — Checkout Flow",      category: "Lulu Artistry" },
  // Vendorly
  { src: "images/vendoly/vendorly1.png",   caption: "Vendorly — WhatsApp Storefront",     category: "Vendorly" },
  { src: "images/vendoly/vendorly2.png",   caption: "Vendorly — Vendor Dashboard",        category: "Vendorly" },
  { src: "images/vendoly/vendorly3.png",   caption: "Vendorly — Product Management",      category: "Vendorly" },
  // Groks Hotel
  { src: "images/groksHotel/groksHotel1.png", caption: "Groks Hotel — Hero Section",     category: "Groks Hotel" },
  { src: "images/groksHotel/groksHotel2.png", caption: "Groks Hotel — Room Showcase",    category: "Groks Hotel" },
  { src: "images/groksHotel/groksHotel3.png", caption: "Groks Hotel — Amenities",        category: "Groks Hotel" },
  { src: "images/groksHotel/groksHotel4.png", caption: "Groks Hotel — Booking Flow",     category: "Groks Hotel" },
  // Eagles Farm
  { src: "images/eaglesFarm/eaglesfarm1.png", caption: "Eagles Farm — Dashboard",        category: "Eagles Farm" },
  { src: "images/eaglesFarm/eaglesfarm2.png", caption: "Eagles Farm — Inventory",        category: "Eagles Farm" },
  { src: "images/eaglesFarm/eaglesfarm3.png", caption: "Eagles Farm — Data Reports",     category: "Eagles Farm" },
  // RPS Shooter
  { src: "images/RPS/rps1.png",           caption: "RPS Shooter — Game Arena",           category: "RPS Shooter" },
  { src: "images/RPS/rps3.png",           caption: "RPS Shooter — Score Screen",         category: "RPS Shooter" },
  { src: "images/RPS/rps4.png",           caption: "RPS Shooter — Win State",            category: "RPS Shooter" },
];

// ===== MOVE LIGHTBOX TO BODY =====
(function moveLightboxToBody() {
  const lb = document.getElementById("lightbox");
  if (lb && lb.parentElement !== document.body) {
    document.body.appendChild(lb);
  }
})();

// ===== LOADER =====
window.addEventListener("load", () => setTimeout(() => loader.classList.add("hidden"), 900));

// ===== TYPING =====
function typeLoop(el, phrases, speed = 70, pause = 1200) {
  if (!el) return;
  let p = 0, i = 0, deleting = false;
  function step() {
    const word = phrases[p];
    el.textContent = deleting ? word.slice(0, --i) : word.slice(0, ++i);
    if (!deleting && i === word.length) { deleting = true; return setTimeout(step, pause); }
    if (deleting && i === 0) { deleting = false; p = (p + 1) % phrases.length; }
    setTimeout(step, deleting ? speed * 0.55 : speed);
  }
  step();
}
typeLoop(document.getElementById("introTyping"), [
  "Professional full-stack web development.",
  "React.js interfaces with backend architecture.",
  "MongoDB data systems and Railway deployments."
], 54, 1350);
typeLoop(document.getElementById("heroTyping"), [
  "Frontend + backend solutions designed for business growth.",
  "Reliable engineering across React, APIs, MongoDB, and deployment."
], 50, 1200);

// ===== PARTICLES =====
for (let k = 0; k < 36; k++) {
  const dot = document.createElement("i");
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.animationDuration = `${7 + Math.random() * 10}s`;
  dot.style.animationDelay = `${Math.random() * 8}s`;
  dot.style.opacity = `${0.2 + Math.random() * 0.7}`;
  document.getElementById("introParticles").appendChild(dot);
}

// ===== CURSOR =====
document.addEventListener("mousemove", (e) => {
  if (cursorGlow) { cursorGlow.style.left = `${e.clientX}px`; cursorGlow.style.top = `${e.clientY}px`; }
  if (!introScreen.classList.contains("out") && introBg) {
    const x = (e.clientX / window.innerWidth - 0.5) * 16;
    const y = (e.clientY / window.innerHeight - 0.5) * 16;
    introBg.style.transform = `scale(1.1) translate(${x}px,${y}px)`;
  }
});

// ===== SCROLL =====
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max > 0) scrollProgress.style.width = `${(window.scrollY / max) * 100}%`;
  navbar.classList.toggle("scrolled", window.scrollY > 60);
}, { passive: true });

// ===== SIDEBAR TOGGLE =====
menuBtn.addEventListener("click", () => {
  const isOpening = !sidebar.classList.contains("open");
  sidebar.classList.toggle("open");
  sidebarBackdrop.classList.toggle("show");
  if (isOpening) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});

sidebarBackdrop.addEventListener("click", () => {
  sidebar.classList.remove("open");
  sidebarBackdrop.classList.remove("show");
  document.body.style.overflow = "";
});

// ===== KEYBOARD SCROLL IN SIDEBAR =====
// Handles sidebar keyboard scrolling when open.
// When sidebar is closed, the lightbox keydown handler below takes over for Escape/arrows.
document.addEventListener("keydown", (e) => {
  // Skip — let the lightbox handler deal with it
  if (lightbox && lightbox.classList.contains("open")) return;

  if (!sidebar.classList.contains("open")) return;
  const scrollKeys = ["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "];
  if (!scrollKeys.includes(e.key)) return;

  // Close sidebar on Escape
  if (e.key === "Escape") {
    sidebar.classList.remove("open");
    sidebarBackdrop.classList.remove("show");
    document.body.style.overflow = "";
    return;
  }

  const sidebarEl = sidebar;
  const atTop = sidebarEl.scrollTop === 0 &&
    (e.key === "ArrowUp" || e.key === "PageUp" || e.key === "Home");
  const atBottom = sidebarEl.scrollTop + sidebarEl.clientHeight >= sidebarEl.scrollHeight &&
    (e.key === "ArrowDown" || e.key === "PageDown" || e.key === "End" || e.key === " ");

  if (!atTop && !atBottom) {
    e.preventDefault();
    if (e.key === "ArrowDown" || e.key === " ") sidebarEl.scrollTop += 60;
    if (e.key === "ArrowUp") sidebarEl.scrollTop -= 60;
    if (e.key === "PageDown") sidebarEl.scrollTop += 300;
    if (e.key === "PageUp") sidebarEl.scrollTop -= 300;
    if (e.key === "Home") sidebarEl.scrollTop = 0;
    if (e.key === "End") sidebarEl.scrollTop = sidebarEl.scrollHeight;
  }
});

// ===== OBSERVERS =====
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("show"); revealObs.unobserve(entry.target); }
  });
}, { threshold: 0.12 });

const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const end = Number(el.dataset.target);
    const suffix = el.dataset.suffix || (end > 20 ? "+" : "");
    const dur = 1400, start = performance.now();
    function frame(now) {
      const progress = Math.min((now - start) / dur, 1);
      el.textContent = Math.floor(end * (1 - (1 - progress) ** 3)) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    counterObs.unobserve(el);
  });
}, { threshold: 0.4 });

const skillBarObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const bar = entry.target;
    setTimeout(() => { bar.style.width = bar.dataset.width + "%"; }, 200);
    skillBarObs.unobserve(bar);
  });
}, { threshold: 0.3 });

// ===== SHOW PAGE =====
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => { p.classList.remove("active"); p.style.display = "none"; });
  const target = document.getElementById("page-" + pageId);
  if (!target) return;
  target.style.display = "block";
  target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
  setTimeout(() => {
    target.querySelectorAll(".reveal").forEach(el => { el.classList.remove("show"); revealObs.observe(el); });
    target.querySelectorAll(".counter").forEach(c => counterObs.observe(c));
    target.querySelectorAll(".sb-fill").forEach(b => skillBarObs.observe(b));
    if (pageId === "gallery") renderGallery();
  }, 60);
  document.querySelectorAll(".top-nav a").forEach(a => a.classList.toggle("active", a.dataset.page === pageId));
}

// ===== NAV =====
function bindNav(sel) {
  document.querySelectorAll(sel).forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pg = link.dataset.page;
      if (pg) {
        showPage(pg);
        sidebar.classList.remove("open");
        sidebarBackdrop.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  });
}
bindNav(".top-nav a");
bindNav(".side-links a");
bindNav(".page-link");
bindNav(".next-page-btn");
document.getElementById("logoBtn").addEventListener("click", () => {
  showPage("home");
  sidebar.classList.remove("open");
  sidebarBackdrop.classList.remove("show");
  document.body.style.overflow = "";
});

// ===== ENTER =====
enterBtn.addEventListener("click", () => {
  introScreen.classList.add("out");
  setTimeout(() => {
    introScreen.style.display = "none";
    siteShell.classList.add("live");
    // Reveal navbar now that user has entered
    navbar.style.opacity = "";
    navbar.style.visibility = "";
    navbar.classList.add("live");
    document.body.style.overflow = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
    showPage("home");
  }, 820);
});

// ===== PORTFOLIO FILTERS =====
document.addEventListener("click", function(e) {
  const btn = e.target.closest(".portfolio-filters button");
  if (!btn) return;
  document.querySelectorAll(".portfolio-filters button").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  const filter = btn.dataset.filter;
  document.querySelectorAll("#portfolioGrid .project-card").forEach(card => {
    const match = filter === "all" || card.dataset.category === filter;
    card.style.display = match ? "" : "none";
    card.classList.toggle("hide", !match);
  });
});

// ===== ACCORDION =====
document.querySelectorAll(".accordion-head").forEach(head => {
  head.addEventListener("click", () => {
    const body = head.nextElementSibling;
    const isOpen = body.classList.contains("open");
    document.querySelectorAll(".accordion-body").forEach(b => b.classList.remove("open"));
    document.querySelectorAll(".accordion-head").forEach(h => h.classList.remove("active"));
    if (!isOpen) { body.classList.add("open"); head.classList.add("active"); }
  });
});

// ===== GALLERY RENDER =====
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  if (!grid) return;
  grid.innerHTML = "";

  const groups = [
    { label: "Lulu Artistry",  images: galleryImages.filter(g => g.category === "Lulu Artistry") },
    { label: "Vendorly",       images: galleryImages.filter(g => g.category === "Vendorly") },
    { label: "Groks Hotel",    images: galleryImages.filter(g => g.category === "Groks Hotel") },
    { label: "Eagles Farm",    images: galleryImages.filter(g => g.category === "Eagles Farm") },
    { label: "RPS Shooter",    images: galleryImages.filter(g => g.category === "RPS Shooter") },
  ];

  const layoutItems = [];
  layoutItems.push({ ...groups[0].images[0], span: "tall" });
  layoutItems.push({ ...groups[0].images[1], span: "" });
  layoutItems.push({ ...groups[0].images[2], span: "" });
  layoutItems.push({ ...groups[1].images[0], span: "" });
  layoutItems.push({ ...groups[1].images[1], span: "" });
  layoutItems.push({ ...groups[1].images[2], span: "" });
  layoutItems.push({ ...groups[2].images[0], span: "wide" });
  layoutItems.push({ ...groups[2].images[1], span: "" });
  layoutItems.push({ ...groups[2].images[2], span: "" });
  layoutItems.push({ ...groups[2].images[3], span: "" });
  layoutItems.push({ ...groups[3].images[0], span: "" });
  layoutItems.push({ ...groups[3].images[1], span: "" });
  layoutItems.push({ ...groups[3].images[2], span: "" });
  layoutItems.push({ ...groups[4].images[0], span: "wide" });
  layoutItems.push({ ...groups[4].images[1], span: "" });
  layoutItems.push({ ...groups[4].images[2], span: "" });

  layoutItems.forEach((item, idx) => {
    const div = document.createElement("div");
    div.className = "gallery-item reveal" + (item.span ? " " + item.span : "");
    div.dataset.index = idx;
    div.innerHTML = `
      <img src="${item.src}" alt="${item.caption}">
      <div class="gallery-caption">${item.caption}</div>
    `;
    grid.appendChild(div);
    revealObs.observe(div);
  });

  grid.querySelectorAll(".gallery-item").forEach((el, idx) => {
    el.addEventListener("click", () => openLightbox(idx));
  });

  window._currentGalleryLayout = layoutItems;
}

// ===== LIGHTBOX =====
let currentIdx = 0;
let isAnimating = false;
let savedScrollY = 0;

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCaption = document.getElementById("lightboxCaption");

function getCurrentLayout() {
  return window._currentGalleryLayout || galleryImages;
}

function buildDots() {
  const dotsEl = document.getElementById("lightboxDots");
  if (!dotsEl) return;
  const layout = getCurrentLayout();
  dotsEl.innerHTML = "";
  layout.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "lightbox-dot" + (i === currentIdx ? " active" : "");
    dot.addEventListener("click", e => {
      e.stopPropagation();
      if (!isAnimating) slideToImage(i, i > currentIdx ? "next" : "prev");
    });
    dotsEl.appendChild(dot);
  });
}

function updateDots() {
  document.querySelectorAll(".lightbox-dot").forEach((dot, i) => dot.classList.toggle("active", i === currentIdx));
}

function openLightbox(idx) {
  const layout = getCurrentLayout();
  currentIdx = idx;
  savedScrollY = window.scrollY;
  document.body.style.top = `-${savedScrollY}px`;
  document.body.style.position = "fixed";
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
  lightboxImg.src = layout[idx].src;
  lightboxImg.alt = layout[idx].caption;
  lightboxCaption.textContent = layout[idx].caption;
  lightbox.style.display = "flex";
  lightbox.classList.add("open");
  buildDots();
  lightboxImg.style.transition = "none";
  lightboxImg.style.opacity = "0";
  lightboxImg.style.transform = "scale(0.88)";
  requestAnimationFrame(() => requestAnimationFrame(() => {
    lightboxImg.style.transition = "opacity 0.45s cubic-bezier(.4,0,.2,1), transform 0.45s cubic-bezier(.4,0,.2,1)";
    lightboxImg.style.opacity = "1";
    lightboxImg.style.transform = "scale(1)";
  }));
}

function closeLightbox() {
  lightboxImg.style.transition = "opacity 0.3s ease, transform 0.3s ease";
  lightboxImg.style.opacity = "0";
  lightboxImg.style.transform = "scale(0.92)";
  setTimeout(() => {
    lightbox.classList.remove("open");
    lightbox.style.display = "none";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.style.overflow = "";
    window.scrollTo(0, savedScrollY);
    lightboxImg.style.transition = "";
    lightboxImg.style.opacity = "1";
    lightboxImg.style.transform = "scale(1)";
    lightboxImg.src = "";
  }, 300);
}

function slideToImage(idx, direction) {
  if (isAnimating) return;
  const layout = getCurrentLayout();
  isAnimating = true;
  const exitX = direction === "next" ? "-110px" : "110px";
  const enterX = direction === "next" ? "110px" : "-110px";
  lightboxImg.style.transition = "opacity 0.28s ease, transform 0.28s ease";
  lightboxImg.style.opacity = "0";
  lightboxImg.style.transform = `translateX(${exitX}) scale(0.93)`;
  setTimeout(() => {
    currentIdx = idx;
    updateDots();
    lightboxImg.src = layout[idx].src;
    lightboxImg.alt = layout[idx].caption;
    lightboxCaption.textContent = layout[idx].caption;
    lightboxImg.style.transition = "none";
    lightboxImg.style.opacity = "0";
    lightboxImg.style.transform = `translateX(${enterX}) scale(0.93)`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      lightboxImg.style.transition = "opacity 0.38s cubic-bezier(.4,0,.2,1), transform 0.38s cubic-bezier(.4,0,.2,1)";
      lightboxImg.style.opacity = "1";
      lightboxImg.style.transform = "translateX(0) scale(1)";
      setTimeout(() => { isAnimating = false; }, 420);
    }));
  }, 290);
}

// Lightbox controls
document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if (e.target === lightbox) closeLightbox(); });

document.getElementById("lightboxPrev").addEventListener("click", e => {
  e.stopPropagation();
  const layout = getCurrentLayout();
  if (!isAnimating) slideToImage((currentIdx - 1 + layout.length) % layout.length, "prev");
});
document.getElementById("lightboxNext").addEventListener("click", e => {
  e.stopPropagation();
  const layout = getCurrentLayout();
  if (!isAnimating) slideToImage((currentIdx + 1) % layout.length, "next");
});

// Lightbox keyboard (Escape, Left, Right arrows)
document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("open")) return;
  const layout = getCurrentLayout();
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft" && !isAnimating) slideToImage((currentIdx - 1 + layout.length) % layout.length, "prev");
  if (e.key === "ArrowRight" && !isAnimating) slideToImage((currentIdx + 1) % layout.length, "next");
});

// Lightbox touch swipe
let touchStartX = 0;
lightbox.addEventListener("touchstart", e => { touchStartX = e.touches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", e => {
  const layout = getCurrentLayout();
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) < 50) return;
  if (diff > 0) slideToImage((currentIdx + 1) % layout.length, "next");
  else slideToImage((currentIdx - 1 + layout.length) % layout.length, "prev");
});

// ===== WHATSAPP FORM =====
document.getElementById("sendMsgBtn").addEventListener("click", () => {
  const form = document.getElementById("contactForm");
  const name = String(form.name.value || "").trim();
  const email = String(form.email.value || "").trim();
  const message = String(form.message.value || "").trim();
  const formMessage = document.getElementById("formMessage");
  if (!name || !email || !message || !/^\S+@\S+\.\S+$/.test(email)) {
    formMessage.textContent = "Please provide valid name, email, and project message.";
    return;
  }
  const text = encodeURIComponent(`Hello OKE RUTH GIFT,\n\nMy name is ${name}.\nEmail: ${email}\n\nMessage:\n${message}`);
  window.open(`https://wa.me/2348167580313?text=${text}`, "_blank");
  formMessage.textContent = "Opening WhatsApp with your message...";
  form.reset();
  setTimeout(() => { formMessage.textContent = ""; }, 5000);
});

// ===== MUSIC =====
document.getElementById("musicToggle").addEventListener("click", function () {
  this.classList.toggle("active");
  this.textContent = this.classList.contains("active") ? "♫" : "♪";
});

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // Move lightbox to body so fixed positioning works correctly
  const lb = document.getElementById("lightbox");
  if (lb && lb.parentElement !== document.body) {
    document.body.appendChild(lb);
  }

  // Hide navbar until user clicks Enter Website
  navbar.style.opacity = "0";
  navbar.style.visibility = "hidden";

  // Show home page on load/refresh
  document.querySelectorAll(".page").forEach(p => { p.classList.remove("active"); p.style.display = "none"; });
  const home = document.getElementById("page-home");
  if (home) {
    home.style.display = "block";
    home.classList.add("active");
    setTimeout(() => {
      home.querySelectorAll(".reveal").forEach(el => revealObs.observe(el));
      home.querySelectorAll(".counter").forEach(c => counterObs.observe(c));
    }, 100);
  }
});