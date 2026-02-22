// ============================================
// SMOOTH SCROLL & NAVBAR FUNCTIONALITY
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle Mobile Menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(
    '.project-card, .skill-category, .service-card, .process-step, .availability-card, .about-me-content'
).forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// ============================================
// STAGGER ANIMATIONS FOR CARDS
// ============================================

const applyStaggerAnimation = () => {
    const cardGroups = [
        '.skill-category',
        '.service-card',
        '.project-card',
        '.process-step',
        '.availability-card'
    ];

    cardGroups.forEach(selector => {
        const cards = document.querySelectorAll(selector);
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
        });
    });
};

// ============================================
// PROJECT CARD INTERACTIONS
// ============================================

const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', () => {
        card.style.zIndex = '1';
    });
});

// ============================================
// SKILL BADGE ANIMATIONS
// ============================================

const skillBadges = document.querySelectorAll('.skill-badge');

skillBadges.forEach((badge, index) => {
    badge.addEventListener('mouseover', () => {
        // Stagger animation for nearby badges
        skillBadges.forEach((b, i) => {
            const distance = Math.abs(i - index);
            if (distance <= 2) {
                b.style.transform = `scale(${1.05 + (0.05 - distance * 0.02)})`;
            }
        });
    });

    badge.addEventListener('mouseout', () => {
        skillBadges.forEach(b => {
            b.style.transform = 'scale(1)';
        });
    });
});

// ============================================
// DYNAMIC SERVICE CARD ANIMATION
// ============================================

const serviceCards = document.querySelectorAll('.service-card');

serviceCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('mouseenter', () => {
        if (card.querySelector('.service-icon')) {
            card.querySelector('.service-icon').style.animation = 'none';
            setTimeout(() => {
                card.querySelector('.service-icon').style.animation = '';
            }, 10);
        }
    });
});

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================

const updateScrollProgress = () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = window.pageYOffset / windowHeight;
    document.documentElement.style.setProperty('--scroll-progress', scrolled * 100 + '%');
};

window.addEventListener('scroll', updateScrollProgress);

// ============================================
// ACTIVE NAV LINK TRACKING
// ============================================

const sections = document.querySelectorAll('section');

const activateNavLink = () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const href = link.getAttribute('href').slice(1);
        if (href === current) {
            link.style.color = 'var(--primary)';
        } else {
            link.style.color = '';
        }
    });
};

window.addEventListener('scroll', activateNavLink);

// ============================================
// PARALLAX EFFECT
// ============================================

const heroSection = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (heroSection) {
        const scrolled = window.pageYOffset;
        heroSection.style.backgroundPosition = `0% ${scrolled * 0.5}px`;
    }
});

// ============================================
// UTILITY: DEBOUNCE FUNCTION
// ============================================

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

// ============================================
// RESPONSIVE ADJUSTMENTS
// ============================================

const adjustForMobile = debounce(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', adjustForMobile);

// ============================================
// PERFORMANCE: REDUCE MOTION FOR USERS
// ============================================

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animation = 'none';
        el.style.transition = 'none';
    });
}

// ============================================
// EMAILJS CONFIGURATION & CONTACT FORM
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize EmailJS with your public key
    emailjs.init('xHTy-6keAi8A959te');
    
    // Get the contact form
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
});

async function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    // Validate form
    if (!form.user_name.value || !form.user_email.value || !form.message.value) {
        alert('Per favore compila tutti i campi obbligatori');
        return;
    }
    
    // Disable submit button and show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Invio in corso...';
    
    try {
        // Prepare template parameters (must match EmailJS template variables)
        const templateParams = {
            user_name: document.getElementById('user_name').value,
            user_email: document.getElementById('user_email').value,
            message: document.getElementById('message').value
    };


        
        // Send email using EmailJS
        await emailjs.sendForm(
            'service_wq2dwot',      // Your Service ID
            'template_r2rdnr9',     // Your Template ID
            form
        );
        
        // Success response
        alert('✓ Email inviata con successo!\nTi contatterò al più presto.');
        form.reset();
        
    } catch (error) {
        console.error('EmailJS Error:', error);
        alert('✗ Errore nell\'invio dell\'email.\nRiprova più tardi o scrivi a heme.alessandro@gmail.com');
        
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}
