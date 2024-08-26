import "./QuizHeading.css";

function QuizHeading(normalText, highlightedText) {
  const heading = document.createElement("h2");
  heading.className = "quiz-heading";

  const text = document.createElement("span");
  text.className = "quiz-heading__normal";

  const emphasizedText = document.createElement("span");
  emphasizedText.className = "quiz-heading__highlight";

  text.textContent = normalText;
  emphasizedText.textContent = highlightedText;

  heading.appendChild(text);
  heading.appendChild(emphasizedText);

  return heading;
}

export default QuizHeading;
