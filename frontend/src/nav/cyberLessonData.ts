import type { LessonData } from "../types/lesson";

export const cyberLessonData : LessonData = {
  lessons: [
    {
      id: "1",
      title: "Comment créer un bon mot de passe ?", // Titre en bleu foncé (#1a237e)
      content: `
<span style="color: #7C3AED;">**Pourquoi c’est important ?**</span>

Un mot de passe solide protège vos comptes (e-mails, réseaux sociaux, banque) contre les pirates.

**Les 3 règles de base (selon la CNIL) :**

- <span style="color: #1ad927;">✅ **Long et unique**</span> : Au moins 12 caractères, différent pour chaque site.

- <span style="color: #1ad927;">✅ **Pas d’informations personnelles**</span> : Évitez votre nom, date de naissance ou toute information pouvant se rapporter à des proches.

- <span style="color: #1ad927;">✅ **Facile à retenir**</span> : Utilisez une phrase simple avec des majuscules et des symboles.

<div class="box-info">
"J’adoreLesPizzasDuVendredi!2024" est un bon exemple de mot de passe. Long, pas d'informations personnelles et facile à retenir.
</div>

      `,
    },

    {
      id: "2",
      title: "Les conseils de la CNIL", // Titre en bleu foncé (#1a237e)
      content: `
<span style="color: #7C3AED;">**À faire :**</span>
<span style="color: #1ad927;">✔ Un mot de passe différent par site.</span>
<span style="color: #1ad927;">✔ Le changer si vous pensez qu’il a été volé.</span>
<span style="color: #1ad927;">✔ Utiliser un **gestionnaire de mots de passe** (comme un coffre-fort numérique).</span>

<span style="color: #e03636;">**À éviter :**</span>
<span style="color: #e03636;">❌ Le même mot de passe partout.</span>
<span style="color: #e03636;">❌ Des mots trop simples</span> comme "123456" ou "motdepasse".
<span style="color: #e03636;">❌ L'écrire sur un post-it</span> ou autre support visible de tous.

<div class="box-danger">
Un mot de passe long mais réutilisé est **aussi dangereux** qu’un mot de passe faible !
</div>
      `,
    },

    {
      id: "3",
      title: "La double vérification (2FA)", // Titre en bleu foncé (#1a237e)
      content: `
<span style="color: #7C3AED;">**C’est quoi ?**</span>
Une sécurité en plus : même si un pirate devine votre mot de passe, il lui manquera un **second code** (envoyé sur votre téléphone).

<span style="color: #7C3AED;">**Comment ça marche ?**</span>
- Vous entrez votre mot de passe.
- Le site vous demande un **code supplémentaire** (par SMS, application, ou notification).

<span style="color: #7C3AED;">**Pourquoi l’activer ?**</span>
- Protège contre 99% des tentatives de piratage.
- Indispensable pour les e-mails et comptes bancaires.

<div class="box-info">
**Exemples d’applications :** Google Authenticator, Microsoft Authenticator.
</div> 
      `,
    },

    {
      id: "4",
      title: "Le gestionnaire de mots de passe", // Titre en bleu foncé (#1a237e)
      content: `
<span style="color: #7C3AED;">**À quoi ça sert ?**</span>
C’est comme un **coffre-fort numérique** qui :
<span style="color: #1ad927;">✔ Crée des mots de passe ultra-sécurisés à votre place.</span>
<span style="color: #1ad927;">✔ Les mémorise pour vous.</span>
<span style="color: #1ad927;">✔ Vous évite de tous les retenir.</span>

<span style="color: #7C3AED;">**Comment ça marche ?**</span>
Vous n’avez plus qu’**un seul mot de passe à retenir** : celui du gestionnaire !

<div class="box-danger">
**⚠️ Important :** Ce mot de passe principal doit être **le plus solide possible** !
</div>

<div class="box-info">
**Les plus connus :** Bitwarden, Dashlane, 1Password.
</div>
      `,
    },

    {
      id: "5",
      title: "Les pièges à éviter", // Titre en bleu foncé (#1a237e)
      content: `
<span style="color: #7C3AED;">**Erreurs fréquentes :**</span>
<span style="color: #e03636;">❌ **Partager son mot de passe**</span> (même avec un proche).
<span style="color: #e03636;">❌ **Réutiliser le même mot de passe**</span> (sur plusieurs sites différents).
<span style="color: #e03636;">❌ **Attention au Phishing**</span> (liens suspects, faux e-mails de banque, réseaux sociaux…).

<div class="box-success">
**Règle d’or :** *Aucun service sérieux ne vous demandera votre mot de passe par e-mail ou téléphone.*
</div>

Exemple :

\`Phishing = Hameçonnage\`
      `,
    },
  ],
  end: {
    redirectTo: "/modules/cybersecurite/passwords/quiz",
  },
} as const;
