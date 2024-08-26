// components/Button.js

// Componente reutilizable para el botón
function Button(text) {
    const button = document.createElement("button");
    button.className = "btn";
    button.textContent = text;

    // Retorna el elemento del botón
    return button;
}

export default Button;
