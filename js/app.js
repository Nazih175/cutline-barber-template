/**
 * ==============================================================================
 * CUTLINE — LUXURY BARBERSHOP WEBSITE TEMPLATE
 * MASTER APPLICATION CONTROLLER (`app.js`)
 * ==============================================================================
 * Lightweight vanilla JavaScript engine handling:
 * - Dynamic configuration hydration from `config.js`
 * - Live business open/closed status calculation
 * - Sticky navigation & mobile drawer menu
 * - Interactive service menu filter tabs
 * - Filterable gallery & accessible lightbox modal
 * - Accessible FAQ accordion
 * - Complete appointment booking modal
 * - Client-side contact & newsletter validation
 * - Live theme customizer preview for template buyers
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Global config reference
  const config = window.CUTLINE_CONFIG || (typeof CUTLINE_CONFIG !== "undefined" ? CUTLINE_CONFIG : {});

  // 1. INITIALIZE & HYDRATE CONFIGURATION
  initTheme(config.theme);
  hydrateStaticContent(config);
  initLiveHoursStatus(config.hours, config);
  renderServices(config.services, "all");
  renderTeam(config.team);
  renderGallery(config.gallery, "all");
  renderFaqs(config.faqs);
  setupBookingSystem(config);

  // 2. INTERACTION CONTROLLERS
  initNavigation();
  initServiceFilters(config.services);
  initGalleryFilters(config.gallery);
  initLightbox();
  initFaqAccordion();
  initContactForm();
  initNewsletterForm();
  initLiveCustomizer(config);
});

/* --------------------------------------------------------------------------
 * 1. THEME & STATIC CONTENT HYDRATION
 * -------------------------------------------------------------------------- */
function initTheme(theme) {
  if (!theme) return;
  const root = document.documentElement;
  if (theme.primaryBronze) root.style.setProperty("--color-primary-bronze", theme.primaryBronze);
  if (theme.bronzeLight) root.style.setProperty("--color-bronze-light", theme.bronzeLight);
  if (theme.bronzeDark) root.style.setProperty("--color-bronze-dark", theme.bronzeDark);
  if (theme.charcoalDark) root.style.setProperty("--color-charcoal-dark", theme.charcoalDark);
  if (theme.charcoalCard) root.style.setProperty("--color-charcoal-card", theme.charcoalCard);
  if (theme.creamWarm) root.style.setProperty("--color-cream-warm", theme.creamWarm);
  if (theme.creamMuted) root.style.setProperty("--color-cream-muted", theme.creamMuted);
}

function getNestedValue(obj, path) {
  return path.split(".").reduce((acc, part) => acc && acc[part], obj);
}

function hydrateStaticContent(config) {
  // Text content binding
  document.querySelectorAll("[data-config]").forEach((el) => {
    const key = el.getAttribute("data-config");
    const val = getNestedValue(config, key);
    if (val !== undefined && val !== null) {
      el.textContent = val;
    }
  });

  // Attribute binding (e.g. data-config-attr="href:business.phoneRaw" or "src:team[0].image")
  document.querySelectorAll("[data-config-attr]").forEach((el) => {
    const binding = el.getAttribute("data-config-attr");
    const [attr, path] = binding.split(":");
    let val = getNestedValue(config, path);
    if (val !== undefined && val !== null) {
      if (attr === "href" && path === "business.phoneRaw") {
        el.setAttribute(attr, `tel:${val}`);
      } else if (attr === "href" && path === "business.email") {
        el.setAttribute(attr, `mailto:${val}`);
      } else {
        el.setAttribute(attr, val);
      }
    }
  });

  // Update Page Title if configured
  if (config.business && config.business.name) {
    document.title = `${config.business.name} — ${config.business.subname || "Master Barbers"}`;
  }
}

/* --------------------------------------------------------------------------
 * 2. LIVE OPEN / CLOSED STATUS CALCULATION
 * -------------------------------------------------------------------------- */
