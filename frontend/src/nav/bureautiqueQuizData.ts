import type { QuizData } from "../types/quiz";

export const bureautiqueQuizData: QuizData = {
  questions: [
    {
      id: "q1",
      question: "À quoi sert une extension de fichier ?",
      options: [
        "À décorer le nom du fichier",
        "À indiquer à l’ordinateur avec quel logiciel l’ouvrir",
        "À protéger automatiquement le fichier",
        "À augmenter la taille du fichier",
      ],
      correctIndex: 1,
      explanation:
        "L’extension permet à l’ordinateur de savoir quel programme utiliser pour ouvrir le fichier (.docx → Word, .jpg → visionneuse d’images).",
    },

    {
      id: "q2",
      question: "Quel fichier est potentiellement dangereux ?",
      options: [
        "vacances.jpg",
        "rapport.docx",
        "document.pdf.exe",
        "tableau.xlsx",
      ],
      correctIndex: 2,
      explanation:
        "Un fichier qui se termine par .exe est un programme. Il peut être dangereux s’il vient d’une source inconnue.",
    },

    {
      id: "q3",
      question: "Quel type de fichier correspond à un tableau ?",
      options: [
        ".mp3",
        ".xlsx",
        ".jpg",
        ".mp4",
      ],
      correctIndex: 1,
      explanation:
        ".xlsx est un fichier Excel utilisé pour créer et modifier des tableaux.",
    },

    {
      id: "q4",
      question: "Pourquoi est-il dangereux de renommer Chat.jpg en Chat.mp3 ?",
      options: [
        "Parce que le fichier devient une musique",
        "Parce que cela change vraiment son contenu",
        "Parce que cela ne change pas son type réel et peut tromper l’utilisateur",
        "Parce que Windows supprime le fichier",
      ],
      correctIndex: 2,
      explanation:
        "Renommer l’extension ne change pas le contenu réel du fichier. Cela peut tromper l’utilisateur et cacher un fichier dangereux.",
    },
  ],
};