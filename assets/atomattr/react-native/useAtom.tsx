import { useCallback, useMemo, useState } from 'react';
import { attrsToStyle } from './style-engine';

type AtomAttrs = Record<string, any>;

// Hook that returns RN-friendly props based on Atom attributes
// Usage:
// const { style, inputProps, pressableProps } = useAtom(attrs);
export default function useAtom(attrs: AtomAttrs = {}) {
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const baseAttrs = useMemo(() => {
    const copy: AtomAttrs = {};
    for (const [k, v] of Object.entries(attrs)) {
      if (k.startsWith('focus-') || k.startsWith('pressed-') || k.startsWith('hover-') || k.startsWith('active-')) continue;
      copy[k] = v;
    }
    return copy;
  }, [attrs]);

  const focusAttrs = useMemo(() => {
    const out: AtomAttrs = {};
    for (const [k, v] of Object.entries(attrs)) if (k.startsWith('focus-')) out[k.slice(6)] = v;
    return out;
  }, [attrs]);

  const pressedAttrs = useMemo(() => {
    const out: AtomAttrs = {};
    for (const [k, v] of Object.entries(attrs)) if (k.startsWith('pressed-')) out[k.slice(8)] = v;
    return out;
  }, [attrs]);

  const hoverAttrs = useMemo(() => {
    const out: AtomAttrs = {};
    for (const [k, v] of Object.entries(attrs)) if (k.startsWith('hover-')) out[k.slice(6)] = v;
    return out;
  }, [attrs]);

  const activeAttrs = useMemo(() => {
    const out: AtomAttrs = {};
    for (const [k, v] of Object.entries(attrs)) if (k.startsWith('active-')) out[k.slice(7)] = v;
    return out;
  }, [attrs]);

  const style = useMemo(() => {
    let merged = { ...attrsToStyle(baseAttrs) };
    if (focused) merged = { ...merged, ...attrsToStyle(focusAttrs) };
    if (pressed) merged = { ...merged, ...attrsToStyle(pressedAttrs) };
    if (hovered) merged = { ...merged, ...attrsToStyle(hoverAttrs) };
    // active can be combined
    merged = { ...merged, ...attrsToStyle(activeAttrs) };
    return merged;
  }, [baseAttrs, focusAttrs, pressedAttrs, hoverAttrs, activeAttrs, focused, pressed, hovered]);

  // If this element is a grid container (grid-cols), produce a recommended child style
  const childStyle = useMemo(() => {
    const colsRaw = baseAttrs['grid-cols'] ?? baseAttrs['grid-cols'] === 0 ? baseAttrs['grid-cols'] : null;
    const cols = colsRaw ? Number(String(colsRaw).trim()) : null;
    if (!cols || Number.isNaN(cols) || cols <= 0) return undefined;
    const pct = `${100 / cols}%`;
    return { width: pct };
  }, [baseAttrs]);

  const inputProps = useMemo(() => {
    return {
      onFocus: () => setFocused(true),
      onBlur: () => setFocused(false),
      style,
    };
  }, [style]);

  const pressableProps = useMemo(() => {
    return {
      onPressIn: () => setPressed(true),
      onPressOut: () => setPressed(false),
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => setHovered(false),
      style,
    };
  }, [style]);

  return { style, childStyle, inputProps, pressableProps, focused, pressed, hovered };
}