function initLiveHoursStatus(hoursList, config) {
  const statusContainer = document.getElementById("live-status-indicator");
  const hoursTableContainer = document.getElementById("hours-table-body");
  if (!hoursList || !hoursList.length) return;

  const now = new Date();
  const currentDayIndex = now.getDay(); // 0 is Sunday, 1 is Monday...
  // Convert JS day (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat) to match standard array
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const currentDayName = dayNames[currentDayIndex];
  const currentHour = now.getHours() + now.getMinutes() / 60;

  let todayConfig = hoursList.find(
    (h) => h.day.toLowerCase() === currentDayName.toLowerCase()
  ) || hoursList[0];

  let isOpen = false;
  if (!todayConfig.isClosed && currentHour >= todayConfig.openHour24 && currentHour < todayConfig.closeHour24) {
    isOpen = true;
  }

  // Update top indicator badge
  if (statusContainer) {
    const dot = statusContainer.querySelector(".status-dot");
    const text = statusContainer.querySelector(".status-text");
    if (dot && text) {
      if (config && config.onlineBooking247) {
        dot.className = "status-dot";
        text.innerHTML = config.statusBadgeCustomText || `Online Concierge & Booking <span class="text-bronze">Live 24/7</span>`;
      } else if (isOpen) {
        dot.className = "status-dot";
        text.innerHTML = `Open Today until <span class="text-bronze">${todayConfig.closeTime}</span>`;
      } else {
        dot.className = "status-dot closed";
        text.innerHTML = `Currently Closed • <span class="text-bronze">Opens ${todayConfig.openTime}</span>`;
      }
    }
  }

  // Populate Hours Table with highlight
  if (hoursTableContainer) {
    const onlineRow = config && config.onlineBooking247 ? `
      <div class="hours-row online-247" style="background: rgba(197, 160, 89, 0.1); border-left: 3px solid var(--color-primary-bronze); margin-bottom: 0.65rem; padding: 0.65rem 0.85rem; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
        <span class="hours-day" style="color: var(--color-bronze-light); font-weight: 600;">Online Booking & Concierge</span>
        <span class="hours-time" style="color: #4ade80; font-weight: 600;">Open 24/7 Live</span>
      </div>
    ` : "";

    hoursTableContainer.innerHTML = onlineRow + hoursList
      .map((h) => {
        const isToday = h.day.toLowerCase() === currentDayName.toLowerCase();
        const timeDisplay = h.isClosed ? "Closed" : `${h.openTime} – ${h.closeTime}`;
        return `
          <div class="hours-row ${isToday ? "today" : ""}">
            <span class="hours-day">${h.day} ${isToday ? "(Today)" : ""}</span>
            <span class="hours-time">${timeDisplay}</span>
          </div>
        `;
      })
      .join("");
  }
}

/* --------------------------------------------------------------------------
 * 3. NAVIGATION & MOBILE DRAWER
 * -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const mobileDrawer = document.getElementById("mobile-drawer");
  const mobileOverlay = document.getElementById("mobile-overlay");
  const drawerCloseBtn = document.getElementById("drawer-close-btn");
  const drawerLinks = document.querySelectorAll(".drawer-nav a");

  // Sticky header blur effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  const openDrawer = () => {
    mobileDrawer.classList.add("active");
    mobileOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove("active");
    mobileOverlay.classList.remove("active");
    document.body.style.overflow = "";
  };

  if (mobileToggle) mobileToggle.addEventListener("click", openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  if (mobileOverlay) mobileOverlay.addEventListener("click", closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener("click", closeDrawer));

  // Handle escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileDrawer.classList.contains("active")) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
 * 4. SERVICES RENDERING & CATEGORY FILTERING
 * -------------------------------------------------------------------------- */
