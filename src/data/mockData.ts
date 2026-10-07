export interface ProgramPillar {
  id: string;
  number: string;
  title: string;
  icon?: string;
  summary: string;
  feasibilityTechnical: number;
  feasibilityFinancial: number;
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

// 2. Les 5 grands pôles du mandat
export const MANDATE_POLES = [
  {
    id: "academique",
    number: "01",
    title: "Vie académique",
    summary: "Accompagner la réussite de chacun à travers des ressources partagées et du tutorat structuré.",
    proposals: [
      "Banque d'annales et fiches de synthèse collaboratives en ligne en libre accès",
      "Mise en place d'un réseau de tutorat entre promotions supérieures et nouveaux arrivants",
      "Ateliers méthodologiques et de préparation aux partiels avec créneaux dédiés"
    ],
    feasibilityTechnical: 92,
    feasibilityFinancial: 85,
    budget: "1 800 €",
    deadline: "Dès Octobre 2026"
  },
  {
    id: "etudiante",
    number: "02",
    title: "Vie étudiante",
    summary: "Rythmer l'année avec des événements rassembleurs, des tournois et des moments mémorables.",
    proposals: [
      "Organisation de journées à thème mensuelles et d'afterworks conviviaux sur le campus",
      "Compétitions sportives et tournois e-sport inter-promos et inter-écoles",
      "Grand gala annuel de fin d'année accessible à tous avec formule solidaire"
    ],
    feasibilityTechnical: 88,
    feasibilityFinancial: 90,
    budget: "4 200 €",
    deadline: "Tout au long de l'année"
  },
  {
    id: "carriere",
    number: "03",
    title: "Professionnel & carrière",
    summary: "Créer des passerelles directes avec le monde professionnel et accélérer l'insertion.",
    proposals: [
      "Rencontres et tables rondes avec des professionnels et recruteurs partenaires",
      "Conférences thématiques et panels animés par le réseau des anciens élèves (Alumni)",
      "Bourse aux opportunités de stages et d'alternances relayées en direct"
    ],
    feasibilityTechnical: 85,
    feasibilityFinancial: 80,
    budget: "2 000 €",
    deadline: "Novembre 2026 & Février 2027"
  },
  {
    id: "solidarite",
    number: "04",
    title: "Solidarité & bien-être",
    summary: "Améliorer concrètement votre quotidien et veiller au bien-être physique et moral de tous.",
    proposals: [
      "Guichet d'écoute anonyme et confidentiel pour les difficultés personnelles ou scolaires",
      "Actions sociales d'urgence et paniers étudiants à tarif coûtant symbolique",
      "Espaces de détente aménagés et initiatives bien-être pour lutter contre le stress"
    ],
    feasibilityTechnical: 95,
    feasibilityFinancial: 88,
    budget: "2 500 €",
    deadline: "Permanent 7j/7"
  },
  {
    id: "innovation",
    number: "05",
    title: "Innovation & projets",
    summary: "Soutenir l'esprit d'initiative, financer vos idées et encourager l'entrepreneuriat.",
    proposals: [
      "Concours annuel d'idées étudiantes avec financement de démarrage pour les lauréats",
      "Incubateur d'initiatives associatives et soutien logistique pour vos projets personnels",
      "Hackathons créatifs et challenges entrepreneuriaux inter-filières"
    ],
    feasibilityTechnical: 80,
    feasibilityFinancial: 78,
    budget: "2 200 €",
    deadline: "Novembre 2026 & Mars 2027"
  }
];

// 3. Le Calendrier annuel d'actions
export const CALENDAR_SCHEDULE: CalendarMonth[] = [
  {
    month: "Octobre",
    theme: "Intégration & Accueil",
    badge: "Mois 01",
    events: [
      "Accueil et parrainage des nouveaux inscrits",
      "Lancement de la plateforme participative et boîte à idées",
      "Soirée d'intégration officielle inter-promos"
    ]
  },
  {
    month: "Novembre",
    theme: "Entrepreneuriat & Carrières",
    badge: "Mois 02",
    events: [
      "Mois de l'entrepreneuriat : ateliers et pitch challenge",
      "Premier panel professionnel avec les diplômés (Alumni)",
      "Lancement des groupes de tutorat méthodologique"
    ]
  },
  {
    month: "Décembre",
    theme: "Solidarité & Gala d'Hiver",
    badge: "Mois 03",
    events: [
      "Collecte solidaire et paniers d'hiver",
      "Soirée étudiante de fin de semestre",
      "Mise à disposition des annales pour les partiels de janvier"
    ]
  },
  {
    month: "Janvier",
    theme: "Réussite & Révisions",
    badge: "Mois 04",
    events: [
      "Permanences d'entraide et sessions révisions intensives",
      "Distribution de boissons chaudes et encas en bibliothèque",
      "Point d'étape public : bilan financier du 1er trimestre"
    ]
  },
  {
    month: "Février",
    theme: "Forum Métiers & Stages",
    badge: "Mois 05",
    events: [
      "Forum Entreprises annuel & ateliers CV / simulation d'entretiens",
      "Rencontres thématiques par filières",
      "Lancement du concours d'innovation étudiante"
    ]
  },
  {
    month: "Mars - Mai",
    theme: "Sport, Culture & Grand Gala",
    badge: "Mois 06-08",
    events: [
      "Tournoi inter-promos et défis e-sport",
      "Journée des talents artistiques et culturels du campus",
      "Grand Gala de fin d'année et passation officielle"
    ]
  }
];

// 4. « Concrètement, ça change quoi ? »
export const IMPACT_COMPARISONS: ImpactItem[] = [
  {
    id: "impact-1",
    pole: "Vie académique",
    problem: "Partiels approchant sans accès clair aux annales des années passées.",
    solution: "Une banque d'annales corrigées et fiches de synthèse ouvertes à tous en ligne.",
    gain: "Moins de stress, révisions plus efficaces."
  },
  {
    id: "impact-2",
    pole: "Carrière & Réseau",
    problem: "Difficulté à trouver des stages et sentiment de manquer de contacts utiles.",
    solution: "Des rencontres directes avec des recruteurs et un réseau d'anciens mobilisé.",
    gain: "Un tremplin concret vers votre premier emploi."
  },
  {
    id: "impact-3",
    pole: "Démocratie étudiante",
    problem: "Idées déposées qui restent sans réponse et décisions prises en vase clos.",
    solution: "Une boîte à idées où chaque proposition populaire est débattue sous 14 jours.",
    gain: "Une vraie voix au chapitre pour chaque promotion."
  },
  {
    id: "impact-4",
    pole: "Bien-être & Pouvoir d'achat",
    problem: "Événements parfois trop coûteux et manque de soutien en cas de coup dur.",
    solution: "Tarifs solidaires garantis (≤ 5 €) et fonds d'écoute/urgence confidentiel.",
    gain: "Un campus inclusif où personne n'est laissé pour compte."
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
