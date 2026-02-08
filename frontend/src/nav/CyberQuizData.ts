export type QuizQuestion = {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctIndex: 0 | 1 | 2 | 3;
  explanation: string;
};

export const cyberQuizData: QuizQuestion[] = [
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
  {
    id: "q2",
    question: "Pourquoi faut-il éviter de réutiliser le même mot de passe ?",
    options: [
      "Parce que c’est interdit",
      "Parce que c’est plus long à taper",
      "Parce que si un site est piraté, les autres comptes sont aussi en danger",
      "Parce que ça casse Internet",
    ],
    correctIndex: 2,
    explanation:
      "Si un site fuit ton mot de passe, un pirate peut tenter le même sur tes autres comptes.",
  },
  {
    id: "q3",
    question: "À quoi sert la double authentification (2FA) ?",
    options: [
      "À rendre le mot de passe plus court",
      "À ajouter une vérification supplémentaire lors de la connexion",
      "À supprimer les virus automatiquement",
      "À changer ton adresse e-mail",
    ],
    correctIndex: 1,
    explanation:
      "La 2FA demande une preuve en plus (code SMS/app) : même si le mot de passe est volé, le compte reste protégé.",
  },
];
