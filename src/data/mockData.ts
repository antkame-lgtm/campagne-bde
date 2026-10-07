export interface TeamMember {
  id: string;
  name: string;
  role: string;
  filiere: string;
  bio: string;
  image: string;
}

export interface ProgramPillar {
  id: string;
  number: string;
  title: string;
  icon: string;
  summary: string;
  feasibilityTechnical: number;
  feasibilityFinancial: number;
  proposals: string[];
}

export interface StudentIdea {
  id: string;
  title: string;
  description: string;
  category: "Infrastructures" | "Pédagogie" | "Cafétéria" | "Événements" | "Vie Pratique";
  author: string;
  votes: number;
  status: "Pris en compte" | "En étude" | "Intégré au programme";
  createdAt: string;
  hasVoted?: boolean;
}

export interface PartnerOffer {
  id: string;
  name: string;
  category: "Banque" | "Sport" | "Restauration" | "High-Tech" | "Transports";
  discount: string;
  code: string;
  description: string;
  validUntil: string;
}

export interface AgendaEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "Débat" | "Rencontre" | "Animation" | "Tractage";
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

// 5 Piliers Fondamentaux
export const PILLARS = [
  {
    title: "Excellence académique",
    description: "Soutien continu à la réussite de chaque étudiant via le tutorat et les annales partagées."
  },
  {
    title: "Transparence totale",
    description: "Suivi en direct du programme, des comptes et des décisions du futur bureau."
  },
  {
    title: "Inclusion étudiante",
    description: "Prise en compte de toutes les voix, sans distinction de filière, d'année ou de campus."
  },
  {
    title: "Insertion professionnelle",
    description: "Ponts directs avec les entreprises, ateliers CV et réseau dynamique d'anciens diplômés."
  },
  {
    title: "Responsabilité RSE",
    description: "Actions concrètes pour l'écologie, le tri sélectif, le zéro plastique et la solidarité."
  }
];

// Équipe de Campagne
export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "candidate",
    name: "Léa Martin",
    role: "Candidate à la Présidence",
    filiere: "Master Management & Systèmes d'Information",
    bio: "Engagée dans la vie associative depuis 3 ans, déterminée à construire un campus plus solidaire, transparent et connecté.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "vp",
    name: "Alexandre Dupont",
    role: "Vice-Président Général",
    filiere: "Ingénierie & Génie Industriel",
    bio: "Coordinateur des projets inter-promotions et garant de la cohésion d'équipe.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "tresorier",
    name: "Camille Bernard",
    role: "Pôle Trésorerie & Partenariats",
    filiere: "Finance d'Entreprise",
    bio: "Gestion rigoureuse du budget et négociation de tarifs exclusifs auprès de nos partenaires.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "event",
    name: "Thomas Leroy",
    role: "Pôle Événementiel & Soirées",
    filiere: "Communication & Médias",
    bio: "Organisation des galas, festivals de campus, tournois e-sport et compétitions sportives.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "com",
    name: "Inès Benali",
    role: "Pôle Communication & Digital",
    filiere: "Design & Création Numérique",
    bio: "Gestion des réseaux sociaux, création des visuels et animation de la communauté WhatsApp.",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: "relations",
    name: "Julien Mercier",
    role: "Pôle SOS & Solidarité Étudiante",
    filiere: "Ressources Humaines & RSE",
    bio: "Écoute bienveillante, aide d'urgence, mentorat académique et lutte contre la précarité.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80"
  }
];

