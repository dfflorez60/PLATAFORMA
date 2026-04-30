function showPage(pageId) {
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
    page.style.display = 'none';
  });

  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add('active');
    target.style.display = 'block';
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}

function initForm() {
  const form = document.getElementById('registro-form');
  const nombre = document.getElementById('nombre');
  const correo = document.getElementById('correo');
  const errorNombre = document.getElementById('error-nombre');
  const errorCorreo = document.getElementById('error-correo');
  const successMsg = document.getElementById('success-msg');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    errorNombre.textContent = '';
    errorCorreo.textContent = '';
    successMsg.textContent = '';

    if (!nombre.value.trim() || nombre.value.trim().length < 3) {
      errorNombre.textContent = 'Nombre completo debe tener al menos 3 caracteres.';
      valid = false;
    }

    if (!correo.value.trim() || !validateEmail(correo.value)) {
      errorCorreo.textContent = 'Ingresa un correo válido.';
      valid = false;
    }

    if (valid) {
      successMsg.textContent = 'Registro completado con éxito. ¡Bienvenido!';
      form.reset();
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  showPage('inicio');
  initForm();
});
