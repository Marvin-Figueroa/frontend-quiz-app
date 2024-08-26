import QuizTopicIcon from "./QuizTopicIcon";
import "./QuizTopic.css";

function QuizTopic(topic, imageSrc) {
  const div = document.createElement("div");
  div.className = "quiz-topic";

  const topicIcon = QuizTopicIcon(topic, imageSrc);

  const span = document.createElement("span");
  span.className = "quiz-topic__text";
  span.textContent = topic;

  div.appendChild(topicIcon);
  div.appendChild(span);

  return div;
}

export default QuizTopic;
