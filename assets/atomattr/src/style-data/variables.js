const BREAKPOINT_MAP = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

const PSEUDO_LIST = [
  'hover',
  'focus',
  'focus-visible',
  'focus-within',
  'active',
  'visited',
  'disabled',
  'checked',
  'required',
  'invalid',
  'first',
  'last',
  'odd',
  'even',
];

const RAW_HTML_ATTRS = [
  'id',
  'class',
  'className',
  'style',
  'title',
  'lang',
  'dir',
  'translate',
  'role',
  'tabindex',
  'tabIndex',
  'type',
  'name',
  'value',
  'placeholder',
  'checked',
  'disabled',
  'selected',
  'multiple',
  'src',
  'alt',
  'href',
  'rel',
  'target',
  'download',
  'for',
  'htmlFor',
  'method',
  'action',
  'accept',
  'autocomplete',
  'autoComplete',
  'autofocus',
  'autoFocus',
  'min',
  'max',
  'step',
  'rows',
  'cols',
  'width',
  'height',
  'loading',
  'decoding',
  'poster',
  'controls',
  'autoplay',
  'autoPlay',
  'loop',
  'muted',
  'preload',
  'open',
  'draggable',
  'contenteditable',
  'contentEditable',
  'spellcheck',
  'spellCheck',
  'onclick',
  'onchange',
  'onsubmit',
  'oninput',
  'onfocus',
  'onblur',
  'onload',
  'onerror',
];

const SHADES = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];

function mapScale(name, values) {
  return Object.fromEntries(values.map((value, index) => [`${name}-${SHADES[index]}`, value]));
}

function mapScaleAliases(names, values) {
  return Object.fromEntries(
    names.flatMap(name => values.map((value, index) => [`${name}-${SHADES[index]}`, value]))
  );
}

const grayValues = [
  '#f9fafb',
  '#f3f4f6',
  '#e5e7eb',
  '#d1d5db',
  '#9ca3af',
  '#6b7280',
  '#4b5563',
  '#374151',
  '#1f2937',
  '#111827',
  '#030712',
];

const powderBlueValues = [
  '#f8fbff',
  '#eef6ff',
  '#dceafe',
  '#c2dcff',
  '#a8cfff',
  '#83b6ff',
  '#5a98f4',
  '#3f78cf',
  '#315fa7',
  '#24467c',
  '#132a4a',
];

const darkOrangeValues = [
  '#fff7ed',
  '#ffedd5',
  '#fed7aa',
  '#fdba74',
  '#fb923c',
  '#f97316',
  '#ea580c',
  '#c2410c',
  '#9a2c0a',
  '#7c2d12',
  '#431407',
];

export const DEFAULT_UNIT = 'px';

export const SPACING_SCALE = {
  '0': '0px',
  '0.5': '2px',
  '1': '4px',
  '1.5': '6px',
  '2': '8px',
  '2.5': '10px',
  '3': '12px',
  '3.5': '14px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '9': '36px',
  '10': '40px',
  '11': '44px',
  '12': '48px',
  '14': '56px',
  '16': '64px',
  '20': '80px',
  '24': '96px',
  '28': '112px',
  '32': '128px',
  '36': '144px',
  '40': '160px',
  '44': '176px',
  '48': '192px',
  '52': '208px',
  '56': '224px',
  '60': '240px',
  '64': '256px',
  '72': '288px',
  '80': '320px',
  '96': '384px',
  px: '1px',
  auto: 'auto',
  full: '100%',
  half: '50%',
  third: '33.333333%',
  quarter: '25%',
  fit: 'fit-content',
  min: 'min-content',
  max: 'max-content',
  screen: '100vw',
};

export const RADIUS_SCALE = {
  none: '0px',
  sm: '2px',
  base: '4px',
  md: '6px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
};

export const FONT_SIZE_SCALE = {
  xs: '12px',
  sm: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
  '5xl': '48px',
  '6xl': '60px',
  '7xl': '72px',
  '8xl': '96px',
  '9xl': '128px',
};

export const FONT_WEIGHT = {
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
};

export const LINE_HEIGHT = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
  '3': '12px',
  '4': '16px',
  '5': '20px',
  '6': '24px',
  '7': '28px',
  '8': '32px',
  '9': '36px',
  '10': '40px',
};

export const LETTER_SPACING = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
};

