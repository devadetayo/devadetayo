// @ts-nocheck
import React, { cloneElement, forwardRef, isValidElement } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Image as RNImage, Platform, Dimensions } from 'react-native';
import { attrsToStyle, isAtomAttr, toCanonicalAtomName } from './style-engine';
import { Input as CustomInput } from './components/input';
import { Grid as CustomGrid } from './components/grid';

type PrimitiveProps = Record<string, any>;
type PrimitiveOptions = { text?: boolean };

type FontResolveResult = { fontFamily?: string; fontWeight?: string | number | undefined };
type FontResolver = (
  fontWeight?: string | number,
  fontStyle?: string,
  fontFamily?: string
) => FontResolveResult;

let fontResolver: FontResolver | null = null;

export function setFontResolver(resolver: FontResolver | null) {
  fontResolver = resolver;
}

function normalizeChildren(children: React.ReactNode, textMode: boolean) {
  if (textMode || children == null) return children;
  const validChildren: React.ReactNode[] = [];
  if (Array.isArray(children)) {
    for (const child of children) {
      if (child != null && (typeof child === 'string' || typeof child === 'number' || isValidElement(child))) {
        validChildren.push(child);
      }
    }
  } else if (typeof children === 'string' || typeof children === 'number' || isValidElement(children)) {
    validChildren.push(children);
  }
  return React.Children.toArray(validChildren)
    .map((child, index) => {
      if (typeof child === 'string' && child.trim() === '') return null;
      if (typeof child === 'string' || typeof child === 'number') {
        return React.createElement(Text, { key: `atom-text-${index}` }, child);
      }
      if (isValidElement(child)) {
        if (child.key == null) return cloneElement(child, { key: `atom-child-${index}` });
        return child;
      }
      return null;
    })
    .filter(Boolean);
}

