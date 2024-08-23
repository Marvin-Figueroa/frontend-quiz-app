import "./QuizMenuItem.css";

function QuizMenuItem(title, imageSrc) {
  return `<li class='quiz-menu__item'><button class='quiz-menu__btn' id='${
    "btn-" + title + "-quiz"
  }'><span class='quiz-menu__img-container ${
    title.toLowerCase() + "-icon"
  }'><img src='${imageSrc}'></span><span>${title}</span></button></li>`;
}

export default QuizMenuItem;
