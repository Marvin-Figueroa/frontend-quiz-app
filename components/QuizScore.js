import "./QuizScore.css";

function QuizScore(score, totalScore) {
  let scoreClass = "";
  const scoreRatio = score / totalScore;

  if (scoreRatio <= 0.2) {
    scoreClass = "very-low";
  } else if (scoreRatio <= 0.5) {
    scoreClass = "low";
  } else if (scoreRatio <= 0.8) {
    scoreClass = "middle";
  } else {
    scoreClass = "high";
  }

  const scoreSpan = document.createElement("span");
  scoreSpan.className = `quiz-score ${scoreClass}`;
  scoreSpan.textContent = score;

  return scoreSpan;
}

export default QuizScore;
