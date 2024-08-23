import "./ProgressBar.css";

function ProgressBar(percentage) {
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  progressBar.style.setProperty(
    "--current-progress",
    `${Math.max(100 - percentage, 0)}%`
  );

  return progressBar;
}

export default ProgressBar;
