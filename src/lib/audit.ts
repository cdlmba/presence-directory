import { OFFERS, SITE } from './site';

export const Q8 = {
  enjoy: 'I enjoy setting up my own tools',
  guide: 'I can follow a clear guide',
  else: "I'd rather someone else set it up",
} as const;

export const Q11 = {
  diy: "I'll do it myself. Send me the Presence Checklist.",
  guided: "I'd like to build it myself with some guidance.",
  dfy: "I'd rather have it built for me.",
  unsure: 'Not sure yet',
} as const;

export const INTRO = {
  kicker: 'A free 5-minute self-assessment for executive dads',
  companion: 'Companion to "How I Onboard an Executive Dad."',
  title: 'How much of your home runs on your memory?',
  body: [
    'You run teams, budgets, and programs all day. Then you come home, and the house runs on whatever is left in your head. The permission slip. The water bill. The dentist appointment nobody put on the calendar.',
    "That's not a character problem. It's a systems problem. And systems problems can be fixed.",
    "This audit takes about 5 minutes. Answer honestly. There are no wrong answers, and nobody is grading you. At the end you'll get a simple snapshot of where you are, plus one next step.",
  ],
  button: 'Start the audit',
} as const;

export const SABBATH_NOTE =
  "I keep Sabbath, so if you reach out on a Sunday, I'll get back to you Monday.";

export const SUBSTACK_CHECKBOX =
  'OK to send me the Presence Checklist and add me to The Systems Dad newsletter on Substack.';

export const Q4_HEADING = 'How much does each of these depend on you remembering it?';
export const Q4_SCALE = {
  lowLabel: '1 = Runs without me',
  midLabel: '3 = Sometimes on me',
  highLabel: '5 = Only works if I remember',
} as const;

export type Choice = {
  label: string;
  points?: number;
};

