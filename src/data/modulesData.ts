import { Module } from '../types';

export const allModules: Module[] = [
  {
    id: 1,
    unitNumber: 1,
    title: 'Talking About Yourself',
    subtitle: 'Present Simple with "to be" and regular action verbs',
    grammarFocus: 'Present Simple (be, do, have, live, work) for facts and general truths',
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: 'Present Tenses',
    estimatedMinutes: 12,
    vocabularyTargets: ['revenue', 'reliable', 'deadline', 'colleague'],
    rules: [
      {
        id: 'rule-1-1',
        title: 'Present Simple: State of Being ("to be")',
        explanation: 'Use the verb "to be" (am / is / are) to describe identity, nationality, profession, and status.',
        formulaBadge: 'Subject + am/is/are + Complement',
        examples: [
          { english: 'She is a reliable financial analyst at our headquarters.', note: '"is" with third-person singular (he/she/it).' },
          { english: 'They are responsible for quarterly revenue projections.', note: '"are" with plural subjects.' }
        ],
        tips: ['Remember: "I am", "He/She/It is", "We/You/They are". Do not use "do" with the verb "to be" in questions or negatives!']
      },
      {
        id: 'rule-1-2',
        title: 'Present Simple: Regular Verbs (-s / -es endings)',
        explanation: 'Add "-s" or "-es" to base verbs when the subject is third-person singular (he, she, it, or a singular noun).',
        formulaBadge: 'He / She / It + Verb(-s/-es)',
        examples: [
          { english: 'He manages the marketing budget and meets every deadline.', note: 'manage -> manages; meet -> meets' },
          { english: 'The company operates in twelve international markets.', note: 'operate -> operates' }
        ],
        tips: ['Verbs ending in -ch, -sh, -ss, -x, or -o take "-es" (e.g., watch -> watches, do -> does).']
      }
    ],
    questions: [
      {
        id: 'q1-1',
        type: 'multiple-choice',
        prompt: 'Select the correct verb form to complete the sentence:',
        instruction: 'Choose the verb that agrees with the third-person singular subject.',
        sentenceContext: 'Our senior consultant _____ detailed quarterly reports for the board.',
        options: ['prepare', 'prepares', 'preparing', 'is prepare'],
        correctAnswer: 'prepares',
        explanation: '"Our senior consultant" is third-person singular (he/she), so we add "-s" to the base verb "prepare".',
        targetWords: ['revenue', 'reliable'],
        audioSentence: 'Our senior consultant prepares detailed quarterly reports for the board.',
        category: 'Grammar Rule'
      },
      {
        id: 'q1-2',
        type: 'fill-gap',
        prompt: 'Type the correct form of the verb in parentheses:',
        instruction: 'Complete the gap using the Present Simple tense.',
        sentenceContext: 'The dedicated team _____ (meet) every tight project deadline.',
        correctAnswer: 'meets',
        alternativeAnswers: ['meets'],
        hint: 'Subject is "The dedicated team" (singular collective entity).',
        explanation: 'Singular subject "The dedicated team" requires the third-person singular ending "-s": "meets".',
        targetWords: ['deadline', 'reliable'],
        audioSentence: 'The dedicated team meets every tight project deadline.',
        category: 'Verb Tense'
      },
      {
        id: 'q1-3',
        type: 'unscramble',
        prompt: 'Rearrange the word tokens to construct a grammatically correct sentence:',
        instruction: 'Click or drag the word chips into the proper grammatical order.',
        correctAnswer: 'She is a reliable partner in this venture',
        scrambledTokens: ['partner', 'reliable', 'She', 'is', 'a', 'in', 'venture', 'this'],
        explanation: 'Correct English word order: Subject (She) + Verb (is) + Article/Adjective/Noun (a reliable partner) + Prepositional Phrase (in this venture).',
        targetWords: ['reliable'],
        audioSentence: 'She is a reliable partner in this venture.',
        category: 'Word Order'
      },
      {
        id: 'q1-4',
        type: 'speaking-shadow',
        prompt: 'Voice Dictation & Shadowing Practice:',
        instruction: 'Listen carefully to the audio stress, then practice speaking the sentence clearly.',
        correctAnswer: 'Our annual revenue increases steadily every fiscal year.',
        explanation: 'Notice the pronunciation of "revenue" (/ˈrev.ə.nuː/) and "steadily" (/ˈsted.əl.i/).',
        targetWords: ['revenue', 'steadily'],
        audioSentence: 'Our annual revenue increases steadily every fiscal year.'
      }
    ]
  },
  {
    id: 2,
    unitNumber: 2,
    title: 'Talking About Routines',
    subtitle: 'Adverbs and expressions of frequency',
    grammarFocus: 'Adverbs of Frequency (always, usually, often, sometimes, rarely, never)',
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: 'Present Tenses',
    estimatedMinutes: 12,
    vocabularyTargets: ['steadily', 'collaborate', 'downturn'],
    rules: [
      {
        id: 'rule-2-1',
        title: 'Position of Frequency Adverbs',
        explanation: 'Place adverbs of frequency BEFORE main verbs, but AFTER the verb "to be" and auxiliary verbs.',
        formulaBadge: 'Subject + Adverb + Main Verb | Subject + be + Adverb',
        examples: [
          { english: 'We always collaborate with international partners on key milestones.', note: 'Adverb "always" before main verb "collaborate".' },
          { english: 'He is usually punctual for the morning briefing.', note: 'Adverb "usually" after verb "is".' }
        ],
        tips: ['Frequency scale: Always (100%) > Usually (80%) > Often (60%) > Sometimes (50%) > Rarely/Seldom (10%) > Never (0%).']
      }
    ],
    questions: [
      {
        id: 'q2-1',
        type: 'multiple-choice',
        prompt: 'Identify the sentence with the correct adverb placement:',
        instruction: 'Choose the sentence where the frequency adverb is placed correctly.',
        sentenceContext: 'Which sentence follows the standard English word order?',
        options: [
          'They collaborate often with external specialists.',
          'They often collaborate with external specialists.',
          'Often they collaborate with external specialists always.',
          'They collaborate with external specialists often always.'
        ],
        correctAnswer: 'They often collaborate with external specialists.',
        explanation: 'Adverbs of frequency like "often" go directly before the main verb ("collaborate").',
        targetWords: ['collaborate'],
        audioSentence: 'They often collaborate with external specialists.',
        category: 'Word Order'
      },
      {
        id: 'q2-2',
        type: 'fill-gap',
        prompt: 'Type the correct frequency structure:',
        instruction: 'Place "rarely" in the correct position.',
        sentenceContext: 'The company _____ (be / rarely) unprepared for market changes.',
        correctAnswer: 'is rarely',
        alternativeAnswers: ['is rarely'],
        hint: 'Adverb goes after the verb "to be".',
        explanation: 'With the verb "to be", the adverb of frequency follows the verb: "is rarely".',
        targetWords: ['steadily'],
        audioSentence: 'The company is rarely unprepared for market changes.',
        category: 'Grammar Rule'
      },
      {
        id: 'q2-3',
        type: 'unscramble',
        prompt: 'Unscramble the sentence regarding team habits:',
        instruction: 'Arrange the tokens into the correct sentence structure.',
        correctAnswer: 'Team members always collaborate during product planning',
        scrambledTokens: ['during', 'always', 'Team', 'collaborate', 'members', 'product', 'planning'],
        explanation: 'Subject (Team members) + Adverb (always) + Verb (collaborate) + Prepositional phrase (during product planning).',
        targetWords: ['collaborate'],
        audioSentence: 'Team members always collaborate during product planning.',
        category: 'Word Order'
      },
      {
        id: 'q2-4',
        type: 'speaking-shadow',
        prompt: 'Pronunciation & Dictation Task:',
        instruction: 'Practice rhythmic speech stress on the adverb "steadily".',
        correctAnswer: 'Market demand grows steadily throughout the autumn season.',
        explanation: 'Pay attention to the smooth transition between "grows" and "steadily".',
        targetWords: ['steadily'],
        audioSentence: 'Market demand grows steadily throughout the autumn season.'
      }
    ]
  },
  {
    id: 3,
    unitNumber: 3,
    title: 'Today’s Work & Present Continuous',
    subtitle: 'Actions happening now and temporary situations',
    grammarFocus: 'Present Continuous (am/is/are + verb-ing)',
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: 'Present Tenses',
    estimatedMinutes: 14,
    vocabularyTargets: ['breakthrough', 'strategy', 'implement'],
    rules: [
      {
        id: 'rule-3-1',
        title: 'Forming the Present Continuous',
        explanation: 'Use am/is/are + verb-ing for actions happening right now, temporary situations, or ongoing projects.',
        formulaBadge: 'Subject + am/is/are + Verb-ing',
        examples: [
          { english: 'Our research lab is developing a technological breakthrough.', note: 'Action happening during this period.' },
          { english: 'They are implementing a new cybersecurity strategy this month.', note: 'Temporary project.' }
        ],
        tips: ['Time markers: right now, currently, at the moment, this week/month. State verbs (know, like, understand, want) are rarely used in the continuous!']
      }
    ],
    questions: [
      {
        id: 'q3-1',
        type: 'multiple-choice',
        prompt: 'Select the correct continuous verb phrase:',
        instruction: 'Choose the correct form indicating an ongoing temporary project.',
        sentenceContext: 'At the moment, our engineers _____ a comprehensive marketing strategy.',
        options: ['are developing', 'develop', 'is developing', 'developing'],
        correctAnswer: 'are developing',
        explanation: '"Our engineers" is plural, so we use "are" + base verb with "-ing" ("are developing").',
        targetWords: ['strategy'],
        audioSentence: 'At the moment, our engineers are developing a comprehensive marketing strategy.',
        category: 'Verb Tense'
      },
      {
        id: 'q3-2',
        type: 'fill-gap',
        prompt: 'Complete with the Present Continuous form:',
        instruction: 'Fill in the blank with the appropriate form of "make".',
        sentenceContext: 'The development team _____ (make) a breakthrough in clean energy.',
        correctAnswer: 'is making',
        alternativeAnswers: ['is making'],
        hint: 'Singular subject "The development team" + verb-ing.',
        explanation: 'Team takes singular auxiliary "is" + "making" (drop silent "e" when adding -ing).',
        targetWords: ['breakthrough'],
        audioSentence: 'The development team is making a breakthrough in clean energy.',
        category: 'Grammar Rule'
      },
      {
        id: 'q3-3',
        type: 'unscramble',
        prompt: 'Form the sentence describing current activity:',
        instruction: 'Assemble the word blocks correctly.',
        correctAnswer: 'We are implementing a sustainable strategy currently',
        scrambledTokens: ['implementing', 'are', 'We', 'strategy', 'sustainable', 'a', 'currently'],
        explanation: 'Subject (We) + Aux (are) + Participle (implementing) + Object (a sustainable strategy) + Time adverb (currently).',
        targetWords: ['strategy'],
        audioSentence: 'We are implementing a sustainable strategy currently.',
        category: 'Word Order'
      },
      {
        id: 'q3-4',
        type: 'speaking-shadow',
        prompt: 'Speaking & Shadowing Practice:',
        instruction: 'Dictate the sentence clearly into the speech engine.',
        correctAnswer: 'The laboratory is celebrating a major scientific breakthrough today.',
        explanation: 'Emphasize the compound noun "scientific breakthrough".',
        targetWords: ['breakthrough'],
        audioSentence: 'The laboratory is celebrating a major scientific breakthrough today.'
      }
    ]
  },
  {
    id: 4,
    unitNumber: 4,
    title: 'Everyday Things & Tense Contrast',
    subtitle: 'Present Simple vs. Present Continuous',
    grammarFocus: 'Contrasting permanent habits/facts with temporary actions',
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: 'Present Tenses',
    estimatedMinutes: 15,
    vocabularyTargets: ['benchmark', 'objective', 'streamline'],
    rules: [
      {
        id: 'rule-4-1',
        title: 'Habitual Fact vs. Temporary Action',
        explanation: 'Use Present Simple for general facts, routines, and permanent states. Use Present Continuous for temporary actions taking place around now.',
        formulaBadge: 'Simple: Habits/Facts | Continuous: Right Now/Temporary',
        examples: [
          { english: 'I usually supervise operations, but this week I am auditing accounts.', note: 'Contrast between permanent role and temporary task.' },
          { english: 'The company meets its benchmark every quarter.', note: 'Regular recurring schedule (Simple).' }
        ]
      }
    ],
    questions: [
      {
        id: 'q4-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct contrast of tenses:',
        sentenceContext: 'She usually _____ in the central office, but this month she _____ from home.',
        options: [
          'works / is working',
          'is working / works',
          'work / is work',
          'is working / is working'
        ],
        correctAnswer: 'works / is working',
        instruction: 'Select the pair that contrasts regular routine with temporary situation.',
        explanation: '"Usually" triggers Present Simple ("works"), while "this month" triggers Present Continuous ("is working").',
        targetWords: ['objective'],
        audioSentence: 'She usually works in the central office, but this month she is working from home.',
        category: 'Verb Tense'
      },
      {
        id: 'q4-2',
        type: 'fill-gap',
        prompt: 'Complete the contrast statement:',
        instruction: 'Type the Present Simple or Present Continuous of the verb "set".',
        sentenceContext: 'Every January, management _____ (set) a new benchmark for customer satisfaction.',
        correctAnswer: 'sets',
        hint: '"Every January" describes an annual routine.',
        explanation: 'Annual routines take the Present Simple: "sets".',
        targetWords: ['benchmark'],
        audioSentence: 'Every January, management sets a new benchmark for customer satisfaction.',
        category: 'Grammar Rule'
      },
      {
        id: 'q4-3',
        type: 'unscramble',
        prompt: 'Order the sentence correctly:',
        instruction: 'Build the sentence expressing strategic goals.',
        correctAnswer: 'Our primary objective defines the annual benchmark',
        scrambledTokens: ['primary', 'objective', 'Our', 'the', 'defines', 'benchmark', 'annual'],
        explanation: 'Subject (Our primary objective) + Verb (defines) + Object (the annual benchmark).',
        targetWords: ['benchmark', 'objective'],
        audioSentence: 'Our primary objective defines the annual benchmark.',
        category: 'Word Order'
      },
      {
        id: 'q4-4',
        type: 'speaking-shadow',
        prompt: 'Speech & Dictation Practice:',
        instruction: 'Speak the sentence at a natural pace with clear enunciation.',
        correctAnswer: 'We set a high performance benchmark to achieve every key objective.',
        explanation: 'Practice the consonant clusters in "benchmark" and "objective".',
        targetWords: ['benchmark', 'objective'],
        audioSentence: 'We set a high performance benchmark to achieve every key objective.'
      }
    ]
  },
  {
    id: 5,
    unitNumber: 5,
    title: 'Free Time & Preferences',
    subtitle: 'Verbs of liking with Gerunds (-ing)',
    grammarFocus: 'Like, love, enjoy, prefer, hate + Verb-ing',
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: 'Descriptions & Quantifiers',
    estimatedMinutes: 12,
    vocabularyTargets: ['streamline', 'revenue'],
    rules: [
      {
        id: 'rule-5-1',
        title: 'Verbs of Preference + Gerund',
        explanation: 'When expressing likes, dislikes, or preferences, verbs such as like, love, enjoy, dislike, prefer, and hate are followed by a gerund (verb + -ing).',
        formulaBadge: 'Subject + like/enjoy/prefer + Verb(-ing)',
        examples: [
          { english: 'He enjoys streamlining complex business workflows.', note: '"streamlining" acts as the activity object.' },
          { english: 'They prefer analyzing revenue trends in the morning.', note: '"analyzing" is the gerund form.' }
        ]
      }
    ],
    questions: [
      {
        id: 'q5-1',
        type: 'multiple-choice',
        prompt: 'Select the proper grammatical complement:',
        sentenceContext: 'Our department heads enjoy _____ administrative procedures to save time.',
        options: ['streamlining', 'to streamline', 'streamline', 'streamlined'],
        instruction: 'Choose the gerund form that follows the verb "enjoy".',
        correctAnswer: 'streamlining',
        explanation: 'The verb "enjoy" must be followed by a gerund (-ing): "enjoy streamlining".',
        targetWords: ['streamline'],
        audioSentence: 'Our department heads enjoy streamlining administrative procedures to save time.',
        category: 'Grammar Rule'
      },
      {
        id: 'q5-2',
        type: 'fill-gap',
        prompt: 'Fill in the gerund form:',
        sentenceContext: 'She prefers _____ (collaborate) with cross-functional project teams.',
        correctAnswer: 'collaborating',
        instruction: 'Convert the verb in parentheses into a gerund.',
        explanation: 'Drop the final "e" and add "-ing": "collaborating".',
        targetWords: ['collaborate'],
        audioSentence: 'She prefers collaborating with cross-functional project teams.',
        category: 'Spelling'
      },
      {
        id: 'q5-3',
        type: 'unscramble',
        prompt: 'Unscramble the preference sentence:',
        instruction: 'Rearrange the tokens into natural English order.',
        correctAnswer: 'Executives love streamlining processes to increase revenue',
        scrambledTokens: ['love', 'Executives', 'streamlining', 'processes', 'increase', 'to', 'revenue'],
        explanation: 'Subject + Verb of preference (love) + Gerund phrase (streamlining processes) + Infinitive of purpose (to increase revenue).',
        targetWords: ['streamline', 'revenue'],
        audioSentence: 'Executives love streamlining processes to increase revenue.',
        category: 'Word Order'
      },
      {
        id: 'q5-4',
        type: 'speaking-shadow',
        prompt: 'Voice Dictation Task:',
        instruction: 'Practice shadowing the sentence below into your microphone.',
        correctAnswer: 'The entire team enjoys streamlining daily operational tasks.',
        explanation: 'Maintain clear articulation of "-ing" endings.',
        targetWords: ['streamline'],
        audioSentence: 'The entire team enjoys streamlining daily operational tasks.'
      }
    ]
  },
  {
    id: 6,
    unitNumber: 6,
    title: 'Abilities, Requests & Modals',
    subtitle: 'Using can and could for capability and polite requests',
    grammarFocus: 'Modal verbs (can, can\'t, could, couldn\'t) + Base Verb',
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: 'Modals',
    estimatedMinutes: 12,
    vocabularyTargets: ['delegate', 'deadline'],
    rules: [
      {
        id: 'rule-6-1',
        title: 'Modals of Ability and Politeness',
        explanation: 'Use "can" for present ability and informal requests. Use "could" for general past ability and formal polite requests. Modals are ALWAYS followed by the base form of the verb without "to".',
        formulaBadge: 'Subject + can/could + Base Verb',
        examples: [
          { english: 'Could you please delegate these inquiries to customer support?', note: 'Polite request.' },
          { english: 'She can meet the tight deadline without additional assistance.', note: 'Present ability.' }
        ]
      }
    ],
    questions: [
      {
        id: 'q6-1',
        type: 'multiple-choice',
        prompt: 'Select the polite modal request:',
        sentenceContext: '_____ you please review the contract before the 5 PM deadline?',
        options: ['Could', 'Can to', 'Could to', 'Are you can'],
        instruction: 'Choose the most polite and grammatically correct modal.',
        correctAnswer: 'Could',
        explanation: '"Could you please [base verb]" is the standard formal polite request in business English.',
        targetWords: ['deadline'],
        audioSentence: 'Could you please review the contract before the 5 PM deadline?',
        category: 'Grammar Rule'
      },
      {
        id: 'q6-2',
        type: 'fill-gap',
        prompt: 'Complete with the base verb:',
        sentenceContext: 'A skilled supervisor can _____ (delegate) complex responsibilities effectively.',
        correctAnswer: 'delegate',
        instruction: 'Remember that modals are followed by the bare infinitive.',
        explanation: 'After the modal "can", use the base form "delegate" without adding "-s" or "to".',
        targetWords: ['delegate'],
        audioSentence: 'A skilled supervisor can delegate complex responsibilities effectively.',
        category: 'Grammar Rule'
      },
      {
        id: 'q6-3',
        type: 'unscramble',
        prompt: 'Assemble the polite inquiry:',
        instruction: 'Put the question words in correct syntactic order.',
        correctAnswer: 'Could you delegate this task to meet the deadline',
        scrambledTokens: ['delegate', 'Could', 'you', 'this', 'task', 'meet', 'the', 'deadline', 'to'],
        explanation: 'Modal (Could) + Subject (you) + Base Verb (delegate) + Object (this task) + Purpose (to meet the deadline).',
        targetWords: ['delegate', 'deadline'],
        audioSentence: 'Could you delegate this task to meet the deadline?',
        category: 'Word Order'
      },
      {
        id: 'q6-4',
        type: 'speaking-shadow',
        prompt: 'Speaking & Shadowing Practice:',
        instruction: 'Use rising intonation for this polite modal request.',
        correctAnswer: 'Could you please delegate the remaining items before tomorrow?',
        explanation: 'Focus on polite intonation at the end of the question.',
        targetWords: ['delegate'],
        audioSentence: 'Could you please delegate the remaining items before tomorrow?'
      }
    ]
  },
  {
    id: 7,
    unitNumber: 7,
    title: 'Past Lives & "Was / Were"',
    subtitle: 'Past Simple of the verb "to be"',
    grammarFocus: 'Was, were, wasn\'t, weren\'t, was born',
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: 'Past Tenses',
    estimatedMinutes: 12,
    vocabularyTargets: ['reliable', 'facilitate'],
    rules: [
      {
        id: 'rule-7-1',
        title: 'Past Simple of "to be"',
        explanation: 'Use "was" for I, he, she, it. Use "were" for you, we, they. Negative forms are "was not" (wasn\'t) and "were not" (weren\'t).',
        formulaBadge: 'I/He/She/It was | You/We/They were',
        examples: [
          { english: 'The original software version was reliable and stable.', note: 'Singular subject takes "was".' },
          { english: 'The committee members were ready to facilitate the discussion.', note: 'Plural subject takes "were".' }
        ]
      }
    ],
    questions: [
      {
        id: 'q7-1',
        type: 'multiple-choice',
        prompt: 'Choose the correct past form of "to be":',
        sentenceContext: 'Both facilitators _____ very helpful during the regional conference.',
        options: ['were', 'was', 'are was', 'did were'],
        instruction: 'Select the past auxiliary for plural subjects.',
        correctAnswer: 'were',
        explanation: '"Both facilitators" is plural, requiring "were" for past statements.',
        targetWords: ['facilitate'],
        audioSentence: 'Both facilitators were very helpful during the regional conference.',
        category: 'Verb Tense'
      },
      {
        id: 'q7-2',
        type: 'fill-gap',
        prompt: 'Fill with negative past of "to be":',
        sentenceContext: 'The prototype _____ (not / be) reliable enough for public release.',
        correctAnswer: 'was not',
        alternativeAnswers: ["wasn't", 'was not'],
        instruction: 'Provide the past negative form.',
        explanation: 'Singular prototype requires "was not" or "wasn\'t".',
        targetWords: ['reliable'],
        audioSentence: 'The prototype was not reliable enough for public release.',
        category: 'Grammar Rule'
      },
      {
        id: 'q7-3',
        type: 'unscramble',
        prompt: 'Unscramble the past description:',
        instruction: 'Arrange into a correct past tense sentence.',
        correctAnswer: 'They were reliable partners during the international summit',
        scrambledTokens: ['were', 'They', 'reliable', 'partners', 'during', 'the', 'summit', 'international'],
        explanation: 'Subject (They) + Past Verb (were) + Predicate Noun (reliable partners) + Prepositional phrase (during the international summit).',
        targetWords: ['reliable'],
        audioSentence: 'They were reliable partners during the international summit.',
        category: 'Word Order'
      },
      {
        id: 'q7-4',
        type: 'speaking-shadow',
        prompt: 'Speaking & Shadowing Task:',
        instruction: 'Record and practice your pronunciation.',
        correctAnswer: 'The previous system was reliable and easy to maintain.',
        explanation: 'Notice the vowel sound in "was" /wɒz/ and "reliable" /rɪˈlaɪ.ə.bəl/.',
        targetWords: ['reliable'],
        audioSentence: 'The previous system was reliable and easy to maintain.'
      }
    ]
  },
  {
    id: 8,
    unitNumber: 8,
    title: 'Past Events & Regular Verbs',
    subtitle: 'Past Simple with regular verbs ending in -ed',
    grammarFocus: 'Regular Past Simple spelling rules and pronunciation (/t/, /d/, /ɪd/)',
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: 'Past Tenses',
    estimatedMinutes: 14,
    vocabularyTargets: ['supervise', 'milestone'],
    rules: [
      {
        id: 'rule-8-1',
        title: 'Regular Past Verbs (-ed)',
        explanation: 'Form the Past Simple of regular verbs by adding "-ed" (or "-d" if the verb already ends in e). If a verb ends in a consonant + y, change y to i and add "-ed" (e.g., carry -> carried).',
        formulaBadge: 'Subject + Base Verb + -ed',
        examples: [
          { english: 'She supervised the migration project until completion.', note: 'supervise -> supervised' },
          { english: 'We reached our milestone ahead of the schedule.', note: 'reach -> reached' }
        ],
        tips: ['Pronunciation rules: verbs ending in /t/ or /d/ add a full syllable /ɪd/ (e.g., started, decided). Other voiceless sounds produce /t/ (walked), and voiced sounds produce /d/ (supervised).']
      }
    ],
    questions: [
      {
        id: 'q8-1',
        type: 'multiple-choice',
        prompt: 'Select the correctly spelled regular past verb:',
        sentenceContext: 'The director _____ every phase of the construction project last year.',
        options: ['supervised', 'superviced', 'supervisied', 'was supervise'],
        instruction: 'Pick the correct past simple regular form.',
        correctAnswer: 'supervised',
        explanation: '"supervise" ends in "e", so we simply add "-d" to form "supervised".',
        targetWords: ['supervise'],
        audioSentence: 'The director supervised every phase of the construction project last year.',
        category: 'Spelling'
      },
      {
        id: 'q8-2',
        type: 'fill-gap',
        prompt: 'Fill in the past simple form of "reach":',
        sentenceContext: 'Our division _____ (reach) a critical milestone last quarter.',
        correctAnswer: 'reached',
        instruction: 'Type the regular past form.',
        explanation: 'Add "-ed" to "reach" -> "reached".',
        targetWords: ['milestone'],
        audioSentence: 'Our division reached a critical milestone last quarter.',
        category: 'Verb Tense'
      },
      {
        id: 'q8-3',
        type: 'unscramble',
        prompt: 'Construct the past action sentence:',
        instruction: 'Arrange into the proper word sequence.',
        correctAnswer: 'She supervised the project to reach the milestone',
        scrambledTokens: ['supervised', 'She', 'the', 'project', 'milestone', 'reach', 'to', 'the'],
        explanation: 'Subject + Past Verb + Direct Object + Infinitive Clause of Purpose.',
        targetWords: ['supervise', 'milestone'],
        audioSentence: 'She supervised the project to reach the milestone.',
        category: 'Word Order'
      },
      {
        id: 'q8-4',
        type: 'speaking-shadow',
        prompt: 'Voice Dictation & Shadowing:',
        instruction: 'Pronounce the "-ed" ending accurately without adding an extra syllable.',
        correctAnswer: 'The engineering team reached every major project milestone on time.',
        explanation: '"reached" is pronounced with a final /t/ sound (/riːtʃt/).',
        targetWords: ['milestone'],
        audioSentence: 'The engineering team reached every major project milestone on time.'
      }
    ]
  },
  {
    id: 9,
    unitNumber: 9,
    title: 'Past Memories & Irregular Verbs',
    subtitle: 'Common irregular past forms',
    grammarFocus: 'Irregular verbs (went, saw, had, bought, made, built, spoke, understood)',
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: 'Past Tenses',
    estimatedMinutes: 15,
    vocabularyTargets: ['breakthrough', 'revenue'],
    rules: [
      {
        id: 'rule-9-1',
        title: 'Mastering Irregular Past Verbs',
        explanation: 'Irregular verbs do not take "-ed". Their past form must be memorized individually. They retain the same form for all subjects.',
        formulaBadge: 'Subject + Irregular Past Verb + Object',
        examples: [
          { english: 'The startup made a breakthrough and generated significant revenue.', note: 'make -> made' },
          { english: 'We understood the requirements after the debriefing.', note: 'understand -> understood' }
        ]
      }
    ],
    questions: [
      {
        id: 'q9-1',
        type: 'multiple-choice',
        prompt: 'Identify the correct irregular past verb:',
        sentenceContext: 'The scientists _____ an unprecedented breakthrough in quantum computing.',
        options: ['made', 'maked', 'make', 'were maked'],
        instruction: 'Select the past form of "make".',
        correctAnswer: 'made',
        explanation: '"make" is an irregular verb with the past simple form "made".',
        targetWords: ['breakthrough'],
        audioSentence: 'The scientists made an unprecedented breakthrough in quantum computing.',
        category: 'Verb Tense'
      },
      {
        id: 'q9-2',
        type: 'fill-gap',
        prompt: 'Provide the irregular past form of "see":',
        sentenceContext: 'Last year, the corporation _____ (see) record-breaking revenue figures.',
        correctAnswer: 'saw',
        instruction: 'Type the past simple form of "see".',
        explanation: 'The past tense of "see" is "saw".',
        targetWords: ['revenue'],
        audioSentence: 'Last year, the corporation saw record-breaking revenue figures.',
        category: 'Verb Tense'
      },
      {
        id: 'q9-3',
        type: 'unscramble',
        prompt: 'Unscramble the completed past event:',
        instruction: 'Form a complete sentence with the irregular verb.',
        correctAnswer: 'They made a remarkable breakthrough in clinical research',
        scrambledTokens: ['made', 'They', 'a', 'breakthrough', 'remarkable', 'clinical', 'research', 'in'],
        explanation: 'Subject (They) + Verb (made) + Noun Phrase (a remarkable breakthrough) + Prepositional phrase (in clinical research).',
        targetWords: ['breakthrough'],
        audioSentence: 'They made a remarkable breakthrough in clinical research.',
        category: 'Word Order'
      },
      {
        id: 'q9-4',
        type: 'speaking-shadow',
        prompt: 'Speech Shadowing Practice:',
        instruction: 'Practice speaking the sentence clearly.',
        correctAnswer: 'We saw substantial growth and made a technological breakthrough.',
        explanation: 'Practice linking "and made a".',
        targetWords: ['breakthrough'],
        audioSentence: 'We saw substantial growth and made a technological breakthrough.'
      }
    ]
  },
  {
    id: 10,
    unitNumber: 10,
    title: 'Past Questions & Negatives',
    subtitle: 'Using "did" and "didn\'t" in Past Simple',
    grammarFocus: 'Did + Subject + Base Verb? / Subject + didn\'t + Base Verb',
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: 'Past Tenses',
    estimatedMinutes: 14,
    vocabularyTargets: ['forecast', 'downturn'],
    rules: [
      {
        id: 'rule-10-1',
        title: 'Auxiliary "did" in Past Simple',
        explanation: 'In negative sentences and questions in the Past Simple, the auxiliary verb "did / didn\'t" takes the past tense marking. The main verb reverts to its BASE FORM.',
        formulaBadge: 'Negative: didn\'t + Base Verb | Question: Did + Subject + Base Verb?',
        examples: [
          { english: 'Did the analysts forecast the economic downturn in advance?', note: 'Notice "forecast" is base form, not past form.' },
          { english: 'They didn\'t anticipate the rapid shift in market sentiment.', note: 'didn\'t + anticipate (base form).' }
        ],
        tips: ['Common mistake: Do NOT say "Did you went?" or "They didn\'t saw." Always use "Did you go?" and "They didn\'t see."']
      }
    ],
    questions: [
      {
        id: 'q10-1',
        type: 'multiple-choice',
        prompt: 'Select the grammatically correct question:',
        sentenceContext: 'Which question correctly uses the auxiliary "did"?',
        options: [
          'Did they forecast the severe downturn?',
          'Did they forecasted the severe downturn?',
          'Did they forecasting the severe downturn?',
          'Were they forecast the severe downturn?'
        ],
        instruction: 'Remember that "did" requires the bare base verb.',
        correctAnswer: 'Did they forecast the severe downturn?',
        explanation: 'After the auxiliary "did", the main verb "forecast" must remain in its base dictionary form.',
        targetWords: ['forecast', 'downturn'],
        audioSentence: 'Did they forecast the severe downturn?',
        category: 'Grammar Rule'
      },
      {
        id: 'q10-2',
        type: 'fill-gap',
        prompt: 'Fill in the negative past form:',
        sentenceContext: 'The advisory panel _____ (not / forecast) such a prolonged slump.',
        correctAnswer: 'did not forecast',
        alternativeAnswers: ["didn't forecast", 'did not forecast'],
        instruction: 'Type "did not [base verb]" or "didn\'t [base verb]".',
        explanation: 'Negative past requires "did not" / "didn\'t" + base verb "forecast".',
        targetWords: ['forecast'],
        audioSentence: 'The advisory panel did not forecast such a prolonged slump.',
        category: 'Verb Tense'
      },
      {
        id: 'q10-3',
        type: 'unscramble',
        prompt: 'Unscramble the past question:',
        instruction: 'Form the interrogative sentence.',
        correctAnswer: 'Did the experts forecast the sudden market downturn',
        scrambledTokens: ['forecast', 'Did', 'the', 'experts', 'market', 'downturn', 'sudden', 'the'],
        explanation: 'Auxiliary (Did) + Subject (the experts) + Base Verb (forecast) + Object (the sudden market downturn).',
        targetWords: ['forecast', 'downturn'],
        audioSentence: 'Did the experts forecast the sudden market downturn?',
        category: 'Word Order'
      },
      {
        id: 'q10-4',
        type: 'speaking-shadow',
        prompt: 'Voice Dictation & Shadowing:',
        instruction: 'Practice natural rising question intonation.',
        correctAnswer: 'Did the leadership team accurately forecast the quarterly downturn?',
        explanation: 'Ensure clear articulation of "accurately forecast".',
        targetWords: ['forecast', 'downturn'],
        audioSentence: 'Did the leadership team accurately forecast the quarterly downturn?'
      }
    ]
  }
];

