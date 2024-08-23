import QuizMenuItem from "./QuizMenuItem";
import data from "/data/data.json";
import "./QuizMenu.css";

function QuizMenu() {
  const ul = document.createElement("ul");
  ul.className = "quiz-menu";

  data.quizzes.forEach((quiz) => {
    const menuItem = QuizMenuItem(quiz.title, quiz.icon);
    ul.appendChild(menuItem);
  });

  return ul;
}

export default QuizMenu;
