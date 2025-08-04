document.addEventListener("DOMContentLoaded", function () {
  // ========================
  // ANIMACIÓN DE ÍCONOS SOCIALES
  // ========================
  const github = document.getElementById("github");
  const linkedin = document.getElementById("linkedin");
  const instagram = document.getElementById("instagram");
  const socialIcons = [github, linkedin, instagram];

  // Mueve los íconos al pasar el mouse sobre uno de ellos
  function moveIcons(target) {
    const targetIndex = socialIcons.indexOf(target);
    for (let i = 0; i <= targetIndex; i++) {
      socialIcons[i].classList.add("icon-move");
    }
    // Si se pasa por Instagram, se mueven todos
    if (target === instagram) {
      socialIcons.forEach((icon) => icon.classList.add("icon-move"));
    }
  }

  // Reinicia la animación al quitar el mouse
  function resetIcons() {
    socialIcons.forEach((icon) => icon.classList.remove("icon-move"));
  }

  // Eventos para iniciar y detener animaciones en los íconos
  github?.addEventListener("mouseenter", () => moveIcons(github));
  github?.addEventListener("mouseleave", resetIcons);
  linkedin?.addEventListener("mouseenter", () => moveIcons(linkedin));
  linkedin?.addEventListener("mouseleave", resetIcons);
  instagram?.addEventListener("mouseenter", () => moveIcons(instagram));
  instagram?.addEventListener("mouseleave", resetIcons);

  // ========================
  // CARRUSELES MÚLTIPLES EN EXPERIENCIA
  // ========================
  const carousels = document.querySelectorAll(".experience__carousel");

  carousels.forEach((carousel) => {
    const track = carousel.querySelector(".carousel__track");
    const slides = carousel.querySelectorAll(".carousel__img");

    // Clona el primer slide y lo agrega al final para bucle infinito
    const firstClone = slides[0].cloneNode(true);
    track.appendChild(firstClone);

    const updatedSlides = carousel.querySelectorAll(".carousel__img");
    const newTotal = updatedSlides.length;
    let currentSlide = 0;
    let intervalId = null;

    // Define el ancho del carrusel en función del total de slides
    track.style.width = `${100 * newTotal}%`;
    updatedSlides.forEach((slide) => {
      slide.style.width = `${100 / newTotal}%`;
    });

    // Inicia el carrusel automático
    function startCarousel() {
      if (intervalId) return; // evita múltiples intervalos

      intervalId = setInterval(() => {
        currentSlide++;
        track.style.transition = "transform 0.5s ease-in-out";
        track.style.transform = `translateX(-${
          (100 / newTotal) * currentSlide
        }%)`;

        // Reinicia el carrusel al llegar al final
        if (currentSlide === newTotal - 1) {
          setTimeout(() => {
            track.style.transition = "none";
            track.style.transform = "translateX(0)";
            currentSlide = 0;
          }, 500);
        }
      }, 3000);
    }

    // Detiene el carrusel y lo reinicia al primer slide
    function stopCarousel() {
      clearInterval(intervalId);
      intervalId = null;
      currentSlide = 0;
      track.style.transition = "none";
      track.style.transform = "translateX(0)";
    }

    // Observa si el carrusel está visible en pantalla
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startCarousel(); // Comienza si es visible
          } else {
            stopCarousel(); // Detiene si no lo es
          }
        });
      },
      {
        threshold: 0.6, // mínimo 60% visible para activar
      }
    );

    observer.observe(carousel); // Aplica el observer a cada carrusel
  });
});

// ========================
// DETECTAR SECCIÓN VISIBLE Y ACTIVAR ENLACE DE MENÚ
// ========================
document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu__list__item a");
  const sections = Array.from(menuLinks).map((link) => {
    const id = link.getAttribute("href").slice(1);
    return document.getElementById(id);
  });

  function activateMenu() {
    let scrollPos = window.scrollY + window.innerHeight / 2;
    let anySectionActive = false;

    sections.forEach((section, index) => {
      if (!section) return;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      // Marca como activo el link correspondiente a la sección visible
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        menuLinks.forEach((link) => link.classList.remove("active"));
        menuLinks[index].classList.add("active");
        anySectionActive = true;
      }
    });

    // Si ninguna sección es visible, quita todas las clases activas
    if (!anySectionActive) {
      menuLinks.forEach((link) => link.classList.remove("active"));
    }
  }

  window.addEventListener("scroll", activateMenu);
  activateMenu(); // Llama al cargar la página
});

// ========================
// MENÚ HAMBURGUESA RESPONSIVE
// ========================
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".menu-nav");
  const menuLinks = document.querySelectorAll(".menu__list__item a");
  const logo = document.querySelector(".nombre_logo");
  const header = document.querySelector(".menu__header");

  // Alterna el menú al hacer clic en el botón hamburguesa
  toggleBtn.addEventListener("click", () => {
    nav.classList.toggle("open");

    // Mueve el logo dentro del menú cuando se abre
    if (nav.classList.contains("open")) {
      nav.insertBefore(logo, nav.firstChild);
    } else {
      header.appendChild(logo);
    }
  });

  // Cierra el menú al hacer clic en un enlace
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      header.appendChild(logo);
    });
  });

  // Cierra el menú si se hace clic fuera de él
  document.addEventListener("click", (event) => {
    const isClickInsideMenu = nav.contains(event.target);
    const isClickOnToggle = toggleBtn.contains(event.target);

    if (
      !isClickInsideMenu &&
      !isClickOnToggle &&
      nav.classList.contains("open")
    ) {
      nav.classList.remove("open");
      header.appendChild(logo);
    }
  });
});

// ========================
// ANIMACIÓN DE TARJETAS DE HOBBIES (FLIP CARD)
// ========================
document.addEventListener("DOMContentLoaded", () => {
  const hobbyBoxes = document.querySelectorAll(".hobbies__box");

  hobbyBoxes.forEach((box) => {
    box.addEventListener("click", () => {
      // Remueve la clase "clicked" de todas las tarjetas excepto la actual
      hobbyBoxes.forEach((b) => {
        if (b !== box) {
          b.classList.remove("clicked");
        }
      });

      // Alterna el giro solo en la tarjeta seleccionada
      box.classList.toggle("clicked");
    });
  });
});
