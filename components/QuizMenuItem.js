import "./QuizMenuItem.css";

function QuizMenuItem(title, imageSrc) {
  const li = document.createElement("li");
  li.className = "quiz-menu__item";

  const button = document.createElement("button");
  button.className = "quiz-menu__btn";
  button.id = `btn-${title}-quiz`;

  const imgContainer = document.createElement("span");
  imgContainer.className = `quiz-menu__img-container ${title.toLowerCase()}-icon`;

  const img = document.createElement("img");
  img.src = imageSrc;

  const span = document.createElement("span");
  span.textContent = title;

  imgContainer.appendChild(img);
  button.appendChild(imgContainer);
  button.appendChild(span);
  li.appendChild(button);

  return li;
}

export default QuizMenuItem;
