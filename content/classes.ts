/** Allowed prop identifiers referenced by class styles and rendered with bespoke SVG icons. */
export const PROP_IDS = [
  'mat',
  'block',
  'bolster',
  'blanket',
  'strap',
  'eye-pillow',
  'chair',
] as const;

export type PropId = (typeof PROP_IDS)[number];

export interface PropDetail {
  id: PropId;
  label: string;
  note: string;
}

/** Studio props provided free of charge for every session. */
export const propsCatalog: Record<PropId, PropDetail> = {
  mat: { id: 'mat', label: 'Cork & rubber mats', note: 'Cleaned after every class' },
  block: { id: 'block', label: 'Cork blocks', note: 'Bring the floor closer' },
  bolster: { id: 'bolster', label: 'Cotton bolsters', note: 'Firm support for long rests' },
  blanket: { id: 'blanket', label: 'Woven blankets', note: 'Folded for knees, hips or warmth' },
  strap: { id: 'strap', label: 'Cotton straps', note: 'Easy reach without pulling' },
  'eye-pillow': { id: 'eye-pillow', label: 'Unscented eye pillows', note: 'Fresh washable slips each class' },
  chair: { id: 'chair', label: 'Folding yoga chairs', note: 'Sturdy support seated or standing' },
};

export interface ClassStyle {
  /** Lowercase URL-safe stable identifier, also used as the `/classes/#<id>` anchor. */
  id: string;
  /** Display name shown on Home, Classes and Timetable. */
  name: string;
  /** Effort scale from 1 (very gentle) to 3 (steady warmth). */
  intensity: 1 | 2 | 3;
  /** Usual duration in minutes; individual timetable sessions may differ. */
  durationMinutes: number;
  /** One-line summary for Home pads and previews. */
  summary: string;
  /** Two to three sentences in the studio's calm voice for the Classes almanac. */
  description: string;
  /** Short audience / mood tags shown as chips. */
  goodFor: readonly string[];
  /** Props typically set out for this class. */
  props: readonly PropId[];
  /** Whether complete beginners are welcome without prior experience. */
  beginnerFriendly: boolean;
}

/** All nine regular class styles taught at Sunrise Lotus Yoga. */
export const classStyles: readonly ClassStyle[] = [
  {
    id: 'sunrise-flow',
    name: 'Sunrise Flow',
    intensity: 2,
    durationMinutes: 60,
    summary: 'Slow sun salutations as the light comes up over the lake.',
    description:
      'We begin quietly on the floor while the east windows soften from indigo to apricot, then build through unhurried sun salutations. Transitions stay uncrowded so you can wake up stiff joints without rushing your breath. You leave warm, awake and ready for the morning outside.',
    goodFor: ['early risers', 'stiff mornings'],
    props: ['mat', 'block', 'strap'],
    beginnerFriendly: true,
  },
  {
    id: 'gentle-hatha',
    name: 'Gentle Hatha',
    intensity: 1,
    durationMinutes: 75,
    summary: 'Held poses, clear cues and plenty of rest between.',
    description:
      'One shape at a time, explained plainly and offered with variations for knees, wrists and shoulders. There is no choreography to memorize and always time to pause between sides. It is the class we suggest most often for first mornings and anyone returning after a quiet season.',
    goodFor: ['first-timers', 'returning after a break'],
    props: ['mat', 'block', 'blanket', 'strap'],
    beginnerFriendly: true,
  },
  {
    id: 'slow-flow',
    name: 'Slow Flow',
    intensity: 2,
    durationMinutes: 60,
    summary: 'Linked movement at the pace of an easy breath.',
    description:
      'Gentle sequences link one pose to the next while keeping the tempo calm enough to hear yourself exhale. We spend time on balance, steady legs and open shoulders rather than speed or heat. It feels grounding after a morning at a screen or before heading home.',
    goodFor: ['lunch breaks', 'gentle strength'],
    props: ['mat', 'block'],
    beginnerFriendly: true,
  },
  {
    id: 'yin',
    name: 'Yin',
    intensity: 1,
    durationMinutes: 75,
    summary: 'Long, quiet floor holds for hips, spine and patience.',
    description:
      'We stay in each shape for three to five minutes, propped up so nothing strains. It is quieter than it sounds, and most people leave feeling taller. Floor cushions, blankets and blocks let tight backs and hips settle at their own pace.',
    goodFor: ['desk bodies', 'winding down'],
    props: ['mat', 'bolster', 'blanket', 'block'],
    beginnerFriendly: true,
  },
  {
    id: 'restorative',
    name: 'Restorative',
    intensity: 1,
    durationMinutes: 75,
    summary: 'Fully supported rest on bolsters and blankets.',
    description:
      'Four or five deeply propped postures over a quiet seventy-five minutes, designed so your muscles can finally stop holding you up. Your teacher adjusts blankets and bolsters until every angle feels effortless. Think of it as an exhale for your whole nervous system.',
    goodFor: ['stress', 'sleep', 'recovery'],
    props: ['mat', 'bolster', 'blanket', 'eye-pillow'],
    beginnerFriendly: true,
  },
  {
    id: 'prenatal',
    name: 'Prenatal',
    intensity: 1,
    durationMinutes: 60,
    summary: 'Steady, supported practice for every trimester.',
    description:
      'Built around pelvic stability, gentle breath and comfortable props that adapt as your body changes week by week. We avoid deep twists and belly-down shapes, and leave time at the start to check in with the room. Please check with your midwife or doctor before starting a prenatal class; our teachers offer movement variations, not medical advice.',
    goodFor: ['pregnancy from 12 weeks'],
    props: ['mat', 'bolster', 'block', 'chair'],
    beginnerFriendly: true,
  },
  {
    id: 'chair-yoga',
    name: 'Chair Yoga',
    intensity: 1,
    durationMinutes: 45,
    summary: 'Seated and standing practice with a chair to hand.',
    description:
      'Every stretch, twist and breath can be done seated, or standing with the chair back beside you for balance. There is no getting up and down from the floor unless you want to. It is warm, companionable and built for real joints at every age.',
    goodFor: ['limited mobility', 'older students'],
    props: ['chair', 'block', 'strap'],
    beginnerFriendly: true,
  },
  {
    id: 'yoga-nidra',
    name: 'Yoga Nidra',
    intensity: 1,
    durationMinutes: 45,
    summary: 'Guided rest lying down; no poses at all.',
    description:
      'You make a warm nest on the mat with a bolster under your knees, a blanket tucked close and an eye pillow if you like. From there, the teacher guides your attention gently through the body and breath while you stay completely still. No stretching, no performance—just unhurried rest.',
    goodFor: ['sleep', 'anxious minds'],
    props: ['mat', 'blanket', 'bolster', 'eye-pillow'],
    beginnerFriendly: true,
  },
  {
    id: 'breathwork',
    name: 'Breathwork',
    intensity: 1,
    durationMinutes: 30,
    summary: 'Simple pranayama to reset a busy day.',
    description:
      'Thirty calm minutes seated on a folded blanket or chair, practicing gentle breathing patterns that lengthen the exhale and settle a racing mind. Nothing forceful or breathless—everything stays soft, steady and easy to carry back to your desk or walk home.',
    goodFor: ['midday reset', 'focus'],
    props: ['mat', 'blanket'],
    beginnerFriendly: true,
  },
];

export const classStyleById = new Map(classStyles.map((item) => [item.id, item]));
