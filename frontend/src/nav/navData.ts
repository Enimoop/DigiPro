export const navData = [
   {
    id: "home",
    title: "Home",
    url: "/home",
    icon: "home",
  },
  {
    id: "modules",
    title: "Modules",
    icon: "grid",
    children: [
      { id: "cyber", title: "Cybersécurité", url: "/modules/cybersecurite", icon: "shield" },
      { id: "bureautique", title: "Bureautique", url: "/modules/bureautique", icon: "file-text" },
      { id: "email", title: "Email", url: "/modules/email", icon: "mail" },
    ],
  },
] as const;
