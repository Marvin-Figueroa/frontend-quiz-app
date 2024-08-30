import QuizMenu from "./components/QuizMenu";
import ColorModeSwitch from "./components/ColorModeSwitch";
import QuizHeading from "./components/QuizHeading";
import ProgressBar from "./components/ProgressBar";

import { quizzes } from "./data/data.json";

import "./style.css";

let currentQuiz;
let currentQuestion = 5;
let progressBar;
let score = 0;
let selectedAnswer;

// Función para crear el contenedor de preguntas
function createQuestionContainer() {
  const questionContainer = document.createElement("div");
  questionContainer.className = "question-container";

  const questionCount = document.createElement("p");
  questionCount.className = "question-count";

  const question = document.createElement("h3");
  question.className = "question-text";

  questionContainer.appendChild(questionCount);
  questionContainer.appendChild(question);

  return { questionContainer, questionCount, question };
}

// Función para actualizar el contenedor de preguntas
function updateQuestionContent(questionElement, countElement, quiz) {
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    console.error("Invalid quiz data.");
    return;
  }
  questionElement.textContent = quiz.questions[currentQuestion].question;
  countElement.textContent = `Question ${currentQuestion + 1} of ${
    quiz.questions.length
  }`;
}

// Función para reemplazar el contenido de la sección de preguntas
function replaceQuestionsSection(container) {
  document.querySelector(".questions-section").replaceChildren(container);
}

function startQuiz(quizName) {
  currentQuiz = quizzes.find((quiz) => quiz.title === quizName);
  if (!currentQuiz) {
    console.error(`Quiz with title "${quizName}" not found.`);
    return;
  }

  document.body.classList.add("quiz-started");

  // Crea el contenedor de preguntas y obtén los elementos necesarios
  const { questionContainer, questionCount, question } =
    createQuestionContainer();

  // Actualiza el contenido del contenedor de preguntas
  updateQuestionContent(question, questionCount, currentQuiz);

  // Reemplaza el contenido de la sección de preguntas
  replaceQuestionsSection(questionContainer);

  renderProgressBar();
}

// Función para crear y añadir el botón al documento
function createAndAddButton(text) {
  const renderButton = Button(text);
  document.body.appendChild(renderButton);
  console.log(`Botón "${text}" creado y añadido al documento.`);
}

function renderProgressBar() {
  if (!progressBar) {
    progressBar = ProgressBar(0);
    document.querySelector(".questions-section").appendChild(progressBar);
  }
  updateProgressBar();
}

function updateProgressBar() {
  if (
    !currentQuiz ||
    !currentQuiz.questions ||
    currentQuiz.questions.length === 0
  ) {
    console.error("Cannot update progress bar: invalid quiz data.");
    return;
  }

  // Calcula el porcentaje basado en la cantidad de preguntas actuales.
  const totalQuestions = currentQuiz.questions.length;
  const percentage = ((currentQuestion + 1) / totalQuestions) * 100;

  // Actualiza el estilo de la barra de progreso.
  progressBar.style.setProperty(
    "--current-progress",
    `${Math.max(100 - percentage, 0)}%`
  );
}

function nextQuestion() {
  currentQuestion++;
  updateProgressBar();
}

// Función para crear un elemento con clase
function createElementWithClass(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Función para crear el encabezado
function createHeader() {
  const header = createElementWithClass("header", "app-header");
  header.appendChild(ColorModeSwitch());
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

  const header = createHeader();
  const main = createElementWithClass("main", "app-main");
  const mainContent = createMainContent();

  main.appendChild(mainContent);
  app.appendChild(header);
  app.appendChild(main);

  // Agregar eventos a los botones del menú
  const quizMenuButtons = document.querySelectorAll(".quiz-menu__btn");
  quizMenuButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      console.log(`Let's start the ${button.id.split("-")[1]} Quiz`);
      startQuiz(button.id.split("-")[1]);
    })
  );
}

// Inicializar la aplicación
initApp();
