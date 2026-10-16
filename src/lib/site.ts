export const SITE = {
  title: 'The Presence Directory',
  tagline: 'A curated public directory of home AI systems for executive dads.',
  description:
    'The Presence Directory lists home AI systems reviewed for whether they help a father be present with his family.',
  url: 'https://presence.thesystemsdad.com',
  submitEmail: 'chris@christopherlynnsystems.com',
  offer: {
    href: 'https://thesystemsdad.com/',
    label: "Christopher's executive-dad offer",
    placeholderNote: 'Placeholder link. Destination may change.',
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
