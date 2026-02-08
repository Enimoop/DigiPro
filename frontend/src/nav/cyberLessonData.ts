export const cyberLessonData = {
  lessons: [
    {
      id: "1",
      title: "Créer un mot de passe sécurisé",
      content: `
Un mot de passe sécurisé est essentiel pour protéger vos comptes numériques.

Pourquoi est-ce important ?
- Empêcher le vol de données personnelles
- Éviter l’usurpation d’identité
- Protéger vos e-mails et comptes bancaires

Un bon mot de passe doit :
- Contenir au moins 12 caractères
- Mélanger lettres, chiffres et caractères spéciaux
- Être différent pour chaque service

Exemple :
MonChatAdoreLesCoussins!2024
`,
    },
    {
      id: "2",
      title: "Bonnes pratiques",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "3",
      title: "Outils recommandés",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ],
  end: {
    redirectTo: "/modules/cybersecurite/quiz",
  },
} as const;
