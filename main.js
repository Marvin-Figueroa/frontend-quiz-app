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
function startQuiz(textContentName,quizName) {
  
  currentQuiz = quizzes.find((quiz) => quiz.title === quizName);
  document.body.classList.add("quiz-started");

  //Ocupo el indice en vez del objeto para agilizar la consulta y porque el texto del componente cambia
  const quizIndex = quizzes.findIndex(quiz => quiz.title === textContentName);   

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
  
   
  
    // Aquí va la primera pregunta
   
      //Defino mediante quizIndex cual quiz es elegido, sino lo encuentra valido que no haga el renderQuestion
      if (quizIndex !== -1) {
        // Aquí va la primera pregunta
        renderQuestion(quizIndex, 0);
      }  
     

  /* Alguien mas invoca a su funcion renderButton()  y el componente Button aparece a final del contenedor
  derecho (un section con la clase 'answers-section') como ultimo hijo de este, y como hermano del componente que agrego William (el de las opciones de respuesta). El boton inicialmente mostrara el texto 'Submit Answer'. 
  */

}

// Función para crear y añadir el botón al documento
function createAndAddButton(text) {
  const renderButton = Button(text);
  document.body.appendChild(renderButton);
  console.log(`Botón "${text}" creado y añadido al documento.`);
}
// Función para mostrar las preguntas del quiz
function renderQuestion(quizIndex, questionIndex) {
  const quizData = quizzes[quizIndex];
  selectedAnswer = quizData.questions[questionIndex];

  // Actualizar el encabezado con el título del quiz
  const quizHeading = document.querySelector(".quiz-heading");
  quizHeading.textContent = quizData.title;

  // Actualizar el subtítulo con la pregunta actual
  const subHeading = document.querySelector("p");

  // Mostramos el número de la pregunta en la que vamos
  subHeading.textContent = `Pregunta ${questionIndex + 1} de ${quizData.questions.length}: ${selectedAnswer.question}`;

  // Actualizar las opciones de respuesta en los botones
  const quizMenuItems = document.querySelectorAll(".quiz-menu__btn");

  selectedAnswer.options.forEach((optionText, index) => {
    const optionLetter = String.fromCharCode(65 + index); // Convierte el índice a A, B, C, D...

    // Reemplaza el ícono por la letra de la opción
    let iconElement = quizMenuItems[index].querySelector("img, span");
    if (iconElement) {
      iconElement.textContent = optionLetter;
    } else {
      // Crear un nuevo span si no existe
      iconElement = document.createElement("span");
      iconElement.textContent = optionLetter;
      quizMenuItems[index].prepend(iconElement);
    }

    // Reemplaza el texto de la opción
    const textElement = quizMenuItems[index].querySelector("span:last-child");
    if (textElement) {
      textElement.textContent = optionText;
    }
  });

// TODO: HICE ESTE CODIGO PARA PROBAR SI MUESTRA LAS DEMÁS OPCIONES Y LA PREGUNTA SIGUIENTE PERO HABRÁ QUE QUITARLO PARA DAR PASO AL BOTÓN

quizMenuItems.forEach((item, index) => {
  item.onclick = () => {
    if (index === selectedAnswer.answer) {
      console.log("Correcto, pero no te confíes, éste quiz te va a vencer ¡Ya verás!");
    } else {
      console.log("Falso, con f de ¡Te falta ácido fólico!");
    }

    // Si hay más preguntas, mostrar la siguiente
    if (questionIndex < quizData.questions.length - 1) {
      
      //Esta sería el código de la próxima pregunta reutilizo renderQuestion ya que solo se incrementa en uno el indice de la pregunta
      renderQuestion(quizIndex,questionIndex+1)

    }
    //Aqui puede ir el render del final del quiz con un else
  };
}); 
}

//TODO: No logré activar la funcionalidad del progressBar con el renderQuestion
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
    button.addEventListener("click", (e) => {
      console.log(`Let's start the ${button.id.split("-")[1]} Quiz`);
      /*startQuiz(button.id.split("-")[1]);*/
      //Agregué esta constante porque necesito el textContent, igual dejé el split del id
      const quizTopic = e.target.textContent;
      startQuiz(quizTopic,button.id.split("-")[1]);
    })
  );
}

// Inicializar la aplicación
initApp();
