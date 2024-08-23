import QuizMenu from "./components/QuizMenu";
import ProgressBar from "./components/ProgressBar";
import "./style.css";

document
  .querySelector("#app")
  .appendChild(QuizMenu())
  .appendChild(ProgressBar(50));