// Dynamically generate the remaining modules (11 to 44) to provide the full 44-module curriculum
const additionalModulesConfig: Array<{
  id: number;
  unitNumber: number;
  title: string;
  subtitle: string;
  grammarFocus: string;
  category: Module['category'];
  vocabularyTargets: string[];
  ruleTitle: string;
  ruleExplanation: string;
  ruleFormula: string;
  ruleExample: string;
  qSentence: string;
  qOptions: string[];
  qCorrect: string;
  qGapPrompt: string;
  qGapAnswer: string;
  qUnscramble: string;
  qTokens: string[];
}> = [
  {
    id: 11,
    unitNumber: 11,
    title: 'Describing Ongoing Past Actions',
    subtitle: 'Past Continuous tense',
    grammarFocus: 'Past Continuous (was/were + verb-ing) for background actions',
    category: 'Past Tenses',
    vocabularyTargets: ['forecast', 'steadily'],
    ruleTitle: 'Forming the Past Continuous',
    ruleExplanation: 'Use was/were + verb-ing to describe actions that were already in progress at a specific past moment.',
    ruleFormula: 'Subject + was/were + Verb-ing',
    ruleExample: 'Analysts were forecasting steady returns throughout the previous quarter.',
    qSentence: 'At 10 AM yesterday, the team _____ financial forecasts.',
    qOptions: ['was preparing', 'prepared', 'were prepared', 'is preparing'],
    qCorrect: 'was preparing',
    qGapPrompt: 'While inflation was rising, consumer spending _____ (drop) steadily.',
    qGapAnswer: 'was dropping',
    qUnscramble: 'Economists were forecasting steady growth during the conference',
    qTokens: ['were', 'Economists', 'forecasting', 'growth', 'steady', 'the', 'conference', 'during']
  },
  {
    id: 12,
    unitNumber: 12,
    title: 'Interrupted Past & Narrative Flow',
    subtitle: 'Past Simple & Past Continuous with "when" and "while"',
    grammarFocus: 'Connecting long background actions with short interrupting events',
    category: 'Past Tenses',
    vocabularyTargets: ['expenditure', 'revenue'],
    ruleTitle: 'When vs. While in the Past',
    ruleExplanation: 'Use "while" + Past Continuous for the longer background action. Use "when" + Past Simple for the sudden interruption.',
    ruleFormula: 'While [Past Continuous], [Past Simple] | [Past Continuous] when [Past Simple]',
    ruleExample: 'While we were auditing expenditure, we discovered an unexpected revenue surplus.',
    qSentence: 'We _____ the expenditure report when the power failed.',
    qOptions: ['were reviewing', 'reviewed', 'are reviewing', 'review'],
    qCorrect: 'were reviewing',
    qGapPrompt: 'While they _____ (analyze) expenditure, the director arrived.',
    qGapAnswer: 'were analyzing',
    qUnscramble: 'We were reviewing total expenditure when the meeting began',
    qTokens: ['reviewing', 'were', 'We', 'total', 'expenditure', 'the', 'meeting', 'began', 'when']
  },
  {
    id: 13,
    unitNumber: 13,
    title: 'Giving Reasons & Purpose',
    subtitle: 'Because, so, and infinitives of purpose (to + verb)',
    grammarFocus: 'Expressing causes with "because" and intentions with "in order to / to + base verb"',
    category: 'Prepositions & Clauses',
    vocabularyTargets: ['allocate', 'objective'],
    ruleTitle: 'Clauses of Reason and Purpose',
    ruleExplanation: 'Use "because" followed by a full subject-verb clause. Use "to + base verb" to express the direct purpose of an action.',
    ruleFormula: 'Action + to + Base Verb | Action + because + Subject + Verb',
    ruleExample: 'We decided to allocate additional capital to achieve our quarterly objective.',
    qSentence: 'They hired specialized consultants _____ streamline operations.',
    qOptions: ['to', 'because', 'for to', 'so that to'],
    qCorrect: 'to',
    qGapPrompt: 'Management decided to _____ (allocate) funds to modernize infrastructure.',
    qGapAnswer: 'allocate',
    qUnscramble: 'We allocate resources to achieve our primary business objective',
    qTokens: ['allocate', 'We', 'resources', 'achieve', 'to', 'our', 'primary', 'business', 'objective']
  },
  {
    id: 14,
    unitNumber: 14,
    title: 'Around Town & Spatial Relations',
    subtitle: 'Prepositions of place and relative location',
    grammarFocus: 'Opposite, next to, between, across from, behind, in front of',
    category: 'Prepositions & Clauses',
    vocabularyTargets: ['downturn', 'benchmark'],
    ruleTitle: 'Prepositions of Place',
    ruleExplanation: 'Use precise prepositions to describe buildings, offices, and landmark locations in English.',
    ruleFormula: 'Location + is + [preposition] + Landmark',
    ruleExample: 'The corporate innovation hub is located opposite the central station.',
    qSentence: 'The training center is located _____ the library and the main office.',
    qOptions: ['between', 'among', 'across', 'through'],
    qCorrect: 'between',
    qGapPrompt: 'Our branch is situated right _____ (next) to the financial district.',
    qGapAnswer: 'next',
    qUnscramble: 'The headquarters is situated opposite the regional convention center',
    qTokens: ['headquarters', 'is', 'The', 'opposite', 'situated', 'the', 'regional', 'center', 'convention']
  },
  {
    id: 15,
    unitNumber: 15,
    title: 'Giving Clear Directions & Imperatives',
    subtitle: 'Imperative verbs and sequential navigation markers',
    grammarFocus: 'Imperative forms (Turn left, Go straight, Take the second right)',
    category: 'Prepositions & Clauses',
    vocabularyTargets: ['steadily', 'benchmark'],
    ruleTitle: 'Using Imperatives for Directions',
    ruleExplanation: 'Imperative sentences start directly with the base verb without a subject pronoun (e.g., "Follow the signs").',
    ruleFormula: 'Base Verb + Complement (e.g., Turn left, Continue straight)',
    ruleExample: 'Continue straight for two blocks, then turn left at the intersection.',
    qSentence: '_____ straight ahead until you see the reception desk on your right.',
    qOptions: ['Go', 'Going', 'You go', 'To go'],
    qCorrect: 'Go',
    qGapPrompt: '_____ (turn) left immediately after passing the security gate.',
    qGapAnswer: 'Turn',
    qUnscramble: 'Go straight ahead and take the first turning left',
    qTokens: ['Go', 'straight', 'ahead', 'take', 'and', 'the', 'first', 'turning', 'left']
  },
  {
    id: 16,
    unitNumber: 16,
    title: 'Describing Things & Adjective Order',
    subtitle: 'The Royal Order of Adjectives in English',
    grammarFocus: 'Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose',
    category: 'Descriptions & Quantifiers',
    vocabularyTargets: ['delegate', 'reliable'],
    ruleTitle: 'Standard Order of Adjectives',
    ruleExplanation: 'When multiple adjectives precede a noun, order them: Opinion, Size, Age, Shape, Color, Origin, Material, Purpose.',
    ruleFormula: 'Opinion + Size + Age + Color + Origin + Material + Noun',
    ruleExample: 'They purchased a sleek new German automated workstation.',
    qSentence: 'She brought a _____ laptop to the executive briefing.',
    qOptions: [
      'sleek modern silver',
      'silver sleek modern',
      'modern silver sleek',
      'sleek silver modern'
    ],
    qCorrect: 'sleek modern silver',
    qGapPrompt: 'He is known as a _____ (reliable / smart) professional.',
    qGapAnswer: 'reliable',
    qUnscramble: 'They introduced a modern reliable automated workflow system',
    qTokens: ['introduced', 'They', 'a', 'modern', 'reliable', 'automated', 'system', 'workflow']
  },
  {
    id: 17,
    unitNumber: 17,
    title: 'Comparing Things & Comparatives',
    subtitle: 'Comparative adjectives with -er and more ... than',
    grammarFocus: 'Short adjectives (-er than) vs long adjectives (more ... than) + irregulars',
    category: 'Descriptions & Quantifiers',
    vocabularyTargets: ['milestone', 'reliable'],
    ruleTitle: 'Comparative Adjectives',
    ruleExplanation: 'Add "-er than" to one-syllable adjectives (faster than). Use "more ... than" for words with two or more syllables (more reliable than). Irregulars: good -> better, bad -> worse, far -> further.',
    ruleFormula: 'Short: Adj-er + than | Long: more + Adj + than',
    ruleExample: 'The updated software architecture is significantly more reliable than the legacy build.',
    qSentence: 'Our new cloud infrastructure is much _____ than the previous server array.',
    qOptions: ['faster', 'more fast', 'fastest', 'more faster'],
    qCorrect: 'faster',
    qGapPrompt: 'This milestone was _____ (important) than the initial deadline.',
    qGapAnswer: 'more important',
    qUnscramble: 'The revised proposal is more reliable than previous estimates',
    qTokens: ['revised', 'The', 'proposal', 'is', 'more', 'reliable', 'than', 'estimates', 'previous']
  },
  {
    id: 18,
    unitNumber: 18,
    title: 'Superlatives & Highest Standards',
    subtitle: 'Superlative adjectives with the -est and the most',
    grammarFocus: 'The -est / the most + adjective + in/of',
    category: 'Descriptions & Quantifiers',
    vocabularyTargets: ['benchmark', 'breakthrough'],
    ruleTitle: 'Superlative Adjectives',
    ruleExplanation: 'Use "the + adjective + -est" for short adjectives. Use "the most + adjective" for multi-syllable adjectives. Irregulars: the best, the worst, the farthest/furthest.',
    ruleFormula: 'the + Adj-est | the most + Adj',
    ruleExample: 'This discovery is recognized as the most significant breakthrough of the decade.',
    qSentence: 'This model established _____ benchmark in energy conservation.',
    qOptions: ['the highest', 'highest', 'the most high', 'most highest'],
    qCorrect: 'the highest',
    qGapPrompt: 'That was the _____ (impressive) milestone achieved this year.',
    qGapAnswer: 'most impressive',
    qUnscramble: 'It represents the most important benchmark in our industry',
    qTokens: ['represents', 'It', 'the', 'most', 'important', 'benchmark', 'in', 'our', 'industry']
  },
  {
    id: 19,
    unitNumber: 19,
    title: 'Equal & Proportional Comparisons',
    subtitle: 'As ... as and Not as ... as',
    grammarFocus: 'Comparing equality (as + adjective + as) and inferiority (not as + adjective + as)',
    category: 'Descriptions & Quantifiers',
    vocabularyTargets: ['collaborate', 'reliable'],
    ruleTitle: 'Comparing with "As ... As"',
    ruleExplanation: 'Use "as + adjective/adverb + as" to show that two entities are equal. Use "not as ... as" to show that the first entity is lesser in quality or quantity.',
    ruleFormula: 'Subject + Verb + (not) as + Adjective + as + Object',
    ruleExample: 'The junior developer is as reliable as the senior engineers on the team.',
    qSentence: 'Our second quarter was not _____ profitable as expected.',
    qOptions: ['as', 'so like', 'than', 'more'],
    qCorrect: 'as',
    qGapPrompt: 'We must ensure team members collaborate as _____ (closely) as possible.',
    qGapAnswer: 'closely',
    qUnscramble: 'The new process is as reliable as the original method',
    qTokens: ['new', 'The', 'process', 'is', 'as', 'reliable', 'as', 'the', 'original', 'method']
  },
  {
    id: 20,
    unitNumber: 20,
    title: 'Quantifiers & Noun Types',
    subtitle: 'Countable vs. Uncountable nouns with some, any, much, many, a lot of',
    grammarFocus: 'Some/any, much/many, a lot of with plural and non-count nouns',
    category: 'Descriptions & Quantifiers',
    vocabularyTargets: ['downturn', 'expenditure'],
    ruleTitle: 'Countable vs. Uncountable Quantifiers',
    ruleExplanation: 'Use "many" with plural countable nouns (employees, reports). Use "much" in negatives/questions with uncountable nouns (information, expenditure, time). Use "some" in positive statements and "any" in negatives/questions.',
    ruleFormula: 'Countable: many/a few | Uncountable: much/a little | Both: some/any/a lot of',
    ruleExample: 'We do not have much expenditure remaining in this department budget.',
    qSentence: 'How _____ information did the audit reveal regarding the recent downturn?',
    qOptions: ['much', 'many', 'few', 'several'],
    qCorrect: 'much',
    qGapPrompt: 'The company has _____ (some) critical decisions to make today.',
    qGapAnswer: 'some',
    qUnscramble: 'They did not allocate much expenditure for external marketing',
    qTokens: ['allocate', 'They', 'did', 'not', 'much', 'expenditure', 'for', 'marketing', 'external']
  },
  {
    id: 21,
    unitNumber: 21,
    title: 'Precision Quantities & Sufficiency',
    subtitle: 'A few, a little, few, little, enough, and too much/many',
    grammarFocus: 'Nuance between positive (a few/a little) vs negative (few/little), enough & too',
    category: 'Descriptions & Quantifiers',
    vocabularyTargets: ['deadline', 'allocate'],
    ruleTitle: 'A Few / A Little vs. Few / Little',
    ruleExplanation: '"A few" and "a little" mean a small positive quantity. "Few" and "little" mean almost none (insufficient). "Too much/many" indicates excessive quantity, whereas "enough" indicates sufficiency.',
    ruleFormula: 'Countable: a few / few | Uncountable: a little / little',
    ruleExample: 'We have a few days remaining before the project deadline.',
    qSentence: 'There is _____ time left; we must submit the report immediately!',
    qOptions: ['little', 'a few', 'many', 'a lot'],
    qCorrect: 'little',
    qGapPrompt: 'Fortunately, we have _____ (a few) reliable alternatives available.',
    qGapAnswer: 'a few',
    qUnscramble: 'We have enough resources to meet the approaching deadline',
    qTokens: ['resources', 'We', 'have', 'enough', 'to', 'meet', 'approaching', 'deadline', 'the']
  },
  {
    id: 22,
    unitNumber: 22,
    title: 'Future Intentions & Predictions with Evidence',
    subtitle: 'Going to + Base Verb',
    grammarFocus: 'Be going to + base verb for prior plans and evident future events',
    category: 'Future Forms',
    vocabularyTargets: ['reliable', 'launch'],
    ruleTitle: 'Using "Be Going To"',
    ruleExplanation: 'Use "be going to" for planned future intentions made before the moment of speaking, or predictions based on present physical evidence.',
    ruleFormula: 'Subject + am/is/are going to + Base Verb',
    ruleExample: 'We are going to launch the upgraded platform next Tuesday.',
    qSentence: 'Management _____ announce the restructuring plan tomorrow morning.',
    qOptions: ['is going to', 'going to', 'is going', 'goes to'],
    qCorrect: 'is going to',
    qGapPrompt: 'Look at the data; revenue _____ (grow) exponentially.',
    qGapAnswer: 'is going to grow',
    qUnscramble: 'The enterprise is going to launch a reliable cloud service',
    qTokens: ['enterprise', 'The', 'is', 'going', 'to', 'launch', 'a', 'reliable', 'cloud', 'service']
  },
  {
    id: 23,
    unitNumber: 23,
    title: 'Instant Decisions & Predictions',
    subtitle: 'Will & Won\'t for spontaneous choices, offers, and promises',
    grammarFocus: 'Will / Won\'t + Base Verb for instant decisions and general future beliefs',
    category: 'Future Forms',
    vocabularyTargets: ['strategy', 'collaborate'],
    ruleTitle: 'Using "Will" for the Future',
    ruleExplanation: 'Use "will / won\'t" for spontaneous decisions made at the moment of speaking, promises, offers of assistance, and general future predictions with words like think/believe.',
    ruleFormula: 'Subject + will/won\'t + Base Verb',
    ruleExample: 'I think our new product strategy will transform the industry.',
    qSentence: 'I will definitely _____ with your team to finalize the roadmap.',
    qOptions: ['collaborate', 'collaborating', 'to collaborate', 'collaborated'],
    qCorrect: 'collaborate',
    qGapPrompt: 'Don\'t worry about the presentation; I _____ (help) you prepare it.',
    qGapAnswer: 'will help',
    qUnscramble: 'Our new strategy will provide a substantial competitive advantage',
    qTokens: ['new', 'Our', 'strategy', 'will', 'provide', 'a', 'substantial', 'competitive', 'advantage']
  },
  {
    id: 24,
    unitNumber: 24,
    title: 'Fixed Future Arrangements',
    subtitle: 'Present Continuous for future scheduled appointments',
    grammarFocus: 'Present Continuous with future time markers (tomorrow, next week, on Friday)',
    category: 'Future Forms',
    vocabularyTargets: ['streamline', 'deadline'],
    ruleTitle: 'Present Continuous for Fixed Arrangements',
    ruleExplanation: 'Use Present Continuous when an event is already scheduled, arranged, or confirmed in a calendar with other people.',
    ruleFormula: 'Subject + am/is/are + Verb-ing + Future Time Expression',
    ruleExample: 'The executive committee is meeting on Friday at 9:00 AM.',
    qSentence: 'The chief architect _____ the clients at 2 PM this afternoon.',
    qOptions: ['is meeting', 'meets', 'meet', 'was meet'],
    qCorrect: 'is meeting',
    qGapPrompt: 'We _____ (host) the annual corporate gala next month.',
    qGapAnswer: 'are hosting',
    qUnscramble: 'We are meeting the key stakeholders next Monday morning',
    qTokens: ['meeting', 'are', 'We', 'the', 'key', 'stakeholders', 'next', 'Monday', 'morning']
  },
  {
    id: 25,
    unitNumber: 25,
    title: 'Life Experiences & Present Perfect',
    subtitle: 'Have you ever ...? with ever and never',
    grammarFocus: 'Present Perfect (have/has + past participle) for unspecified past life events',
    category: 'Present Tenses',
    vocabularyTargets: ['objective', 'milestone'],
    ruleTitle: 'Present Perfect for Life Experience',
    ruleExplanation: 'Use the Present Perfect to speak about experiences at an indefinite time in life up to now. Use "ever" in questions and "never" in negative statements.',
    ruleFormula: 'Have/Has + Subject + ever + Past Participle?',
    ruleExample: 'Have you ever achieved such an ambitious project objective before?',
    qSentence: '_____ you ever supervised an international product launch?',
    qOptions: ['Have', 'Did', 'Were', 'Do'],
    qCorrect: 'Have',
    qGapPrompt: 'She has _____ (never) missed a critical project milestone.',
    qGapAnswer: 'never',
    qUnscramble: 'Have you ever achieved such an ambitious business objective',
    qTokens: ['Have', 'you', 'ever', 'achieved', 'such', 'an', 'ambitious', 'business', 'objective']
  },
  {
    id: 26,
    unitNumber: 26,
    title: 'Recent Actions & News',
    subtitle: 'Present Perfect with just, already, and yet',
    grammarFocus: 'Just (recent moment), Already (earlier than expected), Yet (questions & negatives)',
    category: 'Present Tenses',
    vocabularyTargets: ['forecast', 'benchmark'],
    ruleTitle: 'Just, Already, and Yet',
    ruleExplanation: '"Just" and "already" go between have/has and the past participle. "Yet" goes at the end of negative sentences and questions.',
    ruleFormula: 'have/has + just/already + Past Participle | haven\'t/hasn\'t + Past Participle + yet',
    ruleExample: 'The economic institute has just published the annual forecast.',
    qSentence: 'Have the auditors finalized their evaluation _____ ?',
    qOptions: ['yet', 'already', 'just', 'still'],
    qCorrect: 'yet',
    qGapPrompt: 'We have _____ (already) exceeded our quarterly benchmark.',
    qGapAnswer: 'already',
    qUnscramble: 'The analytics team has just published the economic forecast',
    qTokens: ['analytics', 'The', 'team', 'has', 'just', 'published', 'the', 'economic', 'forecast']
  },
  {
    id: 27,
    unitNumber: 27,
    title: 'Duration & Ongoing Situations',
    subtitle: 'Present Perfect with "for" and "since"',
    grammarFocus: 'For + duration of time vs Since + starting point in time',
    category: 'Present Tenses',
    vocabularyTargets: ['allocate', 'collaborate'],
    ruleTitle: 'For vs. Since with Present Perfect',
    ruleExplanation: 'Use "for" with a period of time (for three years, for two hours). Use "since" with a specific starting point in time (since 2021, since last Monday).',
    ruleFormula: 'have/has + Past Participle + for [period] / since [point in time]',
    ruleExample: 'They have collaborated on artificial intelligence research since 2022.',
    qSentence: 'We have allocated resources to this initiative _____ six consecutive months.',
    qOptions: ['for', 'since', 'during', 'from'],
    qCorrect: 'for',
    qGapPrompt: 'The company has maintained leadership _____ (since) its inception in 2015.',
    qGapAnswer: 'since',
    qUnscramble: 'We have collaborated on this project for six months',
    qTokens: ['have', 'We', 'collaborated', 'on', 'this', 'project', 'for', 'six', 'months']
  },
  {
    id: 28,
    unitNumber: 28,
    title: 'Present Perfect vs. Past Simple',
    subtitle: 'Finished past time vs. unfinished life time',
    grammarFocus: 'Contrasting specific finished past time (yesterday, in 2020) with unspecified time',
    category: 'Past Tenses',
    vocabularyTargets: ['revenue', 'expenditure'],
    ruleTitle: 'Contrasting Present Perfect and Past Simple',
    ruleExplanation: 'Use Past Simple when a specific finished time is mentioned (yesterday, last year, two days ago). Use Present Perfect when time is unspecified or connected to the present.',
    ruleFormula: 'Past Simple: Finished Time | Present Perfect: Unfinished/No Specific Time',
    ruleExample: 'Last year, total revenue increased by 20%, but this year it has remained steady.',
    qSentence: 'In 2023, the startup _____ over two million dollars in seed capital.',
    qOptions: ['raised', 'has raised', 'was raised', 'is raising'],
    qCorrect: 'raised',
    qGapPrompt: 'So far this fiscal cycle, revenue _____ (exceed) our original projections.',
    qGapAnswer: 'has exceeded',
    qUnscramble: 'Total expenditure decreased significantly during the previous fiscal quarter',
    qTokens: ['expenditure', 'Total', 'decreased', 'significantly', 'during', 'the', 'previous', 'fiscal', 'quarter']
  },
  {
    id: 29,
    unitNumber: 29,
    title: 'Obligations & Rules in the Workplace',
    subtitle: 'Must, Have to, Must not, and Don\'t have to',
    grammarFocus: 'Strong obligation (must/have to), Prohibition (must not), Lack of obligation (don\'t have to)',
    category: 'Modals',
    vocabularyTargets: ['supervise', 'deadline'],
    ruleTitle: 'Must vs. Have to vs. Don\'t have to',
    ruleExplanation: '"Must" and "have to" express obligation. "Must not" indicates strict prohibition. "Don\'t have to" indicates lack of necessity (you can do it if you want, but it is not required).',
    ruleFormula: 'Obligation: must / have to + Base Verb | Prohibition: must not + Base Verb',
    ruleExample: 'All employees must adhere to safety protocols at the facility.',
    qSentence: 'You _____ wear a formal suit; business casual attire is completely acceptable.',
    qOptions: ["don't have to", 'must not', 'should not to', 'have not to'],
    qCorrect: "don't have to",
    qGapPrompt: 'Managers _____ (have to / must) supervise compliance protocols closely.',
    qGapAnswer: 'must',
    qUnscramble: 'You must supervise the project to guarantee high quality',
    qTokens: ['must', 'You', 'supervise', 'the', 'project', 'guarantee', 'to', 'high', 'quality']
  },
  {
    id: 30,
    unitNumber: 30,
    title: 'Giving Advice & Recommendations',
    subtitle: 'Should, Shouldn\'t, and Ought to',
    grammarFocus: 'Modal verbs of advice and mild recommendation',
    category: 'Modals',
    vocabularyTargets: ['facilitate', 'streamline'],
    ruleTitle: 'Using Should and Shouldn\'t',
    ruleExplanation: 'Use "should / shouldn\'t + base verb" to give recommendations, advice, or express what is best or right to do.',
    ruleFormula: 'Subject + should/shouldn\'t + Base Verb',
    ruleExample: 'You should facilitate open dialogue among cross-departmental teams.',
    qSentence: 'Organizations _____ streamline their onboarding procedures to retain talent.',
    qOptions: ['should', 'ought', 'should to', 'must to'],
    qCorrect: 'should',
    qGapPrompt: 'You _____ (should not) ignore constructive feedback from clients.',
    qGapAnswer: 'should not',
    qUnscramble: 'We should facilitate clear communication across all operational departments',
    qTokens: ['facilitate', 'should', 'We', 'clear', 'communication', 'across', 'all', 'departments', 'operational']
  },
  {
    id: 31,
    unitNumber: 31,
    title: 'Possibility & Deduction',
    subtitle: 'May, Might, and Could for uncertain outcomes',
    grammarFocus: 'Expressing degrees of future and present uncertainty',
    category: 'Modals',
    vocabularyTargets: ['breakthrough', 'forecast'],
    ruleTitle: 'Modals of Possibility',
    ruleExplanation: 'Use "may", "might", or "could" + base verb to express that something is possible but not 100% certain.',
    ruleFormula: 'Subject + may/might/could + Base Verb',
    ruleExample: 'This discovery might lead to a transformative medical breakthrough.',
    qSentence: 'The quarterly results _____ be better than the original forecast predicted.',
    qOptions: ['might', 'can to', 'ought', 'are may'],
    qCorrect: 'might',
    qGapPrompt: 'The new algorithm _____ (may) enhance calculation speed substantially.',
    qGapAnswer: 'may',
    qUnscramble: 'This research might lead to an unexpected technological breakthrough',
    qTokens: ['might', 'This', 'research', 'lead', 'to', 'an', 'unexpected', 'technological', 'breakthrough']
  },
  {
    id: 32,
    unitNumber: 32,
    title: 'General Truths & Zero Conditional',
    subtitle: 'If / When + Present Simple, Present Simple',
    grammarFocus: 'Universal facts, scientific principles, and workplace cause-and-effect',
    category: 'Prepositions & Clauses',
    vocabularyTargets: ['revenue', 'downturn'],
    ruleTitle: 'Zero Conditional Structure',
    ruleExplanation: 'Use Zero Conditional for general truths, real conditions, and universal rules where result always follows cause.',
    ruleFormula: 'If / When + Present Simple, Present Simple',
    ruleExample: 'If a company reduces its expenditure, profit margins typically improve.',
    qSentence: 'When customer retention rises, recurring revenue _____ automatically.',
    qOptions: ['increases', 'will increased', 'is increase', 'increased'],
    qCorrect: 'increases',
    qGapPrompt: 'If expenditure exceeds income, the firm _____ (experience) a deficit.',
    qGapAnswer: 'experiences',
    qUnscramble: 'If market demand drops total revenue declines proportionally',
    qTokens: ['demand', 'If', 'market', 'drops', 'total', 'revenue', 'declines', 'proportionally']
  },
  {
    id: 33,
    unitNumber: 33,
    title: 'Real Future Scenarios & First Conditional',
    subtitle: 'If + Present Simple, will + Base Verb',
    grammarFocus: 'Predicting realistic future outcomes based on real conditions',
    category: 'Future Forms',
    vocabularyTargets: ['steadily', 'forecast'],
    ruleTitle: 'First Conditional Structure',
    ruleExplanation: 'Use the First Conditional to talk about probable future results dependent on a present or future condition.',
    ruleFormula: 'If + Present Simple, will/won\'t + Base Verb',
    ruleExample: 'If productivity grows steadily, we will reach our target milestone early.',
    qSentence: 'If the economic forecast is positive, investors _____ capital into new ventures.',
    qOptions: ['will inject', 'injects', 'would inject', 'injected'],
    qCorrect: 'will inject',
    qGapPrompt: 'If we _____ (collaborate) effectively, we will meet the tight deadline.',
    qGapAnswer: 'collaborate',
    qUnscramble: 'If demand grows steadily we will expand our operations',
    qTokens: ['grows', 'If', 'demand', 'steadily', 'we', 'will', 'expand', 'our', 'operations']
  },
  {
    id: 34,
    unitNumber: 34,
    title: 'Describing Places & Amenities',
    subtitle: 'There is / There are with quantifiers',
    grammarFocus: 'Existential "there is / there are", affirmative, negative, and questions',
    category: 'Descriptions & Quantifiers',
    vocabularyTargets: ['expenditure', 'benchmark'],
    ruleTitle: 'There Is vs. There Are',
    ruleExplanation: 'Use "there is" with singular countable nouns and uncountable nouns. Use "there are" with plural countable nouns.',
    ruleFormula: 'There is + Singular/Uncountable Noun | There are + Plural Noun',
    ruleExample: 'There is substantial capital expenditure allocated for technological upgrades.',
    qSentence: '_____ several conference rooms available on the second floor.',
    qOptions: ['There are', 'There is', 'It is', 'They are'],
    qCorrect: 'There are',
    qGapPrompt: '_____ (there is) little justification for unnecessary expenditures.',
    qGapAnswer: 'There is',
    qUnscramble: 'There are several benchmark indicators defined in the report',
    qTokens: ['There', 'are', 'several', 'benchmark', 'indicators', 'defined', 'in', 'the', 'report']
  },
  {
    id: 35,
    unitNumber: 35,
    title: 'Time Clauses & Sequencing',
    subtitle: 'Before, After, Until, As soon as + Present Tense for future',
    grammarFocus: 'Subordinate time clauses with temporal conjunctions',
    category: 'Prepositions & Clauses',
    vocabularyTargets: ['delegate', 'deadline'],
    ruleTitle: 'Future Time Clauses with Present Tense',
    ruleExplanation: 'In clauses introduced by before, after, as soon as, and until, use the Present Simple to refer to future time.',
    ruleFormula: 'Main Clause (will + verb) + as soon as / before + Present Simple',
    ruleExample: 'We will delegate the responsibilities as soon as the manager arrives.',
    qSentence: 'I will submit the documentation as soon as the client _____ it.',
    qOptions: ['approves', 'will approve', 'is approving', 'approved'],
    qCorrect: 'approves',
    qGapPrompt: 'Please verify the figures before you _____ (delegate) the task.',
    qGapAnswer: 'delegate',
    qUnscramble: 'We will review the contract before the deadline arrives',
    qTokens: ['will', 'We', 'review', 'the', 'contract', 'before', 'the', 'deadline', 'arrives']
  },
  {
    id: 36,
    unitNumber: 36,
    title: 'Connecting Complex Ideas & Contrast',
    subtitle: 'Although, Even though, However, and Despite',
    grammarFocus: 'Concession and contrast conjunctions',
    category: 'Prepositions & Clauses',
    vocabularyTargets: ['collaborate', 'downturn'],
    ruleTitle: 'Conjunctions of Contrast',
    ruleExplanation: '"Although" and "even though" connect two clauses (subject + verb). "Despite" and "in spite of" are followed by a noun, pronoun, or gerund (-ing).',
    ruleFormula: 'Although + Clause, Main Clause | Despite + Noun/Gerund, Main Clause',
    ruleExample: 'Although market conditions were challenging, the team collaborated effectively.',
    qSentence: '_____ the economic downturn, the startup maintained positive revenue.',
    qOptions: ['Despite', 'Although', 'Even though', 'However'],
    qCorrect: 'Despite',
    qGapPrompt: '_____ (although) resources were limited, the team reached its milestone.',
    qGapAnswer: 'Although',
    qUnscramble: 'Although market conditions were difficult they collaborated successfully',
    qTokens: ['market', 'Although', 'conditions', 'were', 'difficult', 'they', 'collaborated', 'successfully']
  },
  {
    id: 37,
    unitNumber: 37,
    title: 'Essential Phrasal Verbs in Context',
    subtitle: 'Separable vs. Inseparable phrasal verbs',
    grammarFocus: 'Turn on/off, look for, set up, figure out, take over, carry out',
    category: 'Business & Daily Life',
    vocabularyTargets: ['supervise', 'streamline'],
    ruleTitle: 'Separable and Inseparable Phrasal Verbs',
    ruleExplanation: 'With separable phrasal verbs (e.g., set up, figure out), a pronoun object must go between the verb and particle (e.g., "set it up"). With inseparable verbs, the object always follows the particle.',
    ruleFormula: 'Verb + Particle + Noun Object OR Verb + Pronoun + Particle',
    ruleExample: 'We need to set up a streamlined workflow for customer onboarding.',
    qSentence: 'The technical team will _____ the automated backup routine tonight.',
    qOptions: ['carry out', 'carry on with to', 'carry out to', 'carried out'],
    qCorrect: 'carry out',
    qGapPrompt: 'We must figure _____ (out) the most efficient logistics route.',
    qGapAnswer: 'out',
    qUnscramble: 'The directors decided to set up a new regional branch',
    qTokens: ['directors', 'The', 'decided', 'to', 'set', 'up', 'a', 'new', 'regional', 'branch']
  },
  {
    id: 38,
    unitNumber: 38,
    title: 'Defining People & Things',
    subtitle: 'Relative clauses with Who, Which, That, Where',
    grammarFocus: 'Defining relative pronouns for people (who/that), objects (which/that), places (where)',
    category: 'Advanced Structures',
    vocabularyTargets: ['objective', 'benchmark'],
    ruleTitle: 'Relative Pronouns in Defining Clauses',
    ruleExplanation: 'Use "who / that" for people, "which / that" for things and concepts, and "where" for places.',
    ruleFormula: 'Noun + who/which/that/where + Relative Clause',
    ruleExample: 'She is the project lead who established our performance benchmark.',
    qSentence: 'This is the strategic framework _____ guides our corporate decision-making.',
    qOptions: ['that', 'who', 'where', 'whom'],
    qCorrect: 'that',
    qGapPrompt: 'He is the senior consultant _____ (who) drafted the proposal.',
    qGapAnswer: 'who',
    qUnscramble: 'This is the benchmark that defines our project objective',
    qTokens: ['is', 'This', 'the', 'benchmark', 'that', 'defines', 'our', 'project', 'objective']
  },
  {
    id: 39,
    unitNumber: 39,
    title: 'Focusing on Actions & Passive Voice',
    subtitle: 'Present & Past Passive forms',
    grammarFocus: 'Forming passives (be + past participle) when the action or receiver is prioritized',
    category: 'Advanced Structures',
    vocabularyTargets: ['milestone', 'breakthrough'],
    ruleTitle: 'Passive Voice Structure',
    ruleExplanation: 'Use the Passive Voice when the action itself or the recipient of the action is more important than who performed it, or when the agent is unknown.',
    ruleFormula: 'Subject + am/is/are/was/were + Past Participle (+ by Agent)',
    ruleExample: 'The technological breakthrough was announced by the chief scientist.',
    qSentence: 'Every project milestone _____ carefully documented in the system repository.',
    qOptions: ['is', 'are', 'was be', 'has been is'],
    qCorrect: 'is',
    qGapPrompt: 'The final contract was _____ (sign) by both corporate parties.',
    qGapAnswer: 'signed',
    qUnscramble: 'The historic milestone was celebrated by the entire organization',
    qTokens: ['historic', 'The', 'milestone', 'was', 'celebrated', 'by', 'the', 'entire', 'organization']
  },
  {
    id: 40,
    unitNumber: 40,
    title: 'Reporting Information & Statements',
    subtitle: 'Reported speech with "said that" and "told me that"',
    grammarFocus: 'Tense shifting in reported speech (Present -> Past)',
    category: 'Advanced Structures',
    vocabularyTargets: ['benchmark', 'revenue'],
    ruleTitle: 'Basics of Reported Speech',
    ruleExplanation: 'When reporting someone else\'s words, "said that" takes no personal object, while "told [someone] that" requires a direct personal object. Verb tenses usually backshift into the past.',
    ruleFormula: 'Subject + said (that) ... | Subject + told + Person + (that) ...',
    ruleExample: 'The director told us that annual revenue exceeded expectations.',
    qSentence: 'The analyst _____ that the company met its benchmark.',
    qOptions: ['said', 'told to', 'told', 'says to'],
    qCorrect: 'said',
    qGapPrompt: 'She told _____ (me) that the team was ready for the audit.',
    qGapAnswer: 'me',
    qUnscramble: 'The manager told us that the benchmark was achieved',
    qTokens: ['manager', 'The', 'told', 'us', 'that', 'the', 'benchmark', 'was', 'achieved']
  },
  {
    id: 41,
    unitNumber: 41,
    title: 'Making Invitations, Offers & Suggestions',
    subtitle: 'Would like to, Shall we, How about + -ing',
    grammarFocus: 'Polite social & business formulas for proposing actions',
    category: 'Business & Daily Life',
    vocabularyTargets: ['allocate', 'collaborate'],
    ruleTitle: 'Proposing Actions and Offers',
    ruleExplanation: 'Use "Would you like to + base verb?" for formal invitations. Use "How about / What about + verb-ing?" for informal suggestions. Use "Shall we + base verb?" to propose a collective action.',
    ruleFormula: 'Would you like to + Base Verb? | How about + Verb-ing?',
    ruleExample: 'Would you like to collaborate on the upcoming research initiative?',
    qSentence: 'How about _____ some additional budget to marketing?',
    qOptions: ['allocating', 'allocate', 'to allocate', 'allocated'],
    qCorrect: 'allocating',
    qGapPrompt: 'Would you like _____ (collaborate) with our engineering branch?',
    qGapAnswer: 'to collaborate',
    qUnscramble: 'Would you like to collaborate on the upcoming project',
    qTokens: ['Would', 'you', 'like', 'to', 'collaborate', 'on', 'the', 'upcoming', 'project']
  },
  {
    id: 42,
    unitNumber: 42,
    title: 'Professional Business Correspondence',
    subtitle: 'Formal email conventions, polite inquiries, and sign-offs',
    grammarFocus: 'I am writing to inquire regarding..., Please find attached..., I look forward to...',
    category: 'Business & Daily Life',
    vocabularyTargets: ['streamline', 'deadline'],
    ruleTitle: 'Formal Email Conventions',
    ruleExplanation: 'Formal business correspondence avoids casual contractions (use "do not" rather than "don\'t"), uses polite modal openings, and concludes with "I look forward to hearing from you".',
    ruleFormula: 'Salutation + Purpose Clause + Detail + Polite Request + Sign-off',
    ruleExample: 'I am writing to inquire whether you can meet the specified delivery deadline.',
    qSentence: 'I look forward to _____ from you at your earliest convenience.',
    qOptions: ['hearing', 'hear', 'to hear', 'heard'],
    qCorrect: 'hearing',
    qGapPrompt: 'Please find _____ (attach) the updated quarterly forecast.',
    qGapAnswer: 'attached',
    qUnscramble: 'I am writing to confirm the project deadline and deliverables',
    qTokens: ['writing', 'I', 'am', 'to', 'confirm', 'the', 'project', 'deadline', 'deliverables', 'and']
  },
  {
    id: 43,
    unitNumber: 43,
    title: 'Expressing Opinions, Agreement & Disagreement',
    subtitle: 'Diplomatic discourse in discussions and meetings',
    grammarFocus: 'In my opinion, From my perspective, I see your point, but..., I completely agree',
    category: 'Business & Daily Life',
    vocabularyTargets: ['facilitate', 'strategy'],
    ruleTitle: 'Diplomatic Agreement and Disagreement',
    ruleExplanation: 'In professional English, direct contradiction is softened with diplomatic qualifiers such as "I understand your perspective, however..." or "I see your point, but...".',
    ruleFormula: 'Opinion marker (In my opinion / From my perspective) + Statement',
    ruleExample: 'From my perspective, this strategy will facilitate smoother cross-team alignment.',
    qSentence: 'I see your point, _____ I believe we should allocate more time for testing.',
    qOptions: ['but', 'and', 'so', 'because'],
    qCorrect: 'but',
    qGapPrompt: 'In my _____ (opinion), this is the most cost-effective solution.',
    qGapAnswer: 'opinion',
    qUnscramble: 'In my opinion this strategy will facilitate substantial long-term growth',
    qTokens: ['In', 'my', 'opinion', 'this', 'strategy', 'will', 'facilitate', 'substantial', 'growth', 'long-term']
  },
  {
    id: 44,
    unitNumber: 44,
    title: 'Comprehensive Review & Fluency Mastery',
    subtitle: 'Integrated synthesis of Level 2 grammar, discourse, and business lexicon',
    grammarFocus: 'Synthesizing all Level 2 tenses, modals, conditionals, and vocabulary',
    category: 'Advanced Structures',
    vocabularyTargets: ['revenue', 'breakthrough', 'strategy', 'reliable'],
    ruleTitle: 'Mastery Synthesis',
    ruleExplanation: 'Fluency is achieved when grammar structures, functional words, and domain content vocabulary interact effortlessly across writing, listening, and spontaneous speech.',
    ruleFormula: 'Grammar Accuracy + High-Rotation Content Vocabulary = Fluency',
    ruleExample: 'Our enterprise implemented a reliable strategy and celebrated a historic breakthrough.',
    qSentence: 'Over the past year, our team _____ a reliable strategy to maximize revenue.',
    qOptions: ['has implemented', 'is implement', 'implementing', 'will implemented'],
    qCorrect: 'has implemented',
    qGapPrompt: 'They have achieved a major _____ (breakthrough) in sustainable technology.',
    qGapAnswer: 'breakthrough',
    qUnscramble: 'The enterprise has implemented a reliable strategy to maximize revenue',
    qTokens: ['enterprise', 'The', 'has', 'implemented', 'a', 'reliable', 'strategy', 'to', 'revenue', 'maximize']
  }
];

