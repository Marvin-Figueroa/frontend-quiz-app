import QuizScore from "./QuizScore";
import QuizTopic from "./QuizTopic";

import "./QuizResult.css";

function QuizResult(quiz, earnedScore, totalScore) {
  const resultsContainer = document.createElement("div");
  resultsContainer.className = "quiz-result";

  resultsContainer.appendChild(QuizTopic(quiz.title, quiz.icon));
  resultsContainer.appendChild(QuizScore(earnedScore, totalScore));

  const resultText = document.createElement("p");
  resultText.className = "quiz-result__text";
  resultText.textContent = `out of ${totalScore}`;

  resultsContainer.appendChild(resultText);

  return resultsContainer;
}

export default QuizResult;
