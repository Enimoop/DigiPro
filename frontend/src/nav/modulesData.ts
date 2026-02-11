export type ModuleItem = {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  enabled: boolean;
};

export const modulesData: ModuleItem[] = [
  { id: "bureautique", title: "Bureautique", icon: "monitor", description: "Maîtriser les outils de bureautique", route: "/modules/bureautique", enabled: false },
  { id: "email", title: "Mails", icon: "mail", description: "Apprendre à utiliser les outils de messagerie", route: "/modules/email", enabled: false },
  { id: "cybersecurite", title: "Cybersécurité", icon: "lock", description: "Comprendre les bases de la cybersécurité", route: "/modules/cybersecurite", enabled: true },
];
