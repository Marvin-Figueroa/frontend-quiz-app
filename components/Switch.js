import "./Switch.css";

function Switch() {
  const label = document.createElement("label");
  label.className = "switch";

  const input = document.createElement("input");
  input.type = "checkbox";

  const span = document.createElement("span");
  span.className = "slider round";

  label.appendChild(input);
  label.appendChild(span);

  return label;
}

export default Switch;
