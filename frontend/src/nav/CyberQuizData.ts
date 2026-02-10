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
    question: "Quel mot de passe respecte le mieux les recommandations de la CNIL ?",
    options: [
      "MotDePasse123",
      "Jean1998!",
      "MonChatAdoreLesCoussins!2024",
      "azertyuiop",
    ],
    correctIndex: 2,
    explanation:
      "La CNIL recommande un mot de passe long, unique et sans informations personnelles. Une phrase avec des caractères spéciaux est plus sûre.",
  },

  {
    id: "q2",
    question: "Pourquoi utiliser un mot de passe différent pour chaque site ?",
    options: [
      "Pour éviter de les confondre",
      "Parce que les sites l’exigent tous",
      "Pour limiter les dégâts si un site est piraté",
      "Pour améliorer la vitesse de connexion",
    ],
    correctIndex: 2,
    explanation:
      "Si un mot de passe est réutilisé et qu’un site est piraté, un attaquant peut accéder à plusieurs comptes.",
  },

  {
    id: "q3",
    question: "Dans quel cas la double authentification (2FA) est-elle la plus utile ?",
    options: [
      "Quand le mot de passe est très long",
      "Quand on se connecte depuis un ordinateur personnel",
      "Quand un mot de passe est compromis",
      "Quand on change souvent d’adresse e-mail",
    ],
    correctIndex: 2,
    explanation:
      "La 2FA protège le compte même si le mot de passe est volé, car une seconde preuve est nécessaire.",
  },

  {
    id: "q4",
    question: "Quel est l’avantage principal d’un gestionnaire de mots de passe ?",
    options: [
      "Il empêche complètement le piratage",
      "Il mémorise et génère des mots de passe forts et uniques",
      "Il remplace l’authentification à deux facteurs",
      "Il supprime le besoin de mot de passe",
    ],
    correctIndex: 1,
    explanation:
      "Un gestionnaire de mots de passe permet de créer et stocker des mots de passe complexes sans avoir à les retenir.",
  },

  {
    id: "q5",
    question: "Quel comportement est le PLUS risqué pour la sécurité de tes comptes ?",
    options: [
      "Utiliser un gestionnaire de mots de passe",
      "Activer la double authentification",
      "Cliquer sur un lien et saisir son mot de passe sans vérifier le site",
      "Utiliser une phrase longue comme mot de passe",
    ],
    correctIndex: 2,
    explanation:
      "Le phishing consiste à piéger l’utilisateur pour qu’il saisisse son mot de passe sur un faux site, même avec un bon mot de passe.",
  },
];
