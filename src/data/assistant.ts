import { profile, projectHighlights, skillSet } from './portfolio'

/*
 * Rule-based assistant: no API, runs entirely in the browser.
 * Every reply must be grounded in what the site already says. When a visitor
 * asks something the site doesn't cover, point them to email instead of guessing.
 */

export type AssistantAction = { label: string; href: string; external?: boolean }

type Intent = {
  id: string
  /** Label shown on the suggestion chip that leads to this intent. */
  prompt: string
  /** Lowercase words or phrases; the intent with the most matches wins. */
  keywords: string[]
  /** Variants rotate so repeat questions don't get an identical answer. */
  replies: string[]
  /** Intent ids offered as follow-up chips after this reply. */
  next: string[]
  actions?: AssistantAction[]
}

const [networkProject, automationProject, upgradeProject] = projectHighlights

const emailAction: AssistantAction = { label: 'Email John Carlo', href: `mailto:${profile.email}` }
const linkedinAction: AssistantAction = { label: 'LinkedIn profile', href: profile.linkedin, external: true }
const projectsAction: AssistantAction = { label: 'See the projects', href: '#projects' }
const contactAction: AssistantAction = { label: 'Go to contact form', href: '#contact' }

// Order matters for ties: the earlier intent wins, so specific intents come first.
const intents: Intent[] = [
  {
    id: 'project-network',
    prompt: 'Network & biometrics project',
    keywords: ['network', 'biometric', 'biometrics', 'infrastructure', 'availability', 'uptime'],
    replies: [
      `${networkProject.title}: ${networkProject.summary}`,
      `On the ${networkProject.title} work, John Carlo validated system availability, monitored performance, and resolved issues that affected operational continuity.`,
    ],
    next: ['project-automation', 'project-upgrade', 'support'],
    actions: [projectsAction],
  },
  {
    id: 'project-automation',
    prompt: 'Internal automation project',
    keywords: ['automation', 'automate', 'automated', 'repetitive', 'manual'],
    replies: [
      `${automationProject.title}: ${automationProject.summary}`,
      'For internal automation, he built process improvements that cut repetitive manual work and made reporting more accurate for business teams.',
    ],
    next: ['project-upgrade', 'project-network', 'skills'],
    actions: [projectsAction],
  },
  {
    id: 'project-upgrade',
    prompt: 'System upgrade project',
    keywords: ['upgrade', 'enterprise', 'migration', 'transition', 'fault resolution'],
    replies: [
      `${upgradeProject.title}: ${upgradeProject.summary}`,
      'During enterprise system upgrades, he coordinated with teams, validated SQL data, and troubleshot faults to keep disruption to a minimum.',
    ],
    next: ['project-network', 'sql', 'why-hire'],
    actions: [projectsAction],
  },
  {
    id: 'projects',
    prompt: 'What has he worked on?',
    keywords: ['project', 'projects', 'work on', 'worked on', 'case study', 'portfolio', 'examples'],
    replies: [
      `Three highlights: ${projectHighlights.map((project) => project.title).join('; ')}. Pick one to hear more.`,
      'His selected work covers infrastructure support, internal automation, and enterprise system upgrades. Which one would you like to hear about?',
    ],
    next: ['project-network', 'project-automation', 'project-upgrade'],
    actions: [projectsAction],
  },
  {
    id: 'sql',
    prompt: 'How does he use SQL?',
    keywords: ['sql', 'query', 'queries', 'database', 'databases', 'data validation'],
    replies: [
      'SQL is at the core of his work: validating data, debugging issues, and monitoring databases. During system upgrades he validated SQL data to keep transitions clean.',
      'He uses SQL daily for data validation and debugging, and pairs it with database monitoring to catch problems before they affect the business.',
    ],
    next: ['support', 'project-upgrade', 'skills'],
  },
  {
    id: 'support',
    prompt: 'Production support & incidents',
    keywords: ['incident', 'incidents', 'triage', 'production', 'troubleshoot', 'outage', 'issue', 'issues', 'on call'],
    replies: [
      'He supports production systems and triages incidents, resolving issues that affect uptime, accuracy, and business continuity.',
      'Production support is his day-to-day: monitoring systems, triaging incidents, troubleshooting faults, and working across teams until things are stable again.',
    ],
    next: ['sql', 'project-network', 'why-hire'],
  },
  {
    id: 'skills',
    prompt: 'What are his strengths?',
    keywords: ['skill', 'skills', 'strength', 'strengths', 'good at', 'expertise', 'tools', 'tech', 'stack'],
    replies: [
      `His core strengths: ${skillSet.join(', ')}.`,
      'He is strongest where reliability matters: SQL, database monitoring, production support, incident triage, and improving operational processes.',
    ],
    next: ['sql', 'support', 'projects'],
  },
  {
    id: 'experience',
    prompt: 'How much experience does he have?',
    keywords: ['experience', 'years', 'background', 'career', 'history', 'offshore'],
    replies: [
      'John Carlo has 4+ years of professional experience in offshore production support, SQL validation, and incident triage.',
      'Over 4+ years, he has worked in database monitoring, fault resolution, automation support, and cross-functional collaboration to keep systems reliable.',
    ],
    next: ['projects', 'skills', 'availability'],
  },
  {
    id: 'profile',
    prompt: 'Who is John Carlo?',
    keywords: ['profile', 'who', 'about', 'yourself', 'introduce', 'summary', 'role'],
    replies: [
      `${profile.name} is a ${profile.role} focused on production support, SQL validation, and incident resolution.`,
      'John Carlo keeps production systems stable. He validates SQL operations, troubleshoots faults, and improves reporting and operational efficiency across teams.',
    ],
    next: ['experience', 'skills', 'projects'],
  },
  {
    id: 'why-hire',
    prompt: 'Why should we hire him?',
    keywords: ['why hire', 'why should', 'stand out', 'fit', 'value', 'bring', 'team'],
    replies: [
      'He brings 4+ years of keeping production systems stable: SQL validation, fast incident triage, and a habit of automating repetitive work so teams can focus on what matters.',
      'He is dependable under pressure. He resolves faults, validates data during high-risk upgrades, coordinates across teams, and improves processes along the way.',
    ],
    next: ['projects', 'contact', 'resume'],
    actions: [emailAction],
  },
  {
    id: 'availability',
    prompt: 'Is he open to opportunities?',
    keywords: ['available', 'availability', 'open to', 'hiring', 'hire', 'job', 'role', 'opportunity', 'opportunities', 'looking'],
    replies: [
      'Yes. He is open to opportunities in database operations, production support, incident resolution, and operational process improvement.',
      'He is currently open to new roles, especially in database operations and production support. Email is the quickest way to start a conversation.',
    ],
    next: ['why-hire', 'contact', 'location'],
    actions: [emailAction],
  },
  {
    id: 'contact',
    prompt: 'How can I contact him?',
    keywords: ['contact', 'email', 'reach', 'message', 'talk', 'connect', 'linkedin', 'call'],
    replies: [
      `You can email John Carlo at ${profile.email} or connect with him on LinkedIn.`,
      `The fastest way is email: ${profile.email}. He is also on LinkedIn.`,
    ],
    next: ['contact-form', 'availability', 'resume'],
    actions: [emailAction, linkedinAction],
  },
  {
    id: 'contact-form',
    prompt: 'How does the contact form work?',
    keywords: ['form', 'send a message', 'contact form'],
    replies: [
      'Fill in your name, email, and a short message at the bottom of the page. It opens a ready-to-send email draft in your mail app.',
    ],
    next: ['contact', 'availability', 'profile'],
    actions: [contactAction],
  },
  {
    id: 'resume',
    prompt: 'Can I see his resume?',
    keywords: ['resume', 'cv', 'curriculum', 'download'],
    replies: [
      'A downloadable resume isn’t on this site yet. His LinkedIn profile has his professional background, or you can request a resume by email.',
    ],
    next: ['experience', 'contact', 'projects'],
    actions: [linkedinAction, emailAction],
  },
  {
    id: 'location',
    prompt: 'Where is he based?',
    keywords: ['where', 'location', 'based', 'country', 'remote', 'onsite', 'relocate', 'timezone', 'time zone', 'hybrid'],
    replies: [
      'His location and preferred work arrangement aren’t listed here. It’s best to ask him directly by email. He does have experience working in offshore support.',
    ],
    next: ['availability', 'contact', 'experience'],
    actions: [emailAction],
  },
  {
    id: 'salary',
    prompt: 'What are his rate expectations?',
    keywords: ['salary', 'rate', 'pay', 'compensation', 'expected', 'expectation', 'cost', 'price'],
    replies: ['Compensation is best discussed with him directly. Send a quick email and he will get back to you.'],
    next: ['availability', 'why-hire', 'contact'],
    actions: [emailAction],
  },
  {
    id: 'bot',
    prompt: 'Are you an AI?',
    keywords: ['ai', 'bot', 'robot', 'chatgpt', 'claude', 'real person', 'human'],
    replies: [
      'I’m a lightweight assistant built into this site. I answer from what’s on this page, so for anything else, John Carlo is happy to answer by email.',
    ],
    next: ['profile', 'projects', 'contact'],
  },
  {
    id: 'greeting',
    prompt: 'Hi!',
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening', 'how are you', 'yo', 'kumusta'],
    replies: [
      'Hello! I can tell you about John Carlo’s experience, projects, and how to reach him.',
      'Hi there! What would you like to know about John Carlo?',
    ],
    next: ['profile', 'projects', 'contact'],
  },
  {
    id: 'thanks',
    prompt: 'Thanks!',
    keywords: ['thanks', 'thank you', 'thank', 'salamat', 'appreciate', 'great', 'awesome', 'cool', 'nice'],
    replies: ['You’re welcome! Anything else you’d like to know?', 'Happy to help. Is there anything else?'],
    next: ['projects', 'why-hire', 'contact'],
  },
  {
    id: 'bye',
    prompt: 'Goodbye',
    keywords: ['bye', 'goodbye', 'see you', 'later', 'that is all', "that's all"],
    replies: [`Thanks for stopping by! You can always reach John Carlo at ${profile.email}.`],
    next: ['contact', 'profile'],
    actions: [emailAction],
  },
]

