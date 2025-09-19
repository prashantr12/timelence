(function() {
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#primary-nav');
  if (navToggle && nav) {
    const openNav = () => {
      nav.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
    };
    const closeNav = () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    };
    const toggleNav = (e) => {
      e.stopPropagation();
      const willOpen = !nav.classList.contains('open');
      if (willOpen) openNav(); else closeNav();
    };

    ['click','touchstart'].forEach((evt) => {
      navToggle.addEventListener(evt, toggleNav, { passive: true });
      nav.addEventListener(evt, (e) => e.stopPropagation(), { passive: true });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!nav.contains(e.target) && !navToggle.contains(e.target)) closeNav();
    });
    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
    // Close after tapping a link (mobile UX)
    nav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => closeNav());
      a.addEventListener('touchstart', () => closeNav(), { passive: true });
    });
  }

  // Active link highlight when navigating between pages (based on pathname)
  try {
    const current = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach((a) => {
      const href = a.getAttribute('href');
      if (href && href.endsWith(current)) a.classList.add('active');
    });
  } catch (err) { /* noop */ }

  // Dynamic year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
})();