export type Question =
  | {
      id: string;
      prompt: string;
      section: string;
      type: 'long';
      required: boolean;
      scored: false;
      helper?: string;
    }
  | {
      id: string;
      prompt: string;
      section: string;
      type: 'choice';
      required: boolean;
      scored: boolean;
      helper?: string;
      options: Choice[];
    }
  | {
      id: string;
      prompt: string;
      section: string;
      type: 'scale';
      required: boolean;
      scored: true;
      helper?: string;
      lowLabel: string;
      midLabel?: string;
      highLabel: string;
    };

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    section: 'Presence',
    prompt: 'What does a present evening look like for you?',
    type: 'long',
    required: true,
    scored: false,
    helper: 'One or two sentences. For example: "Off my phone by dinner and on the floor with my kids by 6:30."',
  },
  {
    id: 'q2',
    section: 'Presence',
    prompt: 'Last week, how many weeknights did work stop at the time you wanted it to?',
    type: 'choice',
    required: true,
    scored: true,
    options: [
      { label: 'All 5 nights', points: 1 },
      { label: '4 nights', points: 2 },
      { label: '3 nights', points: 3 },
      { label: '2 nights', points: 4 },
      { label: '0 or 1 night', points: 5 },
    ],
  },
  {
    id: 'q3',
    section: 'Mental load',
    prompt: 'What at home still runs on your memory?',
    type: 'long',
    required: false,
    scored: false,
    helper: 'Write down whatever comes to mind. Most dads are surprised how long this list gets.',
  },
  {
    id: 'q4a',
    section: 'Mental load',
    prompt: 'Calendar (practices, appointments, travel, date nights)',
    type: 'scale',
    required: true,
    scored: true,
    ...Q4_SCALE,
  },
  {
    id: 'q4b',
    section: 'Mental load',
    prompt: "Bills (what's due, when, and from which account)",
    type: 'scale',
    required: true,
    scored: true,
    ...Q4_SCALE,
  },
  {
    id: 'q4c',
    section: 'Mental load',
    prompt: 'School forms (permission slips, sign-ups, teacher emails)',
    type: 'scale',
    required: true,
    scored: true,
    ...Q4_SCALE,
  },
  {
    id: 'q4d',
    section: 'Mental load',
    prompt: 'Groceries (the weekly list, staples, meal plan)',
    type: 'scale',
    required: true,
    scored: true,
    ...Q4_SCALE,
  },
  {
    id: 'q5',
    section: 'Agreements',
    prompt: 'How clear is who owns what at home between you and your spouse?',
    type: 'scale',
    required: true,
    scored: true,
    helper: "If you're a single dad or co-parenting, answer for whoever shares the load with you.",
    lowLabel: '1 = Clear and agreed',
    highLabel: '5 = Mostly unspoken, and a lot of it lands on me',
  },
  {
    id: 'q6',
    section: 'Agreements',
    prompt: 'Where does your household info live? (passwords, schedules, account numbers, school details)',
    type: 'choice',
    required: true,
    scored: true,
    options: [
      { label: 'One place, and everyone who needs it uses it', points: 1 },
      { label: 'Mostly one place, with a few stragglers', points: 2 },
      { label: 'Two or three places', points: 3 },
      { label: 'Scattered across texts, email, and paper', points: 4 },
      { label: 'Mostly in my head', points: 5 },
    ],
  },
  {
    id: 'q7',
    section: 'Agreements',
    prompt: 'Do you have a day of rest that you protect?',
    type: 'choice',
    required: true,
    scored: true,
    options: [
      { label: 'Yes, most weeks', points: 1 },
      { label: 'Sometimes', points: 3 },
      { label: 'Not really', points: 5 },
    ],
  },
  {
    id: 'q8',
    section: 'Tech comfort',
    prompt: 'How comfortable are you with tech at home?',
    type: 'choice',
    required: true,
    scored: false,
    options: [{ label: Q8.enjoy }, { label: Q8.guide }, { label: Q8.else }],
  },
  {
    id: 'q9',
    section: 'Where you are now vs. where you want to be',
    prompt: 'How close are your evenings today to the present evening you described?',
    type: 'scale',
    required: true,
    scored: true,
    lowLabel: "1 = That's most evenings now",
    highLabel: '5 = Far from it',
  },
  {
    id: 'q10',
    section: 'Where you are now vs. where you want to be',
    prompt: 'Where do you want to be 90 days from now?',
    type: 'long',
    required: false,
    scored: false,
    helper: 'Be specific. "Home by 5:15 and not checking email until the kids are in bed" beats "more balance."',
  },
  {
    id: 'q11',
    section: 'Help preference',
    prompt: 'If you fix this, how would you want to do it?',
    type: 'choice',
    required: true,
    scored: false,
    options: [{ label: Q11.diy }, { label: Q11.guided }, { label: Q11.dfy }, { label: Q11.unsure }],
  },
  {
    id: 'q12',
    section: 'Help preference',
    prompt: 'Anything else I should know?',
    type: 'long',
    required: false,
    scored: false,
  },
];

export const STEPS = [
  { id: 'welcome', title: INTRO.title, questionIds: [] as string[] },
  { id: 'presence', title: 'Presence', questionIds: ['q1', 'q2'] },
  { id: 'mental', title: 'Mental load', questionIds: ['q3', 'q4a', 'q4b', 'q4c', 'q4d'] },
  { id: 'agreements', title: 'Agreements', questionIds: ['q5', 'q6', 'q7'] },
  { id: 'tech', title: 'Tech comfort', questionIds: ['q8'] },
  { id: 'now', title: 'Where you are now vs. where you want to be', questionIds: ['q9', 'q10'] },
  { id: 'help', title: 'Help preference', questionIds: ['q11', 'q12'] },
  { id: 'contact', title: 'How should I send your results?', questionIds: [] as string[] },
] as const;

export const SCORED_IDS = ['q2', 'q4a', 'q4b', 'q4c', 'q4d', 'q5', 'q6', 'q7', 'q9'] as const;

