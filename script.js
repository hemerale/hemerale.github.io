const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector(".site-menu");
const menuLinks = document.querySelectorAll(".site-menu a");
const reveals = document.querySelectorAll(".reveal");
const contactForm = document.getElementById("contactForm");
const siteHeader = document.querySelector(".site-header");

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    siteMenu.classList.toggle("open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.setAttribute("aria-expanded", "false");
      siteMenu.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });
}

const updateHeaderState = () => {
  if (!siteHeader) {
    return;
  }

  if (window.scrollY > 24) {
    siteHeader.classList.add("scrolled");
  } else {
    siteHeader.classList.remove("scrolled");
  }
};

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach((element) => observer.observe(element));
} else {
  reveals.forEach((element) => element.classList.add("visible"));
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.emailjs) {
    window.emailjs.init("xHTy-6keAi8A959te");
  }

  if (contactForm) {
    contactForm.addEventListener("submit", handleContactFormSubmit);
  }
});

async function handleContactFormSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton ? submitButton.textContent : "Invia Messaggio";

  if (!form.user_name.value || !form.user_email.value || !form.message.value) {
    window.alert("Per favore compila tutti i campi obbligatori");
    return;
  }

  if (!window.emailjs) {
    window.alert("EmailJS non e disponibile. Scrivi a heme.alessandro@gmail.com");
    return;
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Invio in corso...";
  }

  try {
    await window.emailjs.sendForm(
      "service_wq2dwot",
      "template_r2rdnr9",
      form
    );

    window.alert("Email inviata con successo! Ti contattero al piu presto.");
    form.reset();
  } catch (error) {
    console.error("EmailJS Error:", error);
    window.alert("Errore nell'invio dell'email. Riprova piu tardi o scrivi a heme.alessandro@gmail.com");
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  }
}
