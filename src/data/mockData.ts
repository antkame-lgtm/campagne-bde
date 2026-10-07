export interface ProgramPillar {
  id: string;
  number: string;
  title: string;
  icon?: string;
  summary: string;
  feasibilityTechnical?: number;
  feasibilityFinancial?: number;
  budget?: string;
  deadline?: string;
  proposals: string[];
}

export interface StudentIdea {
  id: string;
  title: string;
  description: string;
  category: "Idée de projet" | "Activité souhaitée" | "Difficulté rencontrée" | "Suggestion BDE" | "Infrastructures" | "Pédagogie" | "Cafétéria" | "Événements" | "Vie Pratique";
  author: string;
  votes: number;
  status: "Pris en compte" | "En étude" | "Intégré au programme";
  createdAt: string;
  hasVoted?: boolean;
}

export interface ImpactItem {
  id: string;
  problem: string;
  solution: string;
  pole: string;
  gain: string;
}

export interface CalendarMonth {
  month: string;
  theme: string;
  badge: string;
  events: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

// 1. Profil de la candidate Salimata
export const CANDIDATE_INFO = {
  name: "Salimata",
  title: "Candidate à la Présidence du BDE",
  slogan: "Une nouvelle énergie pour notre vie étudiante.",
  strongQuote: "Une communauté étudiante plus dynamique, plus ambitieuse et plus proche de ses étudiants.",
  photo: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
  bio: "Étudiante passionnée et investie depuis ma première année sur le campus, j'ai côtoyé les réalités de chaque filière. Des difficultés de révision aux manques de repères pour les stages, en passant par le besoin de vrais moments de cohésion, j'ai choisi de m'engager pour transformer ces constats en actions tangibles.",
  whyRunning: [
    "Parce que notre école a un potentiel immense qui mérite d'être réveillé par des projets concrets.",
    "Parce qu'aucun étudiant ne doit se sentir isolé, que ce soit scolairement ou socialement.",
    "Parce que vous méritez un bureau ouvert, transparent et disponible au quotidien, pas seulement pendant les campagnes."
  ],
  values: [
    { title: "Écoute", desc: "Être sur le terrain chaque semaine pour recueillir vos besoins sans filtre." },
    { title: "Action", desc: "Des projets livrés dans les temps avec des budgets transparents et vérifiables." },
    { title: "Transparence", desc: "Comptes publics et comptes-rendus réguliers des décisions du bureau." },
    { title: "Ambition", desc: "Faire briller notre campus auprès des recruteurs, partenaires et diplômés." },
  ]
};

// 2. Les 5 grands pôles du mandat (Strictement basés sur les indications de Salimata)
export const MANDATE_POLES = [
  {
    id: "academique",
    number: "01",
    title: "Vie académique",
    summary: "Accompagner la réussite et le travail de tous les étudiants au quotidien.",
    proposals: [
      "Accompagnement des étudiants",
      "Ateliers",
      "Partage de ressources",
      "Soutien méthodologique & entraide"
    ]
  },
  {
    id: "etudiante",
    number: "02",
    title: "Vie étudiante",
    summary: "Rendre le campus vivant et chaleureux tout au long de l'année.",
    proposals: [
      "Activités",
      "Journées à thème",
      "Événements",
      "Compétitions"
    ]
  },
  {
    id: "carriere",
    number: "03",
    title: "Professionnel & carrière",
    summary: "Ouvrir des portes concrètes vers le monde professionnel et l'insertion.",
    proposals: [
      "Rencontres avec professionnels",
      "Conférences",
      "Opportunités de stages",
      "Panels"
    ]
  },
  {
    id: "solidarite",
    number: "04",
    title: "Solidarité & bien-être",
    summary: "Prendre soin de chacun, écouter et améliorer le quotidien à l'école.",
    proposals: [
      "Actions sociales",
      "Initiatives pour améliorer le quotidien",
      "Écoute des étudiants"
    ]
  },
  {
    id: "innovation",
    number: "05",
    title: "Innovation & projets",
    summary: "Encourager la créativité et soutenir l'esprit d'initiative des étudiants.",
    proposals: [
      "Concours d’idées",
      "Projets étudiants",
      "Initiatives entrepreneuriales"
    ]
  }
];

// 3. Le Calendrier des actions (Strictement selon Salimata)
export const CALENDAR_SCHEDULE: CalendarMonth[] = [
  {
    month: "Octobre",
    theme: "Intégration",
    badge: "Étape 01",
    events: [
      "Accueil et intégration de l'ensemble des étudiants",
      "Création de liens et cohésion inter-promotions"
    ]
  },
  {
    month: "Novembre",
    theme: "Mois de l’entrepreneuriat",
    badge: "Étape 02",
    events: [
      "Mois dédié à l'entrepreneuriat et aux initiatives",
      "Ateliers et rencontres professionnelles"
    ]
  },
  {
    month: "Décembre",
    theme: "Événement étudiant",
    badge: "Étape 03",
    events: [
      "Grand événement étudiant festif et rassembleur",
      "Moment convivial avant la fin de semestre"
    ]
  },
  {
    month: "Janvier et suite",
    theme: "Organisation collaborative",
    badge: "Étape 04",
    events: [
      "Organisation des actions suivantes avec les étudiants",
      "Intégration des propositions récoltées dans la boîte à idées"
    ]
  }
];

// 4. « Concrètement, ça change quoi ? » (Les problèmes à résoudre selon les pôles)
export const IMPACT_COMPARISONS: ImpactItem[] = [
  {
    id: "impact-1",
    pole: "Vie académique",
    problem: "Isolement face aux révisions et manque de partage de ressources entre promos.",
    solution: "Accompagnement dédié, ateliers ciblés et partage de ressources pour tous.",
    gain: "Une réussite accessible sans rester seul face aux cours."
  },
  {
    id: "impact-2",
    pole: "Vie étudiante",
    problem: "Un campus parfois trop calme après les cours et manque d'animations régulières.",
    solution: "Des activités régulières, journées à thème, événements et compétitions dynamiques.",
    gain: "Une vraie vie étudiante où l'on a plaisir à rester."
  },
  {
    id: "impact-3",
    pole: "Professionnel & carrière",
    problem: "Difficulté à trouver des stages et manque d'accès direct au monde professionnel.",
    solution: "Rencontres avec des professionnels, conférences, opportunités de stages et panels.",
    gain: "Un réseau direct et des opportunités dès la première année."
  },
  {
    id: "impact-4",
    pole: "Solidarité & bien-être",
    problem: "Besoins du quotidien peu écoutés et pas assez d'initiatives solidaires.",
    solution: "Écoute attentive des étudiants, actions sociales et initiatives concrètes pour le quotidien.",
    gain: "Une communauté bienveillante et solidaire au quotidien."
  },
  {
    id: "impact-5",
    pole: "Innovation & projets",
    problem: "Des idées étudiantes qui manquent d'espace ou d'encouragement pour se réaliser.",
    solution: "Organisation de concours d'idées, soutien aux projets étudiants et initiatives entrepreneuriales.",
    gain: "Vos projets valorisés et encouragés par votre BDE."
  }
];

// 5. Photos avec les étudiants et au SAMI (Demandé à la fin par Salimata)
export const CAMPUS_PHOTOS = [
  {
    title: "Échanges & rencontres sur le campus",
    subtitle: "Avec les étudiants cette semaine",
    tag: "Cette semaine",
    imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Au SAMI avec vous",
    subtitle: "Moments partagés & discussions libres",
    tag: "Au SAMI",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Mobilisation & énergie collective",
    subtitle: "À l'écoute de chaque promotion",
    tag: "Sur le terrain",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
  }
];

// 5. Suggestions d'inspiration pour le questionnaire
export const INSPIRATION_QUESTIONS = [
  {
    category: "Idée de projet",
    examples: [
      "Créer un podcast étudiant sur la vie de l'école et les stages",
      "Installer un espace détente avec canapés et prises de charge rapide",
      "Organiser un hackathon créatif de 24h avec des entreprises partenaires"
    ]
  },
  {
    category: "Activité souhaitée",
    examples: [
      "Une soirée quiz géant / blind test inter-promotions",
      "Un tournoi e-sport officiel (FIFA, League of Legends, Mario Kart)",
      "Des sorties culturelles et tarif réduit pour les théâtres/cinémas"
    ]
  },
  {
    category: "Difficulté rencontrée",
    examples: [
      "Besoin de soutien en mathématiques ou en programmation",
      "Micro-ondes et espaces déjeuner saturés le midi",
      "Manque d'informations claires sur les conventions de stage"
    ]
  },
  {
    category: "Suggestion BDE",
    examples: [
      "Publier le compte-rendu financier du BDE chaque trimestre",
      "Mettre en place une boîte à livres collaborative dans le hall",
      "Négocier des réductions avec les restaurants autour du campus"
    ]
  }
];

// 6. Idées citoyennes initiales
export const INITIAL_IDEAS: StudentIdea[] = [
  {
    id: "idea-1",
    title: "Création d'une banque d'annales et fiches de révision en ligne",
    description: "Centraliser les sujets d'examens des 3 dernières années avec corrigés collaboratifs et fiches mémo par matière.",
    category: "Pédagogie",
    author: "Alexandre",
    votes: 84,
    status: "Intégré au programme",
    createdAt: "Il y a 2 jours",
    hasVoted: false,
  },
  {
    id: "idea-2",
    title: "Permanence tutorat et entraide méthodologique le jeudi soir",
    description: "Permettre aux étudiants de Master de tutorer les premières années sur les matières clés en échange de crédits ou valorisation associative.",
    category: "Idée de projet",
    author: "Inès",
    votes: 62,
    status: "En étude",
    createdAt: "Il y a 3 jours",
    hasVoted: false,
  },
  {
    id: "idea-3",
    title: "Grand tournoi e-sport & esport caritatif inter-écoles",
    description: "Un week-end de compétitions sur écran géant au foyer, ouvert aux spectateurs avec buvette solidaire.",
    category: "Activité souhaitée",
    author: "Camille",
    votes: 49,
    status: "Pris en compte",
    createdAt: "Hier",
    hasVoted: false,
  },
  {
    id: "idea-4",
    title: "Publication trimestrielle du budget et des partenariats BDE",
    description: "Transparence complète sur les entrées et sorties d'argent du bureau des étudiants pour restaurer la confiance de tous.",
    category: "Suggestion BDE",
    author: "Thomas",
    votes: 91,
    status: "Intégré au programme",
    createdAt: "Il y a 4 jours",
    hasVoted: false,
  }
];

// 7. FAQ Officielle
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Qui peut voter pour la liste de Salimata ?",
    answer: "Tous les étudiants inscrits à l'école pour l'année universitaire 2026-2027 ont le droit de vote, quelle que soit leur filière ou année d'étude."
  },
  {
    question: "Comment voter le jour du scrutin ?",
    answer: "Le vote a lieu le vendredi 23 octobre 2026 de 08h00 à 18h00, soit au bureau physique dans le hall de l'école avec votre carte étudiante, soit via le portail électronique sécurisé envoyé par email."
  },
  {
    question: "Comment puis-je rejoindre l'équipe de campagne de Salimata ?",
    answer: "Remplissez le formulaire de ralliement en bas de page ou écrivez-nous directement sur le groupe WhatsApp officiel pour participer aux actions et aux permanences."
  },
  {
    question: "Que se passe-t-il après avoir soumis une idée sur le site ?",
    answer: "Votre proposition est enregistrée et ouverte au vote des autres étudiants. Toute idée atteignant 50 votes est obligatoirement soumise à l'ordre du jour du bureau pour étude de faisabilité sous 14 jours."
  }
];

// Compatibilité avec les anciens composants (alias programmatiques)
export const PROGRAM_PILLARS: ProgramPillar[] = MANDATE_POLES;
export const TEAM_MEMBERS = [];