// Programme Interactif (4 Axes)
export const PROGRAM_PILLARS: ProgramPillar[] = [
  {
    id: "axe-1",
    number: "01",
    title: "Vie de Campus & Convivialité",
    icon: "Coffee",
    summary: "Réaménager les espaces de détente, multiplier les animations hebdomadaires et soutenir les clubs étudiants.",
    feasibilityTechnical: 95,
    feasibilityFinancial: 85,
    proposals: [
      "Espaces cafétéria équipés en micro-ondes et prises USB-C haut débit.",
      "Mise en place d'un 'Jeudi Campus' festif bimensuel avec crêpes et musique.",
      "Subvention directe et simplifiée pour tous les clubs étudiants déclarés.",
      "Installation de fontaines à eau filtrée réfrigérée dans tous les halls."
    ]
  },
  {
    id: "axe-2",
    number: "02",
    title: "Réussite Académique & Carrière",
    icon: "GraduationCap",
    summary: "Renforcer l'entraide pédagogique et créer des passerelles solides vers les stages et l'emploi.",
    feasibilityTechnical: 90,
    feasibilityFinancial: 90,
    proposals: [
      "Plateforme numérique de tutorat solidaire entre étudiants volontaires.",
      "Banque partagée d'annales d'examens et fiches de révision vérifiées.",
      "Forum Entreprises annuel & Sessions de simulation d'entretiens RH.",
      "Ateliers LinkedIn et relecture de CV animés par des professionnels diplômés."
    ]
  },
  {
    id: "axe-3",
    number: "03",
    title: "Culture, Sport & Loisirs",
    icon: "Trophy",
    summary: "Dynamiser le calendrier avec des événements majeurs, des sorties culturelles et des tournois sportifs.",
    feasibilityTechnical: 85,
    feasibilityFinancial: 80,
    proposals: [
      "Organisation du Grand Gala Annuel dans un lieu prestigieux à tarif étudiant.",
      "Tournoi inter-filières et Nuit de l'E-sport avec retransmission sur grand écran.",
      "Places de cinéma et de théâtre à tarif réduit négocié toute l'année.",
      "Sortie ski / weekend d'intégration accessible à toutes les bourses."
    ]
  },
  {
    id: "axe-4",
    number: "04",
    title: "RSE & Engagement Écoresponsable",
    icon: "Leaf",
    summary: "Faire de notre école un modèle de transition écologique, de solidarité active et de bien-être.",
    feasibilityTechnical: 95,
    feasibilityFinancial: 90,
    proposals: [
      "Épicerie solidaire mensuelle avec invendus pour lutter contre la précarité.",
      "Gobelets réutilisables BDE et suppression intégrale des gobelets jetables.",
      "Collecte de vêtements, fournitures et matériel informatique reconditionné.",
      "Ateliers de sensibilisation à la santé mentale et distribution de protections périodiques gratuites."
    ]
  }
];

// Boîte à idées initiale (La Voix Étudiante)
export const INITIAL_IDEAS: StudentIdea[] = [
  {
    id: "idea-1",
    title: "Ajout de micro-ondes supplémentaires au bâtiment B",
    description: "Les temps d'attente à la pause déjeuner dépassent souvent 20 minutes. Il faudrait 3 micro-ondes de plus près des tables.",
    category: "Cafétéria",
    author: "Maxime T. (Promo 2027)",
    votes: 142,
    status: "Intégré au programme",
    createdAt: "Il y a 2 jours"
  },
  {
    id: "idea-2",
    title: "Ouverture de la bibliothèque le samedi après-midi",
    description: "Pendant les périodes de partiels, beaucoup d'entre nous n'ont pas un environnement calme pour réviser chez eux le weekend.",
    category: "Pédagogie",
    author: "Sarah L. (Promo 2026)",
    votes: 98,
    status: "En étude",
    createdAt: "Il y a 3 jours"
  },
  {
    id: "idea-3",
    title: "Mise en place d'un abri vélo sécurisé avec prises pour trottinettes",
    description: "Encourager les mobilités douces avec un espace couvert et sécurisé par badge pour nos vélos et trottinettes.",
    category: "Infrastructures",
    author: "Anonyme",
    votes: 84,
    status: "Pris en compte",
    createdAt: "Il y a 4 jours"
  },
  {
    id: "idea-4",
    title: "Tournoi e-sport inter-promos sur grand écran",
    description: "Une soirée Smash Bros & Rocket League dans l'amphi principal avec pizzas et lots pour les finalistes !",
    category: "Événements",
    author: "Karim B. (Promo 2028)",
    votes: 76,
    status: "Intégré au programme",
    createdAt: "Il y a 5 jours"
  }
];

