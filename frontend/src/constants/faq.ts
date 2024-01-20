export type FaqItem = {
  section: string;
  question: string;
  answer: string;
};

export const faqItems: FaqItem[] = [
  {
    section: "compteUtilisateur",
    question: "Comment puis-je créer un compte ?",
    answer:
      "Pour créer un compte, cliquez sur le bouton 'Nous rejoindre' haut de la page, et remplissez le formulaire.",
  },
  {
    section: "compteUtilisateur",
    question: "Que faire si j'oublie mon de passe ?",
    answer:
      "Si vous oubliez votre mot de passe, cliquez sur le lien 'mot de passe oublié ?' sur la page de connexion et suivez les instruction",
  },
  {
    section: "utilisationApp",
    question: "Comment puis-je ajouter un nouveau point d'intérêt ?",
    answer:
      "Pour ajouter un nouveau point d'intérêt, vous devez avoir les droits d'administrateur de ville. Si vous les avez, accédez à votre tableau de bord et sélectionnez 'Ajouter un POI'.",
  },
  {
    section: "utilisationApp",
    question: "Puis-je modifier un point d'intérêt après sa création ?",
    answer:
      "Oui, si vous êtes l'administrateur de ville ou avez reçu les droits appropriés, vous pouvez modifier un point d'intérêt en naviguant vers celui-ci dans le tableau de bord et en sélectionnant 'Modifier'.",
  },
  {
    section: "utilisationApp",
    question: "Comment puis-je payer pour un abonnement ?",
    answer:
      "Pour souscrire à un abonnement, connectez-vous à votre compte, allez dans la section abonnement et suivez les instructions pour effectuer le paiement.",
  },
  {
    section: "utilisationApp",
    question: "Puis-je consulter plus de trois points d'intérêt sans payer ?",
    answer:
      "En tant qu'utilisateur inscrit, vous pouvez consulter jusqu'à trois points d'intérêt par jour gratuitement. Au-delà, il vous faudra souscrire à un abonnement mensuel pour un accès illimité.",
  },
  {
    section: "utilisationApp",
    question: "Comment les points d'intérêt sont-ils classés sur la carte ?",
    answer:
      "Les points d'intérêt sont classés par catégorie et peuvent être filtrés selon vos préférences pour une navigation personnalisée sur la carte.",
  },
  {
    section: "utilisationApp",
    question:
      "Est-il possible d'écouter des fichiers audio pour un point d'intérêt spécifique ?",
    answer:
      "Oui, si un fichier audio est disponible pour un point d'intérêt et que vous êtes à proximité, vous aurez l'option de le lire directement depuis l'application.",
  },
  {
    section: "utilisationApp",
    question: "Comment puis-je laisser un commentaire sur un point d'intérêt ?",
    answer:
      "Pour laisser un commentaire, allez sur les détails du point d'intérêt et cliquez sur 'Ajouter un commentaire'. Vous devrez être connecté à votre compte pour commenter.",
  },
  {
    section: "utilisationApp",
    question:
      "Puis-je voir tous les points d'intérêt d'une ville sans me déplacer ?",
    answer:
      "Oui, l'application offre une vue de carte interactive où vous pouvez explorer tous les points d'intérêt d'une ville sans nécessiter de déplacement physique.",
  },
  {
    section: "utilisationApp",
    question: "Les données personnelles sont-elles sécurisées ?",
    answer:
      "Nous prenons la sécurité des données très au sérieux et utilisons des technologies de pointe pour assurer la protection de vos données personnelles.",
  },
  {
    section: "utilisationApp",
    question: "Puis-je partager un point d'intérêt avec mes amis ?",
    answer:
      "Oui, chaque point d'intérêt dispose d'une option de partage qui vous permet d'envoyer des informations par e-mail ou sur les réseaux sociaux.",
  },
  {
    section: "utilisationApp",
    question:
      "Comment puis-je signaler une erreur ou un problème avec un point d'intérêt ?",
    answer:
      "Si vous remarquez une erreur ou un problème, veuillez utiliser l'option 'Signaler un problème' sur la page de détail du point d'intérêt pour nous en informer.",
  },
  {
    section: "utilisationApp",
    question:
      "Est-il possible de télécharger les informations d'un point d'intérêt ?",
    answer:
      "Pour l'instant, les informations des points d'intérêt ne sont disponibles qu'en ligne, mais nous travaillons sur une fonctionnalité permettant leur téléchargement pour une utilisation hors ligne.",
  },
  {
    section: "utilisationApp",
    question: "L'application est-elle disponible en plusieurs langues ?",
    answer:
      "Actuellement, l'application est uniquement en français, mais nous envisageons d'ajouter d'autres langues à l'avenir.",
  },
  {
    section: "utilisationApp",
    question: "Puis-je personnaliser l'affichage de la carte ?",
    answer:
      "Oui, vous pouvez personnaliser l'affichage de la carte en choisissant différents filtres et en sélectionnant les catégories de points d'intérêt que vous souhaitez voir.",
  },
  {
    section: "utilisationApp",
    question:
      "Y a-t-il une fonction de recherche pour trouver des points d'intérêt spécifiques ?",
    answer:
      "Oui, il y a une barre de recherche qui vous permet de chercher des points d'intérêt par nom, catégorie ou adresse.",
  },
  {
    section: "utilisationApp",
    question: "Comment les notes des points d'intérêt sont-elles calculées ?",
    answer:
      "Les notes sont calculées à partir des évaluations laissées par les utilisateurs, sur une échelle de 1 à 5 étoiles.",
  },
  {
    section: "utilisationApp",
    question: "Comment fonctionne l'abonnement mensuel ?",
    answer:
      "L'abonnement mensuel vous donne un accès illimité à tous les points d'intérêt de l'application sans limite quotidienne.",
  },
  {
    section: "utilisationApp",
    question: "Est-ce que l'application fonctionne sans accès à Internet ?",
    answer:
      "Vous aurez besoin d'une connexion Internet pour accéder à la majorité des fonctionnalités, mais nous prévoyons d'ajouter un mode hors ligne pour certaines informations.",
  },
  {
    section: "utilisationApp",
    question: "Puis-je annuler mon abonnement à tout moment ?",
    answer:
      "Oui, vous pouvez annuler votre abonnement à tout moment dans les paramètres de votre compte.",
  },
  {
    section: "utilisationApp",
    question:
      "L'application est-elle accessible aux personnes à mobilité réduite ?",
    answer:
      "Nous nous efforçons de rendre l'application accessible à tous, y compris aux personnes à mobilité réduite, en fournissant des informations détaillées sur l'accessibilité des points d'intérêt.",
  },
  {
    section: "utilisationApp",
    question:
      "Comment l'application assure-t-elle la mise à jour des informations des points d'intérêt ?",
    answer:
      "Les informations sont régulièrement mises à jour par nos administrateurs de ville et grâce aux contributions de la communauté des utilisateurs.",
  },
];
