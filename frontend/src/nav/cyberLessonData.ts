export const cyberLessonData = {
  lessons: [
    {
      id: "1",
      title: "Créer un mot de passe sécurisé",
      content: `
Un mot de passe sécurisé est essentiel pour protéger vos comptes numériques.

Pourquoi est-ce important ?
- Empêcher le vol de données personnelles
- Éviter l’usurpation d’identité
- Protéger vos e-mails, réseaux sociaux et comptes bancaires

Selon les recommandations de la CNIL, un bon mot de passe doit :
- Contenir au minimum 12 caractères
- Être unique pour chaque service
- Ne pas contenir d’informations personnelles (nom, date de naissance, prénom des enfants, etc.)

Astuce simple :
Préférez une phrase facile à retenir plutôt qu’un mot compliqué.

Exemple :
MonChatAdoreLesCoussins!2024
`,
    },

    {
      id: "2",
      title: "Recommandations de la CNIL",
      content: `
La CNIL (Commission Nationale de l’Informatique et des Libertés) donne des règles simples pour sécuriser ses mots de passe.

Ce qu’il faut faire :
- Utiliser des mots de passe différents pour chaque site
- Changer son mot de passe en cas de doute ou de fuite de données
- Utiliser un gestionnaire de mots de passe si possible

Ce qu’il faut éviter :
- Utiliser le même mot de passe partout
- Écrire ses mots de passe sur un papier visible
- Utiliser des mots simples comme "123456", "password" ou "azerty"

Rappel important :
Même un mot de passe long devient inutile s’il est réutilisé sur plusieurs sites.
`,
    },

    {
      id: "3",
      title: "L’authentification à deux facteurs (2FA)",
      content: `
L’authentification à deux facteurs, aussi appelée 2FA, ajoute une couche de sécurité supplémentaire.

Comment ça fonctionne ?
Pour se connecter, il faut :
- Quelque chose que vous connaissez (mot de passe)
- Quelque chose que vous possédez (téléphone, application, SMS)

Exemples de 2FA :
- Code reçu par SMS
- Application d’authentification (Google Authenticator, Microsoft Authenticator…)
- Validation via une notification sur votre téléphone

Pourquoi c’est important ?
Même si un mot de passe est volé, un pirate ne pourra pas se connecter sans le second facteur.

Conseil :
Activez le 2FA dès que c’est possible, surtout pour les e-mails et comptes importants.
`,
    },

    {
      id: "4",
      title: "Utiliser un gestionnaire de mots de passe",
      content: `
Un gestionnaire de mots de passe est un outil qui stocke et protège vos mots de passe.

À quoi ça sert ?
- Générer des mots de passe forts automatiquement
- Les mémoriser à votre place
- Éviter la réutilisation des mêmes mots de passe

Exemples de gestionnaires fiables :
- Bitwarden
- Dashlane
- 1Password

Comment ça marche ?
Vous n’avez plus qu’un seul mot de passe à retenir : le mot de passe principal.

Important :
Ce mot de passe principal doit être très fort et unique.
`,
    },

    {
      id: "5",
      title: "Les erreurs courantes à éviter",
      content: `
Certaines habitudes rendent vos comptes vulnérables sans que vous vous en rendiez compte.

Erreurs fréquentes :
- Partager son mot de passe avec quelqu’un
- Utiliser le même mot de passe au travail et à la maison
- Cliquer sur des liens suspects et entrer son mot de passe

Attention au phishing :
Des faux e-mails ou messages peuvent imiter des sites officiels pour voler vos identifiants.

Règle d’or :
Aucun service sérieux ne vous demandera votre mot de passe par e-mail ou téléphone.
`,
    },
  ],
  end: {
    redirectTo: "/modules/cybersecurite/passwords/quiz",
  },
} as const;
