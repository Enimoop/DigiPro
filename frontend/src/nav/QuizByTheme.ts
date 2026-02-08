import { cyberQuizData } from "./CyberQuizData";
import { emailQuizData } from "./EmailQuizData";
import { bureautiqueQuizData } from "./bureautiqueQuizData";

export const quizByTheme = {
  passwords: cyberQuizData,
  phishing: emailQuizData,
  bases: bureautiqueQuizData,
} as const;
