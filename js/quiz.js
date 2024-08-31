import { state } from "../state/quizState.js";
import { launchConfetti } from "./confetti.js";
import { quizzes } from "../data/data.json";
import { initApp } from "./app.js";

import Button from "../components/Button.js";

import {
  showQuizResult,
  updateQuestionContent,
  renderQuestionContainer,
  renderAnswerOptions,
  renderSubmitAnswerButton,
  updateProgressBar,
  renderQuizTopic,
  renderProgressBar,
  showErrorMessage,
  updateAnswerOptionsState,
} from "./ui.js";

export function nextQuestion() {
  state.currentQuestion++;

  if (state.currentQuestion >= state.currentQuiz.questions.length) {
    if (state.score >= 9) launchConfetti();

    const playAgainBtn = Button("Play Again");
    playAgainBtn.addEventListener("click", () => resetQuiz());
    showQuizResult();
    document.querySelector(".answers-section").appendChild(playAgainBtn);
    return;
  }

  state.selectedAnswer = null;
  updateQuestionContent();
  renderAnswerOptions();
  renderSubmitAnswerButton();
  updateProgressBar();
}

export function resetQuiz() {
  state.currentQuiz = null;
  state.currentQuestion = 0;
  state.score = 0;
  state.selectedAnswer = null;
  state.submitAnswerBtn = null;
  state.questionContainer = null;
  state.questionCount = null;
  state.questionText = null;
  state.progressBar = null;

  if (state.confettiInterval) {
    clearInterval(state.confettiInterval);
    state.confettiInterval = null;
  }

  document.querySelector(".questions-section").innerHTML = "";
  document.querySelector(".answers-section").innerHTML = "";

  document.body.classList.remove("quiz-started");

  initApp();
}

export function startQuiz(quizName) {
  state.currentQuiz = quizzes.find((quiz) => quiz.title === quizName);

  if (!state.currentQuiz) {
    console.error(`Quiz with title "${quizName}" not found.`);
    return;
  }

  document.body.classList.add("quiz-started");

  if (!state.questionContainer) {
    renderQuestionContainer();
  }

  renderQuizTopic();

  updateQuestionContent();

  renderAnswerOptions();

  renderSubmitAnswerButton();

  renderProgressBar();
}

export function handleAnswerSubmission() {
  if (state.selectedAnswer === undefined || state.selectedAnswer === null) {
    showErrorMessage("Please select an answer");
    return;
  }

  const correctAnswerIndex =
    state.currentQuiz.questions[state.currentQuestion].answer;
  const isCorrect = state.selectedAnswer === correctAnswerIndex;

  if (isCorrect) {
    state.score++;
  }

  updateAnswerOptionsState(isCorrect, correctAnswerIndex);

  const answerRadios = document.querySelectorAll(".answer__radio");
  answerRadios.forEach((radio) => {
    radio.disabled = true;
  });

  state.submitAnswerBtn.textContent =
    state.currentQuestion === state.currentQuiz.questions.length - 1
      ? "Finish Quiz"
      : "Next Question";
  state.submitAnswerBtn.removeEventListener("click", handleAnswerSubmission);
  state.submitAnswerBtn.addEventListener("click", nextQuestion);
}