export const SHADOW_PRESETS = {
  sm: '0 1px 2px 0 rgb(15 23 42 / 0.08)',
  base: '0 1px 3px 0 rgb(15 23 42 / 0.12), 0 1px 2px -1px rgb(15 23 42 / 0.12)',
  md: '0 10px 20px -12px rgb(15 23 42 / 0.18), 0 6px 8px -6px rgb(15 23 42 / 0.14)',
  lg: '0 18px 28px -18px rgb(15 23 42 / 0.24), 0 10px 14px -10px rgb(15 23 42 / 0.18)',
  xl: '0 28px 40px -24px rgb(15 23 42 / 0.28), 0 14px 18px -14px rgb(15 23 42 / 0.22)',
  '2xl': '0 36px 60px -28px rgb(15 23 42 / 0.34)',
  inner: 'inset 0 2px 4px 0 rgb(15 23 42 / 0.08)',
  none: 'none',
};

export const GRID_COLS_SCALE = {
  '1': 'repeat(1, minmax(0, 1fr))',
  '2': 'repeat(2, minmax(0, 1fr))',
  '3': 'repeat(3, minmax(0, 1fr))',
  '4': 'repeat(4, minmax(0, 1fr))',
  '5': 'repeat(5, minmax(0, 1fr))',
  '6': 'repeat(6, minmax(0, 1fr))',
  '7': 'repeat(7, minmax(0, 1fr))',
  '8': 'repeat(8, minmax(0, 1fr))',
  '9': 'repeat(9, minmax(0, 1fr))',
  '10': 'repeat(10, minmax(0, 1fr))',
  '11': 'repeat(11, minmax(0, 1fr))',
  '12': 'repeat(12, minmax(0, 1fr))',
  'auto': 'auto',
  'subgrid': 'subgrid',
};

export const GRID_ROWS_SCALE = {
  '1': 'repeat(1, minmax(0, 1fr))',
  '2': 'repeat(2, minmax(0, 1fr))',
  '3': 'repeat(3, minmax(0, 1fr))',
  '4': 'repeat(4, minmax(0, 1fr))',
  '5': 'repeat(5, minmax(0, 1fr))',
  '6': 'repeat(6, minmax(0, 1fr))',
  'auto': 'auto',
  'subgrid': 'subgrid',
};

export const BREAKPOINTS = BREAKPOINT_MAP;
export const PSEUDO_STATES = PSEUDO_LIST;

export const VALUE_ALIASES = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  stretch: 'stretch',
  baseline: 'baseline',
  row: 'row',
  col: 'column',
  'row-reverse': 'row-reverse',
  'col-reverse': 'column-reverse',
  auto: 'auto',
  none: 'none',
  inherit: 'inherit',
  initial: 'initial',
  unset: 'unset',
  full: '100%',
  half: '50%',
  third: '33.333333%',
  quarter: '25%',
  fit: 'fit-content',
  'fit-content': 'fit-content',
  min: 'min-content',
  max: 'max-content',
  'min-content': 'min-content',
  'max-content': 'max-content',
  screen: '100vw',
  block: 'block',
  'inline-block': 'inline-block',
  inline: 'inline',
  flex: 'flex',
  grid: 'grid',
  hidden: 'hidden',
  visible: 'visible',
  scroll: 'scroll',
  clip: 'clip',
  pointer: 'pointer',
  default: 'default',
  grab: 'grab',
  grabbing: 'grabbing',
  'not-allowed': 'not-allowed',
  wait: 'wait',
  text: 'text',
  move: 'move',
  'col-resize': 'col-resize',
  'row-resize': 'row-resize',
  'zoom-in': 'zoom-in',
  'zoom-out': 'zoom-out',
  thin: '100',
  extralight: '200',
  light: '300',
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
  extrabold: '800',
  black: '900',
  underline: 'underline',
  'line-through': 'line-through',
  'no-underline': 'none',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
  capitalize: 'capitalize',
  'normal-case': 'none',
  nowrap: 'nowrap',
  pre: 'pre',
  'pre-line': 'pre-line',
  'pre-wrap': 'pre-wrap',
  'break-spaces': 'break-spaces',
  cover: 'cover',
  contain: 'contain',
  fill: 'fill',
  'scale-down': 'scale-down',
  absolute: 'absolute',
  relative: 'relative',
  fixed: 'fixed',
  sticky: 'sticky',
  static: 'static',
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
  'resize-none': 'none',
  'resize-x': 'horizontal',
  'resize-y': 'vertical',
  'resize-both': 'both',
  'aspect-video': '16 / 9',
  'aspect-square': '1 / 1',
  'ease-linear': 'linear',
  'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
  'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
  'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
};

