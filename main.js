import QuizMenu from "./components/QuizMenu";
import ColorModeSwitch from "./components/ColorModeSwitch";
import QuizHeading from "./components/QuizHeading";
import ProgressBar from "./components/ProgressBar";

import { quizzes } from "./data/data.json";

import "./style.css";

/* Agrego estas variables 'globales' que nos ayudaran con la logica del quiz, son libres de agregar 
cualquier otra que consideren necesaria para sus tareas */
let currentQuiz;
let currentQuestion = 0;
let progressBar;
let score = 0;
let selectedAnswer;

// En esta funcion generaremos la interfaz inicial del quiz elegido.
// Cada uno llamara a la funcion que creo para que se renderice su componente
function startQuiz(quizName) {
  currentQuiz = quizzes.find((quiz) => quiz.title === quizName);
  document.body.classList.add("quiz-started");

  /* Alejandra invoca a su funcion renderQuizTopic() y el componente con el icono y titulo del quuiz actual
  aparece en el header al lado izquierdo del componente switch (modo claro/oscuro), el cual ya se encuentra
  renderizado */

  renderProgressBar(); /* Marvin invoca a su funcion renderProgressBar() y aparece la barra con el 10% de avance 
   correspondiente a la pregunta 1, segun se avance a las siguientes preguntas la barra se ira llenando mas */

  /* William invoca a su funcion renderAnswersMenu() y el componente AnswersMenu aparece al lado derecho 
   del contenedor central, sustituyendo al componente QuizMenu que previamente estaba ahi. El  componente
   inicialmente muestra las opciones de respuesta correspondientes a la pregunta actual, segun se avance a la 
   siguiente pregunta, estas opciones deben ir cambiando */

  /* Rafael invoca a su funcion renderQuestion() y notara que no hay un componente para esto
   ya que tiene que renderizar el mensaje 'Question x of y' y abajito renderizar la pregunta actual (los cuales iran cambiando conforme se avance a las siguientes preguntas), para
   lo cual debe sustituir el contenido que hay en ese elemento (el titulo 'Welcome to the Frontend Quiz!
   y el subtitulo 'Pick a subject to get started.') */

  /* Alguien mas invoca a su funcion renderButton()  y el componente Button aparece a final del contenedor
  derecho (un section con la clase 'answers-section') como ultimo hijo de este, y como hermano del componente que agrego William (el de las opciones de respuesta). El boton inicialmente mostrara el texto 'Submit Answer'. 
  
  */
}

function renderProgressBar() {
  if (!progressBar) {
    progressBar = ProgressBar(0);
    document.querySelector(".questions-section").appendChild(progressBar);
  }
  updateProgressBar();
}

function updateProgressBar() {
  // Calcula el porcentaje basado en la cantidad de preguntas actuales.
  const totalQuestions = currentQuiz.questions.length;
  const percentage = ((currentQuestion + 1) / totalQuestions) * 100;

  // Actualiza el estilo de la barra de progreso.
  progressBar.style.setProperty(
    "--current-progress",
    `${Math.max(100 - percentage, 0)}%`
  );
}

// En esta funcion actualizaremos la pregunta actual que se muestra a la izquierda
// y las opciones de respuesta que aparecen a la derecha. Asi como estoy actualizando
// la barra de progreso
function nextQuestion() {
  currentQuestion++;
  updateProgressBar(); // Actualiza la barra de progreso con la nueva pregunta.
}

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
      console.log(`Let's start the ${button.id.split("-")[1]} Quiz`);
      startQuiz(button.id.split("-")[1]);
    })
  );
}

// Inicializar la aplicación
initApp();
