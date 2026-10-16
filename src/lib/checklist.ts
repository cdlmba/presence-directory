export const CHECKLIST = {
  title: 'The Presence Checklist',
  companion:
    'Free companion to The Presence Audit. Work through it once this week, then come back to it every quarter.',
  intro: [
    "The goal isn't a perfect house. It's getting home off your memory so you can be there in the evenings. Take each section and check what's already true. Anything you leave unchecked is your next step.",
    "Don't try to fix everything at once. Pick the three unchecked items that cost you the most attention and start there.",
  ],
  sections: [
    {
      title: '1. Presence: name the target',
      groups: [
        {
          items: [
            "I've written one or two sentences about what a present evening looks like for me.",
            'I have a set time when work stops on weeknights, and my family knows what it is.',
            'My phone has a place to live from dinner until the kids are in bed.',
            'Work email and chat notifications are off after my stop time.',
            'I have a five-minute shutdown routine at the end of the workday that gets tomorrow out of my head.',
          ],
        },
      ],
    },
    {
      title: '2. Mental load: get it out of your head',
      groups: [
        {
          heading: 'Calendar',
          items: [
            "There's one shared family calendar, and both parents use it.",
            'Practices, appointments, travel, and date nights all go on it as soon as we know about them.',
            'Recurring events are set to repeat automatically, so nobody has to re-enter them.',
            'We take ten minutes each week to look at the week ahead together.',
          ],
        },
        {
          heading: 'Bills',
          items: [
            "Every recurring bill is on autopay, or it has a reminder set before it's due.",
            "There's one list of what's due, when, and from which account.",
            'Someone other than me knows where that list is.',
          ],
        },
        {
          heading: 'School forms',
          items: [
            'School emails go to one place that both parents can see.',
            "There's a single spot where permission slips and sign-ups land, so they don't get lost on the counter.",
            'Forms and RSVPs get handled within 48 hours, or they go on the calendar with a deadline.',
          ],
        },
        {
          heading: 'Groceries',
          items: [
            "There's one shared grocery list that anyone in the house can add to.",
            "We have a standing list of staples, so we're not rebuilding it every week.",
            'The weekly meal plan takes less than fifteen minutes to put together.',
          ],
        },
      ],
    },
    {
      title: '3. Agreements: who owns what',
      groups: [
        {
          items: [
            "My spouse and I have talked through who owns each area of home, and we both agree. If you're a single dad or co-parenting, do this with whoever shares the load with you.",
            'Each area has one owner. "We both do it" usually means nobody does.',
            'The agreement is written down somewhere we can both find it.',
            'We revisit it when seasons change: a new school year, a new job, a new baby.',
          ],
        },
      ],
    },
    {
      title: '4. Household info: one source of truth',
      groups: [
        {
          items: [
            'Passwords live in a shared password manager instead of my head or a sticky note.',
            'Account numbers, insurance, and medical details are kept in one secure place.',
            'School details, like teachers, pickup rules, and portal logins, are in that same place.',
            'My spouse could find anything important if I were unreachable for a week.',
            'Paper that matters gets scanned or filed the same week it shows up.',
          ],
        },
      ],
    },
    {
      title: '5. Rest: protect the margin',
      groups: [
        {
          items: [
            'We have a day of rest each week, and we protect it.',
            "The week's admin gets done before that day, not on it.",
            "Work stays off that day unless it's a true emergency.",
            'I have at least one regular rhythm, like prayer, Scripture, or a quiet walk, that resets me.',
          ],
        },
      ],
    },
    {
      title: '6. Keep it running',
      groups: [
        {
          items: [
            "Every system above has an owner and a reminder, so it doesn't drift.",
            'Once a quarter, I take The Presence Audit again and compare my score.',
            'When something slips, we fix the system rather than blame the person.',
          ],
        },
      ],
    },
  ],
  next: {
    title: "What's next",
    protect: 'If most of this is already checked, protect it. Systems drift, especially when work gets busy.',
    guidedBefore: 'If you\'d like to build it yourself with some guidance, ',
    guidedName: 'Presence Build, Guided',
    guidedAfter:
      ' is $97. You get this checklist, a kickoff call with me, and a check-in two weeks later. ',
    guidedLinkLabel: 'Get Presence Build, Guided',
    guidedHref: 'https://buy.stripe.com/cNiaEXbVc1zUaC6ewUdnW0k',
    dfy: "If you'd rather have it built for you, book a free 30-minute discovery call. We'll look at what's going on at home and whether I'm the right person to help. No pitch. ",
    dfyLinkLabel: 'Book a discovery call',
    dfyHref: 'https://calendar.app.google/av21uA54RnvWJbSs7',
    closer: "The kids don't need you to remember the water bill. They need you there when they tell you about their day.",
  },
} as const;

export function checklistItemId(sectionIndex: number, groupIndex: number, itemIndex: number) {
  return `s${sectionIndex}-g${groupIndex}-i${itemIndex}`;
}
