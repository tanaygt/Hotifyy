/* ==============================================
   HOTIFY — Main JavaScript
   ============================================== */

// ─── NAV SCROLL EFFECT ─────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    updateActiveNav();
});

// ─── HAMBURGER MENU ────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const closeBtn = document.getElementById('close-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});

closeBtn.addEventListener('click', () => {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ─── ACTIVE NAV LINK ───────────────────────────
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[data-section]');
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
    });
    navLinks.forEach(link => {
        link.classList.toggle('active', link.dataset.section === current);
    });
}

// ─── SCROLL REVEAL ─────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

// ─── STAGGER ANIMATIONS ─────────────────────────
document.querySelectorAll('[data-stagger]').forEach((group) => {
    const children = group.children;
    Array.from(children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 0.1}s`;
    });
});

// ─── WISHLIST TOGGLE ───────────────────────────
document.querySelectorAll('.outfit-wish').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        btn.classList.toggle('wished');
        btn.textContent = btn.classList.contains('wished') ? '♥' : '♡';
    });
});

// ─── SIZE SELECTION ────────────────────────────
document.querySelectorAll('.size-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const siblings = dot.parentElement.querySelectorAll('.size-dot');
        siblings.forEach(s => s.classList.remove('active'));
        dot.classList.add('active');
    });
});

// ─── OUTFIT FILTER ─────────────────────────────
const filterSelects = document.querySelectorAll('.filter-select');
const outfitCards = document.querySelectorAll('.outfit-card');

filterSelects.forEach(select => {
    select.addEventListener('change', filterOutfits);
});

function filterOutfits() {
    const occasion = document.getElementById('filter-occasion').value;
    const size = document.getElementById('filter-size').value;
    const budget = document.getElementById('filter-budget').value;

    outfitCards.forEach(card => {
        const cardOccasion = card.dataset.occasion || '';
        const cardSizes = card.dataset.sizes || '';
        const cardPrice = parseInt(card.dataset.price || '0');

        let show = true;

        if (occasion && !cardOccasion.includes(occasion)) show = false;
        
        if (size) {
            const sizeArray = cardSizes.split(' ').map(s => s.trim());
            if (!sizeArray.includes(size)) show = false;
        }
        if (budget) {
            const [min, max] = budget.split('-').map(Number);
            if (max ? cardPrice > max : cardPrice < min) show = false;
        }

        card.style.display = show ? '' : 'none';
        card.style.opacity = show ? '1' : '0';
    });
}

// ─── FORM SUBMISSION ───────────────────────────
const bookingForm = document.getElementById('booking-form');
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = bookingForm.querySelector('.form-submit');
        const original = btn.textContent;
        btn.textContent = '✓ Inquiry Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        btn.disabled = true;
        setTimeout(() => {
            btn.textContent = original;
            btn.style.background = '';
            btn.disabled = false;
            bookingForm.reset();
        }, 3000);
    });
}

// ─── SMOOTH SCROLL FOR ANCHORS ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

// ─── HERO PARALLAX ─────────────────────────────
const heroImg = document.querySelector('.hero-img-wrap img');
window.addEventListener('scroll', () => {
    if (heroImg && window.scrollY < window.innerHeight) {
        heroImg.style.transform = `translateY(${window.scrollY * 0.08}px)`;
    }
});

// ─── COUNTER ANIMATION ─────────────────────────
function animateCounter(el, target, duration = 1500) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            el.textContent = target % 1 === 0 ? target + '+' : target.toFixed(0) + '+';
            clearInterval(timer);
        } else {
            el.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const nums = entry.target.querySelectorAll('.stat-number');
            const targets = [500, 1200, 98, 50];
            nums.forEach((num, i) => {
                if (targets[i]) animateCounter(num, targets[i]);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// Initialize filters
filterOutfits();
