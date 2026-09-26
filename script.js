/* ============================================================
   SHANKAR MOHAR — script.js
   ============================================================

   ██████████████████████████████████████████
   SITE CONFIGURATION — EDIT ONLY THIS BLOCK
   ██████████████████████████████████████████

   Update these values before going live:
   - whatsappNumber : your WhatsApp number (international format, no + or spaces)
   - viewPageUrl    : internal page for "Click to View" button (e.g. /work.html)
   - formEndpoint   : your form service endpoint (Formspree, Web3Forms, etc.)
   - formProviderKey: your form service access key (if required)
   - email          : your contact email
   - resumeUrl      : link to your public resume

   ============================================================ */

const SITE_CONFIG = {
  /* REPLACE THIS: Your WhatsApp number in international format without + or spaces
     Example for India +91 98765 43210 → "919876543210" */
  whatsappNumber: "+919594365550",

  /* REPLACE THIS: Internal page URL for the "Click to View" button.
     Options: /work.html  /posts.html  /case-studies.html  /insights.html
     Change this ONE value and ALL buttons update automatically. */
  viewPageUrl: "/work.html",

  /* REPLACE THIS: Your form submission endpoint.
     Formspree example : "https://formspree.io/f/YOUR_FORM_ID"
     Web3Forms example : "https://api.web3forms.com/submit"
     Getform example   : "https://getform.io/f/YOUR_FORM_ID"
     Basin example     : "https://usebasin.com/f/YOUR_FORM_ID"  */
  formEndpoint: "https://formspree.io/f/xrpbyozo",

  /* REPLACE THIS: Required by some providers (e.g., Web3Forms uses an access key).
     Leave as placeholder if your provider only needs an endpoint URL. */
  formProviderKey: "",

  email: "info@shankarmohar.com",
  resumeUrl: "https://shankar-mycv.pages.dev/"
};

/* ============================================================
   HELPERS
   ============================================================ */

function $(id) { return document.getElementById(id); }

function buildWhatsAppUrl(number, message) {
  const encoded = encodeURIComponent(message);
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  const base = isMobile
    ? `https://wa.me/${number}?text=${encoded}`
    : `https://web.whatsapp.com/send?phone=${number}&text=${encoded}`;
  return base;
}

const WA_MESSAGE = "Hi Shankar, I'd like to discuss a paid media project.";

function openWhatsApp() {
  const num = SITE_CONFIG.whatsappNumber;
  if (!num || num === "[INSERT_WHATSAPP_NUMBER]") {
    /* Fallback if number not yet configured */
    alert("WhatsApp contact not yet configured. Please use: " + SITE_CONFIG.email);
    return;
  }
  window.open(buildWhatsAppUrl(num, WA_MESSAGE), "_blank", "noopener,noreferrer");
}

/* ============================================================
   NAV
   ============================================================ */

(function initNav() {
  const nav = document.getElementById("nav");
  const hamburger = $("hamburger");
  const navMobile = $("nav-mobile");

  /* Scroll elevation */
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        nav.classList.toggle("scrolled", window.scrollY > 20);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* Hamburger */
  function toggleMenu(open) {
    hamburger.setAttribute("aria-expanded", String(open));
    hamburger.classList.toggle("open", open);
    navMobile.classList.toggle("open", open);
    navMobile.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  }

  hamburger.addEventListener("click", () => {
    const isOpen = hamburger.getAttribute("aria-expanded") === "true";
    toggleMenu(!isOpen);
  });

  /* Close on mobile link click */
  navMobile.querySelectorAll(".nav-mobile-link").forEach(link => {
    link.addEventListener("click", () => toggleMenu(false));
  });

  /* Trap focus in mobile menu when open — basic version */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && navMobile.classList.contains("open")) {
      toggleMenu(false);
      hamburger.focus();
    }
  });
})();

/* ============================================================
   WIRE UP CONFIG URLS
   ============================================================ */

(function applyConfig() {
  /* View Page button */
  const viewBtn = $("view-btn");
  if (viewBtn) viewBtn.href = SITE_CONFIG.viewPageUrl;

  /* Resume footer link */
  const resumeLink = $("footer-resume-link");
  if (resumeLink) resumeLink.href = SITE_CONFIG.resumeUrl;

  /* Footer year */
  const yr = $("footer-year");
  if (yr) yr.textContent = new Date().getFullYear();
})();

/* ============================================================
   WHATSAPP BUTTONS
   ============================================================ */

