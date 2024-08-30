// ColorModeSwitch.js
import Switch from './Switch';
import './ColorModeSwitch.css';

function ColorModeSwitch() {
  const div = document.createElement('div');
  div.className = 'color-mode-switch';

  const sunImg = document.createElement('img');
  sunImg.id = 'sun-icon';
  sunImg.src = localStorage.getItem('darkMode') === 'true'
    ? '/images/icon-sun-light.svg'
    : '/images/icon-sun-dark.svg';

  const switchComponent = Switch((isChecked) => {
    document.body.classList.toggle('dark-mode', isChecked);
    document.body.classList.toggle('light-mode', !isChecked);
    
    // Actualiza las imágenes según el modo
    sunImg.src = isChecked
      ? '/images/icon-sun-light.svg'
      : '/images/icon-sun-dark.svg';
    moonImg.src = isChecked
      ? '/images/icon-moon-dark.svg'
      : '/images/icon-moon-light.svg';

    // Guarda el estado en localStorage
    localStorage.setItem('darkMode', isChecked);
  });

  const moonImg = document.createElement('img');
  moonImg.id = 'moon-icon';
  moonImg.src = localStorage.getItem('darkMode') === 'true'
    ? '/images/icon-moon-dark.svg'
    : '/images/icon-moon-light.svg';

  div.appendChild(sunImg);
  div.appendChild(switchComponent);
  div.appendChild(moonImg);

  return div;
}

export default ColorModeSwitch;
