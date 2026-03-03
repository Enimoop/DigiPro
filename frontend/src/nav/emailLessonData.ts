import type { LessonData } from "../types/lesson";

export const emailLessonData: LessonData = {
  lessons: [
    {
      id: "1",
      title: "C’est quoi un e-mail dangereux ?", // Titre en bleu foncé (#1a237e)
      content: `
<span style="color: #7C3AED;">**Un e-mail peut être un piège** si :</span>
<span style="color: #e03636;">❌ Il demande vos **identifiants**</span> (mot de passe, numéro de carte bancaire).
<span style="color: #e03636;">❌ Il contient des **liens ou pièces jointes suspects**</span> (ex: "facture_urgente.exe").
<span style="color: #e03636;">❌ Il vient d’un expéditeur **inconnu ou imité**</span> (ex: "service@amazon-security.com" au lieu de "@amazon.fr").

<span style="color: #7C3AED;">**Exemple de phishing :**</span>
*"Votre compte a été piraté ! Cliquez ici pour le sécuriser : [lien louche]."*

<div class="box-danger">
**Ne cliquez jamais** sur ce genre de lien !
</div>
      `,
    },

    {
      id: "2",
      title: "Comment repérer un faux e-mail ?", // Titre en bleu foncé (#1a237e)
      content: `
<span style="color: #7C3AED;">**Les 4 signes qui doivent vous alerter :**</span>
**- Expéditeur bizarre** : Une adresse e-mail qui imite mal une marque (ex: "support@paypa1.com" "1" au lieu de "L").
**- Fautes d’orthographe** : Les faut e-mail comporte souvent plusieurs fautes d'othographe.
**- Urgence ou menace** : "Votre compte sera bloqué dans 24h !"
**- Pièce jointe inattendue** : "Votre facture.pdf" alors que vous n’avez rien commandé.

**Ce que vous pouvez faire :**
<span style="color: #1ad927;">✔ **Survolez le lien**</span> (sans cliquer) pour voir l’URL réelle.
<span style="color: #1ad927;">✔ **Vérifiez l’adresse e-mail**</span> de l’expéditeur.
<span style="color: #1ad927;">✔ **Contactez le service**</span> via leur site officiel si vous avez un doute.
      `,
    },

    {
      id: "3",
      title: "Les arnaques les plus courantes", // Titre en bleu foncé (#1a237e)
      content: `
<span style="color: #7C3AED;">**Les mails récurrents**</span>
<div class="box-danger">
**- Faux e-mails de banque ou de services**
"Votre compte a été suspendu, connectez-vous ici."
</div>

<div class="box-danger">
**- Offres alléchantes**
"Vous avez gagné un iPhone ! Cliquez ici pour le réclamer."
</div>

<div class="box-danger">
**- Faux messages de collègues**
"Urgent : peux-tu m’acheter des cartes cadeaux ?".
</div>

<div class="box-success">
**Règle d’or :**
*Si c’est trop beau ou trop urgent pour être vrai… c’est probablement une arnaque !*
</div>
      `,
    },

    {
      id: "4",
      title: "Que faire si vous avez cliqué ?", // Titre en bleu foncé (#1a237e)
      content: `
<span style="color: #7C3AED;">**Ne paniquez pas, restez calmes :**</span>
<span style="color: #1ad927;">✔ **Ne saisissez aucun mot de passe**</span> si le site semble faux.
<span style="color: #1ad927;">✔ **Analysez votre ordinateur**</span> avec un antivirus.
<span style="color: #1ad927;">✔ **Changez vos mots de passe**</span> si vous les avez entrés.
<span style="color: #1ad927;">✔ **Signalez le message**</span> comme phishing (bouton "Signaler" dans Gmail/Outlook).
<span style="color: #1ad927;">✔ **Si vous avez donné des infos bancaires :**</span> contactez **immédiatement** votre banque pour bloquer les transactions.
      `,
    },

    {
      id: "5",
      title: "Les bonnes habitudes à prendre", // Titre en bleu foncé (#1a237e)
      content: `
<span style="color: #7C3AED;">**Pour éviter les problèmes :**</span>
<span style="color: #1ad927;">✔ **Activez la double authentification (2FA)**</span> sur vos comptes importants.
<span style="color: #1ad927;">✔ **Utilisez un e-mail dédié**</span> pour les newsletters/inscriptions.
<span style="color: #1ad927;">✔ **Mettez à jour**</span> votre antivirus et votre navigateur.
<span style="color: #1ad927;">✔ **Méfiez-vous des e-mails inattendus**</span>, même de contacts connus (leurs comptes peuvent être piratés).

<div class="box-info">
<span style="color: #7C3AED;">**Outils utiles :**</span>
- [Signal Spam](https://www.signal-spam.fr/) (pour signaler les arnaques en France).
- [Phishing Initiative](https://www.phishing-initiative.fr/) (liste des sites frauduleux).
</div>

      `,
    },
  ],
  end: {
    redirectTo: "/modules/email/phishing/quiz",
  },
} as const;