["wa-btn", "contact-wa-btn"].forEach(id => {
  const btn = $(id);
  if (btn) btn.addEventListener("click", e => { e.preventDefault(); openWhatsApp(); });
});

/* error-wa-btn (inside modal error state) */
document.addEventListener("click", e => {
  if (e.target && e.target.id === "error-wa-btn") {
    e.preventDefault();
    openWhatsApp();
  }
});

/* ============================================================
   MODAL
   ============================================================ */

(function initModal() {
  const overlay = $("modal-overlay");
  const modal = $("modal");
  const closeBtn = $("modal-close");

  let previousFocus = null;

  function openModal() {
    previousFocus = document.activeElement;
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    /* Focus first focusable element */
    requestAnimationFrame(() => {
      const focusable = modal.querySelectorAll(
        'input:not([type=hidden]), select, textarea, button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length) focusable[0].focus();
    });
  }

  function closeModal() {
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (previousFocus) previousFocus.focus();
  }

  /* Open triggers */
  ["query-btn", "contact-query-btn", "nav-cta-btn", "nav-mobile-cta-btn"].forEach(id => {
    const btn = $(id);
    if (btn) btn.addEventListener("click", openModal);
  });

  /* Close triggers */
  closeBtn.addEventListener("click", closeModal);

  overlay.addEventListener("click", e => {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      closeModal();
    }
    /* Focus trap */
    if (e.key === "Tab" && overlay.classList.contains("open")) {
      const focusable = [...modal.querySelectorAll(
        'input:not([type=hidden]), select, textarea, button:not([hidden]), a, [tabindex]:not([tabindex="-1"])'
      )].filter(el => !el.closest('[hidden]'));
      if (!focusable.length) { e.preventDefault(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
  });

  /* Reset form-retry-btn */
  const retryBtn = $("form-retry-btn");
  if (retryBtn) {
    retryBtn.addEventListener("click", () => {
      $("form-error-state").hidden = true;
      $("enquiry-form").hidden = false;
    });
  }

  /* Reset btn */
  const resetBtn = $("form-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      $("form-success").hidden = true;
      const form = $("enquiry-form");
      form.reset();
      form.hidden = false;
      /* Clear visual error states */
      form.querySelectorAll(".form-input").forEach(i => i.classList.remove("error"));
      form.querySelectorAll(".form-error").forEach(e => { e.textContent = ""; });
    });
  }
})();

/* ============================================================
   FORM VALIDATION & SUBMISSION
   ============================================================ */

(function initForm() {
  const form = $("enquiry-form");
  if (!form) return;

  const submitBtn = $("form-submit-btn");
  const submitText = submitBtn.querySelector(".btn-submit-text");
  const submitLoading = submitBtn.querySelector(".btn-submit-loading");

  /* Submission timing for spam protection */
  const formLoadTime = Date.now();

  /* ── VALIDATORS ── */
  function validateName(val) {
    if (!val.trim()) return "Please enter your full name.";
    if (val.trim().length < 2) return "Name must be at least 2 characters.";
    return "";
  }
  function validatePhone(val) {
    const clean = val.replace(/[\s\-\(\)]/g, "");
    if (!clean) return "Please enter your phone number.";
    if (!/^\+?[0-9]{7,15}$/.test(clean)) return "Please enter a valid phone number.";
    return "";
  }
  function validateEmail(val) {
    if (!val.trim()) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) return "Please enter a valid email address.";
    return "";
  }
  function validateWebsite(val) {
    if (!val.trim()) return ""; /* optional */
    try { new URL(val.trim()); return ""; }
    catch { return "Please enter a valid URL (e.g., https://yoursite.com)."; }
  }
  function validateGoal(val) {
    if (!val.trim()) return "Please describe what you're trying to achieve.";
    if (val.trim().length < 10) return "Please provide a bit more detail.";
    return "";
  }
  function validateChannels() {
    const checked = form.querySelectorAll('input[name="channels"]:checked');
    if (!checked.length) return "Please select at least one channel.";
    return "";
  }
  function validateBudget(val) {
    if (!val) return "Please select your monthly budget.";
    return "";
  }

  function setError(fieldId, errId, message) {
    const field = $(fieldId);
    const err = $(errId);
    if (field) field.classList.toggle("error", !!message);
    if (err) err.textContent = message || "";
  }

  function validateAll() {
    let valid = true;
    const checks = [
      ["f-name",    "f-name-err",    validateName($("f-name").value)],
      ["f-phone",   "f-phone-err",   validatePhone($("f-phone").value)],
      ["f-email",   "f-email-err",   validateEmail($("f-email").value)],
      ["f-website", "f-website-err", validateWebsite($("f-website").value)],
      ["f-goal",    "f-goal-err",    validateGoal($("f-goal").value)],
      ["f-budget",  "f-budget-err",  validateBudget($("f-budget").value)],
    ];
    checks.forEach(([fId, eId, msg]) => {
      setError(fId, eId, msg);
      if (msg) valid = false;
    });

    const chErr = validateChannels();
    $("f-channels-err").textContent = chErr;
    if (chErr) valid = false;

    return valid;
  }

  /* Inline validation on blur */
  [
    ["f-name",  "f-name-err",  () => validateName($("f-name").value)],
    ["f-phone", "f-phone-err", () => validatePhone($("f-phone").value)],
    ["f-email", "f-email-err", () => validateEmail($("f-email").value)],
    ["f-website","f-website-err",() => validateWebsite($("f-website").value)],
    ["f-goal",  "f-goal-err",  () => validateGoal($("f-goal").value)],
    ["f-budget","f-budget-err", () => validateBudget($("f-budget").value)],
  ].forEach(([fId, eId, validator]) => {
    const el = $(fId);
    if (el) {
      el.addEventListener("blur", () => setError(fId, eId, validator()));
      el.addEventListener("input", () => {
        if (el.classList.contains("error")) setError(fId, eId, validator());
      });
    }
  });

  /* ── SUBMISSION ── */
  form.addEventListener("submit", async e => {
    e.preventDefault();

    /* Honeypot check */
    const honeypot = form.querySelector('input[name="_gotcha"]');
    if (honeypot && honeypot.value) return; /* Bot detected — silently ignore */

    /* Timing check (less than 2s = likely bot) */
    if (Date.now() - formLoadTime < 2000) return;

    if (!validateAll()) {
      /* Focus first error field */
      const firstError = form.querySelector(".form-input.error");
      if (firstError) firstError.focus();
      return;
    }

    /* Disable button */
    submitBtn.disabled = true;
    submitText.hidden = true;
    submitLoading.hidden = false;

    /* Build form data */
    const channels = [...form.querySelectorAll('input[name="channels"]:checked')]
      .map(cb => cb.value).join(", ") || "Not specified";

    const payload = {
      name:    $("f-name").value.trim(),
      phone:   $("f-phone").value.trim(),
      email:   $("f-email").value.trim(),
      website: $("f-website").value.trim() || "Not provided",
      goal:    $("f-goal").value.trim(),
      channels,
      budget:  $("f-budget").value,
      message: $("f-message").value.trim() || "None",
      _subject: "New Paid Media Enquiry — ShankarMohar.com",
      /* Web3Forms requires this key if using that provider */
      access_key: SITE_CONFIG.formProviderKey
    };

    const endpoint = SITE_CONFIG.formEndpoint;

    try {
      if (!endpoint || endpoint === "[INSERT_FORM_ENDPOINT]") {
        /* DEV MODE: show success without actually posting */
        console.info("[DEV] Form would submit:", payload);
        await new Promise(r => setTimeout(r, 800)); /* simulate delay */
        showSuccess();
        return;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showSuccess();
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch (err) {
      console.error("Form submission error:", err);
      showFormError();
    } finally {
      submitBtn.disabled = false;
      submitText.hidden = false;
      submitLoading.hidden = true;
    }
  });

  function showSuccess() {
    form.hidden = true;
    $("form-success").hidden = false;
    $("form-error-state").hidden = true;
    /* Announce to screen readers */
    $("sr-announce").textContent = "Thank you. Your enquiry has been received.";
    /* Scroll success into view */
    $("form-success").scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  function showFormError() {
    form.hidden = true;
    $("form-error-state").hidden = false;
    $("form-success").hidden = true;
    $("sr-announce").textContent = "Something went wrong. Please try again.";
  }
})();

/* ============================================================
   HERO CANVAS — signal network
   ============================================================ */

(function initHeroCanvas() {
  const canvas = $("hero-canvas");
  if (!canvas) return;

  /* Respect reduced motion */
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");
  let W, H, nodes, animId;

  const LABELS = [
    "CTR", "CPC", "CPA", "ROAS", "CAC", "CVR",
    "Search", "P Max", "Shopping", "Meta", "Video",
    "GA4", "GTM", "AI", "SQL", "Attribution",
    "Conversion", "Revenue", "Leads", "Budget"
  ];

  function resize() {
    W = canvas.width  = canvas.offsetWidth  * devicePixelRatio;
    H = canvas.height = canvas.offsetHeight * devicePixelRatio;
    ctx.scale(devicePixelRatio, devicePixelRatio);
    buildNodes();
  }

  function buildNodes() {
    const W0 = canvas.offsetWidth;
    const H0 = canvas.offsetHeight;
    nodes = LABELS.map((label, i) => ({
      label,
      x: Math.random() * W0 * .85 + W0 * .075,
      y: Math.random() * H0 * .75 + H0 * .125,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      r: Math.random() * 2 + 1.5,
      alpha: Math.random() * .4 + .25,
      labelAlpha: Math.random() * .35 + .12,
    }));
  }

  function draw() {
    const W0 = canvas.offsetWidth;
    const H0 = canvas.offsetHeight;
    ctx.clearRect(0, 0, W0, H0);

    /* Move nodes */
    nodes.forEach(n => {
      n.x += n.vx; n.y += n.vy;
      if (n.x < 40 || n.x > W0 - 40) n.vx *= -1;
      if (n.y < 40 || n.y > H0 - 40) n.vy *= -1;
    });

    /* Draw connections */
    const CONNECT_DIST = 160;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECT_DIST) {
          const opacity = (1 - dist / CONNECT_DIST) * .12;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(37,99,235,${opacity})`;
          ctx.lineWidth = .8;
          ctx.stroke();
        }
      }
    }

    /* Draw nodes + labels */
    nodes.forEach(n => {
      /* Node dot */
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96,165,250,${n.alpha})`;
      ctx.fill();

      /* Label */
      ctx.font = `500 10px Inter, sans-serif`;
      ctx.fillStyle = `rgba(148,189,240,${n.labelAlpha})`;
      ctx.fillText(n.label, n.x + n.r + 4, n.y + 4);
    });

    animId = requestAnimationFrame(draw);
  }

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animId);
    resize();
    draw();
  });

  resize();
  draw();
})();