export const COLORS = {
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
  ...mapScale('slate', ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#020617']),
  ...mapScaleAliases(['gray', 'grey'], grayValues),
  ...mapScale('powder-blue', powderBlueValues),
  ...mapScale('zinc', ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b', '#09090b']),
  ...mapScale('neutral', ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0a0a0a']),
  ...mapScale('stone', ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917', '#0c0a09']),
  ...mapScale('red', ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a']),
  ...mapScale('orange', ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#431407']),
  ...mapScale('dark-orange', darkOrangeValues),
  ...mapScale('amber', ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03']),
  ...mapScale('yellow', ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12', '#422006']),
  ...mapScale('lime', ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314', '#1a2e05']),
  ...mapScale('green', ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16']),
  ...mapScale('emerald', ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22']),
  ...mapScale('teal', ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#042f2e']),
  ...mapScale('cyan', ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#083344']),
  ...mapScale('sky', ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49']),
  ...mapScale('blue', ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554']),
  ...mapScale('indigo', ['#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b']),
  ...mapScale('violet', ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#2e1065']),
  ...mapScale('purple', ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#3b0764']),
  ...mapScale('fuchsia', ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75', '#4a044e']),
  ...mapScale('pink', ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#500724']),
  ...mapScale('rose', ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337', '#4c0519']),
  brand: '#1d4d4f',
  'brand-light': '#d8f25f',
  'brand-muted': '#8a8a8a',
};

// Inject generated OKLCH palette when available (created by scripts/generate-palette.mjs)
(async () => {
  try {
    // eslint-disable-next-line import/no-unresolved
    // @ts-ignore
    const { GENERATED_COLORS } = await import('./palette.generated.js');
    for (const [k, v] of Object.entries(GENERATED_COLORS)) {
      if (COLORS[k] === undefined) COLORS[k] = v;
    }
  } catch (e) {
    // ignore if the generated palette is not present
  }
})();

import { mixOklch, hexToRgb } from './color-utils.js';

export const SEMANTIC_COLORS = {
  primary: COLORS['blue-600'],
  secondary: COLORS['slate-600'],
  success: COLORS['emerald-600'],
  warning: COLORS['amber-500'],
  danger: COLORS['red-600'],
  error: COLORS['red-600'],
  info: COLORS['sky-600'],
  accent: COLORS['violet-500'],
  muted: COLORS['slate-500'],
  background: COLORS['slate-50'],
  foreground: COLORS['slate-950'],
  surface: COLORS.white,
  'surface-muted': COLORS['slate-100'],
  border: COLORS['slate-200'],
  'border-muted': COLORS['slate-300'],
  input: COLORS['slate-200'],
  ring: COLORS['blue-500'],
};

// Generate dark-mode semantic variants with contrast-aware heuristics.
const COLOR_TO_KEY = Object.fromEntries(Object.entries(COLORS).map(([k, v]) => [v, k]));

function relLuminance(hex) {
  const [r, g, b] = hexToRgb(hex);
  const toLinear = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const R = toLinear(r);
  const G = toLinear(g);
  const B = toLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

function contrast(hexA, hexB) {
  const L1 = relLuminance(hexA);
  const L2 = relLuminance(hexB);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Explicit dark background/foreground anchors
SEMANTIC_COLORS['dark-background'] = COLORS['slate-950'];
SEMANTIC_COLORS['dark-foreground'] = COLORS['slate-50'];

for (const [skey, sval] of Object.entries(SEMANTIC_COLORS)) {
  if (skey.startsWith('dark-')) continue;
  if (skey === 'background' || skey === 'foreground') continue;

  // prefer family shades that meet contrast against dark background
  const darkBg = SEMANTIC_COLORS['dark-background'];
  const hex = sval;
  const sourceKey = COLOR_TO_KEY[hex];
  let chosen = null;

  if (sourceKey && sourceKey.includes('-')) {
    const parts = sourceKey.split('-');
    const shade = parts.pop();
    const family = parts.join('-');
    // try lighter shades first (50 -> 950) to stand out on dark bg
    for (const sh of SHADES) {
      const candidateKey = `${family}-${sh}`;
      const candidateHex = COLORS[candidateKey];
      if (!candidateHex) continue;
      if (contrast(candidateHex, darkBg) >= 4.5) {
        chosen = candidateHex;
        break;
      }
    }
  }

  if (!chosen) {
    // fallback: mix towards white until contrast threshold achieved
    let t = 20;
    while (t <= 98) {
      const cand = mixOklch(hex, '#ffffff', t);
      if (contrast(cand, darkBg) >= 4.5) {
        chosen = cand;
        break;
      }
      t += 6;
    }
  }

  SEMANTIC_COLORS[`dark-${skey}`] = chosen || sval;
}

// Ensure surface/border/input anchors in dark mode are dark tones (override heuristics)
SEMANTIC_COLORS['dark-surface'] = COLORS['slate-900'];
SEMANTIC_COLORS['dark-surface-muted'] = COLORS['slate-800'];
SEMANTIC_COLORS['dark-border'] = COLORS['slate-700'];
SEMANTIC_COLORS['dark-border-muted'] = COLORS['slate-600'];
SEMANTIC_COLORS['dark-input'] = COLORS['slate-800'];

export const SPACING_PROPS = new Set([
  'p', 'pt', 'pb', 'pl', 'pr', 'px', 'py', 'ps', 'pe',
  'm', 'mt', 'mb', 'ml', 'mr', 'mx', 'my', 'ms', 'me',
  'gap', 'gap-x', 'gap-y',
  'w', 'h', 'min-w', 'max-w', 'min-h', 'max-h', 'size',
  'top', 'bottom', 'left', 'right', 'inset', 'inset-x', 'inset-y',
  'translate-x', 'translate-y', 'translate-z',
  'border-spacing', 'text-indent', 'outline-offset',
  'border', 'border-width', 'border-t', 'border-b', 'border-l', 'border-r', 'border-x', 'border-y',
  'outline',
]);

export const COLOR_PROPS = new Set([
  'bg', 'bg-color', 'color', 'text', 'text-color', 'fill', 'stroke',
  'border-color', 'border-t-color', 'border-b-color', 'border-l-color', 'border-r-color',
  'outline-color', 'decoration-color', 'shadow-color', 'caret-color', 'accent-color',
  'ring-color', 'from', 'via', 'to',
]);

export const RADIUS_PROPS = new Set([
  'rounded', 'radius', 'rounded-t', 'rounded-b', 'rounded-l', 'rounded-r',
  'rounded-tl', 'rounded-tr', 'rounded-bl', 'rounded-br',
  'rounded-ss', 'rounded-se', 'rounded-es', 'rounded-ee',
]);

export const FONT_SIZE_PROPS = new Set(['font-size', 'text-size']);
export const FONT_WEIGHT_PROPS = new Set(['weight', 'font-weight']);
export const LINE_HEIGHT_PROPS = new Set(['leading', 'line-height']);
export const LETTER_SPACING_PROPS = new Set(['tracking', 'letter-spacing']);
export const SHADOW_PROPS = new Set(['shadow']);

export const UNITLESS_PROPS = new Set([
  'opacity',
  'z',
  'order',
  'grow',
  'shrink',
  'flex',
  'weight',
  'font-weight',
  'line-height',
  'scale',
  'scale-x',
  'scale-y',
  'aspect',
  'grid-cols',
  'grid-rows',
  'col-span',
  'row-span',
  'col-start',
  'col-end',
  'row-start',
  'row-end',
  'animation-iteration',
]);

export const TRANSFORM_PROPS = new Set([
  'scale',
  'scale-x',
  'scale-y',
  'rotate',
  'translate-x',
  'translate-y',
  'translate-z',
  'skew-x',
  'skew-y',
]);

export const FILTER_PROPS = new Set([
  'blur',
  'brightness',
  'contrast',
  'grayscale',
  'hue-rotate',
  'invert',
  'saturate',
  'sepia',
]);

export const BACKDROP_FILTER_PROPS = new Set([
  'backdrop-blur',
  'backdrop-brightness',
  'backdrop-contrast',
  'backdrop-grayscale',
  'backdrop-hue-rotate',
  'backdrop-invert',
  'backdrop-opacity',
  'backdrop-saturate',
  'backdrop-sepia',
]);

export const REACT_IGNORED_PROPS = new Set([
  'as',
  'attrs',
  'style',
  'className',
  'class',
  'children',
  'key',
  'ref',
  ...RAW_HTML_ATTRS,
]);

export const IGNORED_ATTRS = new Set(RAW_HTML_ATTRS);

export function shouldIgnoreAttribute(name) {
  return (
    IGNORED_ATTRS.has(name) ||
    name.startsWith('data-') ||
    name.startsWith('aria-')
  );
}
