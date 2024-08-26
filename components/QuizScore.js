import "./QuizScore.css";

function QuizScore(score) {
  let scoreClass = "";

  if (score <= 2) scoreClass = "very-low";
  else if (score <= 5) scoreClass = "low";
  else if (score <= 8) scoreClass = "middle";
  else scoreClass = "high";

  const scoreSpan = document.createElement("span");
  scoreSpan.className = `quiz-score ${scoreClass}`;
  scoreSpan.textContent = score;

  return scoreSpan;
}

export default QuizScore;
