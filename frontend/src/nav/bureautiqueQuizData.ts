export type bureautiqueQuestion = {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export const bureautiqueQuizData: bureautiqueQuestion[] = [
  {
    id: "q1",
    question: "Quel mot de passe est le plus sécurisé ?",
    options: [
      "bonjour123",
      "azerty",
      "MonChatAdoreLesCoussins!2024",
      "123456",
    ],
    correctIndex: 2,
    explanation:
      "Un mot de passe sécurisé est long, unique et mélange lettres, chiffres et caractères spéciaux.",
  },

];
