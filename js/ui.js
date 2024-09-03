import QuizHeading from "../components/QuizHeading";
import QuizMenu from "../components/QuizMenu";
import ColorModeSwitch from "../components/ColorModeSwitch";
import QuizTopic from "../components/QuizTopic";
import QuizResult from "../components/QuizResult";
import AnswerMenu from "../components/AnswersMenu";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import ErrorMessage from "../components/ErrorMessage";

import { mapAnswerOptionToNumber } from "../utils/answerOptions";
import { nextQuestion, handleAnswerSubmission } from "./quiz";

import { state } from "../state/quizState";

export function createMainContent() {
  const container = createElementWithClass("div", "main-content");
  const questionsSection = createQuestionsSection();
  const answersSection = createAnswersSection();
  container.appendChild(questionsSection);
  container.appendChild(answersSection);
  return container;
}

export function createAnswersSection() {
  const section = createElementWithClass("section", "answers-section");
  const quizMenu = QuizMenu();
  section.appendChild(quizMenu);
  return section;
}

export function createQuestionsSection() {
  const section = createElementWithClass("section", "questions-section");
  const quizHeading = QuizHeading("Welcome to the", "Frontend Quiz!");
  const subHeading = document.createElement("p");
  subHeading.textContent = "Pick a subject to get started.";
  section.appendChild(quizHeading);
  section.appendChild(subHeading);
  return section;
}

export function createHeader() {
  const header = createElementWithClass("header", "app-header");
  header.appendChild(ColorModeSwitch());
  return header;
}

export function createElementWithClass(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

export function renderQuizTopic() {
  const header = document.querySelector(".app-header");
  header.prepend(QuizTopic(state.currentQuiz.title, state.currentQuiz.icon));
}

export function showQuizResult() {
  const answersSection = document.querySelector(".answers-section");
  const questionsSection = document.querySelector(".questions-section");

  answersSection.innerHTML = "";
  questionsSection.innerHTML = "";

  const scoreElement = QuizResult(
    state.currentQuiz,
    state.score,
    state.currentQuiz.questions[state.quizDifficulty].length
  );
  answersSection.appendChild(scoreElement);
  questionsSection.appendChild(QuizHeading("Quiz Completed", "You scored..."));
}

export function renderAnswerOptions() {
  const answersSection = document.querySelector(".answers-section");
  const quizMenu = answersSection.querySelector(".quiz-menu");
  const oldAnswersMenu = answersSection.querySelector(".answers-menu");

  const newAnswersMenu = AnswerMenu(
    state.currentQuiz.questions[state.quizDifficulty][state.currentQuestion]
  );

  if (quizMenu) {
    answersSection.replaceChild(newAnswersMenu, quizMenu);
  } else if (oldAnswersMenu) {
    answersSection.replaceChild(newAnswersMenu, oldAnswersMenu);
  }

  const answerOptions = newAnswersMenu.querySelectorAll(".answer__radio");

  answerOptions.forEach((option) =>
    option.addEventListener("change", () => {
      state.selectedAnswer = mapAnswerOptionToNumber(
        option.id[option.id.length - 1]
      );
    })
  );
}

export function renderQuestionContainer() {
  state.questionContainer = document.createElement("div");
  state.questionContainer.className = "question-container";

  state.questionCount = document.createElement("p");
  state.questionCount.className = "question-count";

  state.questionText = document.createElement("h3");
  state.questionText.className = "question-text";

  state.questionContainer.appendChild(state.questionCount);
  state.questionContainer.appendChild(state.questionText);

  const questionsSection = document.querySelector(".questions-section");
  questionsSection.replaceChildren(state.questionContainer);
}

export function updateQuestionContent() {
  const {
    currentQuiz,
    questionText,
    questionCount,
    currentQuestion,
    quizDifficulty,
  } = state;

  if (
    !currentQuiz ||
    !currentQuiz.questions ||
    currentQuiz.questions[quizDifficulty].length === 0
  ) {
    console.error("Invalid quiz data.");
    return;
  }

  questionText.textContent =
    currentQuiz.questions[quizDifficulty][currentQuestion].question;
  questionCount.textContent = `Question ${currentQuestion + 1} of ${
    currentQuiz.questions[quizDifficulty].length
  }`;
}

export function renderProgressBar() {
  let { progressBar } = state;

  if (!progressBar) {
    progressBar = ProgressBar(0);
    state.progressBar = progressBar;
    document.querySelector(".questions-section").appendChild(progressBar);
  }

  updateProgressBar();
}

export function updateProgressBar() {
  const { currentQuiz, currentQuestion, progressBar } = state;

  if (
    !currentQuiz ||
    !currentQuiz.questions ||
    currentQuiz.questions[state.quizDifficulty].length === 0
  ) {
    console.error("Cannot update progress bar: invalid quiz data.");
    return;
  }

  const totalQuestions = currentQuiz.questions[state.quizDifficulty].length;
  const percentage = ((currentQuestion + 1) / totalQuestions) * 100;

  progressBar.style.setProperty(
    "--current-progress",
    `${Math.max(100 - percentage, 0)}%`
  );
}

export function renderSubmitAnswerButton() {
  const { submitAnswerBtn } = state;
  const answersSection = document.querySelector(".answers-section");

  if (submitAnswerBtn) {
    submitAnswerBtn.textContent = "Submit Answer";
    submitAnswerBtn.removeEventListener("click", nextQuestion);
    submitAnswerBtn.addEventListener("click", handleAnswerSubmission);
  } else {
    const newSubmitAnswerBtn = Button("Submit Answer");
    newSubmitAnswerBtn.addEventListener("click", handleAnswerSubmission);
    answersSection.appendChild(newSubmitAnswerBtn);

    state.submitAnswerBtn = newSubmitAnswerBtn;
  }
}

export function updateAnswerOptionsState(isCorrect, correctAnswerIndex) {
  const answerOptions = document.querySelectorAll(".answer__label");

  answerOptions.forEach((option, index) => {
    const icon = option.querySelector(".answer__icon");

    if (index === state.selectedAnswer) {
      option.classList.add(isCorrect ? "correct" : "incorrect");
      icon.src = isCorrect
        ? "/images/icon-correct.svg"
        : "/images/icon-incorrect.svg";
    }

    if (!isCorrect && index === correctAnswerIndex) {
      icon.src = "/images/icon-correct.svg";
    }
  });
}

export function showErrorMessage(message) {
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

  if (state.timeoutId) {
    clearTimeout(state.timeoutId);
  }

  state.timeoutId = setTimeout(() => {
    errorMessage.classList.remove("visible");
    state.timeoutId = null;
  }, 2000);
}
