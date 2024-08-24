import AnswerMenuItem from "./AnswerMenuItem";
import "./AnswersMenu.css";

function AnswersMenu(question) {
  const ul = document.createElement("ul");
  ul.className = "answers-menu";

  question.options.forEach((option, index) => {
    const menuItem = AnswerMenuItem(index, option);
    ul.appendChild(menuItem);
  });

  return ul;
}

export default AnswersMenu;
