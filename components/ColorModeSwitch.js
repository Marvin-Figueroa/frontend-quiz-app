import Switch from "./Switch";
import lightSun from "../assets/images/icon-sun-light.svg";
import darkSun from "../assets/images/icon-sun-dark.svg";
import lightMoon from "../assets/images/icon-moon-light.svg";
import darkMoon from "../assets/images/icon-moon-dark.svg";

import "./ColorModeSwitch.css";

function ColorModeSwitch(isDarkMode) {
  const div = document.createElement('div');
  div.className = 'color-mode-switch';

  const sunImg = document.createElement('img');
  sunImg.src = isDarkMode ? lightSun : darkSun;

  const switchComponent = Switch(); 

  const moonImg = document.createElement('img');
  moonImg.src = isDarkMode ? lightMoon : darkMoon;

  div.appendChild(sunImg);
  div.appendChild(switchComponent);
  div.appendChild(moonImg);

  return div;
}

export default ColorModeSwitch;
