import { mapNumberToAnswerOption } from "../utils/answerOptions";
import "./AnswerMenuItem.css";

function AnswerMenuItem(optionNumber, answer) {
  const optionLetter = mapNumberToAnswerOption(optionNumber);

  const li = document.createElement("li");
  li.className = "answer";

  const radioButton = document.createElement("input");
  radioButton.type = "radio";
  radioButton.name = "answer-options";
  radioButton.id = `answer__radio--option-${optionLetter}`;
  radioButton.className = "answer__radio";

  const label = document.createElement("label");
  label.className = "answer__label";
  label.htmlFor = radioButton.id;

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

  label.appendChild(optionContainer);
  label.appendChild(span);
  label.appendChild(iconContainer);

  li.appendChild(radioButton);
  li.appendChild(label);

  return li;
}

export default AnswerMenuItem;
