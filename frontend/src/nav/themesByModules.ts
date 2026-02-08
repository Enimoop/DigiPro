export type Theme = {
  id: string;
  title: string;
  description: string;
  route: string;
};

export const themesByModules = {
  cybersecurite: [
    {
      id: "passwords",
      title: "Mots de passe",
      description: "Créer et gérer des mots de passe sécurisés",
      route: "/modules/cybersecurite/passwords",
    }
  ],

  email: [
    {
      id: "phishing",
      title: "Bases des e-mails",
      description: "Envoyer, recevoir et organiser ses mails",
      route: "/modules/email/phishing",
    },
  ],

  bureautique: [
    {
      id: "bases",
      title: "Microsoft Word",
      description: "Créer et formater des documents",
      route: "/modules/bureautique/bases",
    },
  ]
};