function renderServices(services, activeCategory) {
  const container = document.getElementById("services-grid-container");
  if (!container || !services) return;

  const filtered = activeCategory === "all"
    ? services
    : services.filter((s) => s.category === activeCategory);

  container.innerHTML = filtered
    .map((s) => `
      <article class="service-card" data-category="${s.category}">
        <div>
          <div class="service-header">
            <div class="service-title-wrap">
              <h3 class="service-name">${s.name}</h3>
              ${s.isPopular ? '<span class="badge-popular">Signature</span>' : ""}
            </div>
            <div class="service-price-block">
              <div class="service-price">${s.price}</div>
              <div class="service-duration">${s.duration}</div>
            </div>
          </div>
          <p class="service-description">${s.description}</p>
        </div>
        <div class="service-card-footer">
          <span class="text-muted" style="font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase;">
            Hot Lather &amp; Beverage Included
          </span>
          <button type="button" class="btn-service-book book-service-trigger" data-service-id="${s.id}" data-service-name="${s.name}" data-service-price="${s.price}">
            Select &amp; Book &rarr;
          </button>
        </div>
      </article>
    `)
    .join("");

  // Re-bind booking triggers on service cards
  setupServiceCardBookingTriggers();
}

function initServiceFilters(services) {
  const tabButtons = document.querySelectorAll(".services-tabs .tab-btn");
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.getAttribute("data-category");
      renderServices(services, category);
    });
  });
}

/* --------------------------------------------------------------------------
 * 5. TEAM / CRAFTSMEN RENDERING
 * -------------------------------------------------------------------------- */
function renderTeam(teamList) {
  const container = document.getElementById("team-grid-container");
  if (!container || !teamList) return;

  container.innerHTML = teamList
    .map((m) => `
      <article class="team-card">
        <div class="team-image-box">
          <img src="${m.image}" alt="${m.name} — ${m.role}" loading="lazy">
          <div class="team-chair-badge">${m.chair}</div>
        </div>
        <div class="team-info">
          <h3 class="team-name">${m.name}</h3>
          <div class="team-role">${m.role} • ${m.experience}</div>
          <p class="team-bio">${m.bio}</p>
          <div class="team-specialties">
            ${m.specialties.map((spec) => `<span class="specialty-tag">${spec}</span>`).join("")}
          </div>
          <div class="team-card-footer">
            <span class="team-schedule">In Chair: ${m.schedule}</span>
            <button type="button" class="btn btn-secondary btn-sm book-barber-trigger" data-barber-name="${m.name}">
              Book With ${m.name.split(" ")[0]}
            </button>
          </div>
        </div>
      </article>
    `)
    .join("");

  // Bind barber booking triggers
  document.querySelectorAll(".book-barber-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const barberName = btn.getAttribute("data-barber-name");
      openBookingModal({ preselectedBarber: barberName });
    });
  });
}

/* --------------------------------------------------------------------------
 * 6. GALLERY & LIGHTBOX
 * -------------------------------------------------------------------------- */
let currentGalleryData = [];
let currentLightboxIndex = 0;

function renderGallery(galleryList, activeCategory) {
  const container = document.getElementById("gallery-grid-container");
  if (!container || !galleryList) return;

  const filtered = activeCategory === "all"
    ? galleryList
    : galleryList.filter((g) => g.category === activeCategory);

  currentGalleryData = filtered;

  container.innerHTML = filtered
    .map((item, index) => `
      <div class="gallery-item" data-index="${index}" tabindex="0" role="button" aria-label="View ${item.title}">
        <img src="${item.image}" alt="${item.title}" loading="lazy">
        <div class="gallery-overlay">
          <span class="gallery-category-pill">${item.category}</span>
          <h4 class="gallery-title">${item.title}</h4>
        </div>
      </div>
    `)
    .join("");

  // Bind lightbox open on item click
  container.querySelectorAll(".gallery-item").forEach((el) => {
    el.addEventListener("click", () => {
      const idx = parseInt(el.getAttribute("data-index"), 10);
      openLightbox(idx);
    });
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const idx = parseInt(el.getAttribute("data-index"), 10);
        openLightbox(idx);
      }
    });
  });
}

function initGalleryFilters(galleryList) {
  const filterBtns = document.querySelectorAll(".gallery-filters .tab-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const cat = btn.getAttribute("data-gallery-filter");
      renderGallery(galleryList, cat);
    });
  });
}