function parseNumericStyleValue(key: string, raw: any) {
  if (raw == null) return raw;
  if (typeof raw === 'number') return raw;
  if (typeof raw !== 'string') return raw;
  const v = raw.trim();
  if (key === 'fontSize' || key === 'lineHeight' || key === 'letterSpacing') {
    const numValue = Number.parseFloat(v);
    return Number.isNaN(numValue) ? 16 : numValue;
  }
  if (key === 'lineHeight' && /^-?[\d.]+$/.test(v)) {
    const multiplier = Number.parseFloat(v);
    return Number.isNaN(multiplier) ? 16 : multiplier;
  }
  if (/^#|^rgb|^hsl|[a-zA-Z-]+$/.test(v) && !/^-?[\d.]/.test(v)) return v;
  if (/%$/.test(v)) return v;
  const vpMatch = v.match(/^(-?[\d.]+)(vw|vh|vmin|vmax)$/i);
  if (vpMatch) {
    if (Platform.OS === 'web') return v;
    const num = Number(vpMatch[1]);
    const unit = vpMatch[2].toLowerCase();
    const { width: sw, height: sh } = Dimensions.get('window');
    if (unit === 'vw') return (num / 100) * sw;
    if (unit === 'vh') return (num / 100) * sh;
    if (unit === 'vmin') return (num / 100) * Math.min(sw, sh);
    if (unit === 'vmax') return (num / 100) * Math.max(sw, sh);
  }
  if (/^-?[\d.]+px$/.test(v)) return Number.parseFloat(v);
  if (/^-?[\d.]+rem$/.test(v) || /^-?[\d.]+em$/.test(v)) return Number.parseFloat(v) * 16;
  if (/^-?[\d.]+$/.test(v)) return Number.parseFloat(v);
  return raw;
}

function normalizeStyleObject(styleObj: Record<string, any>) {
  if (!styleObj || typeof styleObj !== 'object') return styleObj;
  const out: Record<string, any> = {};
  for (const [k, v] of Object.entries(styleObj)) {
    try {
      out[k] = parseNumericStyleValue(k, v);
    } catch (e) {
      out[k] = v;
    }
  }
  if (fontResolver) {
    const resolved = fontResolver(out.fontWeight, out.fontStyle, out.fontFamily);
    if (resolved.fontFamily !== undefined) out.fontFamily = resolved.fontFamily;
    if ('fontWeight' in resolved) {
      if (resolved.fontWeight === undefined) delete out.fontWeight;
      else out.fontWeight = resolved.fontWeight;
    }
  }
  if (out.lineHeight != null && typeof out.lineHeight === 'number') {
    const v = out.lineHeight;
    if (v > 0 && v <= 5) {
      const base = typeof out.fontSize === 'number' ? out.fontSize : 16;
      out.lineHeight = Math.round(v * base * 100) / 100;
    }
  }
  return out;
}

function flattenStyleOnly(style: any): Record<string, any> {
  if (!style) return {};
  if (Array.isArray(style)) {
    const merged: Record<string, any> = {};
    for (const item of style) {
      if (!item) continue;
      Object.assign(merged, flattenStyleOnly(item));
    }
    return merged;
  }
  if (typeof style === 'object') return style;
  return {};
}

function flattenAndNormalizeStyle(style: any) {
  const merged = flattenStyleOnly(style);
  return normalizeStyleObject(merged);
}

function hasRoundedAtomAttr(atomAttrs: Record<string, any>) {
  return Object.keys(atomAttrs).some((key) => key === 'rounded' || key.startsWith('rounded-'));
}

function shouldForceRoundedClipping(
  NativeComponent: React.ComponentType<any>,
  Component: React.ComponentType<any>,
  atomAttrs: Record<string, any>,
  finalStyle: any
) {
  if (Platform.OS === 'web') return false;
  if (NativeComponent !== TouchableOpacity && Component !== TouchableOpacity) return false;
  if (!hasRoundedAtomAttr(atomAttrs)) return false;
  if (finalStyle?.overflow) return false;
  if (finalStyle?.shadowOpacity || finalStyle?.shadowRadius || finalStyle?.elevation || finalStyle?.boxShadow) return false;
  return typeof finalStyle?.borderRadius === 'number' && finalStyle.borderRadius > 0;
}

const REACT_NATIVE_PROPS = new Set([
  'children', 'ref', 'key', 'as', 'style', 'attrs', 'class', 'className',
  'onPress', 'onChange', 'onChangeText', 'onFocus', 'onBlur', 'onSubmitEditing',
  'placeholder', 'placeholderTextColor', 'secureTextEntry', 'editable', 'value',
  'defaultValue', 'label', 'helperText', 'error', 'multiline', 'numberOfLines',
  'scrollEnabled', 'pagingEnabled', 'horizontal', 'vertical',
  'showsHorizontalScrollIndicator', 'showsVerticalScrollIndicator',
  'contentContainerStyle', 'keyboardShouldPersistTaps', 'keyboardDismissMode',
  'alwaysBounceVertical', 'bounces', 'refreshControl', 'returnKeyType',
  'autoCapitalize', 'autoCorrect', 'autoFocus', 'blurOnSubmit', 'maxLength',
  'selectionColor', 'textAlignVertical', 'hitSlop', 'behavior', 'activeOpacity',
  'disabled', 'source', 'contentFit', 'edges', 'testID', 'accessible', 'accessibilityLabel',
]);

function normalizeAtomAttrKey(key: string, textMode = false) {
  if (textMode && key === 'size') return 'font-size';
  if (textMode && key === 'dark-size') return 'dark-font-size';
  return key;
}

function normalizeAtomAttrs(attrs: Record<string, any>, textMode = false) {
  const normalizedAttrs: Record<string, any> = {};
  for (const [key, value] of Object.entries(attrs)) {
    normalizedAttrs[normalizeAtomAttrKey(key, textMode)] = value;
  }
  return normalizedAttrs;
}

function separateProps(props: Record<string, any>, textMode = false) {
  const atomAttrs: Record<string, any> = {};
  const reactProps: Record<string, any> = {};
  for (const [key, value] of Object.entries(props)) {
    if (key === 'class' || key === 'className' || key.startsWith('aria-') || key.startsWith('data-')) continue;
    else if (typeof value === 'boolean' && value === false) continue;
    else if (isAtomAttr(normalizeAtomAttrKey(key, textMode))) {
      const atomKey = normalizeAtomAttrKey(key, textMode);
      const normalized = atomKey.startsWith('dark-') ? atomKey.slice(5) : atomKey;
      const canonical = toCanonicalAtomName(normalized);
      if (canonical) atomAttrs[atomKey.startsWith('dark-') ? `dark-${canonical}` : canonical] = value;
    } else if (REACT_NATIVE_PROPS.has(key)) reactProps[key] = value;
    else reactProps[key] = value;
  }
  return { atomAttrs, reactProps };
}

const createComponent = (NativeComponent: React.ComponentType<any>, options: PrimitiveOptions = {}) => {
  return forwardRef<any, PrimitiveProps>(function AtomComponent(
    { as: Component = NativeComponent, attrs: explicitAttrs = {}, style = {}, children, ...props },
    ref
  ) {
    const { atomAttrs: implicitAttrs, reactProps } = separateProps(props, options.text);
    const mergedAttrs = { ...implicitAttrs, ...normalizeAtomAttrs(explicitAttrs, options.text) };
    const atomStyle = attrsToStyle(mergedAttrs);
    const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
    const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
    const normalizedFinalStyle = shouldForceRoundedClipping(NativeComponent, Component, mergedAttrs, finalStyle)
      ? { ...finalStyle, overflow: 'hidden' }
      : finalStyle;
    const normalizedChildren = normalizeChildren(children, Boolean(options.text));
    return (
      <Component ref={ref} style={normalizedFinalStyle} {...reactProps}>
        {normalizedChildren}
      </Component>
    );
  });
};

export const Box = createComponent(View);
export const Grid = CustomGrid;
export const Span = createComponent(Text, { text: true });
export const Txt = createComponent(Text, { text: true });
export const Code = createComponent(Text, { text: true });
export const Pre = createComponent(Text, { text: true });
export const H1 = createComponent(Text, { text: true });
export const H2 = createComponent(Text, { text: true });
export const H3 = createComponent(Text, { text: true });
export const H4 = createComponent(Text, { text: true });
export const H5 = createComponent(Text, { text: true });
export const H6 = createComponent(Text, { text: true });
export const Btn = createComponent(TouchableOpacity);
export const Link = createComponent(Text, { text: true });
export const Img = createComponent(RNImage);
export const Section = createComponent(View);
export const Header = createComponent(View);
export const Footer = createComponent(View);
export const Main = createComponent(View);
export const Nav = createComponent(View);
export const Article = createComponent(View);
export const UL = createComponent(View);
export const LI = createComponent(View);
export const Input = CustomInput;
export const Textarea = createComponent(TextInput, { text: true });
export const Select = createComponent(View);
export const Option = createComponent(Text);

export const Row = forwardRef<any, PrimitiveProps>(function Row({ attrs: explicitAttrs = {}, style = {}, ...props }, ref) {
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);
  const { children, ...restProps } = reactProps;
  const mergedAttrs = { 'flex-row': true, ...implicitAttrs, ...explicitAttrs };
  const atomStyle = attrsToStyle(mergedAttrs);
  const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
  const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
  return <View ref={ref} style={finalStyle} {...restProps}>{normalizeChildren(children, false)}</View>;
});

