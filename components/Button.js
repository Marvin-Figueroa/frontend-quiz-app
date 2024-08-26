import "./Button.css";

function Button(text) {
  const button = document.createElement("button");
  button.id = `btn-${text.toLowerCase().split(" ").join("-")}`;
  button.className = "btn";
  button.textContent = text;

  return button;
}

export default Button;
