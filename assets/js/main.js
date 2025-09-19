(function() {
  const navToggle = document.querySelector('.nav-toggle');
  let nav = document.querySelector('#primary-nav');
  if (navToggle && nav) {
    // On small screens, move nav to body to avoid clipping under header stacking contexts
    const ensureNavAtBody = () => {
      const isMobile = window.matchMedia('(max-width: 720px)').matches;
      if (isMobile && nav.parentElement !== document.body) {
        document.body.appendChild(nav);
      }
    };
    ensureNavAtBody();
    window.addEventListener('resize', ensureNavAtBody);

    // Create a backdrop to detect outside taps reliably on mobile
    let backdrop = document.querySelector('.nav-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'nav-backdrop';
      document.body.appendChild(backdrop);
    }
    // Keep toggle always visible above nav overlay
    navToggle.style.position = 'relative';
    navToggle.style.zIndex = '3001';
    const openNav = () => {
      nav.classList.add('open');
      navToggle.setAttribute('aria-expanded', 'true');
      backdrop.classList.add('open');
    };
    const closeNav = () => {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      backdrop.classList.remove('open');
    };
    const toggleNav = (e) => {
      e.stopPropagation();
      const willOpen = !nav.classList.contains('open');
      if (willOpen) openNav(); else closeNav();
    };

    // Use a single click handler to avoid double-toggle on mobile (touchstart + click)
    navToggle.addEventListener('click', toggleNav);
    nav.addEventListener('click', (e) => e.stopPropagation());

    // Close when backdrop is tapped/clicked
    ['click','touchstart'].forEach((evt) => {
      backdrop.addEventListener(evt, () => closeNav(), { passive: true });
    });

    // Do NOT auto-close on outside click or link click; user must toggle with the button.
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