const intentsById = new Map(intents.map((intent) => [intent.id, intent]))

const fallback = {
  replies: [
    'I don’t have an answer for that one. I can tell you about his experience, projects, skills, or how to get in touch.',
    'That’s outside what I know. Try one of the topics below, or ask John Carlo directly by email.',
  ],
  next: ['profile', 'projects', 'contact'],
  actions: [emailAction],
}

export const assistantGreeting = [
  'Hi! I can share John Carlo’s background and help you connect quickly.',
  'What would you like to know?',
]

export const initialSuggestions = ['profile', 'projects', 'skills', 'contact']

export function suggestionLabel(intentId: string) {
  return intentsById.get(intentId)?.prompt ?? intentId
}

function normalize(text: string) {
  return ` ${text.toLowerCase().replace(/[’']/g, "'").replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim()} `
}

function matchIntent(text: string) {
  const normalized = normalize(text)
  let best: Intent | undefined
  let bestScore = 0

  for (const intent of intents) {
    // Whole-word/phrase matching so "hi" doesn't match "his".
    const score = intent.keywords.reduce((total, keyword) => total + (normalized.includes(` ${keyword} `) ? 1 : 0), 0)
    if (score > bestScore) {
      best = intent
      bestScore = score
    }
  }
  return best
}

export type AssistantReply = { text: string; next: string[]; actions?: AssistantAction[] }

/**
 * Picks a reply for free text, or for a chip click when `intentId` is given.
 * `turnCounts` tracks how often each intent has answered, to rotate variants.
 */
export function getAssistantReply(text: string, turnCounts: Map<string, number>, intentId?: string): AssistantReply {
  const intent = (intentId && intentsById.get(intentId)) || matchIntent(text)
  const key = intent?.id ?? 'fallback'
  const source = intent ?? fallback
  const count = turnCounts.get(key) ?? 0
  turnCounts.set(key, count + 1)

  return {
    text: source.replies[count % source.replies.length],
    next: source.next,
    actions: source.actions,
  }
}
