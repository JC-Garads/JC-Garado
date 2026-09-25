export type ThemeName = 'blue' | 'midnight' | 'sage' | 'forest' | 'sunset'

export type Theme = {
  label: string
  mode: 'light' | 'dark'
  primary: string
  onPrimary: string
  primarySoft: string
  bg: string
  surface: string
  text: string
  muted: string
  border: string
}

export const themes: Record<ThemeName, Theme> = {
  blue: {
    label: 'Blue',
    mode: 'light',
    primary: '#1d4ed8',
    onPrimary: '#ffffff',
    primarySoft: '#e3ebfd',
    bg: '#f6f7fa',
    surface: '#ffffff',
    text: '#0b1220',
    muted: '#5b6475',
    border: 'rgba(11, 18, 32, 0.09)',
  },
  midnight: {
    label: 'Midnight',
    mode: 'dark',
    primary: '#a78bfa',
    onPrimary: '#12091f',
    primarySoft: 'rgba(167, 139, 250, 0.14)',
    bg: '#0b0b12',
    surface: '#13131c',
    text: '#f4f4f8',
    muted: '#9d9db4',
    border: 'rgba(244, 244, 248, 0.09)',
  },
  sage: {
    label: 'Sage',
    mode: 'light',
    primary: '#166534',
    onPrimary: '#ffffff',
    primarySoft: '#ddf1e3',
    bg: '#f3f6f2',
    surface: '#ffffff',
    text: '#122a1b',
    muted: '#56695c',
    border: 'rgba(18, 42, 27, 0.1)',
  },
  forest: {
    label: 'Forest',
    mode: 'dark',
    primary: '#f5b43c',
    onPrimary: '#1a1204',
    primarySoft: 'rgba(245, 180, 60, 0.13)',
    bg: '#09120e',
    surface: '#0f1c16',
    text: '#ecf7f1',
    muted: '#8fa89b',
    border: 'rgba(236, 247, 241, 0.09)',
  },
  sunset: {
    label: 'Sunset',
    mode: 'light',
    primary: '#c2410c',
    onPrimary: '#ffffff',
    primarySoft: '#fde6d4',
    bg: '#faf5f0',
    surface: '#ffffff',
    text: '#2a1306',
    muted: '#7a5b49',
    border: 'rgba(42, 19, 6, 0.1)',
  },
}

export const profile = {
  name: 'John Carlo Garado',
  initials: 'JCG',
  role: 'Database Operations Analyst',
  roleDetail: 'Offshore Support',
  email: 'jcagarado@gmail.com',
  linkedin: 'https://www.linkedin.com/in/john-carlo-garado/',
  photo: '/profile.jpg',
}

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export const stats = [
  { value: '4+ years', label: 'Professional experience' },
  { value: 'SQL', label: 'Validation & debugging' },
  { value: 'Support', label: 'Incident triage' },
]

export const projectHighlights = [
  {
    title: 'Network Infrastructure and Biometrics System',
    summary:
      'Supported critical infrastructure operations by validating system availability, monitoring performance, and resolving technical issues that impacted operational continuity.',
    tags: ['Monitoring', 'Availability', 'Troubleshooting'],
  },
  {
    title: 'Internal Automation',
    summary:
      'Created process improvements and automation support to streamline repetitive tasks, reduce manual effort, and improve reporting accuracy for business teams.',
    tags: ['Automation', 'Reporting', 'Process'],
  },
  {
    title: 'Enterprise System Upgrade & Fault Resolution',
    summary:
      'Helped support system upgrades and troubleshoot faults by coordinating with teams, validating SQL data, and minimizing disruption during transition periods.',
    tags: ['SQL', 'Upgrades', 'Fault Resolution'],
  },
]

export const skillSet = [
  'SQL',
  'Database Monitoring',
  'Production Support',
  'Incident Triage',
  'Fault Resolution',
  'Automation',
  'Reporting',
  'Data Validation',
]
