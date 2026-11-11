(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  var themeColor = document.querySelector('meta[name="theme-color"]');
  var manualOverride = false;
  var scheduleTimer;

  if (!themeColor) {
    themeColor = document.createElement("meta");
    themeColor.name = "theme-color";
    document.head.appendChild(themeColor);
  }

  function updateControls(theme) {
    var isDark = theme === "dark";
    var nextTheme = isDark ? "light" : "dark";

    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    themeColor.content = isDark ? "#050505" : "#ffffff";

    if (toggle) {
      toggle.setAttribute("aria-label", "Switch to " + nextTheme + " theme");
      toggle.setAttribute("title", "Switch to " + nextTheme + " theme");
      toggle.setAttribute("aria-pressed", String(isDark));
    }
  }

  function themeForCurrentTime() {
    var hour = new Date().getHours();
    return hour >= 19 || hour < 7 ? "dark" : "light";
  }

  function scheduleNextThemeChange() {
    clearTimeout(scheduleTimer);

    var now = new Date();
    var nextChange = new Date(now);
    var hour = now.getHours();
    nextChange.setHours(hour < 7 ? 7 : 19, 0, 0, 0);

    if (nextChange <= now) {
      nextChange.setDate(nextChange.getDate() + 1);
      nextChange.setHours(7, 0, 0, 0);
    }

    scheduleTimer = window.setTimeout(function () {
      if (!manualOverride) updateControls(themeForCurrentTime());
      scheduleNextThemeChange();
    }, nextChange.getTime() - now.getTime() + 1000);
  }

  updateControls(themeForCurrentTime());
  scheduleNextThemeChange();

  if (toggle) {
    toggle.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      manualOverride = true;
      updateControls(nextTheme);
    });
  }
}());
