import QuizMenuItem from "./QuizMenuItem";
import data from "/data/data.json";
import "./QuizMenu.css";

const menuItemsHTML = data.quizzes.map((quiz) =>
  QuizMenuItem(quiz.title, quiz.icon)
);

function QuizMenu() {
  return `<ul class='quiz-menu'>${menuItemsHTML.join("")}</ul>`;
}

export default QuizMenu;
