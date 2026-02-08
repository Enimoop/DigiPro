export type ModuleItem = {
  id: string;
  title: string;
  icon: string;     
  route: string;
};

export const modulesData: ModuleItem[] = [
  { id: "bureautique", title: "Bureautique", icon: "monitor", route: "/modules/bureautique" },
  { id: "email", title: "Mails", icon: "mail", route: "/modules/email" },
  { id: "cybersecurite", title: "Cybersécurité", icon: "lock", route: "/modules/cybersecurite" },
];
