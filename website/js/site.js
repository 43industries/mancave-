(function () {
  const nav = document.querySelector("nav");
  const toggle = document.querySelector(".nav-toggle");
  const backdrop = document.querySelector(".nav-backdrop");
  const mq = window.matchMedia("(max-width: 768px)");

  function setOpen(open) {
    if (!nav || !toggle) return;
    nav.classList.toggle("nav-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("nav-menu-open", open);
    if (backdrop) backdrop.setAttribute("aria-hidden", open ? "false" : "true");
  }

  function closeMenu() {
    setOpen(false);
  }

  toggle?.addEventListener("click", () => {
    setOpen(!nav.classList.contains("nav-open"));
  });

  backdrop?.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });

  mq.addEventListener("change", (e) => {
    if (!e.matches) closeMenu();
  });

  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.addEventListener("click", () => {
      if (mq.matches) closeMenu();
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("visible");
      });
    },
    { threshold: 0.1 }
  );
  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
})();
