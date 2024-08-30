import "./ColorModeSwitch.css";

function ColorModeSwitch() {
  const div = document.createElement("div");
  div.className = "color-mode-switch";

  // Crea el interruptor (checkbox)
  const toggleInput = document.createElement("input");
  toggleInput.className = "toggle-input";
  toggleInput.id = "toggle";
  toggleInput.type = "checkbox";

  const toggleLabel = document.createElement("label");
  toggleLabel.className = "toggle-label";
  toggleLabel.setAttribute("for", "toggle");

  // Contenedor del interruptor
  const toggleSwitch = document.createElement("div");
  toggleSwitch.className = "toggle-switch";
  toggleSwitch.appendChild(toggleInput);
  toggleSwitch.appendChild(toggleLabel);

  // Crea el icono del sol
  const sunIcon = document.createElement("div");
  sunIcon.className = "sun-icon";

  // Crea el icono de la luna
  const moonIcon = document.createElement("div");
  moonIcon.className = "moon-icon";

  // Añade el icono del sol a la izquierda del interruptor
  div.appendChild(sunIcon);
  // Añade el interruptor en el medio
  div.appendChild(toggleSwitch);
  // Añade el icono de la luna a la derecha del interruptor
  div.appendChild(moonIcon);

  // Función para actualizar el modo y los iconos
  function updateMode() {
    const isDarkMode = toggleInput.checked;

    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);

    sunIcon.style.content = isDarkMode
      ? 'url("/images/icon-sun-light.svg")'
      : 'url("/images/icon-sun-dark.svg")';

    moonIcon.style.content = isDarkMode
      ? 'url("/images/icon-moon-light.svg")'
      : 'url("/images/icon-moon-dark.svg")';

    // Guarda la preferencia en localStorage
    localStorage.setItem("darkMode", isDarkMode);
  }

  // Escucha el cambio de estado del interruptor
  toggleInput.addEventListener("change", updateMode);

  // Inicializa con el estado guardado en localStorage
  const savedMode = localStorage.getItem("darkMode") === "true";
  toggleInput.checked = savedMode;
  updateMode();

  return div;
}

export default ColorModeSwitch;
