import "./Switch.css";

function Switch() {
  const toggleSwitch = document.createElement("div");
  toggleSwitch.className = "toggle-switch";

  const toggleInput = document.createElement("input");
  toggleInput.className = "toggle-input";
  toggleInput.id = "toggle";
  toggleInput.type = "checkbox";

  const toggleLabel = document.createElement("label");
  toggleLabel.className = "toggle-label";
  toggleLabel.setAttribute("for", "toggle");

  toggleSwitch.appendChild(toggleInput);
  toggleSwitch.appendChild(toggleLabel);

  return toggleSwitch;
}

export default Switch;
