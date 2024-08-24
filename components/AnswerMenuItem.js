import { mapNumberToAnswerOption } from "../utils/answerOptions";
import "./AnswerMenuItem.css";

function AnswerMenuItem(optionNumber, answer) {
  const optionLetter = mapNumberToAnswerOption(optionNumber);

  const li = document.createElement("li");
  li.className = "answer";

  const button = document.createElement("button");
  button.className = "answer__btn";
  button.id = `answer__btn--option-${optionLetter}`;

  const optionContainer = document.createElement("span");
  optionContainer.className = `answer__option-letter`;
  optionContainer.textContent = `${optionLetter.toUpperCase()}`;

  const span = document.createElement("span");
  span.className = "answer__option-text";
  span.textContent = answer;

  const iconContainer = document.createElement("span");
  iconContainer.className = "answer__icon-container";

  const icon = document.createElement("img");
  icon.className = "answer__icon";

  iconContainer.appendChild(icon);

  button.appendChild(optionContainer);
  button.appendChild(span);
  button.appendChild(iconContainer);

  li.appendChild(button);

  return li;
}

export default AnswerMenuItem;