export type RouteTag = 'DIY' | 'GUIDED' | 'DFY';

export type Band = {
  id: 1 | 2 | 3;
  range: string;
  name: string;
  paragraphs: string[];
  nextStep: string;
};

export const BANDS: Band[] = [
  {
    id: 1,
    range: '9 to 20',
    name: 'The house mostly runs itself',
    paragraphs: [
      "You've already done a lot of the hard work. Most of your home has an owner, a place, and a reminder, and it shows.",
      'The goal now is to protect it. Systems drift, especially when work gets busy or a new school year starts.',
    ],
    nextStep:
      'Grab the free Presence Checklist and run it once to find the one or two loads that still land on you.',
  },
  {
    id: 2,
    range: '21 to 32',
    name: 'Stretched thin',
    paragraphs: [
      "You're holding it together, but a good part of home is still riding on your memory. That's usually the part that follows you to dinner.",
      "The good news is you don't need to fix everything. Pick the three loads that cost you the most attention and start there.",
    ],
    nextStep:
      "Get the Presence Checklist and work through it this week. If you'd rather have help, book a free discovery call. No pitch.",
  },
  {
    id: 3,
    range: '33 to 45',
    name: 'Running on memory',
    paragraphs: [
      "Right now, a lot of your home only works because you remember it. That's heavy, and it's not because you don't care. You care a lot. You just don't have the margin.",
      "This is very fixable. The kids don't need you to remember the water bill. They need you there when they tell you about their day.",
    ],
    nextStep:
      "Book a free discovery call (30 minutes). We'll look at what's going on at home and whether I'm the right person to help. If the honest answer is that you need a calendar habit and not a new system, I'll tell you that.",
  },
];

export type AnswerValue = {
  label: string;
  points?: number;
};

export type AuditAnswers = Record<string, AnswerValue>;

export type ContactFields = {
  firstName: string;
  email: string;
  phone: string;
  substack: boolean;
};

export type AuditResult = {
  score: number;
  band: Band;
  route: RouteTag;
};

export function questionById(id: string) {
  const question = QUESTIONS.find((item) => item.id === id);
  if (!question) throw new Error(`Unknown question ${id}`);
  return question;
}

export function scoreAnswers(answers: AuditAnswers): number {
  return SCORED_IDS.reduce((sum, id) => {
    const points = answers[id]?.points;
    if (typeof points !== 'number') throw new Error(`Missing scored answer for ${id}`);
    return sum + points;
  }, 0);
}

export function bandForScore(score: number): Band {
  if (score <= 20) return BANDS[0];
  if (score <= 32) return BANDS[1];
  return BANDS[2];
}

export function routeLead(bandId: 1 | 2 | 3, q8: string, q11: string): RouteTag {
  if (q11 === Q11.dfy || (bandId === 3 && q8 === Q8.else) || (bandId === 3 && q11 === Q11.unsure)) {
    return 'DFY';
  }
  if (q11 === Q11.diy || bandId === 1 || (bandId === 2 && (q8 === Q8.enjoy || q8 === Q8.guide))) {
    return 'DIY';
  }
  if (q11 === Q11.guided) {
    return 'GUIDED';
  }
  if (bandId === 3) return 'DFY';
  return 'DIY';
}

export function evaluateAudit(answers: AuditAnswers): AuditResult {
  const score = scoreAnswers(answers);
  const band = bandForScore(score);
  const route = routeLead(band.id, answers.q8.label, answers.q11.label);
  return { score, band, route };
}

export const ROUTE_CTA: Record<
  RouteTag,
  { tag: RouteTag; label: string; href: string; detail: string }
