import { cyberLessonData } from "./cyberLessonData";
import { bureautiqueLessonData } from "./bureautiqueLessonData";
import { emailLessonData } from "./emailLessonData";

export const lessonsByTheme = {
  passwords: cyberLessonData,
  word: bureautiqueLessonData,
  phishing: emailLessonData,
} as const;