export const Col = forwardRef<any, PrimitiveProps>(function Col({ attrs: explicitAttrs = {}, style = {}, ...props }, ref) {
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);
  const { children, ...restProps } = reactProps;
  const mergedAttrs = { 'flex-col': true, ...implicitAttrs, ...explicitAttrs };
  const atomStyle = attrsToStyle(mergedAttrs);
  const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
  const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
  return <View ref={ref} style={finalStyle} {...restProps}>{normalizeChildren(children, false)}</View>;
});

export const Center = forwardRef<any, PrimitiveProps>(function Center({ attrs: explicitAttrs = {}, style = {}, ...props }, ref) {
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);
  const { children, ...restProps } = reactProps;
  const mergedAttrs = { center: true, ...implicitAttrs, ...explicitAttrs };
  const atomStyle = attrsToStyle(mergedAttrs);
  const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
  const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
  return <View ref={ref} style={finalStyle} {...restProps}>{normalizeChildren(children, false)}</View>;
});

export const Stack = forwardRef<any, PrimitiveProps>(function Stack({ attrs: explicitAttrs = {}, style = {}, ...props }, ref) {
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);
  const { children, ...restProps } = reactProps;
  const mergedAttrs = { 'flex-col': true, ...implicitAttrs, ...explicitAttrs };
  const atomStyle = attrsToStyle(mergedAttrs);
  const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
  const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
  return <View ref={ref} style={finalStyle} {...restProps}>{normalizeChildren(children, false)}</View>;
});

