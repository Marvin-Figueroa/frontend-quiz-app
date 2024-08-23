import Switch from "./Switch";
import lightSun from "../assets/images/icon-sun-light.svg";
import darkSun from "../assets/images/icon-sun-dark.svg";
import lightMoon from "../assets/images/icon-moon-light.svg";
import darkMoon from "../assets/images/icon-moon-dark.svg";

import "./ColorModeSwitch.css";

function ColorModeSwitch(isDarkMode) {
  return `<div class='color-mode-switch'>
    <img src='${isDarkMode ? lightSun : darkSun}'>${Switch()}<img src='${
    isDarkMode ? lightMoon : darkMoon
  }'>
  </div>`;
}

export default ColorModeSwitch;
