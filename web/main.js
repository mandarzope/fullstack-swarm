(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const menuBtn = document.getElementById("menuBtn");
  const mobileNav = document.getElementById("mobileNav");

  const stored = localStorage.getItem("fs-theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  root.setAttribute("data-theme", initial);

  themeToggle?.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("fs-theme", next);
  });

  menuBtn?.addEventListener("click", () => {
    const open = mobileNav.hasAttribute("hidden");
    if (open) {
      mobileNav.removeAttribute("hidden");
      menuBtn.setAttribute("aria-expanded", "true");
      menuBtn.setAttribute("aria-label", "Close menu");
    } else {
      mobileNav.setAttribute("hidden", "");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.setAttribute("aria-label", "Open menu");
    }
  });

  mobileNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.setAttribute("hidden", "");
      menuBtn?.setAttribute("aria-expanded", "false");
      menuBtn?.setAttribute("aria-label", "Open menu");
    });
  });

  // Reveal sections on scroll (respects reduced motion via CSS)
  const revealables = document.querySelectorAll(
    ".feature, .cmd-card, .faq-item, .pipeline-steps li, .code-panel"
  );
  revealables.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    el.style.transition = "opacity 420ms cubic-bezier(0.16,1,0.3,1), transform 420ms cubic-bezier(0.16,1,0.3,1)";
  });

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = "1";
        entry.target.style.transform = "none";
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  revealables.forEach((el, i) => {
    el.style.transitionDelay = `${Math.min(i % 4, 3) * 60}ms`;
    io.observe(el);
  });
})();
