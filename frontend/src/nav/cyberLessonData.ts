import type { LessonData } from "../types/lesson";

export const cyberLessonData : LessonData = {
  lessons: [
    {
      id: "1",
      title: "Comment créer un bon mot de passe ?", // Titre en bleu foncé (#1a237e)
      content: `
**Pourquoi c’est important ?** <!-- En gras et vert (#2e7d32) -->

Un mot de passe solide protège vos comptes (e-mails, réseaux sociaux, banque) contre les pirates.

**Les 3 règles de base (selon la CNIL) :**

- <span style="color: #2e7d32;">✅ **Long et unique**</span> : Au moins 12 caractères, différent pour chaque site.

- <span style="color: #2e7d32;">✅ **Pas d’infos personnelles**</span> : Évitez votre nom, date de naissance, ou celui de vos enfants.

- <span style="color: #2e7d32;">✅ **Facile à retenir**</span> : Utilisez une phrase simple avec des majuscules et des symboles.

<div class="box-info">
Pour les infos
</div>

<div class="box-success">
pour les trucs en vert
</div>

<div class="box-danger">
pour les trucs en rouge
</div>

Exemple :

\`J’adoreLesPizzasDuVendredi!2024\`
      `,
    },

    {
      id: "2",
      title: "Les conseils de la CNIL", // Titre en bleu foncé (#1a237e)
      content: `
**À faire :** <!-- En vert (#2e7d32) -->
<span style="color: #2e7d32;">✔ Un mot de passe différent par site.</span>
<span style="color: #2e7d32;">✔ Le changer si vous pensez qu’il a été volé.</span>
<span style="color: #2e7d32;">✔ Utiliser un **gestionnaire de mots de passe** (comme un coffre-fort numérique).</span>

**À éviter :** <!-- En rouge (#c62828) -->
<span style="color: #c62828;">❌ Le même mot de passe partout.</span>
<span style="color: #c62828;">❌ L’écrire sur un post-it ou dans un fichier non protégé.</span>
<span style="color: #c62828;">❌ Des mots trop simples comme "123456" ou "motdepasse".</span>

**Attention :** <!-- En orange (#ff8f00) -->
Un mot de passe long mais réutilisé est **aussi dangereux** qu’un mot de passe faible !
      `,
    },

    {
      id: "3",
      title: "La double vérification (2FA)", // Titre en bleu foncé (#1a237e)
      content: `
**C’est quoi ?** <!-- En gras et bleu (#1565c0) -->
Une sécurité en plus : même si un pirate devine votre mot de passe, il lui manquera un **second code** (envoyé sur votre téléphone).

**Comment ça marche ?** <!-- En bleu (#1565c0) -->
1. Vous entrez votre mot de passe.
2. Le site vous demande un **code supplémentaire** (par SMS, application, ou notification).

**Pourquoi l’activer ?** <!-- En vert (#2e7d32) -->
→ Protège contre 99% des tentatives de piratage.
→ Indispensable pour les e-mails et comptes bancaires.

**Exemples d’applications :** <!-- Fond gris clair (#eeeeee) -->
Google Authenticator, Microsoft Authenticator.
      `,
    },

    {
      id: "4",
      title: "Le gestionnaire de mots de passe", // Titre en bleu foncé (#1a237e)
      content: `
**À quoi ça sert ?** <!-- En bleu (#1565c0) -->
C’est comme un **coffre-fort numérique** qui :
<span style="color: #2e7d32;">✔ Crée des mots de passe ultra-sécurisés à votre place.</span>
<span style="color: #2e7d32;">✔ Les mémorise pour vous.</span>
<span style="color: #2e7d32;">✔ Vous évite de tous les retenir.</span>

**Comment ça marche ?** <!-- En bleu (#1565c0) -->
Vous n’avez plus qu’**un seul mot de passe à retenir** : celui du gestionnaire !

**Les plus connus :** <!-- Fond gris clair (#eeeeee) -->
Bitwarden, Dashlane, 1Password.

**⚠️ Important :** <!-- En orange (#ff8f00) -->
Ce mot de passe principal doit être **le plus solide possible** !
      `,
    },

    {
      id: "5",
      title: "Les pièges à éviter", // Titre en bleu foncé (#1a237e)
      content: `
**Erreurs fréquentes :** <!-- En rouge (#c62828) -->
<span style="color: #c62828;">❌ **Partager son mot de passe** (même avec un proche).</span>
<span style="color: #c62828;">❌ **Réutiliser le même mot de passe** (travail/maison).</span>
<span style="color: #c62828;">❌ **Cliquer sur des liens suspects** (faux e-mails de banque, réseaux sociaux…).</span>

**Attention au "phishing" :** <!-- En orange (#ff8f00) -->
Des pirates envoient de **faux messages** pour voler vos identifiants.

**Règle d’or :** <!-- En gras et vert (#2e7d32) -->
*Aucun service sérieux ne vous demandera votre mot de passe par e-mail ou téléphone.*
      `,
    },
  ],
  end: {
    redirectTo: "/modules/cybersecurite/passwords/quiz",
  },
} as const;
