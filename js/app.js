import {
  createHeader,
  createMainContent,
  createElementWithClass,
} from "./ui.js";

import { showDifficultyMenu } from "./sweetalert2.js";

export function initApp() {
  const app = document.querySelector("#app");

  app.innerHTML = "";

  const header = createHeader();
  const main = createElementWithClass("main", "app-main");
  const mainContent = createMainContent();

  main.appendChild(mainContent);
  app.appendChild(header);
  app.appendChild(main);

  const quizMenuButtons = document.querySelectorAll(".quiz-menu__btn");
  quizMenuButtons.forEach((button) =>
    button.addEventListener("click", () => {
      showDifficultyMenu(button.id.split("-")[1]);
    })
  );
}

initApp();
