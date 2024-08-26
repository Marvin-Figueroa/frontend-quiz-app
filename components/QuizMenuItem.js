import "./QuizMenuItem.css";
import QuizTopicIcon from "./QuizTopicIcon";

function QuizMenuItem(title, imageSrc) {
  const li = document.createElement("li");
  li.className = "quiz-menu__item";

  const button = document.createElement("button");
  button.className = "quiz-menu__btn";
  button.id = `btn-${title}-quiz`;

  const topicIcon = QuizTopicIcon(title, imageSrc);

  const span = document.createElement("span");
  span.textContent = title;

  button.appendChild(topicIcon);
  button.appendChild(span);
  li.appendChild(button);

  return li;
}

export default QuizMenuItem;
