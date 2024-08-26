import "./QuizTopicIcon.css";

function QuizTopicIcon(topic, iconSrc) {
  const imgContainer = document.createElement("span");
  imgContainer.className = `quiz-menu__img-container ${topic.toLowerCase()}-icon`;

  const img = document.createElement("img");
  img.src = iconSrc;

  imgContainer.appendChild(img);

  return imgContainer;
}

export default QuizTopicIcon;
