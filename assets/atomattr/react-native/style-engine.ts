import { DICTIONARY } from '../src/style-data/dictionary.js';
import {
  COLOR_PROPS,
  COLORS,
  DEFAULT_UNIT,
  FONT_SIZE_PROPS,
  FONT_SIZE_SCALE,
  FONT_WEIGHT,
  FONT_WEIGHT_PROPS,
  GRID_COLS_SCALE,
  GRID_ROWS_SCALE,
  LETTER_SPACING,
  LETTER_SPACING_PROPS,
  LINE_HEIGHT,
  LINE_HEIGHT_PROPS,
  RADIUS_PROPS,
  RADIUS_SCALE,
  SHADOW_PRESETS,
  SHADOW_PROPS,
  SPACING_PROPS,
  SPACING_SCALE,
  SEMANTIC_COLORS,
  TRANSFORM_PROPS,
  UNITLESS_PROPS,
  VALUE_ALIASES,
} from '../src/style-data/variables.js';
import { getAtomTheme } from './atom/theme';
import { hexToRgb } from '../src/style-data/color-utils.js';
import { Dimensions } from 'react-native';

type AtomAttrs = Record<string, unknown>;
type NativeStyle = Record<string, any>;
type AtomDictionary = Record<string, string | string[]>;
type AtomScale = Record<string, string>;

const ATOM_DICTIONARY = DICTIONARY as AtomDictionary;
const ATOM_COLORS = COLORS as AtomScale;
const ATOM_FONT_SIZE_SCALE = FONT_SIZE_SCALE as AtomScale;
const ATOM_FONT_WEIGHT = FONT_WEIGHT as AtomScale;
const ATOM_LETTER_SPACING = LETTER_SPACING as AtomScale;
const ATOM_LINE_HEIGHT = LINE_HEIGHT as AtomScale;
const ATOM_RADIUS_SCALE = RADIUS_SCALE as AtomScale;
const ATOM_SHADOW_PRESETS = SHADOW_PRESETS as AtomScale;
const ATOM_SPACING_SCALE = SPACING_SCALE as AtomScale;
const ATOM_GRID_COLS_SCALE = GRID_COLS_SCALE as AtomScale;
const ATOM_GRID_ROWS_SCALE = GRID_ROWS_SCALE as AtomScale;
const ATOM_VALUE_ALIASES = VALUE_ALIASES as AtomScale;

const REACT_ALIASES: Record<string, string> = {
  alignContent: 'content',
  alignItems: 'items',
  alignSelf: 'self',
  backgroundColor: 'bg',
  bgColor: 'bg-color',
  borderB: 'border-b',
  borderBColor: 'border-b-color',
  borderColor: 'border-color',
  borderL: 'border-l',
  borderLColor: 'border-l-color',
  borderR: 'border-r',
  borderRColor: 'border-r-color',
  borderStyle: 'border-style',
  borderT: 'border-t',
  borderTColor: 'border-t-color',
  borderWidth: 'border-width',
  borderX: 'border-x',
  borderY: 'border-y',
  flexDirection: 'direction',
  flexGrow: 'grow',
  'flex-shrink': 'shrink',
  'flex-wrap': 'wrap',
  fontFamily: 'font',
  fontSize: 'font-size',
  fontStyle: 'font-style',
  fontWeight: 'font-weight',
  gapX: 'gap-x',
  gapY: 'gap-y',
  justifyContent: 'justify',
  lineHeight: 'line-height',
  maxH: 'max-h',
  maxW: 'max-w',
  minH: 'min-h',
  minW: 'min-w',
  roundedB: 'rounded-b',
  roundedBl: 'rounded-bl',
  roundedBr: 'rounded-br',
  roundedL: 'rounded-l',
  roundedR: 'rounded-r',
  roundedT: 'rounded-t',
  roundedTl: 'rounded-tl',
  roundedTr: 'rounded-tr',
  textAlign: 'text-align',
  textColor: 'text-color',
  textSize: 'text-size',
  'z-index': 'z',
  zIndex: 'z',
};

