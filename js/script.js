// ================= jQuery Portfolio Script =================
$(document).ready(function () {
  /* ================= HAMBURGER MENU ================= */
  const $menuToggle = $("#mobile-menu");
  const $navList = $("#nav-list");
  const $mobileLinks = $(".nav-links a");

  if ($menuToggle.length) {
    $menuToggle.on("click", function () {
      $(this).toggleClass("is-active");
      $navList.toggleClass("active");

      // Just toggle the menu-open class, CSS handles the rest
      if ($navList.hasClass("active")) {
        $("html, body").addClass("menu-open");
      } else {
        $("html, body").removeClass("menu-open").removeAttr("style");
      }
    });
  }

  if ($mobileLinks.length) {
    $mobileLinks.on("click", function () {
      $menuToggle.removeClass("is-active");
      $navList.removeClass("active");
      // Restore scroll when link is clicked
      $("html, body").removeClass("menu-open").removeAttr("style");
    });
  }

  /* ================= THEME TOGGLE ================= */
  const $themeToggle = $("#theme-toggle");

  if ($themeToggle.length) {
    // Force dark by default (ignores any previous saved 'light')
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      $("body").addClass("light-mode");
      $themeToggle.text("☀️");
    } else {
      $("body").removeClass("light-mode");
      $themeToggle.text("🌙");
      // Optionally ensure storage reflects default dark:
      // localStorage.setItem('theme','dark');
    }

    $themeToggle.on("click", function () {
      $("body").toggleClass("light-mode");
      if ($("body").hasClass("light-mode")) {
        localStorage.setItem("theme", "light");
        $(this).text("☀️");
      } else {
        localStorage.setItem("theme", "dark");
        $(this).text("🌙");
      }
    });
  }

  /* ================= NAVBAR SHRINK ================= */
  let lastState = null;

  function navbarShrink() {
    const shouldShrink = window.scrollY > 80;
    if (lastState === shouldShrink) return;

    $(".navbar").toggleClass("shrink", shouldShrink);
    lastState = shouldShrink;
  }

  /* ================= SCROLL LOOP ================= */
  let ticking = false;

  $(window).on("scroll load", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        navbarShrink();
        ticking = false;
      });
      ticking = true;
    }
  });

  /* ================= HOVER ================= */
  $(document).on(
    "mouseenter",
    ".highlight-card, .skill-card, .project-card",
    function () {
      this.style.transform = "translateY(-6px)";
    },
  );

  $(document).on(
    "mouseleave",
    ".highlight-card, .skill-card, .project-card",
    function () {
      this.style.transform = "translateY(0)";
    },
  );
});
