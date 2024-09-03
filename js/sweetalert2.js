import Swal from "sweetalert2";
import { startQuiz } from "./quiz";
import { state } from "../state/quizState";

export function showDifficultyMenu(quizName) {
  Swal.fire({
    title: "¡Elige tu desafío!",
    text: "¿Quieres empezar con algo básico o te atreves a probar el nivel avanzado?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Básico",
    cancelButtonText: "Avanzado",
    reverseButtons: false,
    iconColor: "#a729f5",
    scrollbarPadding: false,
    heightAuto: false,
    customClass: {
      popup: "swal2-wide",
      confirmButton: "btn btn-primary",
      cancelButton: "btn btn-warning",
    },
    buttonsStyling: true,
  }).then((result) => {
    if (result.isConfirmed) {
      state.quizDifficulty = "begginer";
      startQuiz(quizName);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      state.quizDifficulty = "advanced";
      startQuiz(quizName);
    }
  });
}