// Partenaires et Bons Plans
export const PARTNER_OFFERS: PartnerOffer[] = [
  {
    id: "part-1",
    name: "BNP Paribas Campus",
    category: "Banque",
    discount: "80 € offerts",
    code: "BDE80CAMPUS",
    description: "À l'ouverture d'un compte courant étudiant + carte Visa internationale gratuite pendant 2 ans.",
    validUntil: "31 Décembre 2026"
  },
  {
    id: "part-2",
    name: "Basic-Fit",
    category: "Sport",
    discount: "-25 % sur l'abonnement",
    code: "CAMPUSFIT25",
    description: "Frais d'inscription offerts et accès à toutes les salles de France pour 19,99 €/mois.",
    validUntil: "Toute l'année"
  },
  {
    id: "part-3",
    name: "Bagel Corner & Coffee",
    category: "Restauration",
    discount: "-20 % sur toute la carte",
    code: "BDEBAGEL20",
    description: "Sur présentation de la carte étudiante de l'école ou de l'application.",
    validUntil: "Permanent"
  },
  {
    id: "part-4",
    name: "Apple Store Éducation & Dell",
    category: "High-Tech",
    discount: "Jusqu'à -15 %",
    code: "TECHSTUDENT",
    description: "Tarifs négociés sur les ordinateurs portables, iPad et accessoires d'études.",
    validUntil: "30 Juin 2027"
  }
];

// Agenda de campagne
export const AGENDA_EVENTS: AgendaEvent[] = [
  {
    id: "ev-1",
    title: "Distribution de Crêpes & Présentation de l'équipe",
    date: "Jeudi 15 Octobre 2026",
    time: "12h00 - 14h00",
    location: "Hall Principal du Campus",
    type: "Animation",
    description: "Venez déguster des crêpes gratuites et échanger en direct avec la candidate et les membres du bureau."
  },
  {
    id: "ev-2",
    title: "Café-Débat : Vos idées pour le campus",
    date: "Lundi 19 Octobre 2026",
    time: "17h30 - 19h00",
    location: "Cafétéria Centrale",
    type: "Débat",
    description: "Session ouverte de questions-réponses sans filtre sur notre programme et vos besoins au quotidien."
  },
  {
    id: "ev-3",
    title: "Grand Débat des Listes BDE",
    date: "Mercredi 21 Octobre 2026",
    time: "18h00 - 20h00",
    location: "Amphithéâtre A & En Direct Live",
    type: "Débat",
    description: "Confrontation constructive des programmes électoraux devant l'ensemble des étudiants."
  },
  {
    id: "ev-4",
    title: "Ouverture Officielle du Scrutin Électoral",
    date: "Vendredi 23 Octobre 2026",
    time: "08h00 - 18h00",
    location: "Vote en ligne & Urne dans le Hall",
    type: "Rencontre",
    description: "Le jour J ! Munissez-vous de votre carte étudiante ou votez en 1 clic sur le portail sécurisé."
  }
];

// FAQ Élection
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qui a le droit de voter pour cette élection ?",
    answer: "Tous les étudiants inscrits dans l'établissement pour l'année universitaire en cours ont le droit de voter, sans distinction d'année, de cycle (Bachelor, Licence, Master) ou de filière."
  },
  {
    question: "Quelles sont les pièces d'identité acceptées pour voter ?",
    answer: "Votre carte étudiante de l'école ou toute pièce d'identité officielle avec photo (carte nationale d'identité, passeport, permis de conduire)."
  },
  {
    question: "Comment voter si je suis en stage ou en alternance le jour J ?",
    answer: "Un lien de vote électronique chiffré et officiel vous sera envoyé sur votre messagerie étudiante le matin du scrutin. Le vote en ligne est ouvert de 08h00 à 18h00."
  },
  {
    question: "La boîte à idées est-elle vraiment prise en compte ?",
    answer: "Absolument. Chaque proposition soumise est examinée par notre équipe sous 24h. Les idées les plus upvotées sont directement intégrées aux engagements formels de notre mandat."
  }
];
