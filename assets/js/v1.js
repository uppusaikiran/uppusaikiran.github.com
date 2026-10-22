(function () {
  "use strict";

  document.documentElement.classList.add("v1-enhanced");

  var nav = document.querySelector("[data-v1-nav]");
  var menu = document.getElementById("v1-menu");
  var menuToggle = document.querySelector(".v1-menu-toggle");
  var progress = document.querySelector(".v1-progress span");
  var revealItems = Array.prototype.slice.call(document.querySelectorAll(".v1-reveal"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.v1-menu a[href^="#"]'));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function closeMenu() {
    if (!menu || !menuToggle) return;
    menu.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  if (menuToggle && menu) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
  }

  function updateScrollUI() {
    var y = window.pageYOffset || document.documentElement.scrollTop;
    var scrollable = document.documentElement.scrollHeight - window.innerHeight;

    if (nav) nav.classList.toggle("is-scrolled", y > 24);
    if (progress) {
      var ratio = scrollable > 0 ? Math.min(y / scrollable, 1) : 0;
      progress.style.transform = "scaleX(" + ratio + ")";
    }

    var activeId = "";
    var offset = (nav ? nav.offsetHeight : 0) + 100;
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= offset) activeId = section.id;
    });

    navLinks.forEach(function (link) {
      var isActive = link.getAttribute("href") === "#" + activeId;
      link.classList.toggle("is-active", isActive);
      if (isActive) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }

  var scrollQueued = false;
  function queueScrollUpdate() {
    if (scrollQueued) return;
    scrollQueued = true;
    window.requestAnimationFrame(function () {
      updateScrollUI();
      scrollQueued = false;
    });
  }

  window.addEventListener("scroll", queueScrollUpdate, { passive: true });
  window.addEventListener("resize", queueScrollUpdate);
  updateScrollUI();

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    revealItems.forEach(function (item, index) {
      item.style.transitionDelay = Math.min(index % 4, 3) * 70 + "ms";
      revealObserver.observe(item);
    });

    var flow = document.querySelector("[data-v1-flow]");
    if (flow) {
      var flowObserver = new IntersectionObserver(
        function (entries) {
          if (entries[0].isIntersecting) {
            flow.classList.add("is-visible");
            flowObserver.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      flowObserver.observe(flow);
    }
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }

  var supportsFinePointer = window.matchMedia("(pointer: fine)").matches;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (supportsFinePointer && !prefersReducedMotion) {
    window.addEventListener(
      "pointermove",
      function (event) {
        document.documentElement.style.setProperty("--v1-pointer-x", event.clientX + "px");
        document.documentElement.style.setProperty("--v1-pointer-y", event.clientY + "px");
      },
      { passive: true }
    );

    document.querySelectorAll("[data-v1-tilt]").forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        var rect = card.getBoundingClientRect();
        var x = (event.clientX - rect.left) / rect.width - 0.5;
        var y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(1000px) rotateX(" + (-y * 2.4) + "deg) rotateY(" + (x * 2.4) + "deg) translateY(-3px)";
      });

      card.addEventListener("pointerleave", function () {
        card.style.transform = "";
      });
    });
  }
})();
