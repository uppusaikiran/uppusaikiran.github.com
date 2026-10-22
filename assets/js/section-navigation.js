(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var links = Array.prototype.slice.call(
      document.querySelectorAll(".masthead a.section-nav-link[data-section]")
    );

    if (!links.length) return;

    var sections = [];
    var seen = {};

    links.forEach(function (link) {
      var id = link.getAttribute("data-section");
      var target = document.getElementById(id);

      if (target && !seen[id]) {
        sections.push({ id: id, target: target });
        seen[id] = true;
      }
    });

    if (!sections.length) return;

    function setActive(id) {
      links.forEach(function (link) {
        var isActive = link.getAttribute("data-section") === id;
        link.classList.toggle("active", isActive);

        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    function updateActiveSection() {
      var masthead = document.querySelector(".masthead");
      var offset = (masthead ? masthead.offsetHeight : 0) + 32;
      var active = sections[0].id;

      sections.forEach(function (section) {
        if (section.target.getBoundingClientRect().top <= offset) {
          active = section.id;
        }
      });

      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 2) {
        active = sections[sections.length - 1].id;
      }

      setActive(active);
    }

    var scheduled = false;
    function scheduleUpdate() {
      if (scheduled) return;
      scheduled = true;
      window.requestAnimationFrame(function () {
        updateActiveSection();
        scheduled = false;
      });
    }

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    updateActiveSection();
  });
})();
