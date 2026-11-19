import type { SVGProps } from 'react';
import type { MedallionKey } from '../../content/teachers';

const MEDALLION_FILL: Record<MedallionKey, string> = {
  saffron: 'var(--saffron)',
  coral: 'var(--accent)',
  lotus: 'var(--lotus)',
  lilac: 'var(--lilac)',
  leaf: 'var(--leaf)',
  peach: 'var(--peach)',
};

/**
 * Circular "sun medallion" portrait for each of the six teachers.
 * Each has a horizon band in the teacher's medallion colour, concentric ripple rings,
 * and a bespoke faceless silhouette in their favourite yoga pose.
 */
export function TeacherMedallion({
  teacherId,
  medallion,
  name,
  idPrefix = 'medallion',
  className = 'size-36',
  ...props
}: SVGProps<SVGSVGElement> & {
  teacherId: string;
  medallion: MedallionKey;
  name?: string;
  /** Keeps clip-path ids unique when the same teacher appears twice on a page. */
  idPrefix?: string;
}) {
  const fill = MEDALLION_FILL[medallion];
  const clipId = `${idPrefix}-clip-${teacherId}`;

  return (
    <svg
      viewBox="0 0 160 160"
      fill="none"
      role={name ? 'img' : undefined}
      aria-label={name ? `${name} illustrated sun medallion` : undefined}
      aria-hidden={name ? undefined : true}
      className={className}
      {...props}
    >
      <defs>
        <clipPath id={clipId}>
          <circle cx="80" cy="80" r="74" />
        </clipPath>
      </defs>

      {/* Outer ripple rings */}
      <circle cx="80" cy="80" r="78" stroke="var(--line)" strokeWidth="1.5" strokeDasharray="3 5" />
      <circle cx="80" cy="80" r="74" fill="var(--surface)" stroke="var(--art-ink)" strokeWidth="1.5" />

      <g clipPath={`url(#${clipId})`}>
        {/* Soft upper sky tint */}
        <rect x="6" y="6" width="148" height="90" fill="var(--band)" opacity="0.65" />
        {/* Concentric sun ripple rings */}
        <circle cx="80" cy="96" r="54" stroke={fill} strokeWidth="1.5" opacity="0.45" />
        <circle cx="80" cy="96" r="36" fill={fill} opacity="0.28" />
        {/* Signature medallion colour horizon band */}
        <path d="M6 94 Q80 84 154 94 L154 154 L6 154 Z" fill={fill} opacity="0.78" />
        <path d="M6 94 Q80 84 154 94" stroke="var(--art-ink)" strokeWidth="1.5" />
        {/* Pond ripple lines */}
        <path d="M28 124 Q80 128 132 124" stroke="var(--surface)" strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />
        <path d="M44 137 Q80 140 116 137" stroke="var(--surface)" strokeWidth="1.2" strokeLinecap="round" opacity="0.55" />

        {/* Teacher-specific favourite pose silhouette */}
        {renderPose(teacherId)}
      </g>
    </svg>
  );
}

