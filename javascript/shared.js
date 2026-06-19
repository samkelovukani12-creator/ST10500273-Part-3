/* Mhlanga Holdings — shared.js */

// ── Hamburger Menu ──
(function () {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  function closeNav() {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    // Also close any open submenus
    document.querySelectorAll('.submenu').forEach(s => s.classList.remove('open'));
    document.querySelectorAll('.submenu-toggle').forEach(t => t.classList.remove('submenu-open'));
  }

  hamburger.addEventListener('click', e => {
    e.stopPropagation();
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeNav();
    } else {
      hamburger.classList.add('active');
      navLinks.classList.add('open');
    }
  });

  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', e => {
      // On mobile: toggle the submenu open/closed
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const submenu = toggle.nextElementSibling;
        const isOpen  = submenu.classList.contains('open');

        // Close all other open submenus first
        document.querySelectorAll('.submenu').forEach(s => s.classList.remove('open'));
        document.querySelectorAll('.submenu-toggle').forEach(t => t.classList.remove('submenu-open'));

        if (!isOpen) {
          submenu.classList.add('open');
          toggle.classList.add('submenu-open');
        }
      }
      // On desktop: CSS :hover handles it — do nothing
    });
  });

  // Close nav on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.navbar')) {
      closeNav();
    }
  });

  // Re-close submenus on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      document.querySelectorAll('.submenu').forEach(s => s.classList.remove('open'));
      document.querySelectorAll('.submenu-toggle').forEach(t => t.classList.remove('submenu-open'));
    }
  });
})();

// ── Slideshow ──
(function () {
  const slides = document.querySelectorAll('.mySlides');
  const dots   = document.querySelectorAll('.dot');
  if (!slides.length) return;

  let idx = 0;
  let timer;

  function showSlide(n) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    idx = (n + slides.length) % slides.length;

    const slide = slides[idx];
    // Force animation to re-trigger by removing and re-adding the fade class
    slide.classList.remove('fade');
    void slide.offsetWidth; // reflow flush
    slide.classList.add('active', 'fade');

    if (dots[idx]) dots[idx].classList.add('active');
  }

  function next() { showSlide(idx + 1); }
  function prev() { showSlide(idx - 1); }

  function startAuto() { timer = setInterval(next, 4500); }
  function resetAuto()  { clearInterval(timer); startAuto(); }

  // Expose for inline onclick (gallery.html uses both)
  window.currentSlide = n => { showSlide(n - 1); resetAuto(); };
  window.changeSlide  = n => { showSlide(idx + n); resetAuto(); };

  document.querySelectorAll('.slide-next').forEach(b => b.addEventListener('click', () => { next(); resetAuto(); }));
  document.querySelectorAll('.slide-prev').forEach(b => b.addEventListener('click', () => { prev(); resetAuto(); }));

  showSlide(0);
  startAuto();
})();

function searchServices() {

    let input = document.getElementById("serviceSearch");
    let filter = input.value.toLowerCase();

    let cards = document.querySelectorAll(".service-card");

    cards.forEach(card => {

        let text = card.textContent.toLowerCase();

        if (text.includes(filter)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });
}

