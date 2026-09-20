import React, { forwardRef } from 'react';
import { DICTIONARY, REACT_IGNORED_PROPS as ATOM_REACT_IGNORED_PROPS, startAtomAttr } from '../src/index.js';
const ATOM_DICTIONARY = DICTIONARY as Record<string, string | string[]>;

if (typeof window !== 'undefined') {
  startAtomAttr();
}

const REACT_IGNORED_PROPS = new Set([
  'as',
  'attrs',
  'children',
  'className',
  'dangerouslySetInnerHTML',
  'horizontal',
  'key',
  'ref',
  'style',
  ...ATOM_REACT_IGNORED_PROPS,
]);

const DOM_PASSTHROUGH_PROPS = new Set([
  'alt',
  'checked',
  'disabled',
  'download',
  'href',
  'id',
  'lang',
  'max',
  'min',
  'name',
  'placeholder',
  'readOnly',
  'rel',
  'role',
  'src',
  'step',
  'tabIndex',
  'target',
  'title',
  'type',
  'value',
]);

function isReactEventProp(key: string) {
  return key.startsWith('on') && key.length > 2 && key[2] === key[2].toUpperCase();
}

function isReactControlProp(key: string) {
  return [
    'activeOpacity',
    'autoCapitalize',
    'autoComplete',
    'autoCorrect',
    'autoFocus',
    'defaultValue',
    'editable',
    'keyboardType',
    'numberOfLines',
    'onChangeText',
    'placeholderTextColor',
    'secureTextEntry',
  ].includes(key);
}

if (typeof document !== 'undefined') {
  document.documentElement.dataset.atomattr = 'ready';
}

const MANUAL_REACT_ALIASES: Record<string, string> = {
  fontSize: 'font-size',
  textSize: 'text-size',
  lineHeight: 'line-height',
  textAlign: 'text-align',
  textColor: 'text-color',
  bgColor: 'bg-color',
  bgImage: 'bg-image',
  bgSize: 'bg-size',
  bgPosition: 'bg-position',
  bgRepeat: 'bg-repeat',
  bgAttachment: 'bg-attachment',
  bgClip: 'bg-clip',
  bgOrigin: 'bg-origin',
  minW: 'min-w',
  maxW: 'max-w',
  minH: 'min-h',
  maxH: 'max-h',
  gapX: 'gap-x',
  gapY: 'gap-y',
  insetX: 'inset-x',
  insetY: 'inset-y',
  borderColor: 'border-color',
  borderWidth: 'border-width',
  borderStyle: 'border-style',
  borderT: 'border-t',
  borderB: 'border-b',
  borderL: 'border-l',
  borderR: 'border-r',
  borderX: 'border-x',
  borderY: 'border-y',
  borderTColor: 'border-t-color',
  borderBColor: 'border-b-color',
  borderLColor: 'border-l-color',
  borderRColor: 'border-r-color',
  outlineColor: 'outline-color',
  outlineStyle: 'outline-style',
  outlineOffset: 'outline-offset',
  outlineNone: 'outline-none',
  roundedTl: 'rounded-tl',
  roundedTr: 'rounded-tr',
  roundedBl: 'rounded-bl',
  roundedBr: 'rounded-br',
  roundedT: 'rounded-t',
  roundedB: 'rounded-b',
  roundedL: 'rounded-l',
  roundedR: 'rounded-r',
  roundedSs: 'rounded-ss',
  roundedSe: 'rounded-se',
  roundedEs: 'rounded-es',
  roundedEe: 'rounded-ee',
  colSpan: 'col-span',
  rowSpan: 'row-span',
  colStart: 'col-start',
  colEnd: 'col-end',
  rowStart: 'row-start',
  rowEnd: 'row-end',
  gridCols: 'grid-cols',
  gridRows: 'grid-rows',
  autoCols: 'auto-cols',
  autoRows: 'auto-rows',
  autoFlow: 'auto-flow',
  caretColor: 'caret-color',
  accentColor: 'accent-color',
  fontWeight: 'font-weight',
  letterSpacing: 'letter-spacing',
  wordSpacing: 'word-spacing',
  verticalAlign: 'vertical-align',
  textTransform: 'text-transform',
  whiteSpace: 'white-space',
  overflowWrap: 'overflow-wrap',
  listStyle: 'list-style',
  listPosition: 'list-position',
  pointerEvents: 'pointer-events',
  userSelect: 'user-select',
  scrollBehavior: 'scroll-behavior',
  scrollSnap: 'scroll-snap',
  scrollSnapAlign: 'scroll-snap-align',
  willChange: 'will-change',
  transformOrigin: 'transform-origin',
  transformStyle: 'transform-style',
  translateX: 'translate-x',
  translateY: 'translate-y',
  translateZ: 'translate-z',
  scaleX: 'scale-x',
  scaleY: 'scale-y',
  skewX: 'skew-x',
  skewY: 'skew-y',
  hueRotate: 'hue-rotate',
  backdropBlur: 'backdrop-blur',
  backdropBrightness: 'backdrop-brightness',
  backdropContrast: 'backdrop-contrast',
  backdropGrayscale: 'backdrop-grayscale',
  backdropHueRotate: 'backdrop-hue-rotate',
  backdropInvert: 'backdrop-invert',
  backdropOpacity: 'backdrop-opacity',
  backdropSaturate: 'backdrop-saturate',
  backdropSepia: 'backdrop-sepia',
  backdropFilter: 'backdrop-filter',
  transitionDuration: 'transition-duration',
  transitionTiming: 'transition-timing',
  transitionDelay: 'transition-delay',
  animationName: 'animation-name',
  animationDuration: 'animation-duration',
  animationTiming: 'animation-timing',
  animationDelay: 'animation-delay',
  animationIteration: 'animation-iteration',
  animationDirection: 'animation-direction',
  animationFill: 'animation-fill',
  animationPlay: 'animation-play',
  objectFit: 'object-fit',
  objectPosition: 'object-position',
  objectCover: 'object-cover',
  objectContain: 'object-contain',
  objectFill: 'object-fill',
  objectNone: 'object-none',
  objectScaleDown: 'object-scale-down',
  boxSizing: 'box-sizing',
  boxBorder: 'box-border',
  boxContent: 'box-content',
  mixBlend: 'mix-blend',
  bgBlend: 'bg-blend',
  tableLayout: 'table-layout',
  borderSpacing: 'border-spacing',
  srOnly: 'sr-only',
  notSrOnly: 'not-sr-only',
  strokeLinecap: 'stroke-linecap',
  strokeLinejoin: 'stroke-linejoin',
  strokeDasharray: 'stroke-dasharray',
  strokeDashoffset: 'stroke-dashoffset',
};

