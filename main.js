import QuizMenu from "./components/QuizMenu";
import ProgressBar from "./components/ProgressBar";
import ColorModeSwitch from "./components/ColorModeSwitch";
import AnswersMenu from "./components/AnswersMenu";
import QuizScore from "./components/QuizScore";
import Button from "./components/Button";
import QuizTopic from "./components/QuizTopic";
import QuizResult from "./components/QuizResult";

import data from "./data/data.json";

import "./style.css";

const app = document.querySelector("#app");
const htmlFirstQuestion = data.quizzes[0].questions[0];

app.appendChild(ColorModeSwitch(false));
app.appendChild(QuizMenu());
app.appendChild(ProgressBar(50));
app.appendChild(AnswersMenu(htmlFirstQuestion));
app.appendChild(QuizScore(4));
app.appendChild(Button("Submit Answer"));
app.appendChild(QuizTopic(data.quizzes[0].title, data.quizzes[0].icon));
app.appendChild(QuizTopic(data.quizzes[1].title, data.quizzes[1].icon));
app.appendChild(QuizTopic(data.quizzes[2].title, data.quizzes[2].icon));
app.appendChild(QuizTopic(data.quizzes[3].title, data.quizzes[3].icon));
app.appendChild(QuizResult(data.quizzes[0], 7, 10));
app.appendChild(QuizResult(data.quizzes[3], 9, 10));

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
no;
