export interface Email {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  body: string;
  isPhishing: boolean;
  redFlags: string[];
}

export const PHISHING_EMAILS: Email[] = [
  {
    id: "1",
    from: "PayPal Support",
    fromEmail: "support@paypal-verify.com",
    subject: "🚨 URGENT: Vérifiez votre compte maintenant",
    body: "Nous avons détecté une activité suspecte sur votre compte PayPal.\n\nVeuillez cliquer ici pour vérifier votre compte: http://paypal-verify.com/confirm\n\nSi vous n'agissez pas dans les 24 heures, votre compte sera fermé définitivement.",
    isPhishing: true,
    redFlags: [
      "Le domaine ne correspond pas au domaine officiel PayPal",
      "Langage urgent et menaçant",
      "Demande de cliquer sur un lien suspect",
      "Menace de fermeture de compte"
    ]
  },
  {
    id: "2",
    from: "Amazon",
    fromEmail: "orders@amazon.com",
    subject: "Votre commande #123-456-789 a été confirmée",
    body: "Merci d'avoir commandé chez Amazon!\n\nVotre commande a été confirmée et sera expédiée prochainement.\n\nVous pouvez suivre votre commande dans votre tableau de bord Amazon.",
    isPhishing: false,
    redFlags: []
  },
  {
    id: "3",
    from: "BNP Paribas",
    fromEmail: "support@bnp-paribas-secure.info",
    subject: "Vérification de sécurité requise - Action immédiate",
    body: "Cher client BNP Paribas,\n\nPour des raisons de sécurité, veuillez confirmer vos identifiants de connexion:\n\nIdentifiant: ___________\nMot de passe: ___________\n\nVérifier maintenant: https://bit.ly/bnp-secure",
    isPhishing: true,
    redFlags: [
      "Domaine suspect (bnp-paribas-secure.info au lieu de bnpparibas.net)",
      "Demande directe d'identifiants et mot de passe",
      "URL raccourcie suspecte",
      "Langage d'urgence artificiel"
    ]
  },
  {
    id: "4",
    from: "Google",
    fromEmail: "noreply@accounts.google.com",
    subject: "Alerte de sécurité: Activité anormale détectée",
    body: "Nous avons détecté une tentative de connexion à votre compte Google depuis un nouvel appareil.\n\nSi ce n'était pas vous, sécurisez votre compte immédiatement en visitant:\nhttps://accounts.google.com/signin/security\n\nVous pouvez ignorer ce message si c'était vous qui vous connectiez.",
    isPhishing: false,
    redFlags: []
  },
  {
    id: "5",
    from: "Microsoft Security",
    fromEmail: "security-alert@microsoft-security-alert.us",
    subject: "!!!URGENT!!! VERIFIEZ VOTRE COMPTE MAINTENANT!!!",
    body: "VOTRE COMPTE MICROSOFT A ETE COMPROMISE!!!\n\nVOUS AVEZ 2 HEURES POUR AGIR!!!\n\nCLIQUEZ ICI: https://bit.ly/msft-verify\n\nVOTRE COMPTE SERA FERME A TOUT JAMAIS SI VOUS NE REPONDEZ PAS!!!",
    isPhishing: true,
    redFlags: [
      "Texte entièrement en majuscules (urgence artificielle)",
      "Domaine non-officiel (microsoft-security-alert.us)",
      "URL raccourcie suspecte",
      "Menaces extrêmes et pression psychologique"
    ]
  },
  {
    id: "6",
    from: "Spotify",
    fromEmail: "no-reply@spotify.com",
    subject: "Mise à jour du mode de paiement requise",
    body: "Bonjour,\n\nVotre abonnement Spotify expire bientôt car votre mode de paiement est expiré.\n\nVeuillez mettre à jour votre mode de paiement dans les paramètres de votre compte Spotify:\nhttps://www.spotify.com/account\n\nCordialement,\nL'équipe Spotify",
    isPhishing: false,
    redFlags: []
  }
];
