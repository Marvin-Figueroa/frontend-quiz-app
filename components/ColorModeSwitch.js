import Switch from "./Switch";

import "./ColorModeSwitch.css";

function ColorModeSwitch(isDarkMode) {
  const div = document.createElement("div");
  div.className = "color-mode-switch";

  const sunImg = document.createElement("img");
  sunImg.src = isDarkMode
    ? `/images/icon-sun-light.svg`
    : "/images/icon-sun-dark.svg";

  const switchComponent = Switch();

  const moonImg = document.createElement("img");
  moonImg.src = isDarkMode
    ? "/images/icon-moon-light.svg"
    : "/images/icon-moon-dark.svg";

  div.appendChild(sunImg);
  div.appendChild(switchComponent);
  div.appendChild(moonImg);

  return div;
}

export default ColorModeSwitch;