> = {
  DIY: {
    tag: 'DIY',
    label: 'Get the Presence Checklist',
    href: OFFERS.checklist.href,
    detail: 'Free. A next step you can run at home this week.',
  },
  GUIDED: {
    tag: 'GUIDED',
    label: `Buy ${OFFERS.guided.name} (${OFFERS.guided.price})`,
    href: OFFERS.guided.href,
    detail: OFFERS.guided.includes,
  },
  DFY: {
    tag: 'DFY',
    label: `Book a discovery call (${OFFERS.discovery.duration})`,
    href: OFFERS.discovery.href,
    detail: 'No done-for-you price is listed here. That conversation is for the call.',
  },
};

export const RESULT_OPTIONS = [
  { href: OFFERS.checklist.href, label: OFFERS.checklist.label },
  { href: OFFERS.guided.href, label: `${OFFERS.guided.name}, ${OFFERS.guided.price}` },
  { href: OFFERS.discovery.href, label: `${OFFERS.discovery.name} (${OFFERS.discovery.duration})` },
] as const;

export type AuditSubmission = ContactFields &
  AuditResult & {
    answers: AuditAnswers;
  };

export function buildMailto(submission: AuditSubmission): string {
  const lines = [
    'Presence Audit result',
    '',
    `First name: ${submission.firstName}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || '(not given)'}`,
    `Substack opt-in: ${submission.substack ? 'yes' : 'no'}`,
    '',
    `Score: ${submission.score} (range 9 to 45)`,
    `Band: Band ${submission.band.id}: ${submission.band.name}`,
    `Route: ${submission.route}`,
    '',
    'Answers',
  ];

  for (const question of QUESTIONS) {
    const answer = submission.answers[question.id];
    const value = answer?.label?.trim() || '(blank)';
    const points =
      typeof answer?.points === 'number' ? ` [${answer.points} ${answer.points === 1 ? 'point' : 'points'}]` : '';
    lines.push(`${question.id.toUpperCase()}. ${question.prompt}`);
    lines.push(`${value}${points}`);
    lines.push('');
  }

  const subject = `Presence Audit: ${submission.firstName} / Band ${submission.band.id} / ${submission.route}`;
  return `mailto:${SITE.submitEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

/**
 * TODO: POST this payload to the Presence Audit Leads Google Sheet.
 * Columns: submittedAt, firstName, email, phone, substackOptIn, score, band, Route (DIY | GUIDED | DFY), q1-q12.
 * No backend is wired yet, so this stays a no-op until a Sheet webhook exists.
 */
export async function postAuditToGoogleSheet(_payload: AuditSubmission): Promise<void> {
  return Promise.resolve();
}

export function verifyAuditLogic() {
  const cases: Array<[number, 1 | 2 | 3]> = [
    [9, 1],
    [20, 1],
    [21, 2],
    [32, 2],
    [33, 3],
    [45, 3],
  ];
  for (const [score, id] of cases) {
    if (bandForScore(score).id !== id) {
      throw new Error(`Band mismatch for score ${score}`);
    }
  }

  if (routeLead(1, Q8.enjoy, Q11.dfy) !== 'DFY') throw new Error('DFY should lead when Q11 is built for me');
  if (routeLead(3, Q8.else, Q11.diy) !== 'DFY') throw new Error('Band 3 plus someone else should lead to DFY');
  if (routeLead(3, Q8.enjoy, Q11.unsure) !== 'DFY') throw new Error('Band 3 plus not sure should lead to DFY');
  if (routeLead(1, Q8.enjoy, Q11.diy) !== 'DIY') throw new Error('Band 1 DIY should lead to checklist');
  if (routeLead(2, Q8.guide, Q11.guided) !== 'DIY') {
    throw new Error('Band 2 plus a clear guide should lead to checklist even if Q11 is guided');
  }
  if (routeLead(2, Q8.else, Q11.guided) !== 'GUIDED') throw new Error('Explicit guided should lead when not caught earlier');
  if (routeLead(3, Q8.enjoy, Q11.guided) !== 'GUIDED') throw new Error('Band 3 guided without someone-else should be GUIDED');
}