const CSS_TO_REACT_NATIVE: Record<string, string | null> = {
  'align-content': 'alignContent',
  'align-items': 'alignItems',
  'align-self': 'alignSelf',
  'aspect-ratio': 'aspectRatio',
  'background-color': 'backgroundColor',
  'border-bottom-color': 'borderBottomColor',
  'border-bottom-left-radius': 'borderBottomLeftRadius',
  'border-bottom-right-radius': 'borderBottomRightRadius',
  'border-bottom-width': 'borderBottomWidth',
  'border-color': 'borderColor',
  'border-left-color': 'borderLeftColor',
  'border-left-width': 'borderLeftWidth',
  'border-radius': 'borderRadius',
  'border-right-color': 'borderRightColor',
  'border-right-width': 'borderRightWidth',
  'border-style': 'borderStyle',
  'border-top-color': 'borderTopColor',
  'border-top-left-radius': 'borderTopLeftRadius',
  'border-top-right-radius': 'borderTopRightRadius',
  'border-top-width': 'borderTopWidth',
  'border-width': 'borderWidth',
  bottom: 'bottom',
  color: 'color',
  'column-gap': 'columnGap',
  display: 'display',
  flex: 'flex',
  'flex-basis': 'flexBasis',
  'flex-direction': 'flexDirection',
  'flex-grow': 'flexGrow',
  'flex-shrink': 'flexShrink',
  'flex-wrap': 'flexWrap',
  'font-family': 'fontFamily',
  'font-size': 'fontSize',
  'font-style': 'fontStyle',
  'font-weight': 'fontWeight',
  gap: 'gap',
  height: 'height',
  'justify-content': 'justifyContent',
  left: 'left',
  'letter-spacing': 'letterSpacing',
  'line-height': 'lineHeight',
  margin: 'margin',
  'margin-bottom': 'marginBottom',
  'margin-left': 'marginLeft',
  'margin-right': 'marginRight',
  'margin-top': 'marginTop',
  'max-height': 'maxHeight',
  'max-width': 'maxWidth',
  'min-height': 'minHeight',
  'min-width': 'minWidth',
  opacity: 'opacity',
  order: null,
  overflow: 'overflow',
  padding: 'padding',
  'padding-bottom': 'paddingBottom',
  'padding-left': 'paddingLeft',
  'padding-right': 'paddingRight',
  'padding-top': 'paddingTop',
  'pointer-events': 'pointerEvents',
  position: 'position',
  right: 'right',
  'row-gap': 'rowGap',
  'text-align': 'textAlign',
  'text-decoration-line': 'textDecorationLine',
  'text-transform': 'textTransform',
  top: 'top',
  width: 'width',
  'z-index': 'zIndex',
};

const TRANSFORM_TO_REACT_NATIVE: Record<string, string> = {
  rotate: 'rotate',
  scale: 'scale',
  'scale-x': 'scaleX',
  'scale-y': 'scaleY',
  'translate-x': 'translateX',
  'translate-y': 'translateY',
};

