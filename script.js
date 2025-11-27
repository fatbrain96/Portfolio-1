// ===================================
// HEADER SCROLL EFFECT
// ===================================

const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  lastScroll = currentScroll;
});

// ===================================
// MOBILE NAVIGATION
// ===================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileNavClose = document.getElementById('mobileNavClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Open mobile menu
mobileMenuToggle.addEventListener('click', () => {
  mobileNav.classList.add('active');
  document.body.style.overflow = 'hidden'; // Prevent scrolling
});

// Close mobile menu
mobileNavClose.addEventListener('click', () => {
  mobileNav.classList.remove('active');
  document.body.style.overflow = ''; // Restore scrolling
});

// Close menu when clicking a link
mobileNavLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Close menu when clicking outside
mobileNav.addEventListener('click', (e) => {
  if (e.target === mobileNav) {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    // Skip if it's just "#"
    if (href === '#') return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = header.offsetHeight;
      const targetPosition = target.offsetTop - headerHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// PROJECT CARD HOVER EFFECTS
// ===================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'all 0.3s ease';
  });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe elements for fade-in animation
const animateElements = document.querySelectorAll('.project-card, .skill-group, .timeline-item, .cert-badge');

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===================================
// FOCUS TRAP FOR MOBILE NAVIGATION
// ===================================

function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  
  const firstFocusable = focusableElements[0];
  const lastFocusable = focusableElements[focusableElements.length - 1];
  
  element.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey) {
      if (document.activeElement === firstFocusable) {
        lastFocusable.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastFocusable) {
        firstFocusable.focus();
        e.preventDefault();
      }
    }
  });
}

// Apply focus trap to mobile nav
trapFocus(mobileNav);

// ===================================
// KEYBOARD NAVIGATION
// ===================================

// Close mobile menu with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
    mobileMenuToggle.focus();
  }
});

// ===================================
// PERFORMANCE: DEBOUNCE SCROLL EVENTS
// ===================================

function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debounce to scroll handler if needed for performance
const debouncedScroll = debounce(() => {
  // Additional scroll handlers can go here
}, 100);

window.addEventListener('scroll', debouncedScroll);
