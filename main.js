import QuizMenu from "./components/QuizMenu";
import ProgressBar from "./components/ProgressBar";
import ColorModeSwitch from "./components/ColorModeSwitch";
import AnswersMenu from "./components/AnswersMenu";
import QuizScore from "./components/QuizScore";

import data from "./data/data.json";

import "./style.css";

const app = document.querySelector("#app");
const htmlFirstQuestion = data.quizzes[0].questions[0];

app.appendChild(ColorModeSwitch(false));
app.appendChild(QuizMenu());
app.appendChild(ProgressBar(50));
app.appendChild(AnswersMenu(htmlFirstQuestion));
app.appendChild(QuizScore(4));

// El siguiente codigo es solo para evidenciar los diferentes estados de cada
// elemento de respuesta (hover, focus, eleccion correcta, eleccion incorrecta).
// Ignorar la transicion brusca en el estado focus (de purpura a rojo o verde).

const answers = document.querySelectorAll(".answer");

answers.forEach((answer, index) =>
  answer.addEventListener("click", (e) => {
    if (index === 0) {
      e.target.closest("button").querySelector(".answer__icon").src =
        "/images/icon-correct.svg";

      e.target.closest("button").classList.add("correct");
    }
    if (index === 1) {
      e.target.closest("button").querySelector(".answer__icon").src =
        "/images/icon-incorrect.svg";

      e.target.closest("button").classList.add("incorrect");
    }
  })
);