// Combine all 44 modules
for (const item of additionalModulesConfig) {
  allModules.push({
    id: item.id,
    unitNumber: item.unitNumber,
    title: item.title,
    subtitle: item.subtitle,
    grammarFocus: item.grammarFocus,
    level: 'Level 2 (Beginner / Pre-Intermediate)',
    category: item.category,
    estimatedMinutes: 12,
    vocabularyTargets: item.vocabularyTargets,
    rules: [
      {
        id: `rule-${item.id}-1`,
        title: item.ruleTitle,
        explanation: item.ruleExplanation,
        formulaBadge: item.ruleFormula,
        examples: [
          {
            english: item.ruleExample,
            note: 'Model usage in formal and professional contexts.'
          }
        ]
      }
    ],
    questions: [
      {
        id: `q${item.id}-1`,
        type: 'multiple-choice',
        prompt: 'Select the most accurate grammatical option:',
        instruction: 'Choose the correct answer for the sentence below.',
        sentenceContext: item.qSentence,
        options: item.qOptions,
        correctAnswer: item.qCorrect,
        explanation: `Correct construction adheres to the rule: "${item.ruleFormula}".`,
        targetWords: item.vocabularyTargets,
        audioSentence: item.qSentence.replace('_____', item.qCorrect),
        category: 'Grammar Rule'
      },
      {
        id: `q${item.id}-2`,
        type: 'fill-gap',
        prompt: 'Complete the sentence gap:',
        instruction: 'Type the correct grammatical word into the blank.',
        sentenceContext: item.qGapPrompt,
        correctAnswer: item.qGapAnswer,
        alternativeAnswers: [item.qGapAnswer],
        hint: `Follow the formula: ${item.ruleFormula}`,
        explanation: `The appropriate form required here is "${item.qGapAnswer}".`,
        targetWords: item.vocabularyTargets,
        audioSentence: item.qGapPrompt.replace(/\(.*\)/, item.qGapAnswer),
        category: 'Verb Tense'
      },
      {
        id: `q${item.id}-3`,
        type: 'unscramble',
        prompt: 'Arrange the tokens into proper grammatical syntax:',
        instruction: 'Click or drag the word chips to reconstruct the sentence.',
        correctAnswer: item.qUnscramble,
        scrambledTokens: item.qTokens,
        explanation: `Proper syntax order: "${item.qUnscramble}".`,
        targetWords: item.vocabularyTargets,
        audioSentence: `${item.qUnscramble}.`,
        category: 'Word Order'
      },
      {
        id: `q${item.id}-4`,
        type: 'speaking-shadow',
        prompt: 'Voice Dictation & Shadowing Practice:',
        instruction: 'Listen carefully, then speak the target sentence clearly into your microphone.',
        correctAnswer: item.ruleExample,
        explanation: 'Focus on native sentence rhythm, linking, and natural stress.',
        targetWords: item.vocabularyTargets,
        audioSentence: item.ruleExample
      }
    ]
  });
}
