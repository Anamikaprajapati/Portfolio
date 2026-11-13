/* ==========================================================
   PORTFOLIO SCRIPT – Anamika Prajapati
   Plain JavaScript, no libraries.
   ========================================================== */
(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ===== THEME TOGGLE ===== */
  function initTheme() {
    var root = document.documentElement;
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    function apply(theme) {
      root.setAttribute("data-theme", theme);
      btn.setAttribute("aria-label", theme === "dark" ? "Switch to light theme" : "Switch to dark theme");
    }
    apply(root.getAttribute("data-theme") || "light");

    btn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      apply(next);
      try { localStorage.setItem("theme", next); } catch (e) { /* storage blocked: ignore */ }
    });
  }

  /* ===== MOBILE MENU ===== */
  function initMenu() {
    var btn = document.getElementById("menu-toggle");
    var nav = document.getElementById("nav-links");
    if (!btn || !nav) return;

    function setOpen(open) {
      nav.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", String(open));
      btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    btn.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target) && !btn.contains(e.target)) setOpen(false);
    });
  }

  /* ===== SCROLL SPY (highlight active nav link) ===== */
  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    var sections = links
      .map(function (l) { return document.querySelector(l.getAttribute("href")); })
      .filter(Boolean);
    if (!sections.length) return;

    function update() {
      var offset = window.scrollY + 120;
      var current = sections[0].id;
      sections.forEach(function (s) { if (s.offsetTop <= offset) current = s.id; });
      // At the very bottom of the page, highlight the last section
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 4) {
        current = sections[sections.length - 1].id;
      }
      links.forEach(function (l) {
        var on = l.getAttribute("href") === "#" + current;
        l.classList.toggle("active", on);
        if (on) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current");
      });
    }
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (!ticking) {
        window.requestAnimationFrame(function () { update(); ticking = false; });
        ticking = true;
      }
    }, { passive: true });
    update();
  }

  /* ===== SCROLL REVEAL ===== */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ===== TYPING EFFECT (hero title) ===== */
  function initTyping() {
    var el = document.getElementById("typed");
    if (!el || reducedMotion) return;       // keeps the static text
    // EDIT: words that rotate in the hero
    var words = ["IT-CITS Trainee", "Software Development", "Java, Python and AI"];
    var w = 0, i = 0, deleting = false;

    function tick() {
      var word = words[w];
      i += deleting ? -1 : 1;
      el.textContent = word.slice(0, i);

      var delay = deleting ? 40 : 85;
      if (!deleting && i === word.length) { deleting = true; delay = 1600; }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 350; }
      setTimeout(tick, delay);
    }
    setTimeout(tick, 1800);
  }

  /* ===== HIDE PLACEHOLDER LINKS (e.g. [PROJECT_REPO_LINK], [CERTIFICATE_LINK]) ===== */
  function initOptionalLinks() {
    document.querySelectorAll("a.optional-link").forEach(function (a) {
      var href = (a.getAttribute("href") || "").trim();
      // Hidden when empty or still a [PLACEHOLDER]; real files and web links are shown
      if (!href || href.indexOf("[") !== -1) a.classList.add("is-hidden");
    });
  }

  /* ===== IMAGE FALLBACKS (missing photo / screenshots) ===== */
  function initImageFallbacks() {
    function hide(img) { img.classList.add("is-hidden"); }
    document.querySelectorAll("img[data-fallback]").forEach(function (img) {
      if (img.complete && img.naturalWidth === 0) hide(img);
      img.addEventListener("error", function () { hide(img); });
    });
  }

  /* ===== RESUME BUTTON (hide if resume.pdf is not uploaded) ===== */
  function initResume() {
    var btn = document.getElementById("resume-btn");
    if (!btn || !/^https?:$/.test(location.protocol)) return; // can't check on file://
    fetch(btn.getAttribute("href"), { method: "HEAD" })
      .then(function (r) { if (!r.ok) btn.classList.add("is-hidden"); })
      .catch(function () { /* network error: leave button as is */ });
  }

  /* ===== CONTACT FORM (opens visitor's email app) ===== */
  function initContactForm() {
    var form = document.getElementById("contact-form");
    var note = document.getElementById("form-note");
    if (!form) return;
    var TO = "anamikaprajapati9026@gmail.com"; // EDIT: where messages go

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var email = form.elements.email.value.trim();
      var message = form.elements.message.value.trim();

      if (!name || !message || !/^\S+@\S+\.\S+$/.test(email)) {
        note.textContent = "Please enter your name, a valid email and a message.";
        note.className = "form-note error";
        return;
      }
      var subject = "Portfolio message from " + name;
      var body = message + "\n\n— " + name + " (" + email + ")";
      note.className = "form-note";
      note.textContent = "Opening your email app…";
      window.location.href = "mailto:" + TO +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
    });
  }

  /* ===== FOOTER YEAR ===== */
  function initYear() {
    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();
  }

  /* ===== START ===== */
  initTheme();
  initMenu();
  initScrollSpy();
  initReveal();
  initTyping();
  initOptionalLinks();
  initImageFallbacks();
  initResume();
  initContactForm();
  initYear();
})();
