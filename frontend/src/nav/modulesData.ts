export type ModuleItem = {
  id: string;
  title: string;
  icon: string;     
  route: string;
};

export const modulesData: ModuleItem[] = [
  { id: "1", title: "Bureautique", icon: "monitor", route: "/modules/bureautique" },
  { id: "2", title: "Mails", icon: "mail", route: "/modules/email" },
  { id: "3", title: "Cybersécurité", icon: "lock", route: "/modules/cybersecurite" },
];
