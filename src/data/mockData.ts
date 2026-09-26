import { ASSETS } from './assets';

export interface MemoryBoostCard {
  id: string;
  type: 'mnemonic' | 'high-yield' | 'definition' | 'analogy';
  title: string;
  badge: string;
  content: string;
  icon: string;
  colorClass: string;
  badgeColorClass: string;
}

export interface StoryChapter {
  id: string;
  chapterNumber: number;
  totalChapters: number;
  title: string;
  subtitle: string;
  subject: string;
  readTime: string;
  keyConceptsCount: number;
  sourceDoc: string;
  sourceVideo: string;
  sections: {
    id: string;
    number: number;
    title: string;
    image: string;
    imageAlt: string;
    paragraphs: string[];
    quote?: string;
  }[];
  curriculumSync: {
    layer: string;
    title: string;
    explanation: string;
  };
  memoryBoostCards: MemoryBoostCard[];
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface StorySummary {
  id: string;
  title: string;
  currentChapterTitle: string;
  subject: string;
  category: string;
  progressPercent: number;
  isFavorite: boolean;
  isMastered: boolean;
  timeLeft: string;
  keyTermsCount: number;
  lastUpdated: string;
  score?: number;
  coverImage: string;
  chapters: StoryChapter[];
}

export interface ReminderItem {
  id: string;
  subject: string;
  storyTitle: string;
  chapterTitle: string;
  priorityText: string;
  priorityLevel: 'high' | 'medium' | 'normal';
  dateTimeText: string;
  stepText: string;
  intervalText: string;
  memoryGoal: string;
  thumbnail: string;
  cadence: string;
}

export const INITIAL_CHAPTER_OSI: StoryChapter = {
  id: 'ch-osi-2',
  chapterNumber: 2,
  totalChapters: 7,
  title: 'The Seven Kingdoms of Network City',
  subtitle: 'Detective Data Link & The Frame Checkpoint',
  subject: 'Computer Networks',
  readTime: '8 min read',
  keyConceptsCount: 4,
  sourceDoc: 'Computer_Networks_Unit_3.pdf',
  sourceVideo: 'Prof. Code Lec #4',
  sections: [
    {
      id: 'sec-1',
      number: 1,
      title: 'The Seven Kingdoms & The Border Checkpoint',
      image: ASSETS.storyReaderSection1,
      imageAlt: 'Vibrant modern digital storybook illustration of a bustling retro-futuristic fantasy metropolis named Network City.',
      paragraphs: [
        'In the bustling metropolis of Network City, information cannot simply roam free. To travel from Queen Application’s castle down to the roaring copper wires of the underworld, every piece of data must pass through seven distinct realms.',
        'Today, a confidential packet labeled "Hello World" arrives at the border of Realm Two. Here sits Detective Data Link, wearing her magnifying spectacles and holding a heavy wax seal stamp.'
      ]
    },
    {
      id: 'sec-2',
      number: 2,
      title: 'Detective Data Link & Captain Physical',
      image: ASSETS.storyReaderSection2,
      imageAlt: 'Charming storybook art of Detective Data Link with giant brass spectacles stamping a glowing parcel.',
      paragraphs: [
        'Detective Data Link shouted across the trench to Captain Physical, who stood guard over the glowing fiber-optic rivers.'
      ],
      quote: '“Captain, ensure no voltage drop on the wire! The copper road must stay intact!”'
    }
  ],
  curriculumSync: {
    layer: 'OSI Model Layer 2',
    title: 'What This Means in Computer Networks',
    explanation: 'Detective Data Link represents the Data Link Layer (Layer 2). Just like our detective inspects packages and stamps approval seals, Layer 2 is responsible for node-to-node data transfer, framing raw bit streams, and verifying integrity through CRC Checksums before passing them onto physical cables.'
  },
  memoryBoostCards: [
    {
      id: 'mbc-1',
      type: 'mnemonic',
      badge: 'Mnemonic Device',
      title: 'Remember This Trick',
      icon: '🧠',
      content: 'Please Do Not Throw Sausage Pizza Away\n(Physical, Data Link, Network, Transport, Session, Presentation, Application).',
      colorClass: 'bg-surface-container text-on-surface',
      badgeColorClass: 'text-primary'
    },
    {
      id: 'mbc-2',
      type: 'high-yield',
      badge: 'High Yield Concept',
      title: 'Key Exam Point',
      icon: '⭐',
      content: 'Data Link Layer packages data into FRAMES and handles MAC addressing (hardware addresses), whereas Network Layer (Layer 3) handles PACKETS and IP addresses.',
      colorClass: 'bg-secondary-fixed text-on-secondary-fixed',
      badgeColorClass: 'text-on-secondary-fixed-variant'
    },
    {
      id: 'mbc-3',
      type: 'definition',
      badge: 'Official Definition',
      title: 'Framing',
      icon: '📌',
      content: 'The process of dividing a continuous stream of bits into distinct, manageable data blocks called frames, encapsulated with header information and error checking flags.',
      colorClass: 'bg-inverse-surface text-inverse-on-surface',
      badgeColorClass: 'text-inverse-primary'
    },
    {
      id: 'mbc-4',
      type: 'analogy',
      badge: 'Real-Life Analogy',
      title: 'The Local Mailroom',
      icon: '💡',
      content: 'Think of Layer 2 as registered mail with a tracking number and tamper seal inside your neighborhood post office before it gets loaded onto the highway cargo truck.',
      colorClass: 'bg-tertiary-container text-on-tertiary',
      badgeColorClass: 'text-on-tertiary-container'
    }
  ],
  quizQuestions: [
    {
      question: 'What is the primary data unit handled at Layer 2 (Data Link Layer)?',
      options: ['Packets', 'Frames', 'Bits', 'Segments'],
      correctIndex: 1,
      explanation: 'Layer 2 packages raw bit streams into Frames and appends MAC addresses and error checking seals.'
    },
    {
      question: 'What does Detective Data Link use to verify data integrity before transmission?',
      options: ['CRC Checksums', 'IP Routing Tables', 'HTTP Cookies', 'Port Numbers'],
      correctIndex: 0,
      explanation: 'Cyclic Redundancy Checks (CRC) are computed and stamped into the frame trailer to detect bit flips.'
    },
    {
      question: 'In the mnemonic "Please Do Not Throw Sausage Pizza Away", what layer does "Pizza" represent?',
      options: ['Physical', 'Presentation', 'Packet', 'Protocol'],
      correctIndex: 1,
      explanation: '"P" is for Presentation layer (Layer 6 in the OSI model).'
    }
  ]
};

export const INITIAL_STORIES: StorySummary[] = [
  {
    id: 'story-osi',
    title: 'The Seven Kingdoms of Network City',
    currentChapterTitle: 'Ch 2: Detective Data Link & The Frame Checkpoint',
    subject: 'Computer Networks',
    category: 'Computer Networks',
    progressPercent: 65,
    isFavorite: true,
    isMastered: false,
    timeLeft: '8 mins left',
    keyTermsCount: 5,
    lastUpdated: 'Created Yesterday',
    coverImage: ASSETS.myStoriesHero,
    chapters: [INITIAL_CHAPTER_OSI]
  },
  {
    id: 'story-os',
    title: 'The Traffic Cop of Memory Lane',
    currentChapterTitle: 'Ch 4: Semaphores & The Critical Section Bridge',
    subject: 'Operating Systems',
    category: 'Operating Systems',
    progressPercent: 100,
    isFavorite: false,
    isMastered: true,
    timeLeft: '14 mins read',
    keyTermsCount: 7,
    lastUpdated: '3 days ago',
    score: 95,
    coverImage: ASSETS.trafficCopThumbnail,
    chapters: [
      {
        ...INITIAL_CHAPTER_OSI,
        id: 'ch-os-4',
        chapterNumber: 4,
        totalChapters: 5,
        title: 'The Traffic Cop of Memory Lane',
        subtitle: 'Semaphores & The Critical Section Bridge',
        subject: 'Operating Systems',
        curriculumSync: {
          layer: 'Process Synchronization',
          title: 'What This Means in Operating Systems',
          explanation: 'Semaphores act like traffic signals controlling access to shared memory resources, preventing race conditions and deadlock.'
        }
      }
    ]
  },
  {
    id: 'story-quantum',
    title: 'The Tale of Two Entangled Kittens',
    currentChapterTitle: 'Ch 1: Superposition and Spooky Action at a Distance',
    subject: 'Quantum Physics',
    category: 'Physics',
    progressPercent: 30,
    isFavorite: false,
    isMastered: false,
    timeLeft: '10 mins left',
    keyTermsCount: 4,
    lastUpdated: 'Last week',
    coverImage: ASSETS.quantumCoffeeCover,
    chapters: [
      {
        ...INITIAL_CHAPTER_OSI,
        id: 'ch-qp-1',
        chapterNumber: 1,
        totalChapters: 4,
        title: 'The Tale of Two Entangled Kittens',
        subtitle: 'Superposition & Spooky Action',
        subject: 'Quantum Physics'
      }
    ]
  },
  {
    id: 'story-db',
    title: 'The Sacred ACID Vaults of Relational Town',
    currentChapterTitle: 'Ch 3: Transactions, Rollbacks & Locking Protocols',
    subject: 'Database Systems',
    category: 'Database Systems',
    progressPercent: 100,
    isFavorite: true,
    isMastered: true,
    timeLeft: '12 mins read',
    keyTermsCount: 6,
    lastUpdated: '2 weeks ago',
    score: 98,
    coverImage: ASSETS.acidVaultsThumbnail,
    chapters: [
      {
        ...INITIAL_CHAPTER_OSI,
        id: 'ch-db-3',
        chapterNumber: 3,
        totalChapters: 4,
        title: 'The Sacred ACID Vaults of Relational Town',
        subtitle: 'Atomicity, Consistency, Isolation & Durability',
        subject: 'Database Systems'
      }
    ]
  }
];

export const POPULAR_COMMUNITY_STORIES = [
  {
    id: 'pop-1',
    title: 'The Quantum Coffee Shop',
    topic: 'Physics · Quantum Superposition',
    rating: 4.9,
    reads: '1.2k reads',
    coverImage: ASSETS.quantumCoffeeCover
  },
  {
    id: 'pop-2',
    title: 'The Heart’s Postal Service',
    topic: 'Biology · Circulatory System',
    rating: 4.8,
    reads: '890 reads',
    coverImage: ASSETS.heartPostalCover
  }
];

export const INITIAL_REMINDERS: ReminderItem[] = [
  {
    id: 'rem-1',
    subject: 'Computer Networks',
    storyTitle: 'The Seven Kingdoms of Network City',
    chapterTitle: 'Chapter 2: The OSI Reference Model',
    priorityText: 'High Priority · Midterm in 4 days',
    priorityLevel: 'high',
    dateTimeText: 'Tomorrow · 7:00 PM',
    stepText: 'Step 2 (3-day reinforcement)',
    intervalText: 'Interval +72h',
    memoryGoal: 'Verify CRC Checksum definition & Layer 2/3 packet routing contrast.',
    thumbnail: ASSETS.networkCityThumbnail,
    cadence: 'Spaced (Optimal)'
  },
  {
    id: 'rem-2',
    subject: 'Operating Systems',
    storyTitle: 'The Traffic Cop of Memory Lane',
    chapterTitle: 'Semaphores, Mutexes & Race Conditions',
    priorityText: 'In 3 days · Step 3',
    priorityLevel: 'medium',
    dateTimeText: 'Saturday · 10:00 AM',
    stepText: 'Step 3 (Weekly lock-in)',
    intervalText: 'Interval +7d',
    memoryGoal: 'Prevent Deadlock Rules and Dining Philosophers Solution.',
    thumbnail: ASSETS.trafficCopThumbnail,
    cadence: 'Weekly Cadence'
  },
  {
    id: 'rem-3',
    subject: 'Database Systems',
    storyTitle: 'The Sacred ACID Vaults',
    chapterTitle: 'Database Transactions & Isolation',
    priorityText: 'Weekly Cadence',
    priorityLevel: 'normal',
    dateTimeText: 'Every Sunday · 6:00 PM',
    stepText: 'Reinforcement Cycle',
    intervalText: 'Weekly',
    memoryGoal: 'Contrast Serializable vs Repeatable Read transaction anomalies.',
    thumbnail: ASSETS.acidVaultsThumbnail,
    cadence: 'Weekly'
  }
];

export const STUDENT_PROFILE = {
  name: 'Ananya Sharma',
  degree: 'Computer Science & Engineering · Sophomore',
  college: 'State Institute of Technology',
  currentSemester: 'B.Tech CS - 3rd Semester',
  campusEmail: 'ananya.sharma@campus.edu',
  isPro: true,
  streakDays: 5,
  storiesCreated: 14,
  conceptsMastered: 48,
  quizRetentionPercent: 92,
  avatar: ASSETS.avatar,
  preferences: {
    defaultStoryStyle: 'Fantasy / Adventure',
    defaultDifficulty: 'Intermediate',
    narrationVoice: 'Warm Storyteller (Female)',
    language: 'English (US/UK)'
  },
  notifications: {
    spacedRepetition: true,
    examCountdown: true,
    dailyStreak: true
  }
};
