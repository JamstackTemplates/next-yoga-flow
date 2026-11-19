/** Palette keys matching each teacher's circular medallion portrait. */
export const MEDALLION_KEYS = ['saffron', 'coral', 'lotus', 'lilac', 'leaf', 'peach'] as const;

export type MedallionKey = (typeof MEDALLION_KEYS)[number];

export interface Teacher {
  /** Lowercase URL-safe stable identifier, also used as the `/teachers/#<id>` anchor. */
  id: string;
  /** Full name shown on medallions, Teachers page and timetable petals. */
  name: string;
  /** Short studio role shown beneath the name. */
  role: string;
  /** Four-digit year the teacher began teaching. */
  teachingSince: number;
  /** Concise credential or training line. */
  training: string;
  /** Two to three sentences introducing the teacher's style and warmth. */
  bio: string;
  /** Pose depicted in the teacher's bespoke SVG medallion. */
  favouritePose: string;
  /** Palette colour key for the teacher's medallion band. */
  medallion: MedallionKey;
}

/**
 * The six teachers at Sunrise Lotus Yoga.
 * Which classes each teacher leads is derived automatically from `content/timetable.ts`.
 */
export const teachers: readonly Teacher[] = [
  {
    id: 'maya-okafor',
    name: 'Maya Okafor',
    role: 'Founder, sunrise teacher',
    teachingSince: 2009,
    training: '500-hour RYT, yoga therapy studies',
    bio: 'Maya opened Sunrise Lotus after ten years of teaching early classes around the East Bay, dreaming of a room where nobody had to apologise for tight hamstrings. Her cues are unhurried and practical, always watching the light on the water as much as the clock. She brews the ginger-mint tea before the doors unlock at six.',
    favouritePose: 'Low lunge facing the window',
    medallion: 'saffron',
  },
  {
    id: 'daniel-reyes',
    name: 'Daniel Reyes',
    role: 'Hatha and flow',
    teachingSince: 2014,
    training: '300-hour RYT',
    bio: 'Daniel came to yoga after years of cycling the Oakland hills with a stubbornly sore lower back. He teaches clear, grounded classes that treat balance poses with good humour and leave room for a sigh. Students say his pacing makes a sixty-minute morning feel twice as restful.',
    favouritePose: 'Tree pose, wobbles and all',
    medallion: 'coral',
  },
  {
    id: 'priya-nair',
    name: 'Priya Nair',
    role: 'Hatha and restorative',
    teachingSince: 2012,
    training: '500-hour RYT, Iyengar-influenced',
    bio: 'Priya loves the quiet craft of props—how a single folded blanket under the shoulders or a block beneath one hand can turn a struggle into relief. Her classes move thoughtfully from steady alignment into long, settled rest. She keeps a notebook of every student’s preferred bolster setup.',
    favouritePose: 'Supported bridge',
    medallion: 'lotus',
  },
  {
    id: 'hana-sato',
    name: 'Hana Sato',
    role: 'Yin and restorative',
    teachingSince: 2016,
    training: '200-hour RYT, yin and restorative certificates',
    bio: 'Hana’s evening rooms are hushed, warm and lit low as dusk settles over Lake Merritt. She gives students clear ways to soften out of tension without forcing depth, letting gravity and patience do the quiet work. Many regulars call her Monday yin their reset button for the week.',
    favouritePose: 'Dragonfly',
    medallion: 'lilac',
  },
  {
    id: 'elena-brooks',
    name: 'Elena Brooks',
    role: 'Prenatal and chair',
    teachingSince: 2011,
    training: 'Prenatal and chair yoga certificates, former nurse',
    bio: 'After fifteen years as a labour and community nurse, Elena brings steady calm and deep respect for changing bodies to every room. Her chair and prenatal sessions focus on comfort, breath and choices that honour how you feel that morning. Everyone leaves feeling looked after, never hurried.',
    favouritePose: 'Supported goddess',
    medallion: 'leaf',
  },
  {
    id: 'theo-lindqvist',
    name: 'Theo Lindqvist',
    role: 'Breathwork and yoga nidra',
    teachingSince: 2018,
    training: 'Pranayama and yoga nidra training',
    bio: 'Theo specialises in the quieter half of practice—breath, stillness and the Sunday community flow that welcomes the whole neighbourhood. His voice is calm and unhurried, guiding restless minds out of their inbox and back into the room. He believes a good thirty-minute exhale can change an entire afternoon.',
    favouritePose: 'Legs up the wall',
    medallion: 'peach',
  },
];

export const teacherById = new Map(teachers.map((item) => [item.id, item]));
