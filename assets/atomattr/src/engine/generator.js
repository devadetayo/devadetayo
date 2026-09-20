import { DICTIONARY } from '../style-data/dictionary.js';
import {
  BACKDROP_FILTER_PROPS,
  COLOR_PROPS,
  COLORS,
  DEFAULT_UNIT,
  FILTER_PROPS,
  FONT_SIZE_PROPS,
  FONT_SIZE_SCALE,
  FONT_WEIGHT,
  FONT_WEIGHT_PROPS,
  LETTER_SPACING,
  LETTER_SPACING_PROPS,
  LINE_HEIGHT,
  LINE_HEIGHT_PROPS,
  RADIUS_PROPS,
  RADIUS_SCALE,
  SEMANTIC_COLORS,
  SHADOW_PRESETS,
  SHADOW_PROPS,
  SPACING_PROPS,
  SPACING_SCALE,
  TRANSFORM_PROPS,
  UNITLESS_PROPS,
  VALUE_ALIASES,
} from '../style-data/variables.js';

const TRANSFORM_VAR = {
  scale: '--aa-scale',
  'scale-x': '--aa-scale-x',
  'scale-y': '--aa-scale-y',
  rotate: '--aa-rotate',
  'translate-x': '--aa-translate-x',
  'translate-y': '--aa-translate-y',
  'translate-z': '--aa-translate-z',
  'skew-x': '--aa-skew-x',
  'skew-y': '--aa-skew-y',
};

const FILTER_VAR = {
  blur: '--aa-blur',
  brightness: '--aa-brightness',
  contrast: '--aa-contrast',
  grayscale: '--aa-grayscale',
  'hue-rotate': '--aa-hue-rotate',
  invert: '--aa-invert',
  saturate: '--aa-saturate',
  sepia: '--aa-sepia',
};

const BACKDROP_FILTER_VAR = {
  'backdrop-blur': '--aa-backdrop-blur',
  'backdrop-brightness': '--aa-backdrop-brightness',
  'backdrop-contrast': '--aa-backdrop-contrast',
  'backdrop-grayscale': '--aa-backdrop-grayscale',
  'backdrop-hue-rotate': '--aa-backdrop-hue-rotate',
  'backdrop-invert': '--aa-backdrop-invert',
  'backdrop-opacity': '--aa-backdrop-opacity',
  'backdrop-saturate': '--aa-backdrop-saturate',
  'backdrop-sepia': '--aa-backdrop-sepia',
};

const TRANSFORM_TEMPLATE =
  'var(--aa-translate-x,) var(--aa-translate-y,) var(--aa-translate-z,) var(--aa-rotate,) var(--aa-skew-x,) var(--aa-skew-y,) var(--aa-scale,) var(--aa-scale-x,) var(--aa-scale-y,)';
const FILTER_TEMPLATE =
  'var(--aa-blur,) var(--aa-brightness,) var(--aa-contrast,) var(--aa-grayscale,) var(--aa-hue-rotate,) var(--aa-invert,) var(--aa-saturate,) var(--aa-sepia,)';
const BACKDROP_FILTER_TEMPLATE =
  'var(--aa-backdrop-blur,) var(--aa-backdrop-brightness,) var(--aa-backdrop-contrast,) var(--aa-backdrop-grayscale,) var(--aa-backdrop-hue-rotate,) var(--aa-backdrop-invert,) var(--aa-backdrop-opacity,) var(--aa-backdrop-saturate,) var(--aa-backdrop-sepia,)';

