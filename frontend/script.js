function showPage(pageId) {
  const pages = document.querySelectorAll(".page");

  pages.forEach((page) => {
    page.classList.remove("active");
    page.style.display = "none";
  });

  const target = document.getElementById(pageId);

  if (target) {
    target.classList.add("active");
    target.style.display = "block";
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);

  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

async function initForm() {
  const form = document.getElementById("registro-form");
  const nombre = document.getElementById("nombre");
  const correo = document.getElementById("correo");
  const errorNombre = document.getElementById("error-nombre");
  const errorCorreo = document.getElementById("error-correo");
  const successMsg = document.getElementById("success-msg");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    let valid = true;

    errorNombre.textContent = "";
    errorCorreo.textContent = "";
    successMsg.textContent = "";

    if (!nombre.value.trim() || nombre.value.trim().length < 3) {
      errorNombre.textContent =
        "Nombre completo debe tener al menos 3 caracteres.";
      valid = false;
    }

    if (!correo.value.trim() || !validateEmail(correo.value)) {
      errorCorreo.textContent = "Ingresa un correo válido.";
      valid = false;
    }

    if (!valid) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nombre.value.trim(),
          correo: correo.value.trim(),
          programa: "Plataforma académica"
        })
      });

      if (!response.ok) {
        throw new Error("Error en el registro");
      }

      const data = await response.json();

      successMsg.textContent = "Registro completado con éxito. ¡Bienvenido!";
      console.log("Respuesta del backend:", data);

      form.reset();
    } catch (error) {
      successMsg.textContent = "No se pudo registrar. Verifica el backend.";
      console.error(error);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  showPage("inicio");
  initForm();
});