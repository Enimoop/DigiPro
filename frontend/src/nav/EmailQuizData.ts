import type { QuizData } from "../types/quiz";

export const emailQuizData: QuizData = {
  questions: [
    {
      id: "q1",
      question: "Quel signe doit vous alerter dans un e-mail ?",
      options: [
        "Une signature professionnelle",
        "Une adresse comme support@paypa1.com",
        "Un logo officiel",
        "Un message poli",
      ],
      correctIndex: 1,
      explanation:
        "Les arnaqueurs imitent souvent des adresses officielles en changeant une lettre (ex: paypa1 avec un 1 au lieu de L).",
    },

    {
      id: "q2",
      question: "Que devez-vous faire si un e-mail vous demande votre mot de passe ?",
      options: [
        "Répondre immédiatement",
        "Cliquer sur le lien pour vérifier",
        "Supprimer ou signaler le message",
        "Envoyer votre mot de passe si l’e-mail semble urgent",
      ],
      correctIndex: 2,
      explanation:
        "Aucun service sérieux ne vous demandera votre mot de passe par e-mail. Il faut signaler ou supprimer le message.",
    },

    {
      id: "q3",
      question: "Quel comportement est le plus sûr face à un lien suspect ?",
      options: [
        "Cliquer rapidement pour vérifier",
        "Le transférer à tous vos contacts",
        "Survoler le lien sans cliquer pour vérifier l’adresse réelle",
        "Ignorer l’expéditeur et cliquer quand même",
      ],
      correctIndex: 2,
      explanation:
        "Survoler un lien (sans cliquer) permet de voir l’URL réelle et de détecter une adresse frauduleuse.",
    },

    {
      id: "q4",
      question: "Si vous avez entré votre mot de passe sur un faux site, que devez-vous faire ?",
      options: [
        "Ne rien faire",
        "Attendre de voir si quelque chose se passe",
        "Changer immédiatement votre mot de passe",
        "Redémarrer simplement l’ordinateur",
      ],
      correctIndex: 2,
      explanation:
        "Il faut changer immédiatement votre mot de passe et sécuriser vos comptes si vous l’avez saisi sur un site frauduleux.",
    },

    {
      id: "q5",
      question: "Quelle est la règle d’or face aux arnaques par e-mail ?",
      options: [
        "Toujours répondre rapidement",
        "Si c’est urgent, c’est forcément vrai",
        "Si c’est trop beau ou trop urgent, c’est probablement une arnaque",
        "Les e-mails avec logo officiel sont toujours fiables",
      ],
      correctIndex: 2,
      explanation:
        "Les arnaques jouent souvent sur l’urgence ou des offres trop belles pour être vraies.",
    },
  ],
};