const RAW_VALUE_PATTERN =
  /^(-?[\d.]+(px|rem|em|%|vh|vw|svh|dvh|ch|ex|cm|mm|in|pt|pc|vmin|vmax|fr|deg|rad|turn|ms|s)|calc\(|var\(|clamp\(|min\(|max\(|#|rgb|hsl|hwb|oklch|oklab|lch|lab|linear-gradient|radial-gradient|conic-gradient|repeating|url\(|image\(|fit-content|min-content|max-content|auto$|none$|inherit$|initial$|unset$|revert$|normal$|transparent$|currentColor$)/i;

function resolveColorValue(value) {
  const trimmed = camelless(value);
  if (!trimmed) return trimmed;

  const alphaMatch = trimmed.match(/^(.*)\/([0-9.]+)$/);
  if (alphaMatch) {
    const baseValue = alphaMatch[1];
    const alpha = Number(alphaMatch[2]);
    const normalizedAlpha = Number.isNaN(alpha) ? 1 : Math.max(0, Math.min(1, alpha / 100));
    const resolvedBase = SEMANTIC_COLORS[baseValue] ?? COLORS[baseValue] ?? baseValue;
    if (typeof resolvedBase === 'string' && /^#([0-9a-f]{3,8})$/i.test(resolvedBase)) {
      const hex = resolvedBase.replace('#', '');
      const fullHex = hex.length === 3 ? hex.split('').map(ch => ch + ch).join('') : hex;
      const r = Number.parseInt(fullHex.slice(0, 2), 16);
      const g = Number.parseInt(fullHex.slice(2, 4), 16);
      const b = Number.parseInt(fullHex.slice(4, 6), 16);
      return `rgba(${r}, ${g}, ${b}, ${normalizedAlpha.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')})`;
    }

    if (typeof resolvedBase === 'string' && /^rgb/.test(resolvedBase)) {
      return `${resolvedBase.replace(/\)$/, '').replace(/\s*$/, '')}, ${normalizedAlpha.toFixed(2).replace(/0+$/, '').replace(/\.$/, '')})`;
    }

    return resolvedBase;
  }

  if (SEMANTIC_COLORS[trimmed] !== undefined) return SEMANTIC_COLORS[trimmed];
  if (COLORS[trimmed] !== undefined) return COLORS[trimmed];

  if (/^mix\((.+),(.+),(.+)\)$/i.test(trimmed)) {
    const [, first, second, ratio] = trimmed.match(/^mix\((.+),(.+),(.+)\)$/i) || [];
    const base = SEMANTIC_COLORS[first?.trim()] ?? COLORS[first?.trim()] ?? first?.trim();
    const mixWith = SEMANTIC_COLORS[second?.trim()] ?? COLORS[second?.trim()] ?? second?.trim();
    const normalizedRatio = Number.parseFloat(ratio) || 0;
    return `color-mix(in srgb, ${base} ${Math.max(0, Math.min(100, normalizedRatio))}%, ${mixWith})`;
  }

  if (RAW_VALUE_PATTERN.test(trimmed)) return trimmed;
  return trimmed;
}

function resolveContentValue(value) {
  const trimmed = camelless(value);
  if (!trimmed) return '""';
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed;
  }
  return `"${trimmed}"`;
}

function resolveBorderDeclaration(propKey, rawValue, isDark = false) {
  const value = camelless(rawValue);
  if (!value) return { prop: 'border-width', value };
  // Support multi-part shorthand like "1 solid red" or "1px dashed #f00"
  const parts = value.split(/\s+/).filter(Boolean);

  const styleKeywords = ['solid', 'dashed', 'dotted', 'double', 'none', 'hidden'];

  if (parts.length >= 2) {
    const declarations = [];

    // Try to detect width (first numeric-like token)
    const widthToken = parts.find(p => /^-?\d+(?:\.\d+)?(px|rem|em|%)?$/.test(p) || /^-?\d+(?:\.\d+)?$/.test(p));
    if (widthToken) {
      declarations.push({ prop: 'border-width', value: resolveValue(propKey, widthToken, isDark) });
    }

    // Try to detect style token
    const styleToken = parts.find(p => styleKeywords.includes(p));
    if (styleToken) {
      declarations.push({ prop: 'border-style', value: styleToken });
    }

    // Anything else that looks like a color -> color token (prefer last)
    const colorToken = parts.slice().reverse().find(p => p && !/^(-?\d+(?:\.\d+)?(px|rem|em|%)?$|solid|dashed|dotted|double|none|hidden)$/i.test(p));
    if (colorToken) {
      declarations.push({ prop: 'border-color', value: resolveColorValue(colorToken) });
    }

    if (declarations.length) return declarations;
  }

  if (/^-?\d+(?:\.\d+)?(px|rem|em|%)?$/.test(value) || /^-?\d+(?:\.\d+)?$/.test(value)) {
    return { prop: 'border-width', value: resolveValue(propKey, value, isDark) };
  }

  if (styleKeywords.includes(value)) {
    return { prop: 'border-style', value };
  }

  return { prop: 'border-color', value: resolveColorValue(value) };
}

function resolveOutlineDeclaration(propKey, rawValue, isDark = false) {
  const value = camelless(rawValue);
  if (!value) return { prop: 'outline-width', value };
  // Support multi-part shorthand like "2 solid blue" for outline
  const parts = value.split(/\s+/).filter(Boolean);
  const styleKeywords = ['solid', 'dashed', 'dotted', 'double', 'none', 'hidden'];

  if (parts.length >= 2) {
    const declarations = [];

    const widthToken = parts.find(p => /^-?\d+(?:\.\d+)?(px|rem|em|%)?$/.test(p) || /^-?\d+(?:\.\d+)?$/.test(p));
    if (widthToken) declarations.push({ prop: 'outline-width', value: resolveValue(propKey, widthToken, isDark) });

    const styleToken = parts.find(p => styleKeywords.includes(p));
    if (styleToken) declarations.push({ prop: 'outline-style', value: styleToken });

    const colorToken = parts.slice().reverse().find(p => p && !/^(-?\d+(?:\.\d+)?(px|rem|em|%)?$|solid|dashed|dotted|double|none|hidden)$/i.test(p));
    if (colorToken) declarations.push({ prop: 'outline-color', value: resolveColorValue(colorToken) });

    if (declarations.length) return declarations;
  }

  if (/^-?\d+(?:\.\d+)?(px|rem|em|%)?$/.test(value) || /^-?\d+(?:\.\d+)?$/.test(value)) {
    return { prop: 'outline-width', value: resolveValue(propKey, value, isDark) };
  }

  if (styleKeywords.includes(value)) {
    return { prop: 'outline-style', value };
  }

  return { prop: 'outline-color', value: resolveColorValue(value) };
}

let styleTag = null;
const ruleCache = new Set();
// Registry of parsed objects we've seen — used to regenerate rules when theme changes
const parsedRegistry = new Map();

let THEME = 'light';

export function setTheme(theme) {
  if (theme !== 'light' && theme !== 'dark') return;
  THEME = theme;
  // persist preference
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem('atomattr:theme', theme);
  } catch (e) {}
  // mirror theme to document for CSS and other consumers
  if (typeof document !== 'undefined' && document.documentElement) {
    const el = document.documentElement;
    try {
      el.dataset.theme = theme;
    } catch (e) {}
    if (theme === 'dark') el.classList.add('dark');
    else el.classList.remove('dark');
  }
  // apply CSS variables for semantic tokens
  try {
    applySemanticCssVars(THEME);
  } catch (e) {}
  // dispatch an event for subscribers
  try {
    if (typeof document !== 'undefined') {
      document.dispatchEvent(new CustomEvent('atomattr:themechange', { detail: THEME }));
    }
  } catch (e) {}
  // Clear and regenerate rules using updated theme
  const existing = Array.from(parsedRegistry.values());
  clearGeneratedRules();
  for (const p of existing) {
    generateAndInjectRule(p);
  }
}

  function applySemanticCssVars(theme) {
    if (typeof document === 'undefined' || !document.documentElement) return;
    const el = document.documentElement;
    // add transition class briefly
    try {
      el.classList.add('aa-theme-in-transition');
      setTimeout(() => el.classList.remove('aa-theme-in-transition'), 220);
    } catch (e) {}

    for (const [key, val] of Object.entries(SEMANTIC_COLORS)) {
      if (key.startsWith('dark-')) continue;
      const varName = `--aa-color-${key.replace(/[^a-z0-9-]/gi, '-')}`;
      const value = theme === 'dark' ? (SEMANTIC_COLORS[`dark-${key}`] ?? val) : val;
      try {
        el.style.setProperty(varName, value);
      } catch (e) {}
    }

    // ensure transition rule exists in our style tag
    try {
      const tag = ensureStyleTag();
      if (tag && !tag.__aa_transition_injected) {
        tag.appendChild(document.createTextNode(`.aa-theme-in-transition * { transition: color .18s ease, background-color .18s ease, border-color .18s ease, box-shadow .18s ease; }`));
        tag.__aa_transition_injected = true;
      }
    } catch (e) {}
  }

export function getTheme() {
  return THEME;
}

// If running in a browser, initialize THEME from document and observe changes.
if (typeof document !== 'undefined' && document.documentElement) {
  const el = document.documentElement;
  const detect = () => {
    try {
      // prefer stored preference
      try {
        if (typeof localStorage !== 'undefined') {
          const stored = localStorage.getItem('atomattr:theme');
          if (stored === 'dark' || stored === 'light') return stored;
        }
      } catch (e) {}
      if (el.dataset && el.dataset.theme) return el.dataset.theme === 'dark' ? 'dark' : 'light';
      if (el.classList && el.classList.contains('dark')) return 'dark';
    } catch (e) {}
    return 'light';
  };

  // set initial theme to match document
  THEME = detect();
  try { applySemanticCssVars(THEME); } catch (e) {}

  // observe attribute changes so external toggles update the engine
  try {
    const mo = new MutationObserver(muts => {
      for (const m of muts) {
        if (m.type === 'attributes' && (m.attributeName === 'data-theme' || m.attributeName === 'class')) {
          const newTheme = detect();
          if (newTheme !== THEME) setTheme(newTheme);
        }
      }
    });
    mo.observe(el, { attributes: true, attributeFilter: ['data-theme', 'class'] });
  } catch (e) {
    // ignore in environments without MutationObserver
  }
}

function camelless(value) {
  return String(value).trim();
}

function ensureStyleTag() {
  if (typeof document === 'undefined') return styleTag;

  // Prefer any existing element in the current document (helps tests and hot-reload)
  const existing = document.getElementById && document.getElementById('atomattr-generated');
  if (existing) {
    styleTag = existing;
    return styleTag;
  }

  if (styleTag) return styleTag;

  styleTag = document.createElement('style');
  styleTag.id = 'atomattr-generated';
  document.head.appendChild(styleTag);

  return styleTag;
}

function resolveSpacingShorthand(propKey, rawValue, isDark = false) {
  const value = camelless(rawValue);
  const tokens = value.split(/\s+/).filter(Boolean);
  if (tokens.length < 2 || tokens.length > 4) return resolveValue(propKey, value, isDark);

  const resolvedTokens = tokens.map(token => resolveValue(propKey, token, isDark));
  if (tokens.length === 2) return `${resolvedTokens[0]} ${resolvedTokens[1]}`;
  if (tokens.length === 3) return `${resolvedTokens[0]} ${resolvedTokens[1]} ${resolvedTokens[2]}`;
  return `${resolvedTokens[0]} ${resolvedTokens[1]} ${resolvedTokens[2]} ${resolvedTokens[3]}`;
}

function resolveValue(propKey, rawValue, isDark = false) {
  const value = camelless(rawValue);

  if (value === 'screen') {
    if (['w', 'min-w', 'max-w'].includes(propKey)) return '100vw';
    if (['h', 'min-h', 'max-h'].includes(propKey)) return '100vh';
  }

  if ((propKey === 'p' || propKey === 'm') && /\s+/.test(value)) {
    return resolveSpacingShorthand(propKey, value, isDark);
  }

  if (SPACING_PROPS.has(propKey) && SPACING_SCALE[value] !== undefined) return SPACING_SCALE[value];
  if (COLOR_PROPS.has(propKey)) {
    // If semantic color is requested and a dark mapping exists, prefer it when isDark
    if (isDark && SEMANTIC_COLORS[value] && SEMANTIC_COLORS[`dark-${value}`]) {
      return SEMANTIC_COLORS[`dark-${value}`];
    }
    return resolveColorValue(value);
  }
  if (RADIUS_PROPS.has(propKey) && RADIUS_SCALE[value] !== undefined) return RADIUS_SCALE[value];
  if (FONT_SIZE_PROPS.has(propKey) && FONT_SIZE_SCALE[value] !== undefined) return FONT_SIZE_SCALE[value];
  if (FONT_WEIGHT_PROPS.has(propKey) && FONT_WEIGHT[value] !== undefined) return FONT_WEIGHT[value];
  if (LINE_HEIGHT_PROPS.has(propKey) && LINE_HEIGHT[value] !== undefined) return LINE_HEIGHT[value];
  if (LETTER_SPACING_PROPS.has(propKey) && LETTER_SPACING[value] !== undefined) return LETTER_SPACING[value];
  if (SHADOW_PROPS.has(propKey) && SHADOW_PRESETS[value] !== undefined) return SHADOW_PRESETS[value];
  if (VALUE_ALIASES[value] !== undefined) return VALUE_ALIASES[value];

  if ((propKey === 'grid-cols' || propKey === 'grid-rows') && /^\d+$/.test(value)) {
    return `repeat(${value}, minmax(0, 1fr))`;
  }

  if ((propKey === 'col-span' || propKey === 'row-span') && /^\d+$/.test(value)) {
    return `span ${value} / span ${value}`;
  }

  if (RAW_VALUE_PATTERN.test(value)) return value;

  if (/^-?[\d.]+$/.test(value)) {
    return UNITLESS_PROPS.has(propKey) ? value : `${value}${DEFAULT_UNIT}`;
  }

  if (propKey === 'border' || propKey === 'outline' || propKey === 'ring' || propKey === 'border-color' || propKey === 'outline-color' || propKey === 'ring-color' || propKey === 'content') {
    return resolveColorValue(value);
  }

  return value;
}

function resolveTransformValue(propKey, rawValue, isDark = false) {
  const value = camelless(rawValue);

  if (propKey === 'rotate' || propKey === 'skew-x' || propKey === 'skew-y') {
    return /^-?[\d.]+$/.test(value) ? `${value}deg` : value;
  }

  if (propKey === 'scale' || propKey === 'scale-x' || propKey === 'scale-y') {
    return value;
  }

  return resolveValue(propKey, rawValue, isDark);
}

function resolveFilterValue(propKey, rawValue, isDark = false) {
  const value = camelless(rawValue);

  if (propKey === 'blur') return /^-?[\d.]+$/.test(value) ? `${value}px` : value;
  if (propKey === 'hue-rotate') return /^-?[\d.]+$/.test(value) ? `${value}deg` : value;
  if (['brightness', 'contrast', 'grayscale', 'invert', 'saturate', 'sepia', 'backdrop-brightness', 'backdrop-contrast', 'backdrop-grayscale', 'backdrop-invert', 'backdrop-opacity', 'backdrop-saturate', 'backdrop-sepia'].includes(propKey)) {
    return /^-?[\d.]+$/.test(value) ? `${value}%` : value;
  }

  if (propKey === 'backdrop-blur') return /^-?[\d.]+$/.test(value) ? `${value}px` : value;
  if (propKey === 'backdrop-hue-rotate') return /^-?[\d.]+$/.test(value) ? `${value}deg` : value;

  return value;
}

function declarationListFromDictEntry(propKey, dictEntry, value) {
  if (typeof dictEntry === 'string' && dictEntry.includes(':') && !dictEntry.startsWith('--')) {
    return dictEntry
      .split(';')
      .map(part => part.trim())
      .filter(Boolean)
      .map(part => `${part};`);
  }

  const cssProps = Array.isArray(dictEntry) ? dictEntry : [dictEntry];
  return cssProps.map(cssProp => `${cssProp}: ${value};`);
}

function buildStatefulDeclarations(parsed, isDark = false) {
  const propKey = parsed.propKey;
  const value = parsed.value;

  if (propKey === 'border') {
    const declaration = resolveBorderDeclaration(propKey, value, isDark);
    if (Array.isArray(declaration)) {
      return declaration.map(d => `${d.prop}: ${d.value};`);
    }
    return [`${declaration.prop}: ${declaration.value};`];
  }

  if (propKey === 'outline') {
    const declaration = resolveOutlineDeclaration(propKey, value, isDark);
    if (Array.isArray(declaration)) {
      return declaration.map(d => `${d.prop}: ${d.value};`);
    }
    return [`${declaration.prop}: ${declaration.value};`];
  }

  if (propKey === 'flex') {
    const resolvedValue = value === '' || value === true || value === undefined ? '1' : resolveValue(propKey, value, isDark);
    return [`flex: ${resolvedValue};`];
  }

  if (propKey === 'ring') {
    const resolvedValue = String(resolveValue(propKey, value, isDark)).trim();
    return [`box-shadow: 0 0 0 ${resolvedValue} rgba(15, 23, 42, 0.16);`];
  }

  if (propKey === 'content') {
    return [`content: ${resolveContentValue(value)};`];
  }

  return [];
}

export function clearGeneratedRules() {
  const tag = ensureStyleTag();
  ruleCache.clear();

  if (tag) {
    tag.textContent = '';
  }
}

export function generateAndInjectRule(parsed) {
  if (!parsed) return;
  // record parsed for potential regeneration
  parsedRegistry.set(parsed.cacheKey, parsed);
  if (ruleCache.has(parsed.cacheKey)) return;

  const tag = ensureStyleTag();
  const dictEntry = DICTIONARY[parsed.propKey];

  if (!tag || !tag.sheet || !dictEntry) {
    ruleCache.add(parsed.cacheKey);
    return;
  }

  let declarations = [];

  if (parsed.pseudoElement && parsed.propKey === 'content') {
    declarations = [`content: ${resolveContentValue(parsed.value)};`];
  } else {
    const effectiveIsDark = parsed.isDark ?? (THEME === 'dark');
    if (buildStatefulDeclarations(parsed, effectiveIsDark).length) {
      declarations = buildStatefulDeclarations(parsed, effectiveIsDark);
    } else if (TRANSFORM_PROPS.has(parsed.propKey)) {
      const variable = TRANSFORM_VAR[parsed.propKey];
      const fn = {
        scale: 'scale',
        'scale-x': 'scaleX',
        'scale-y': 'scaleY',
        rotate: 'rotate',
        'translate-x': 'translateX',
        'translate-y': 'translateY',
        'translate-z': 'translateZ',
        'skew-x': 'skewX',
        'skew-y': 'skewY',
      }[parsed.propKey];
      const value = resolveTransformValue(parsed.propKey, parsed.value, effectiveIsDark);
      declarations = [`${variable}: ${fn}(${value});`, `transform: ${TRANSFORM_TEMPLATE};`];
    } else if (FILTER_PROPS.has(parsed.propKey)) {
      const variable = FILTER_VAR[parsed.propKey];
      const fn = parsed.propKey;
      const value = resolveFilterValue(parsed.propKey, parsed.value, effectiveIsDark);
      declarations = [`${variable}: ${fn}(${value});`, `filter: ${FILTER_TEMPLATE};`];
    } else if (BACKDROP_FILTER_PROPS.has(parsed.propKey)) {
      const variable = BACKDROP_FILTER_VAR[parsed.propKey];
      const fn = parsed.propKey.replace('backdrop-', '');
      const value = resolveFilterValue(parsed.propKey, parsed.value, effectiveIsDark);
      declarations = [`${variable}: ${fn}(${value});`, `backdrop-filter: ${BACKDROP_FILTER_TEMPLATE};`];
    } else if (parsed.value === '' || parsed.value === true || parsed.value === 'true' || parsed.value === undefined) {
      declarations = declarationListFromDictEntry(parsed.propKey, dictEntry, '');
    } else {
      const effectiveVal = resolveValue(parsed.propKey, parsed.value, effectiveIsDark);
      declarations = declarationListFromDictEntry(parsed.propKey, dictEntry, effectiveVal);
    }
  }

  const rule = `${parsed.wrapperStart}${parsed.selector} { ${declarations.join(' ')} }${parsed.wrapperEnd}`;

  try {
    tag.sheet.insertRule(rule, tag.sheet.cssRules.length);
    ruleCache.add(parsed.cacheKey);
  } catch {
    ruleCache.add(parsed.cacheKey);
  }
}
