import QuizMenu from "./components/QuizMenu";
import ProgressBar from "./components/ProgressBar";
import "./style.css";
import ColorModeSwitch from "./components/ColorModeSwitch";

const app = document.querySelector("#app");

app.appendChild(ColorModeSwitch(false));
app.appendChild(QuizMenu());
app.appendChild(ProgressBar(50));
