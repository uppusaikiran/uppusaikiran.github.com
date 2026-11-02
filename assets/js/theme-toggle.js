(function () {
  "use strict";

  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  var themeColor = document.querySelector('meta[name="theme-color"]');
  var systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

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

  function saveTheme(theme) {
    try {
      localStorage.setItem("site-theme", theme);
    } catch (error) {
      // Theme still works for this visit when storage is unavailable.
    }
  }

  updateControls(root.dataset.theme || (systemTheme.matches ? "dark" : "light"));

  if (toggle) {
    toggle.addEventListener("click", function () {
      var nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      saveTheme(nextTheme);
      updateControls(nextTheme);
    });
  }

  var syncWithSystem = function (event) {
    try {
      if (localStorage.getItem("site-theme")) return;
    } catch (error) {
      // Continue with the system preference.
    }
    updateControls(event.matches ? "dark" : "light");
  };

  if (systemTheme.addEventListener) {
    systemTheme.addEventListener("change", syncWithSystem);
  } else if (systemTheme.addListener) {
    systemTheme.addListener(syncWithSystem);
  }
}());