/* ============================================================
   COUNT-UP METRICS
   ============================================================ */

(function initCountUp() {
  const items = document.querySelectorAll(".metric-num[data-target]");
  if (!items.length) return;

  const seen = new Set();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !seen.has(entry.target)) {
        seen.add(entry.target);
        animateCount(entry.target);
      }
    });
  }, { threshold: .5 });

  items.forEach(el => observer.observe(el));

  function animateCount(el) {
    const target  = parseFloat(el.dataset.target);
    const suffix  = el.dataset.suffix  || "";
    const prefix  = el.dataset.prefix  || "";
    const decimal = parseInt(el.dataset.decimal || "0");
    const duration = 1600;
    const start = performance.now();

    /* Respect reduced motion */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = prefix + target.toFixed(decimal) + suffix;
      return;
    }

    function ease(t) { return t < .5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const val = target * ease(progress);
      el.textContent = prefix + val.toFixed(decimal) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }
})();

/* ============================================================
   SCROLL REVEAL — timeline & why cards
   ============================================================ */

(function initReveal() {
  const items = document.querySelectorAll(".reveal-item");
  if (!items.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  items.forEach(el => observer.observe(el));
})();

/* ============================================================
   RESULT BAR ANIMATION
   ============================================================ */

(function initResultBars() {
  const bars = document.querySelectorAll(".result-bar-fill");
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        /* The width is already set inline; trigger transition by setting it again
           after the element is visible */
        const target = entry.target.style.width;
        entry.target.style.width = "0";
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            entry.target.style.width = target;
          });
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .2 });

  bars.forEach(b => observer.observe(b));
})();

/* ============================================================
   FUNNEL ANIMATION
   ============================================================ */

(function initFunnel() {
  const funnel = document.querySelector(".funnel");
  if (!funnel) return;

  const steps = funnel.querySelectorAll(".funnel-step");
  let timers = [];
  let started = false;

  function runFunnel() {
    timers.forEach(clearTimeout);
    timers = [];
    steps.forEach(s => s.classList.remove("funnel-active"));
    steps.forEach((step, i) => {
      const t = setTimeout(() => {
        steps.forEach(s => s.classList.remove("funnel-active"));
        step.classList.add("funnel-active");
        if (i === steps.length - 1) {
          const restart = setTimeout(runFunnel, 2000);
          timers.push(restart);
        }
      }, i * 600);
      timers.push(t);
    });
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    steps[steps.length - 1].classList.add("funnel-active");
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !started) {
        started = true;
        runFunnel();
      }
    });
  }, { threshold: .3 });

  observer.observe(funnel);
})();

/* ============================================================
   SMOOTH SCROLL for nav links
   ============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