function openLightbox(index) {
  if (!currentGalleryData || !currentGalleryData[index]) return;
  currentLightboxIndex = index;
  const modal = document.getElementById("gallery-lightbox-modal");
  const img = document.getElementById("lightbox-img");
  const title = document.getElementById("lightbox-title");
  const caption = document.getElementById("lightbox-caption");

  const item = currentGalleryData[index];
  img.src = item.image;
  img.alt = item.title;
  title.textContent = item.title;
  caption.textContent = item.caption;

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const modal = document.getElementById("gallery-lightbox-modal");
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function initLightbox() {
  const modal = document.getElementById("gallery-lightbox-modal");
  const closeBtn = document.getElementById("lightbox-close-btn");
  const prevBtn = document.getElementById("lightbox-prev-btn");
  const nextBtn = document.getElementById("lightbox-next-btn");

  if (!modal) return;

  closeBtn.addEventListener("click", closeLightbox);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  const showNext = () => {
    currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryData.length;
    openLightbox(currentLightboxIndex);
  };

  const showPrev = () => {
    currentLightboxIndex =
      (currentLightboxIndex - 1 + currentGalleryData.length) % currentGalleryData.length;
    openLightbox(currentLightboxIndex);
  };

  if (nextBtn) nextBtn.addEventListener("click", showNext);
  if (prevBtn) prevBtn.addEventListener("click", showPrev);

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("active")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
    if (e.key === "ArrowLeft") showPrev();
  });
}

/* --------------------------------------------------------------------------
 * 7. FAQ ACCORDION
 * -------------------------------------------------------------------------- */
function renderFaqs(faqs) {
  const container = document.getElementById("faq-list-container");
  if (!container || !faqs) return;

  container.innerHTML = faqs
    .map((f, i) => `
      <div class="faq-item ${i === 0 ? "active" : ""}">
        <button type="button" class="faq-question-btn" aria-expanded="${i === 0 ? "true" : "false"}">
          <span>${f.question}</span>
          <svg class="faq-icon-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
        <div class="faq-answer" style="${i === 0 ? "max-height: 250px;" : ""}">
          <div class="faq-answer-inner">${f.answer}</div>
        </div>
      </div>
    `)
    .join("");

  initFaqAccordion();
}

function initFaqAccordion() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const btn = item.querySelector(".faq-question-btn");
    const answer = item.querySelector(".faq-answer");

    btn.onclick = () => {
      const isActive = item.classList.contains("active");

      // Close other items
      items.forEach((other) => {
        if (other !== item) {
          other.classList.remove("active");
          other.querySelector(".faq-question-btn").setAttribute("aria-expanded", "false");
          other.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
        btn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + 30 + "px";
      }
    };
  });
}

/* --------------------------------------------------------------------------
 * 8. APPOINTMENT BOOKING SYSTEM & MODAL
 * -------------------------------------------------------------------------- */
function setupBookingSystem(config) {
  const businessConfig = (config && config.business) || {};
  const bookingUrl = businessConfig.bookingUrl || "#book-modal";
  const allBookingTriggers = document.querySelectorAll(".global-booking-trigger");

  allBookingTriggers.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // If customer set an external booking URL (e.g. square, fresha, booksy)
      if (bookingUrl.startsWith("http://") || bookingUrl.startsWith("https://")) {
        // Direct link to third party booking system
        window.open(bookingUrl, "_blank", "noopener,noreferrer");
      } else {
        // Open the built-in CUTLINE Booking Modal
        e.preventDefault();
        openBookingModal();
      }
    });
  });

  // Modal Close Events
  const modal = document.getElementById("booking-modal");
  const closeBtn = document.getElementById("booking-modal-close");
  if (closeBtn) closeBtn.addEventListener("click", closeBookingModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeBookingModal();
    });
  }

  // Populate dynamic select dropdowns
  populateBookingOptions(config);
  initBookingFormSubmit();
}