function camelToKebab(name: string) {
  return name.replace(/[A-Z]/g, character => `-${character.toLowerCase()}`);
}

export function toCanonicalAtomName(key: string) {
  if (ATOM_DICTIONARY[key]) return key;
  if (MANUAL_REACT_ALIASES[key]) return MANUAL_REACT_ALIASES[key];

  const kebab = camelToKebab(key);
  return ATOM_DICTIONARY[kebab] ? kebab : null;
}

function toAttributeValue(value: unknown) {
  if (value === true || value === '') return '';
  if (typeof value === 'number') return String(value);
  if (typeof value === 'string') return value;
  return String(value);
}

function normalizeDomProps(tag: React.ElementType, props: Record<string, any>) {
  const normalized = { ...props };
  const isTextInputTag = tag === 'input' || tag === 'textarea';
  const onPress = typeof normalized.onPress === 'function' ? normalized.onPress : undefined;
  const onChangeText = typeof normalized.onChangeText === 'function' ? normalized.onChangeText : undefined;

  if (onPress && normalized.onClick === undefined) {
    normalized.onClick = onPress;
  }

  if (onChangeText && normalized.onChange === undefined) {
    normalized.onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onChangeText(event.target.value);
    };
  }

  if (normalized.secureTextEntry && normalized.type === undefined && tag === 'input') {
    normalized.type = 'password';
  }

  if (normalized.editable === false && normalized.readOnly === undefined && isTextInputTag) {
    normalized.readOnly = true;
  }

  delete normalized.onPress;
  delete normalized.onChangeText;
  delete normalized.secureTextEntry;
  delete normalized.editable;
  delete normalized.keyboardType;
  delete normalized.placeholderTextColor;

  return normalized;
}

export function splitAtomProps(props: Record<string, any>) {
  const atomAttrs: Record<string, string> = {};
  const rest: Record<string, any> = {};
  const { attrs, ...input } = props;

  for (const [key, value] of Object.entries(input)) {
    if (
      REACT_IGNORED_PROPS.has(key) ||
      key.startsWith('aria-') ||
      key.startsWith('data-') ||
      isReactEventProp(key) ||
      isReactControlProp(key) ||
      DOM_PASSTHROUGH_PROPS.has(key)
    ) {
      rest[key] = value;
      continue;
    }

    const canonical = toCanonicalAtomName(key);
    if (!canonical) {
      rest[key] = value;
      continue;
    }

    if (value === false || value === null || value === undefined) continue;
    atomAttrs[canonical] = toAttributeValue(value);
  }

  if (attrs && typeof attrs === 'object') {
    for (const [key, value] of Object.entries(attrs)) {
      if (!ATOM_DICTIONARY[key]) continue;
      if (value === false || value === null || value === undefined) continue;
      atomAttrs[key] = toAttributeValue(value);
    }
  }

  return { atomAttrs, rest };
}

export function useAtom(props: Record<string, any>) {
  return splitAtomProps(props);
}

export function atom(defaultTag: React.ElementType) {
  return forwardRef<any, Record<string, any>>(function AtomComponent(
    { as: Tag = defaultTag, children, ...props },
    ref
  ) {
    const { atomAttrs, rest } = splitAtomProps(props);
    const normalizedRest = normalizeDomProps(Tag, rest);
    const domSafeRest: Record<string, any> = {};

    for (const [key, value] of Object.entries(normalizedRest)) {
      if (isReactEventProp(key)) {
        domSafeRest[key] = value;
        continue;
      }

      if (key.startsWith('aria-') || key.startsWith('data-') || DOM_PASSTHROUGH_PROPS.has(key)) {
        domSafeRest[key] = value;
      }
    }

    return React.createElement(Tag, { ...domSafeRest, ...atomAttrs, ref }, children);
  });
}