function renderPose(teacherId: string) {
  switch (teacherId) {
    case 'maya-okafor':
      // Low lunge facing the window (arms rising gently toward sunrise)
      return (
        <g fill="var(--art-ink)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Mat */}
          <line x1="30" y1="112" x2="130" y2="112" strokeWidth="2.5" />
          {/* Head */}
          <circle cx="77" cy="46" r="9" />
          {/* Raised arms toward the sun */}
          <path d="M77 57 C82 44 90 32 96 24" fill="none" strokeWidth="6" />
          <path d="M74 58 C78 44 82 32 84 22" fill="none" strokeWidth="5.5" />
          {/* Torso */}
          <path d="M71 56 C69 68 68 80 71 91 L82 91 C84 78 84 66 82 56 Z" />
          {/* Front bent leg & back kneeling leg */}
          <path d="M79 88 L102 88 L104 111" fill="none" strokeWidth="7.5" />
          <path d="M72 89 L56 108 L36 109" fill="none" strokeWidth="7" />
        </g>
      );

    case 'daniel-reyes':
      // Tree pose, wobbles and all
      return (
        <g fill="var(--art-ink)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="38" y1="120" x2="122" y2="120" strokeWidth="2.5" />
          <circle cx="80" cy="36" r="9" />
          {/* Arms lifted like gentle branches */}
          <path d="M74 52 C60 44 54 32 58 22" fill="none" strokeWidth="5.5" />
          <path d="M86 52 C100 44 106 32 102 22" fill="none" strokeWidth="5.5" />
          {/* Torso */}
          <path d="M72 48 H88 L86 80 H74 Z" />
          {/* Standing leg */}
          <path d="M77 79 L77 118" fill="none" strokeWidth="7.5" />
          {/* Bent tree leg resting at calf/thigh */}
          <path d="M84 79 L103 88 L82 97" fill="none" strokeWidth="6.5" />
        </g>
      );

    case 'priya-nair':
      // Supported bridge over a block/bolster
      return (
        <g fill="var(--art-ink)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="24" y1="112" x2="136" y2="112" strokeWidth="2.5" />
          {/* Cork block under sacrum */}
          <rect x="69" y="92" width="16" height="19" rx="3" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
          {/* Head & shoulders resting on mat */}
          <circle cx="42" cy="102" r="8.5" />
          {/* Elevated arched torso & hips */}
          <path d="M51 106 C60 94 72 82 86 84 C98 85 104 94 108 110" fill="none" strokeWidth="9" />
          {/* Arms resting calmly along the floor */}
          <path d="M54 109 L94 109" fill="none" strokeWidth="5" />
          {/* Feet grounded */}
          <path d="M108 110 L118 110" fill="none" strokeWidth="5" />
        </g>
      );

    case 'hana-sato':
      // Dragonfly (wide-legged seated forward fold over a bolster)
      return (
        <g fill="var(--art-ink)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="24" y1="114" x2="136" y2="114" strokeWidth="2.5" />
          {/* Bolster in front */}
          <rect x="76" y="96" width="38" height="15" rx="7.5" fill="var(--peach)" stroke="var(--art-ink)" strokeWidth="1.5" />
          {/* Seated legs extended wide */}
          <path d="M40 110 L116 111" fill="none" strokeWidth="7.5" />
          {/* Softly rounded forward-folding back */}
          <path d="M54 108 C54 84 74 74 96 86" fill="none" strokeWidth="11" />
          {/* Head resting on bolster */}
          <circle cx="102" cy="87" r="8.5" />
          {/* Relaxed forearm */}
          <path d="M76 89 L106 94" fill="none" strokeWidth="5" />
        </g>
      );

    case 'elena-brooks':
      // Supported goddess (reclining open-hip posture on bolster)
      return (
        <g fill="var(--art-ink)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="24" y1="112" x2="136" y2="112" strokeWidth="2.5" />
          {/* Angled bolster under upper back */}
          <path d="M36 110 L72 82 L80 91 L46 112 Z" fill="var(--saffron)" stroke="var(--art-ink)" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="48" cy="79" r="8.5" />
          {/* Reclining torso */}
          <path d="M55 86 L84 104" fill="none" strokeWidth="11" />
          {/* Open knees with soles together */}
          <path d="M84 105 C96 96 110 98 122 108" fill="none" strokeWidth="7.5" />
          {/* Hand resting gently over heart/belly */}
          <path d="M62 91 C70 86 78 90 80 96" fill="none" strokeWidth="4.5" />
        </g>
      );

    case 'theo-lindqvist':
    default:
      // Legs up the wall (Viparita Karani)
      return (
        <g fill="var(--art-ink)" stroke="var(--art-ink)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          {/* Wall line on right & mat on floor */}
          <line x1="116" y1="28" x2="116" y2="114" strokeWidth="2.5" />
          <line x1="28" y1="114" x2="118" y2="114" strokeWidth="2.5" />
          {/* Folded blanket under hips */}
          <rect x="88" y="102" width="26" height="10" rx="4" fill="var(--lilac)" stroke="var(--art-ink)" strokeWidth="1.5" />
          {/* Head resting peacefully */}
          <circle cx="44" cy="105" r="8.5" />
          {/* Lying torso */}
          <path d="M54 107 L102 103" fill="none" strokeWidth="10.5" />
          {/* Legs resting vertically up the wall */}
          <path d="M104 101 L106 42" fill="none" strokeWidth="8" />
          {/* Relaxed feet */}
          <path d="M106 42 L98 40" fill="none" strokeWidth="5" />
          {/* Open resting arm */}
          <path d="M62 108 L48 92" fill="none" strokeWidth="4.5" />
        </g>
      );
  }
}