const RAW_VALUE_PATTERN =
  /^(-?[\d.]+(px|rem|em|%|vh|vw|svh|dvh|ch|deg|rad|turn)|#|rgb|hsl|transparent$|currentColor$|auto$|none$|inherit$|initial$|unset$|normal$)/i;
const IS_WEB = typeof document !== 'undefined';

// Properties that should always be numeric in React Native
const NUMERIC_PROPS = new Set([
  'fontSize',
  'lineHeight',
  'letterSpacing',
  'fontWeight',
  'flex',
  'flexBasis',
  'flexGrow',
  'flexShrink',
  'height',
  'width',
  'minHeight',
  'minWidth',
  'maxHeight',
  'maxWidth',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'borderWidth',
  'borderTopWidth',
  'borderBottomWidth',
  'borderLeftWidth',
  'borderRightWidth',
  'borderRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'top',
  'bottom',
  'left',
  'right',
  'zIndex',
  'opacity',
  'gap',
  'columnGap',
  'rowGap',
  'aspectRatio',
  'shadowOpacity',
  'shadowRadius',
  'elevation',
]);

function camelToKebab(name: string) {
  return name.replace(/[A-Z]/g, character => `-${character.toLowerCase()}`);
}

export function toCanonicalAtomName(key: string) {
  if (ATOM_DICTIONARY[key]) return key;
  if (REACT_ALIASES[key]) return REACT_ALIASES[key];

  const kebab = camelToKebab(key);
  return ATOM_DICTIONARY[kebab] ? kebab : null;
}

export function isAtomAttr(key: string) {
  const normalized = key.startsWith('dark-') ? key.slice(5) : key;
  return toCanonicalAtomName(normalized) !== null;
}

function stripCssUnit(value: string | number) {
  if (typeof value === 'number') return value;
  const trimmed = String(value).trim();

  if (/^-?[\d.]+px$/.test(trimmed)) return Number.parseFloat(trimmed);
  if (/^-?[\d.]+rem$/.test(trimmed) || /^-?[\d.]+em$/.test(trimmed)) {
    return Number.parseFloat(trimmed) * 16;
  }
  if (/^-?[\d.]+$/.test(trimmed)) return Number.parseFloat(trimmed);

  return trimmed;
}

function resolveFraction(value: string) {
  const fraction = value.match(/^(-?\d+)\/(\d+)$/);
  if (!fraction) return null;

  const numerator = Number.parseFloat(fraction[1]);
  const denominator = Number.parseFloat(fraction[2]);
  if (!denominator) return null;

  return `${(numerator / denominator) * 100}%`;
}

function unitMultiplier() {
  return DEFAULT_UNIT === 'px' ? 1 : 16;
}

function defaultBooleanValue(propKey: string) {
  if (propKey === 'grow' || propKey === 'shrink' || propKey === 'flex') return '1';
  return '';
}

function resolveSpacingShorthand(propKey: string, rawValue: unknown) {
  const value = String(rawValue ?? '').trim();
  const tokens = value.split(/\s+/).filter(Boolean);
  if (tokens.length < 2 || tokens.length > 4) return resolveValue(propKey, value);

  const resolved = tokens.map(token => resolveValue(propKey, token));
  if (tokens.length === 2) return `${resolved[1]} ${resolved[1]}`;
  if (tokens.length === 3) return `${resolved[0]} ${resolved[1]} ${resolved[2]}`;
  return `${resolved[0]} ${resolved[2]} ${resolved[2]} ${resolved[3]}`;
}

function resolveValue(propKey: string, rawValue: unknown) {
  const theme = getAtomTheme();
  const value = rawValue === true || rawValue === '' ? defaultBooleanValue(propKey) : String(rawValue).trim();
  const themeColors = theme.colors ?? {};
  const fraction = resolveFraction(value);

  if ((propKey === 'p' || propKey === 'm') && /\s+/.test(value)) {
    return resolveSpacingShorthand(propKey, value);
  }

  if (fraction) return fraction;
  if (value === 'screen') return '100%';
  if (!IS_WEB && propKey === 'position' && value === 'fixed') return 'absolute';
  if (themeColors[value] !== undefined) return stripCssUnit(themeColors[value]);
  // Support semantic tokens fallback when theme doesn't provide overrides
  if (typeof SEMANTIC_COLORS !== 'undefined' && SEMANTIC_COLORS[value] !== undefined) return stripCssUnit(SEMANTIC_COLORS[value]);
  // Alpha-suffix support on native (e.g. "primary/50" or "gray-500/60")
  const alphaMatch = String(value).match(/^(.*)\/(\d+(?:\.\d+)?)$/);
  if (alphaMatch) {
    const base = alphaMatch[1];
    const alpha = Number(alphaMatch[2]);
    const hex = theme.colors?.[base] ?? ATOM_COLORS[base] ?? SEMANTIC_COLORS?.[base] ?? base;
    if (/^#([0-9a-f]{3,8})$/i.test(hex)) {
      const [r, g, b] = hexToRgb(hex);
      const a = Math.max(0, Math.min(1, alpha / 100)).toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return hex;
  }
  if (SPACING_PROPS.has(propKey) && ATOM_SPACING_SCALE[value] !== undefined) return stripCssUnit(ATOM_SPACING_SCALE[value]);
  if (COLOR_PROPS.has(propKey) && ATOM_COLORS[value] !== undefined) return stripCssUnit(ATOM_COLORS[value]);
  if (RADIUS_PROPS.has(propKey) && ATOM_RADIUS_SCALE[value] !== undefined) return stripCssUnit(ATOM_RADIUS_SCALE[value]);
  if (FONT_SIZE_PROPS.has(propKey) && ATOM_FONT_SIZE_SCALE[value] !== undefined) return stripCssUnit(ATOM_FONT_SIZE_SCALE[value]);
  if (FONT_WEIGHT_PROPS.has(propKey) && ATOM_FONT_WEIGHT[value] !== undefined) return stripCssUnit(ATOM_FONT_WEIGHT[value]);
  if (LINE_HEIGHT_PROPS.has(propKey) && ATOM_LINE_HEIGHT[value] !== undefined) return stripCssUnit(ATOM_LINE_HEIGHT[value]);
  if (LETTER_SPACING_PROPS.has(propKey) && ATOM_LETTER_SPACING[value] !== undefined) return stripCssUnit(ATOM_LETTER_SPACING[value]);
  if (SHADOW_PROPS.has(propKey) && ATOM_SHADOW_PRESETS[value] !== undefined) return stripCssUnit(ATOM_SHADOW_PRESETS[value]);
  if (propKey === 'grid-cols' && ATOM_GRID_COLS_SCALE[value] !== undefined) return stripCssUnit(ATOM_GRID_COLS_SCALE[value]);
  if (propKey === 'grid-rows' && ATOM_GRID_ROWS_SCALE[value] !== undefined) return stripCssUnit(ATOM_GRID_ROWS_SCALE[value]);
  if (ATOM_VALUE_ALIASES[value] !== undefined) {
    const aliasedValue = ATOM_VALUE_ALIASES[value];
    // Convert CSS-only keywords to React Native equivalents
    if (aliasedValue === 'fit-content' || aliasedValue === 'min-content' || aliasedValue === 'max-content') {
      // Preserve CSS keywords on web; let native fall back to intrinsic sizing rules.
      return IS_WEB ? aliasedValue : undefined;
    }
    return aliasedValue;
  }

  if (/^-?[\d.]+$/.test(value)) {
    return UNITLESS_PROPS.has(propKey) ? Number.parseFloat(value) : Number.parseFloat(value) * unitMultiplier();
  }

  if (RAW_VALUE_PATTERN.test(value)) return stripCssUnit(value);

  return value;
}

function cssPropToReactNative(cssProp: string) {
  return CSS_TO_REACT_NATIVE[cssProp] ?? null;
}

function applyCssDeclaration(style: NativeStyle, cssProp: string, value: any) {
  const nativeProp = cssPropToReactNative(cssProp);
  if (!nativeProp) return;
  if (value === undefined || value === null) return;

  // Special handling for fontWeight - it can be a string or number
  if (nativeProp === 'fontWeight') {
    if (typeof value === 'number' || /^[1-9]00$|^normal$|^bold$/.test(String(value))) {
      style[nativeProp] = value;
    } else {
      const numValue = Number(value);
      style[nativeProp] = Number.isNaN(numValue) ? value : numValue;
    }
    return;
  }

  // Special handling for fontSize - must always be a number
  if (nativeProp === 'fontSize') {
    if (typeof value === 'number') {
      style[nativeProp] = value;
    } else if (typeof value === 'string') {
      const v = value.trim();
      const numValue = Number.parseFloat(v);
      style[nativeProp] = Number.isNaN(numValue) ? 16 : numValue; // Default to 16 if parsing fails
    } else {
      const numValue = Number(value);
      style[nativeProp] = Number.isNaN(numValue) ? 16 : numValue;
    }
    return;
  }

  // Handle numeric properties carefully:
  // - preserve percentage and viewport-unit strings (e.g. '100%', '100vw')
  // - preserve keyword values like 'auto' or 'fit-content'
  // - otherwise coerce to numbers
  if (NUMERIC_PROPS.has(nativeProp)) {
    if ((nativeProp === 'top' || nativeProp === 'right' || nativeProp === 'bottom' || nativeProp === 'left') && typeof value === 'string') {
      const trimmed = value.trim();
      if (/^(auto|inherit|initial|unset)$/.test(trimmed)) {
        style[nativeProp] = trimmed;
        return;
      }
    }

    if (typeof value === 'string') {
      const v = value.trim();

      // Preserve percentages
      if (/%$/.test(v)) {
        style[nativeProp] = v;
        return;
      }

      // Handle viewport units on native by converting to pixels
      const vpMatch = v.match(/^(-?[\d.]+)(vw|vh|vmin|vmax)$/i);
      if (vpMatch) {
        // On web leave the unit string as-is
        if (IS_WEB) {
          style[nativeProp] = v;
          return;
        }

        const num = Number(vpMatch[1]);
        const unit = vpMatch[2].toLowerCase();
        const { width: sw, height: sh } = Dimensions.get('window');
        let pixels = 0;
        if (unit === 'vw') pixels = (num / 100) * sw;
        else if (unit === 'vh') pixels = (num / 100) * sh;
        else if (unit === 'vmin') pixels = (num / 100) * Math.min(sw, sh);
        else if (unit === 'vmax') pixels = (num / 100) * Math.max(sw, sh);

        style[nativeProp] = pixels;
        return;
      }

      // Map CSS-only keywords to React Native equivalents (preserve on web)
      if (v === 'fit-content' || v === 'min-content' || v === 'max-content') {
        style[nativeProp] = IS_WEB ? v : 'auto';
        return;
      }

      // Preserve common keyword values
      if (/^(auto|inherit|initial|unset|none)$/.test(v)) {
        style[nativeProp] = v;
        return;
      }

      // Try to parse numeric strings (including '12px' -> 12)
      // Special-case: unitless line-height values in CSS are multipliers
      // of the element font size (e.g. `1.5` means 1.5× the font size).
      // React Native expects `lineHeight` in pixels, so convert unitless
      // multipliers into pixel values when possible.
      if (nativeProp === 'lineHeight' && /^-?[\d.]+$/.test(v)) {
        const multiplier = Number.parseFloat(v);
        const baseFont = typeof style.fontSize === 'number' ? style.fontSize : 16;
        style[nativeProp] = Number.isNaN(multiplier) ? v : Math.round(multiplier * baseFont * 100) / 100;
        return;
      }

      const numValue = Number.parseFloat(v);
      style[nativeProp] = Number.isNaN(numValue) ? v : numValue;
      return;
    }

    // Non-string values: try coercion, else keep original
    const numValue = Number(value);
    style[nativeProp] = Number.isNaN(numValue) ? value : numValue;
    return;
  }

  style[nativeProp] = value;
}

function applyStaticDeclaration(style: NativeStyle, declaration: string) {
  const [rawProp, ...rawValue] = declaration.split(':');
  const cssProp = rawProp?.trim();
  const value = rawValue.join(':').trim();

  if (!cssProp || !value) return;
  applyCssDeclaration(style, cssProp, stripCssUnit(value));
}

function applyShadow(style: NativeStyle, value: unknown) {
  if (value === 'none') {
    if (IS_WEB) {
      style.boxShadow = 'none';
      return;
    }

    style.elevation = 0;
    style.shadowOpacity = 0;
    return;
  }

  if (IS_WEB) {
    style.boxShadow = String(value);
    return;
  }

  style.shadowColor = '#0f172a';
  style.shadowOffset = { width: 0, height: 6 };
  style.shadowOpacity = 0.16;
  style.shadowRadius = 12;
  style.elevation = 4;
}

function applyTransform(style: NativeStyle, propKey: string, rawValue: unknown) {
  const nativeTransform = TRANSFORM_TO_REACT_NATIVE[propKey];
  if (!nativeTransform) return;

  const value = propKey === 'rotate' ? `${resolveValue(propKey, rawValue)}deg` : resolveValue(propKey, rawValue);
  style.transform = [...(style.transform ?? []), { [nativeTransform]: value }];
}

function applyAtomAttr(style: NativeStyle, key: string, rawValue: unknown) {
  const propKey = toCanonicalAtomName(key);
  if (!propKey || rawValue === false || rawValue === null || rawValue === undefined) return;

  const dictEntry = ATOM_DICTIONARY[propKey];
  if (!dictEntry) return;

  if (propKey === 'flex') {
    style.flex = resolveValue(propKey, rawValue);
    return;
  }

  if (TRANSFORM_PROPS.has(propKey)) {
    applyTransform(style, propKey, rawValue);
    return;
  }

  if (SHADOW_PROPS.has(propKey)) {
    applyShadow(style, resolveValue(propKey, rawValue));
    return;
  }

  if (typeof dictEntry === 'string' && dictEntry.includes(':') && rawValue === true) {
    dictEntry
      .split(';')
      .map(part => part.trim())
      .filter(Boolean)
      .forEach(declaration => applyStaticDeclaration(style, declaration));
    return;
  }

  const value = resolveValue(propKey, rawValue);
  const cssProps = Array.isArray(dictEntry) ? dictEntry : [dictEntry];
  // Support shorthand values for array-mapped CSS props (e.g. `inset: "0 1"`)
  if (Array.isArray(cssProps) && typeof value === 'string' && /\s+/.test(value)) {
    const tokens = value.split(/\s+/).filter(Boolean);
    // Expand tokens to 4-side normalized array
    const normalized =
      tokens.length === 1
        ? [tokens[0], tokens[0], tokens[0], tokens[0]]
        : tokens.length === 2
        ? [tokens[0], tokens[1], tokens[0], tokens[1]]
        : tokens.length === 3
        ? [tokens[0], tokens[1], tokens[2], tokens[1]]
        : [tokens[0], tokens[1], tokens[2], tokens[3]];

    if (cssProps.length === 4) {
      for (let i = 0; i < 4; i += 1) {
        style[cssProps[i]] = stripCssUnit(normalized[i]);
      }
      return;
    }

    if (cssProps.length === 2) {
      // e.g. inset-x -> ['left','right'] or inset-y -> ['top','bottom']
      style[cssProps[0]] = stripCssUnit(normalized[0]);
      style[cssProps[1]] = stripCssUnit(normalized[1]);
      return;
    }
  }

  if ((propKey === 'p' || propKey === 'm') && typeof value === 'string' && /\s+/.test(value)) {
    const sideValues = value.split(/\s+/).filter(Boolean).map(token => stripCssUnit(token));
    const normalized = sideValues.length === 1 ? [sideValues[0], sideValues[0], sideValues[0], sideValues[0]] : sideValues.length === 2 ? [sideValues[0], sideValues[1], sideValues[0], sideValues[1]] : sideValues.length === 3 ? [sideValues[0], sideValues[1], sideValues[2], sideValues[1]] : [sideValues[0], sideValues[1], sideValues[2], sideValues[3]];
    const base = cssProps[0] === 'margin' ? 'margin' : 'padding';
    const sides = ['Top', 'Right', 'Bottom', 'Left'];
    for (let index = 0; index < sides.length; index += 1) {
      style[`${base}${sides[index]}`] = normalized[index];
    }
    return;
  }

  for (const cssProp of cssProps) {
    if (typeof cssProp === 'string' && cssProp.includes(':')) {
      applyStaticDeclaration(style, cssProp);
    } else {
      applyCssDeclaration(style, cssProp, value);
    }
  }
}

export function attrsToStyle(attrs: AtomAttrs = {}) {
  const style: NativeStyle = {};
  const darkAttrs: AtomAttrs = {};

  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith('dark-')) {
      darkAttrs[key.slice(5)] = value;
      continue;
    }

    applyAtomAttr(style, key, value);
  }

  if (getAtomTheme().isDark) {
    for (const [key, value] of Object.entries(darkAttrs)) {
      applyAtomAttr(style, key, value);
    }
  }

  // Native fallback: if an element explicitly requested "fit" sizing via atom attrs
  // try to prevent it from growing to fill available flex space on native platforms.
  // This helps emulate `fit-content` behavior on React Native where flex grow
  // can otherwise force full-width sizing.
  if (!IS_WEB) {
    try {
      const fitCandidates = ['w', 'max-w', 'min-w', 'h', 'max-h', 'min-h'];
      const wantsFit = fitCandidates.some((k) => {
        const v = attrs[k];
        if (v === undefined || v === null) return false;
        const s = String(v).trim();
        return s === 'fit' || s === 'fit-content' || s === 'min' || s === 'min-content' || s === 'max' || s === 'max-content';
      });

      if (wantsFit) {
        // Avoid unintentionally filling available space
        if (style.flex !== undefined) style.flex = 0;
        if (style.flexGrow === undefined) style.flexGrow = 0;
        if (style.flexShrink === undefined) style.flexShrink = 0;
        if (style.alignSelf === undefined) style.alignSelf = 'flex-start';
      }
    } catch (e) {
      // swallow
    }
  }

  return style;
}

