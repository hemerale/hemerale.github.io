const menuToggle = document.querySelector('.menu-toggle');
const siteMenu = document.querySelector('.site-menu');
const header = document.querySelector('.nav-wrap');
const reveals = document.querySelectorAll('.reveal');
const contactForm = document.getElementById('contactForm');

if (menuToggle && siteMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';

    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    siteMenu.classList.toggle('open', !isOpen);
    document.body.classList.toggle('menu-open', !isOpen);
  });

  siteMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      siteMenu.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });
}

const setHeader = () => {
  if (!header) {
    return;
  }

  header.classList.toggle('scrolled', window.scrollY > 20);
};

window.addEventListener('scroll', setHeader, { passive: true });
setHeader();

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add('visible'));
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.emailjs) {
    window.emailjs.init('xHTy-6keAi8A959te');
  }

  if (contactForm) {
    contactForm.addEventListener('submit', handleContact);
  }
});

async function handleContact(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton ? submitButton.textContent : 'Invia richiesta';

  if (!form.user_name.value || !form.user_email.value || !form.message.value) {
    window.alert('Per favore compila tutti i campi obbligatori.');
    return;
  }

  if (!window.emailjs) {
    window.alert('Servizio email temporaneamente non disponibile. Scrivi a heme.alessandro@gmail.com');
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = 'Invio in corso...';
  }

  try {
    await window.emailjs.sendForm('service_wq2dwot', 'template_r2rdnr9', form);
    window.alert('Messaggio inviato con successo. Ti contattero al piu presto.');
    form.reset();
  } catch (error) {
    console.error('EmailJS Error:', error);
    window.alert('Errore durante l\'invio. Riprova o scrivi a heme.alessandro@gmail.com');
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
}