export const Spacer = forwardRef<any, PrimitiveProps>(function Spacer({ attrs: explicitAttrs = {}, style = {}, ...props }, ref) {
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);
  const { children, ...restProps } = reactProps;
  const mergedAttrs = { grow: '1', ...implicitAttrs, ...explicitAttrs };
  const atomStyle = attrsToStyle(mergedAttrs);
  const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
  const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
  return <View ref={ref} style={finalStyle} {...restProps}>{normalizeChildren(children, false)}</View>;
});

export const Divider = forwardRef<any, PrimitiveProps & { vertical?: boolean }>(function Divider({ vertical = false, attrs: explicitAttrs = {}, style = {}, ...props }, ref) {
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);
  const { children, ...restProps } = reactProps;
  const dividerAttrs = { bg: 'gray-200', ...(vertical ? { w: '1', 'min-h': 'full' } : { h: '1', w: 'full' }), ...implicitAttrs, ...explicitAttrs };
  const atomStyle = attrsToStyle(dividerAttrs);
  const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
  const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
  return <View ref={ref} style={finalStyle} {...restProps}>{normalizeChildren(children, false)}</View>;
});

export const Card = forwardRef<any, PrimitiveProps>(function Card({ attrs: explicitAttrs = {}, style = {}, ...props }, ref) {
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);
  const { children, ...restProps } = reactProps;
  const cardAttrs = { bg: 'white', rounded: '2xl', border: '1', 'border-color': 'gray-200', p: '4', ...implicitAttrs, ...explicitAttrs };
  const atomStyle = attrsToStyle(cardAttrs);
  const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
  const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
  return <View ref={ref} style={finalStyle} {...restProps}>{normalizeChildren(children, false)}</View>;
});

export const Badge = forwardRef<any, PrimitiveProps>(function Badge({ attrs: explicitAttrs = {}, style = {}, ...props }, ref) {
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);
  const { children, ...restProps } = reactProps;
  const badgeAttrs = { 'flex-row': true, center: true, rounded: 'full', px: '3', py: '1', ...implicitAttrs, ...explicitAttrs };
  const atomStyle = attrsToStyle(badgeAttrs);
  const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
  const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
  return <View ref={ref} style={finalStyle} {...restProps}>{normalizeChildren(children, false)}</View>;
});

export const Scroll = forwardRef<any, PrimitiveProps>(function Scroll({ attrs: explicitAttrs = {}, horizontal = false, style = {}, ...props }, ref) {
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);
  const { children, ...restProps } = reactProps;
  const mergedAttrs = { ...(horizontal ? { flex: true, 'flex-row': true } : {}), ...implicitAttrs, ...explicitAttrs };
  const atomStyle = attrsToStyle(mergedAttrs);
  const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
  const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
  return <ScrollView ref={ref} horizontal={horizontal} style={finalStyle} {...restProps}>{normalizeChildren(children, false)}</ScrollView>;
});

export const Touchable = forwardRef<any, PrimitiveProps>(function Touchable({ attrs: explicitAttrs = {}, style = {}, ...props }, ref) {
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);
  const { children, ...restProps } = reactProps;
  const mergedAttrs = { ...implicitAttrs, ...explicitAttrs };
  const atomStyle = attrsToStyle(mergedAttrs);
  const rawFinalStyle = Array.isArray(style) ? [atomStyle, ...style] : [atomStyle, style];
  const finalStyle = flattenAndNormalizeStyle(rawFinalStyle);
  return <TouchableOpacity ref={ref} style={finalStyle} {...restProps}>{normalizeChildren(children, false)}</TouchableOpacity>;
});