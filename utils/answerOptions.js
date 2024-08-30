export function mapNumberToAnswerOption(number) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet[number];
}

export function mapAnswerOptionToNumber(answerOption) {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  return alphabet.indexOf(answerOption.toLowerCase());
}