function setupServiceCardBookingTriggers() {
  document.querySelectorAll(".book-service-trigger").forEach((btn) => {
    btn.addEventListener("click", () => {
      const srvName = btn.getAttribute("data-service-name");
      openBookingModal({ preselectedService: srvName });
    });
  });
}

function openBookingModal(options = {}) {
  const modal = document.getElementById("booking-modal");
  if (!modal) return;

  const serviceSelect = document.getElementById("booking-service-select");
  const barberSelect = document.getElementById("booking-barber-select");
  const dateInput = document.getElementById("booking-date-input");

  // Set min date to today
  if (dateInput) {
    const todayStr = new Date().toISOString().split("T")[0];
    dateInput.min = todayStr;
    if (!dateInput.value) dateInput.value = todayStr;
  }

  if (options.preselectedService && serviceSelect) {
    for (let opt of serviceSelect.options) {
      if (opt.text.toLowerCase().includes(options.preselectedService.toLowerCase()) || opt.value.toLowerCase().includes(options.preselectedService.toLowerCase())) {
        opt.selected = true;
        break;
      }
    }
  }

  if (options.preselectedBarber && barberSelect) {
    for (let opt of barberSelect.options) {
      if (opt.text.toLowerCase().includes(options.preselectedBarber.toLowerCase())) {
        opt.selected = true;
        break;
      }
    }
  }

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.style.overflow = "";
}

function populateBookingOptions(cfg) {
  const config = cfg || window.CUTLINE_CONFIG || (typeof CUTLINE_CONFIG !== "undefined" ? CUTLINE_CONFIG : {});
  const serviceSelect = document.getElementById("booking-service-select");
  const barberSelect = document.getElementById("booking-barber-select");

  if (serviceSelect && config.services) {
    serviceSelect.innerHTML = `<option value="">Choose a Service...</option>` +
      config.services
        .map((s) => `<option value="${s.name}">${s.name} (${s.price} • ${s.duration})</option>`)
        .join("");
  }

  if (barberSelect && config.team) {
    barberSelect.innerHTML = `<option value="Any Available Craftsman">First Available Master Barber</option>` +
      config.team
        .map((t) => `<option value="${t.name}">${t.name} (${t.chair})</option>`)
        .join("");
  }
}

function initBookingFormSubmit() {
  const form = document.getElementById("onsite-booking-form");
  const feedback = document.getElementById("booking-form-feedback");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const service = document.getElementById("booking-service-select").value;
    const barber = document.getElementById("booking-barber-select").value;
    const date = document.getElementById("booking-date-input").value;
    const time = document.getElementById("booking-time-select").value;
    const name = document.getElementById("booking-client-name").value.trim();
    const phone = document.getElementById("booking-client-phone").value.trim();
    const email = document.getElementById("booking-client-email").value.trim();

    if (!service || !date || !time || !name || !phone || !email) {
      feedback.className = "form-feedback-message error";
      feedback.textContent = "Please complete all required appointment details.";
      return;
    }

    // Call Firebase Service if available
    if (window.CutlineFirebase) {
      window.CutlineFirebase.saveAppointmentBooking({
        serviceName: service,
        barberName: barber,
        appointmentDate: date,
        appointmentTime: time,
        clientName: name,
        clientPhone: phone,
        clientEmail: email
      }).catch((err) => {
        console.warn("Could not record appointment in Cloud Firestore:", err);
      });
    }

    // Success response
    feedback.className = "form-feedback-message success";
    feedback.innerHTML = `
      <strong>Appointment Request Sent!</strong><br>
      Thank you, ${name}. Your reservation for <strong>${service}</strong> with <strong>${barber}</strong> on <strong>${date} at ${time}</strong> has been received. Our concierge will send an SMS and email confirmation to <strong>${phone}</strong>.
    `;
    form.reset();

    setTimeout(() => {
      // Auto close after 4 seconds
      // closeBookingModal();
    }, 4500);
  });
}

