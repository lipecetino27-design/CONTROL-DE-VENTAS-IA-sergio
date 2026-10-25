
<script>
  // Número de WhatsApp de Guatemala
  const WHATSAPP_NUMBER = "50259682369";

  // Año del pie de página
  document.getElementById("year").textContent = new Date().getFullYear();

  // Menú para celulares
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

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

  // Formulario de contacto
  document.getElementById("quoteForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const data = new FormData(form);

    const message = [
      "Hola, VentaControl IA. Quisiera consultar una posible solución.",
      "",
      "Nombre: " + data.get("name"),
      "Negocio: " + data.get("business"),
      "Necesidad: " + data.get("solution"),
      "Detalles: " + (data.get("details") || "Aún no tengo más detalles."),
      "",
      "Me gustaría conocer el alcance y las opciones de cotización."
    ].join("\n");

    const number = WHATSAPP_NUMBER.replace(/\D/g, "");
    const feedback = document.getElementById("formFeedback");

    if (!number || WHATSAPP_NUMBER.includes("PON_AQUI")) {
      feedback.textContent =
        "Falta configurar el número de WhatsApp. No se ha enviado ningún dato.";
      return;
    }

    window.open(
      "https://wa.me/" + number + "?text=" + encodeURIComponent(message),
      "_blank",
      "noopener,noreferrer"
    );

    feedback.textContent =
      "Si se abrió WhatsApp, revisa el mensaje y envíalo cuando estés listo.";
  });
</script>