export function getColor(name: string) {
  const token = String(name).trim();

  // Support direct mix(...) expressions and alpha suffixes for React Native by resolving to hex/rgba
  if (/^mix\(/i.test(token)) {
    try {
      // parse `mix(a,b,20%)`
      const m = token.match(/^mix\(([^,]+),([^,]+),([^\)]+)\)$/i);
      if (m) {
        const a = m[1].trim();
        const b = m[2].trim();
        const ratio = m[3].trim().replace('%', '');
        const hexA = ATOM_COLORS[a] ?? a;
        const hexB = ATOM_COLORS[b] ?? b;
        // lazy import to avoid circular deps
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const { mixOklch } = require('../src/style-data/color-utils.js');
        return mixOklch(hexA, hexB, Number(ratio));
      }
    } catch (e) {
      return name;
    }
  }

  // Alpha suffix `color/80` -> rgba on native
  const alphaMatch = token.match(/^(.*)\/(\d+(?:\.\d+)?)$/);
  if (alphaMatch) {
    const base = alphaMatch[1];
    const alpha = Number(alphaMatch[2]);
    const hex = getAtomTheme().colors?.[base] ?? ATOM_COLORS[base] ?? base;
    if (/^#([0-9a-f]{3,8})$/i.test(hex)) {
      const { hexToRgb } = require('../src/style-data/color-utils.js');
      const [r,g,b] = hexToRgb(hex);
      const a = Math.max(0, Math.min(1, alpha/100)).toFixed(2).replace(/0+$/, '').replace(/\.$/, '');
      return `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    return hex;
  }

  const themeVal = getAtomTheme().colors?.[token];
  if (themeVal) return themeVal;

  return ATOM_COLORS[token] ?? token;
}

export function getSpacing(name: string | number) {
  const value = String(name);
  return ATOM_SPACING_SCALE[value] !== undefined ? stripCssUnit(ATOM_SPACING_SCALE[value]) : stripCssUnit(value);
}
