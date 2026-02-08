export type ModuleItem = {
  id: string;
  title: string;
  icon: string;
  route: string;
  enabled: boolean;
};

export const modulesData: ModuleItem[] = [
  { id: "bureautique", title: "Bureautique", icon: "monitor", route: "/modules/bureautique", enabled: false },
  { id: "email", title: "Mails", icon: "mail", route: "/modules/email", enabled: false },
  { id: "cybersecurite", title: "Cybersécurité", icon: "lock", route: "/modules/cybersecurite", enabled: true },
];
