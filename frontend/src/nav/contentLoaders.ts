import type { LessonData } from "../types/lesson";
import type { QuizData } from "../types/quiz";

import { cyberLessonData } from "./cyberLessonData";
import { bureautiqueLessonData } from "./bureautiqueLessonData";
import { emailLessonData } from "./emailLessonData";

import { cyberQuizData } from "./CyberQuizData";
import { bureautiqueQuizData } from "./bureautiqueQuizData";
import { emailQuizData } from "./EmailQuizData";

export function getLessonDataByThemeSlug(slug: string): LessonData | null {
  switch (slug) {
    case "passwords":
      return cyberLessonData;
    case "bases":
      return bureautiqueLessonData;
    case "phishing":
      return emailLessonData;
    default:
      return null;
  }
}

export function getQuizDataByThemeSlug(slug: string): QuizData | null {
  switch (slug) {
    case "passwords":
      return cyberQuizData;
    case "bases":
      return bureautiqueQuizData;
    case "phishing":
      return emailQuizData;
    default:
      return null;
  }
}