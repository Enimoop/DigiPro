import type { LessonData } from "../types/lesson";

export const emailLessonData: LessonData = {
  lessons: [
    {
      id: "1",
      title: "test email",
      content: `
email 
`,
    },
    {
      id: "2",
      title: "email basics",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: "3",
      title: "email security",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ],
  end: {
    redirectTo: "/modules/email/phishing/quiz",
  },
} as const;