/* --------------------------------------------------------------------------
 * 9. CONTACT & NEWSLETTER FORMS
 * -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contact-inquiry-form");
  const feedback = document.getElementById("contact-feedback");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = form.querySelector("[name='fullname']").value.trim();
    const email = form.querySelector("[name='email']").value.trim();
    const message = form.querySelector("[name='message']").value.trim();
    const phone = form.querySelector("[name='phone']") ? form.querySelector("[name='phone']").value.trim() : "";
    const topic = form.querySelector("[name='topic']") ? form.querySelector("[name='topic']").value.trim() : "";

    if (!name || !email || !message) {
      feedback.className = "form-feedback-message error";
      feedback.textContent = "Please fill in your name, email, and message.";
      return;
    }

    // Email regex check
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      feedback.className = "form-feedback-message error";
      feedback.textContent = "Please enter a valid email address.";
      return;
    }

    // Call Firebase Service if available
    if (window.CutlineFirebase) {
      window.CutlineFirebase.saveContactInquiry({
        fullname: name,
        email: email,
        phone: phone,
        topic: topic,
        message: message
      }).catch((err) => {
        console.warn("Could not record inquiry in Cloud Firestore:", err);
      });
    }

    feedback.className = "form-feedback-message success";
    feedback.innerHTML = `<strong>Message Dispatched.</strong> Thank you, ${name}. Our concierge team will reply within 2 business hours.`;
    form.reset();
  });
}

function initNewsletterForm() {
  const form = document.getElementById("newsletter-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = form.querySelector("input[type='email']");
    const email = input.value.trim();

    if (email && email.includes("@")) {
      // Call Firebase Service if available
      if (window.CutlineFirebase) {
        window.CutlineFirebase.saveNewsletterSubscriber(email).catch((err) => {
          console.warn("Could not record subscriber in Cloud Firestore:", err);
        });
      }

      input.value = "";
      input.placeholder = "✓ Subscribed to Cutline Journal";
      input.style.borderColor = "var(--color-status-green)";
      setTimeout(() => {
        input.placeholder = "Enter your email";
        input.style.borderColor = "";
      }, 4000);
    }
  });
}

/* --------------------------------------------------------------------------
 * 10. LIVE CUSTOMIZER PREVIEW (FOR BUYERS)
 * -------------------------------------------------------------------------- */
function initLiveCustomizer(config) {
  const trigger = document.getElementById("customizer-toggle-btn");
  const panel = document.getElementById("customizer-floating-panel");
  const closeBtn = document.getElementById("customizer-panel-close");

  if (!trigger || !panel) return;

  trigger.addEventListener("click", () => {
    panel.classList.toggle("active");
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      panel.classList.remove("active");
    });
  }

  // Live Color Schemes
  const colorThemes = {
    bronze: {
      primaryBronze: "#C5A059",
      bronzeLight: "#E5C788",
      bronzeDark: "#8C682A",
      charcoalDark: "#0D0D0D"
    },
    silver: {
      primaryBronze: "#D1D5DB",
      bronzeLight: "#F3F4F6",
      bronzeDark: "#6B7280",
      charcoalDark: "#0B0F17"
    },
    emerald: {
      primaryBronze: "#10B981",
      bronzeLight: "#6EE7B7",
      bronzeDark: "#047857",
      charcoalDark: "#061510"
    },
    crimson: {
      primaryBronze: "#E11D48",
      bronzeLight: "#FDA4AF",
      bronzeDark: "#9F1239",
      charcoalDark: "#13080A"
    }
  };

  document.querySelectorAll(".swatch-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".swatch-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const themeKey = btn.getAttribute("data-theme-key");
      if (colorThemes[themeKey]) {
        initTheme(colorThemes[themeKey]);
      }
    });
  });

  // Live Shop Name Edit
  const shopNameInput = document.getElementById("customizer-shopname-input");
  if (shopNameInput) {
    shopNameInput.addEventListener("input", (e) => {
      const newName = e.target.value.trim() || "CUTLINE";
      document.querySelectorAll("[data-config='business.name']").forEach((el) => {
        el.textContent = newName;
      });
      document.title = `${newName} — Master Barbers`;
    });
  }
}
