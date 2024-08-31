import QuizMenu from "./components/QuizMenu";
import ColorModeSwitch from "./components/ColorModeSwitch";
import QuizHeading from "./components/QuizHeading";
import ProgressBar from "./components/ProgressBar";
import AnswerMenu from "./components/AnswersMenu";
import Button from "./components/Button";
import ErrorMessage from "./components/ErrorMessage";

import { quizzes } from "./data/data.json";
import { mapAnswerOptionToNumber } from "./utils/answerOptions";

import "./style.css";

let currentQuiz;
let currentQuestion = 0;
let progressBar;
let score = 0;
let selectedAnswer;
let submitAnswerBtn; // Definir globalmente para poder actualizarlo
let questionContainer;
let questionCount;
let questionText;

function renderSubmitAnswerButton() {
  const answersSection = document.querySelector(".answers-section");

  // Si el botón ya existe, simplemente actualiza su estado
  if (submitAnswerBtn) {
    submitAnswerBtn.textContent = "Submit Answer";
    submitAnswerBtn.removeEventListener("click", nextQuestion);
    submitAnswerBtn.addEventListener("click", handleAnswerSubmission);
  } else {
    // Crear el botón si no existe
    submitAnswerBtn = Button("Submit Answer");
    submitAnswerBtn.addEventListener("click", handleAnswerSubmission);
    answersSection.appendChild(submitAnswerBtn);
  }
}

function handleAnswerSubmission() {
  if (selectedAnswer === undefined || selectedAnswer === null) {
    showErrorMessage("Please select an answer");
    return;
  }

  const correctAnswerIndex = currentQuiz.questions[currentQuestion].answer;
  const isCorrect = selectedAnswer === correctAnswerIndex;

  if (isCorrect) {
    score++;
  }

  updateAnswerButtonsState(isCorrect, correctAnswerIndex);

  // Cambiar el botón a "Next Question"
  submitAnswerBtn.textContent = "Next Question";
  submitAnswerBtn.removeEventListener("click", handleAnswerSubmission);
  submitAnswerBtn.addEventListener("click", nextQuestion);
}

function showErrorMessage(message) {
  const answersSection = document.querySelector(".answers-section");

  let errorMessage = answersSection.querySelector(".error-message");

  if (errorMessage) {
    errorMessage.querySelector(".error-text").textContent = message;
    errorMessage.classList.add("visible");
  } else {
    errorMessage = ErrorMessage(message);
    errorMessage.classList.add("visible");
    answersSection.appendChild(errorMessage);
  }

  // Oculta el mensaje después de 1 segundo
  setTimeout(() => {
    errorMessage.classList.remove("visible");
  }, 1000);
}

function updateAnswerButtonsState(isCorrect, correctAnswerIndex) {
  const answersButtons = document.querySelectorAll(".answer__btn");

  answersButtons.forEach((button, index) => {
    const icon = button.querySelector(".answer__icon");

    if (index === selectedAnswer) {
      button.classList.add(isCorrect ? "correct" : "incorrect");
      icon.src = isCorrect
        ? "/images/icon-correct.svg"
        : "/images/icon-incorrect.svg";
    }

    if (!isCorrect && index === correctAnswerIndex) {
      icon.src = "/images/icon-correct.svg";
    }
  });
}

function renderAnswerOptions() {
  const answersSection = document.querySelector(".answers-section");
  const quizMenu = answersSection.querySelector(".quiz-menu");
  const oldAnswersMenu = answersSection.querySelector(".answers-menu");

  // Genera el nuevo menú de respuestas en memoria
  const newAnswersMenu = AnswerMenu(currentQuiz.questions[currentQuestion]);

  if (quizMenu) {
    // Reemplaza el menú de respuestas existente
    answersSection.replaceChild(newAnswersMenu, quizMenu);
  } else if (oldAnswersMenu) {
    answersSection.replaceChild(newAnswersMenu, oldAnswersMenu);
  }

  // Añade eventos a los botones de respuesta
  const answersButtons = newAnswersMenu.querySelectorAll(".answer__btn");

  answersButtons.forEach((button) =>
    button.addEventListener("click", () => {
      selectedAnswer = mapAnswerOptionToNumber(button.id[button.id.length - 1]);
    })
  );
}

function initializeQuestionContainer() {
  // Crea los elementos y guárdalos en variables globales
  questionContainer = document.createElement("div");
  questionContainer.className = "question-container";

  questionCount = document.createElement("p");
  questionCount.className = "question-count";

  questionText = document.createElement("h3");
  questionText.className = "question-text";

  questionContainer.appendChild(questionCount);
  questionContainer.appendChild(questionText);

  // Añade el contenedor a la sección de preguntas una sola vez
  const questionsSection = document.querySelector(".questions-section");
  questionsSection.replaceChildren(questionContainer);
}

function updateQuestionContent(quiz) {
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    console.error("Invalid quiz data.");
    return;
  }

  // Actualiza directamente los elementos existentes
  questionText.textContent = quiz.questions[currentQuestion].question;
  questionCount.textContent = `Question ${currentQuestion + 1} of ${
    quiz.questions.length
  }`;
}

function startQuiz(quizName) {
  currentQuiz = quizzes.find((quiz) => quiz.title === quizName);
  if (!currentQuiz) {
    console.error(`Quiz with title "${quizName}" not found.`);
    return;
  }

  document.body.classList.add("quiz-started");

  // Inicializa el contenedor de preguntas (solo la primera vez)
  if (!questionContainer) {
    initializeQuestionContainer();
  }

  // Actualiza el contenido de la pregunta actual
  updateQuestionContent(currentQuiz);

  renderAnswerOptions();

  renderSubmitAnswerButton();

  renderProgressBar();
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

  if (currentQuestion >= currentQuiz.questions.length) {
    // Lógica para finalizar el cuestionario o mostrar resultados
    console.log("Quiz completed!");
    console.log("You scored: ", score);
    return;
  }

  selectedAnswer = null; // Reinicia la selección
  updateQuestionContent(currentQuiz); // Actualiza la pregunta
  renderAnswerOptions(); // Vuelve a renderizar las opciones de respuesta
  renderSubmitAnswerButton(); // Actualiza el botón
  updateProgressBar(); // Actualiza la barra de progreso
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
      startQuiz(button.id.split("-")[1]);
    })
  );
}

// Inicializar la aplicación
initApp();
