import QuizMenu from "./components/QuizMenu";
import ColorModeSwitch from "./components/ColorModeSwitch";
import QuizHeading from "./components/QuizHeading";

import "./style.css";

// Función para crear un elemento con clase
function createElementWithClass(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Función para crear el encabezado
function createHeader(isDarkMode) {
  const header = createElementWithClass("header", "app-header");
  header.appendChild(ColorModeSwitch(isDarkMode));
  return header;
}

// Función para crear la sección de preguntas
function createQuestionsSection() {
  const section = createElementWithClass("section", "questions-section");
  const quizHeading = QuizHeading("Welcome to the", "Frontend Quiz!");
  const subHeading = document.createElement("p");
  subHeading.textContent = "Pick a subject to get started.";
  section.appendChild(quizHeading);
  section.appendChild(subHeading);
  return section;
}

// Función para crear la sección de respuestas
function createAnswersSection() {
  const section = createElementWithClass("section", "answers-section");
  const quizMenu = QuizMenu();
  section.appendChild(quizMenu);
  return section;
}

// Función para crear el contenedor principal
function createMainContent() {
  const container = createElementWithClass("div", "main-content");
  const questionsSection = createQuestionsSection();
  const answersSection = createAnswersSection();
  container.appendChild(questionsSection);
  container.appendChild(answersSection);
  return container;
}

// Función principal para inicializar la aplicación
function initApp() {
  const app = document.querySelector("#app");

  const header = createHeader(false);
  const main = createElementWithClass("main", "app-main");
  const mainContent = createMainContent();

  main.appendChild(mainContent);
  app.appendChild(header);
  app.appendChild(main);

  // Agregar eventos a los botones del menú
  const quizMenuButtons = document.querySelectorAll(".quiz-menu__btn");
  quizMenuButtons.forEach((button) =>
    button.addEventListener("click", () => {
      console.log(`Let's start the ${button.textContent} Quiz`);
    })
  );
}

// Inicializar la aplicación
initApp();
