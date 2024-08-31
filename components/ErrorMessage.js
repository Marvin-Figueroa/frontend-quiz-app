import "./ErrorMessage.css";

function ErrorMessage(message) {
  const errorContainer = document.createElement("div");
  errorContainer.className = "error-message";

  const errorIcon = document.createElement("img");
  errorIcon.src = "/images/icon-incorrect.svg";
  errorIcon.alt = "Error icon";
  errorIcon.className = "error-icon";

  const errorText = document.createElement("span");
  errorText.className = "error-text";
  errorText.textContent = message;

  errorContainer.appendChild(errorIcon);
  errorContainer.appendChild(errorText);

  return errorContainer;
}

export default ErrorMessage;
