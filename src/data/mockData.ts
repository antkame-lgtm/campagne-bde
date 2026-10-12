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
  status: "Pris en compte" | "En étude" | "Intégré au programme" | "Rejeté";
  createdAt: string;
  isSample?: boolean;
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
  bio: "Moi Salimata Diomande, aujourd’hui étudiante en Deuxième année à Tg Master University, je suis une jeune femme ambitieuse, engagée et animée par le désir d’apprendre et d’apporter ma contribution. Mon parcours m’a appris l’importance de la persévérance, du travail et de la détermination. Aujourd’hui, je souhaite mettre ces valeurs au service des étudiants en portant une vision nouvelle de la vie étudiante, fondée sur l’écoute, l’initiative et l’action.",
  whyRunning: [
    "Parce que je suis convaincue que la vie étudiante peut aller au-delà des cours et des activités ponctuelles.",
    "Pour valoriser les idées de chacun.",
    "Pour faire de notre école un cadre où chaque étudiant se sent écouté, impliqué et fier d’appartenir à sa communauté."
  ],
  values: [
    { title: "Écoute", desc: "Être sur le terrain chaque semaine pour recueillir vos besoins sans filtre." },
    { title: "Action", desc: "Des projets livrés dans les temps avec des budgets transparents et vérifiables." },
    { title: "Transparence", desc: "Comptes publics et comptes-rendus réguliers des décisions du bureau." },
    { title: "Ambition", desc: "Faire briller notre campus auprès des recruteurs, partenaires et diplômés." },
  ]
};

export interface AnnualProgramItem {
  id: string;
  number: string;
  title: string;
  description: string;
  category: string;
  period: string;
  iconName: string;
}

// 2. Le Programme de l'année (Les 8 grands événements & temps forts)
export const ANNUAL_PROGRAM: AnnualProgramItem[] = [
  {
    id: "tournoi-sport",
    number: "01",
    title: "Tournoi de sport",
    description: "Compétitions sportives inter-promotions (football, basketball, etc.) pour développer l'esprit d'équipe, la cohésion et le bien-être par l'activité physique.",
    category: "Sport & Vitalité",
    period: "Novembre",
    iconName: "Trophy"
  },
  {
    id: "olympiades",
    number: "02",
    title: "Olympiades inter-écoles",
    description: "Grandes olympiades avec plein de jeux divers (jeux de société, bornes d'arcade, défis variés) organisées en collaboration active avec une ou plusieurs autres écoles.",
    category: "Inter-Écoles & Jeux",
    period: "Janvier",
    iconName: "Gamepad2"
  },
  {
    id: "barbecue-party",
    number: "03",
    title: "Barbecue party",
    description: "Moment de détente festif et rassembleur en plein air pour lancer l'année, briser la glace et réunir tous les étudiants autour d'un grand buffet chaleureux.",
    category: "Intégration & Convivialité",
    period: "Octobre",
    iconName: "Flame"
  },
  {
    id: "concours-cuisine",
    number: "04",
    title: "Concours de cuisine",
    description: "Défi culinaire créatif mettant en valeur les talents et recettes des étudiants devant un jury d'étudiants et de professeurs, suivi d'une dégustation partagée.",
    category: "Créativité & Partage",
    period: "Novembre",
    iconName: "UtensilsCrossed"
  },
  {
    id: "panel",
    number: "05",
    title: "Un panel inspirant",
    description: "Conférences et tables rondes interactives sur les thèmes qui passionnent les étudiants : investissement financier, Intelligence Artificielle et domaines d'avenir.",
    category: "Avenir & Carrière",
    period: "Décembre",
    iconName: "Presentation"
  },
  {
    id: "dons",
    number: "06",
    title: "Actions de dons",
    description: "Collectes de vêtements, denrées et fournitures, accompagnées d'initiatives solidaires pour soutenir la communauté étudiante et des associations caritatives.",
    category: "Solidarité & Impact",
    period: "Novembre & Décembre",
    iconName: "HeartHandshake"
  },
  {
    id: "journees-a-theme",
    number: "07",
    title: "Journée à thème",
    description: "Journées immersives et festives tout au long de l'année avec dress codes, animations culturelles, musique et ambiance conviviale sur le campus.",
    category: "Vie de Campus",
    period: "Tout au long de l'année",
    iconName: "Sparkles"
  },
  {
    id: "diners",
    number: "08",
    title: "Dîners de gala & promos",
    description: "Grands dîners conviviaux et soirées festives pour fêter la fin des semestres, célébrer les réussites et renforcer les liens entre étudiants et promotions.",
    category: "Célébration & Réseau",
    period: "Décembre & Fin d'année",
    iconName: "Utensils"
  }
];

// Les 5 grands pôles du mandat (conservés pour la présentation AboutSection & ImpactSection)
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

// 3. Le Calendrier des actions (Cohérence totale avec le Programme de l'année)
export const CALENDAR_SCHEDULE: CalendarMonth[] = [
  {
    month: "Octobre",
    theme: "Intégration & Convivialité",
    badge: "Étape 01",
    events: [
      "Accueil et intégration de l'ensemble des promotions",
      "Grande Barbecue party de rentrée sur le campus",
      "Première Journée à thème pour dynamiser la vie étudiante"
    ]
  },
  {
    month: "Novembre",
    theme: "Sport, Talents & Solidarité",
    badge: "Étape 02",
    events: [
      "Grand Tournoi de sport inter-promotions",
      "Concours de cuisine entre étudiants & dégustation collective",
      "Lancement de la campagne de Dons et d'initiatives solidaires"
    ]
  },
  {
    month: "Décembre",
    theme: "Panel & Célébration",
    badge: "Étape 03",
    events: [
      "Grand Panel d'experts : Investissement, IA & secteurs d'avenir",
      "Grand Dîner festif de fin d'année avant les congés",
      "Journée à thème festive de fin de premier semestre"
    ]
  },
  {
    month: "Janvier et suite",
    theme: "Olympiades & Projets",
    badge: "Étape 04",
    events: [
      "Grandes Olympiades inter-écoles : arcade, jeux de société & défis variés",
      "Dîners semestriels et nouvelles Journées à thème",
      "Intégration continue des propositions récoltées dans la boîte à idées"
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

// 5. Suggestions d'inspiration pour la boîte à idées (vide par défaut)
export const INSPIRATION_QUESTIONS: Array<{ category: string; examples: string[] }> = [];

// 6. Idées citoyennes initiales (vide par défaut, alimenté par les dépôts réels des étudiants)
export const INITIAL_IDEAS: StudentIdea[] = [];

// 7. FAQ Officielle
export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Comment puis-je rejoindre l'équipe de campagne de Salimata ?",
    answer: "Remplissez le formulaire du comité de soutien ou écrivez-nous sur le groupe WhatsApp pour participer aux actions et aux permanences."
  },
  {
    question: "Comment les propositions sont-elles publiées ?",
    answer: "Une adresse email de l'établissement (@univ.tgmaster.com) est requise pour déposer. Les propositions publiées restent visibles dans la boîte à idées."
  }
];

// Compatibilité avec les anciens composants (alias programmatiques)
export const PROGRAM_PILLARS: ProgramPillar[] = MANDATE_POLES;
export const TEAM_MEMBERS = [];
