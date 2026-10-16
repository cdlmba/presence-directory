export const SITE = {
  title: 'The Presence Directory',
  tagline: 'A curated public directory of home AI systems for executive dads.',
  description:
    'The Presence Directory lists home AI systems reviewed for whether they help a father be present with his family.',
  url: 'https://presence.thesystemsdad.com',
  submitEmail: 'chris@christopherlynnsystems.com',
} as const;

export const OFFERS = {
  checklist: {
    href: '/checklist',
    label: 'Presence Checklist',
  },
  guided: {
    name: 'Presence Build, Guided',
    price: '$97',
    href: 'https://buy.stripe.com/cNiaEXbVc1zUaC6ewUdnW0k',
    includes:
      'Includes the Presence Checklist, a kickoff call with Christopher, and a check-in two weeks later.',
  },
  discovery: {
    name: 'Discovery call',
    duration: '30 min, free',
    href: 'https://calendar.app.google/av21uA54RnvWJbSs7',
  },
} as const;

export const SUBMIT_MAILTO = (() => {
  const subject = 'Presence Directory submission';
  const body = [
    'System name:',
    'URL:',
    'Category:',
    'Price (as the maker states it):',
    '',
    'Why this might belong in the directory:',
    '',
  ].join('\n');

  return `mailto:${SITE.submitEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
})();
