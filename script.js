
const WHATSAPP_NUMBER = "50259682369";

document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const form = document.getElementById("quoteForm");
  const feedback = document.getElementById("formFeedback");

  if (!form) {
    console.error("No se encontró el formulario quoteForm.");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const message = [
      "Hola, VentaControl IA. Quisiera consultar una posible solución.",
      "",
      "Nombre: " + data.get("name"),
      "Negocio: " + data.get("business"),
      "Necesidad: " + data.get("solution"),
      "Detalles: " + (data.get("details") || "Sin detalles adicionales."),
      "",
      "Me gustaría conocer el alcance y las opciones de cotización."
    ].join("\n");

    const number = WHATSAPP_NUMBER.replace(/\D/g, "");

    if (!number) {
      if (feedback) {
        feedback.textContent = "El número de WhatsApp no está configurado.";
      }
      return;
    }

    const whatsappURL =
      "https://api.whatsapp.com/send?phone=" +
      number +
      "&text=" +
      encodeURIComponent(message);

    const whatsappWindow = window.open(whatsappURL, "_blank");

    if (!whatsappWindow) {
      if (feedback) {
        feedback.textContent =
          "El navegador bloqueó WhatsApp. Permite las ventanas emergentes e inténtalo de nuevo.";
      }
      window.location.href = whatsappURL;
      return;
    }

    if (feedback) {
      feedback.textContent =
        "WhatsApp se abrió con tu mensaje preparado. Pulsa Enviar para completar el contacto.";
    }
  });
});
