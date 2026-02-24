import type { LessonData } from "../types/lesson";

export const emailLessonData: LessonData = {
  lessons: [
    {
      id: "1",
      title: "C’est quoi un e-mail dangereux ?", // Titre en bleu foncé (#1a237e)
      content: `
**Un e-mail peut être un piège** si :
<span style="color: #c62828;">❌ Il demande vos **identifiants** (mot de passe, numéro de carte bancaire).</span>
<span style="color: #c62828;">❌ Il contient des **liens ou pièces jointes suspects** (ex: "facture_urgente.exe").</span>
<span style="color: #c62828;">❌ Il vient d’un expéditeur **inconnu ou imité** (ex: "service@amazon-security.com" au lieu de "@amazon.fr").</span>

**Exemple de phishing :** <!-- Fond jaune clair (#fff9c4) -->
*"Votre compte a été piraté ! Cliquez ici pour le sécuriser : [lien louche]."*
→ **Ne cliquez jamais** sur ce genre de lien !
      `,
    },

    {
      id: "2",
      title: "Comment repérer un faux e-mail ?", // Titre en bleu foncé (#1a237e)
      content: `
**Les 4 signes qui doivent vous alerter :**
1. **Expéditeur bizarre** : Une adresse e-mail qui imite mal une marque (ex: "support@paypa1.com" "1" au lieu de "L").
2. **Fautes d’orthographe** : Les faut e-mail comporte souvent plusieurs fautes d'othographe.
3. **Urgence ou menace** : "Votre compte sera bloqué dans 24h !"
4. **Pièce jointe inattendue** : "Votre facture.pdf" alors que vous n’avez rien commandé.

**À faire :** <!-- En vert (#2e7d32) -->
✔ **Survolez le lien** (sans cliquer) pour voir l’URL réelle.
✔ **Vérifiez l’adresse e-mail** de l’expéditeur.
✔ **Contactez le service** via leur site officiel si vous avez un doute.
      `,
    },

    {
      id: "3",
      title: "Les arnaques les plus courantes", // Titre en bleu foncé (#1a237e)
      content: `
**1. Faux e-mails de banque ou de services** <!-- En rouge (#c62828) -->
→ "Votre compte a été suspendu, connectez-vous ici."

**2. Offres trop belles** <!-- En rouge (#c62828) -->
→ "Vous avez gagné un iPhone ! Cliquez ici pour le réclamer."

**3. Faux messages de collègues** <!-- En rouge (#c62828) -->
→ "Urgent : peux-tu m’acheter des cartes cadeaux ?".

**Règle d’or :** <!-- En gras et vert (#2e7d32) -->
*Si c’est trop beau ou trop urgent pour être vrai… c’est probablement une arnaque !*
      `,
    },

    {
      id: "4",
      title: "Que faire si vous avez cliqué ?", // Titre en bleu foncé (#1a237e)
      content: `
**Ne paniquez pas, agissez vite :**
<span style="color: #2e7d32;">✔ **Ne saisissez aucun mot de passe** si le site semble faux.</span>
<span style="color: #2e7d32;">✔ **Analysez votre ordinateur** avec un antivirus.</span>
<span style="color: #2e7d32;">✔ **Changez vos mots de passe** si vous les avez entrés.</span>
<span style="color: #2e7d32;">✔ **Signalez le message** comme phishing (bouton "Signaler" dans Gmail/Outlook).</span>

**Si vous avez donné des infos bancaires :** <!-- En orange (#ff8f00) -->
→ Contactez **immédiatement** votre banque pour bloquer les transactions.
      `,
    },

    {
      id: "5",
      title: "Les bonnes habitudes à prendre", // Titre en bleu foncé (#1a237e)
      content: `
**Pour éviter les problèmes :**
✔ **Activez la double authentification (2FA)** sur vos comptes importants.
✔ **Utilisez un e-mail dédié** pour les newsletters/inscriptions.
✔ **Mettez à jour** votre antivirus et votre navigateur.
✔ **Méfiez-vous des e-mails inattendus**, même de contacts connus (leurs comptes peuvent être piratés).

**Outils utiles :** <!-- Fond gris clair (#eeeeee) -->
- [Signal Spam](https://www.signal-spam.fr/) (pour signaler les arnaques en France).
- [Phishing Initiative](https://www.phishing-initiative.fr/) (liste des sites frauduleux).
      `,
    },
  ],
  end: {
    redirectTo: "/modules/email/phishing/quiz",,
  },
} as const;
