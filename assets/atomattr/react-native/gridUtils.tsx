import React from 'react';
import { attrsToStyle, getSpacing } from './style-engine';
import { View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';

type AtomAttrs = Record<string, any>;

// Helper to clone children and apply grid-derived styles (width, gap margins, col-span)
export function gridizeChildren(children: React.ReactNode, parentAttrs: AtomAttrs = {}) {
  const colsRaw = parentAttrs['grid-cols'] ?? parentAttrs['cols'] ?? parentAttrs['gridCols'];
  const cols = colsRaw ? Number(String(colsRaw).trim()) : 1;
  const gapRaw = parentAttrs['gap'] ?? parentAttrs['gap-x'] ?? parentAttrs['gapX'] ?? 0;
  const gapPx = Number(getSpacing(gapRaw || 0)) || 0;
  const halfGap = gapPx / 2;

  const childNodes = React.Children.toArray(children).map((child) => {
    if (!React.isValidElement(child)) return child;

    // Read atom attrs from child's props (e.g., col-span)
    const childProps = (child.props as any) || {};
    const colSpanRaw = childProps['col-span'] ?? childProps['colSpan'] ?? 1;
    const colSpan = Number(colSpanRaw) || 1;
    const rowSpanRaw = childProps['row-span'] ?? childProps['rowSpan'] ?? 1;
    const rowSpan = Number(rowSpanRaw) || 1;

    // Compute width as percentage when columns are defined
    const widthPct = `${Math.max(1, Math.min(cols, colSpan)) / cols * 100}%`;

    const gridChildStyle: any = {
      width: widthPct,
      paddingLeft: halfGap,
      paddingRight: halfGap,
      boxSizing: 'border-box',
    };

    // If parent provided an explicit row-height token, compute height via row-span
    const rowHeightRaw = parentAttrs['row-height'] ?? parentAttrs['rowHeight'];
    if (rowHeightRaw) {
      try {
        const rh = Number(getSpacing(rowHeightRaw));
        if (!Number.isNaN(rh) && rh > 0 && rowSpan > 1) {
          gridChildStyle.height = rh * rowSpan;
        }
      } catch (e) {
        // ignore
      }
    }

    // Merge with existing style
    const existingStyle = childProps.style;
    const mergedStyle = Array.isArray(existingStyle) ? [...existingStyle, gridChildStyle] : [existingStyle, gridChildStyle];

    return React.cloneElement(child, { ...child.props, style: mergedStyle });
  });

  return childNodes;
}

// Helper to produce container style for grid-like flex wrap layout
export function gridContainerStyle(parentAttrs: AtomAttrs = {}) {
  const colsRaw = parentAttrs['grid-cols'] ?? parentAttrs['cols'] ?? parentAttrs['gridCols'];
  const cols = colsRaw ? Number(String(colsRaw).trim()) : 1;
  const gapRaw = parentAttrs['gap'] ?? parentAttrs['gap-x'] ?? parentAttrs['gapX'] ?? 0;
  const gapPx = Number(getSpacing(gapRaw || 0)) || 0;
  const halfGap = gapPx / 2;

  return {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -halfGap,
    marginRight: -halfGap,
    // allow children to wrap naturally
  } as any;
}

// Component that measures child heights and enforces row heights based on the tallest
// child in each row (supports col-span allocation). Use like:
// <GridAutoRows parentAttrs={...}>{children}</GridAutoRows>
export function GridAutoRows({ parentAttrs = {}, children }: { parentAttrs?: AtomAttrs; children: React.ReactNode }) {
  const colsRaw = parentAttrs['grid-cols'] ?? parentAttrs['cols'] ?? parentAttrs['gridCols'];
  const cols = colsRaw ? Number(String(colsRaw).trim()) : 1;

  const childArray = React.Children.toArray(children);

  // Read col-span for allocation
  const spans = childArray.map((child: any) => {
    if (!React.isValidElement(child)) return 1;
    const p = child.props || {};
    const s = Number(p['col-span'] ?? p['colSpan'] ?? 1) || 1;
    return Math.max(1, Math.min(cols, s));
  });

  // allocate children to rows considering spans
  const rows = useMemo(() => {
    const out: number[][] = [];
    let current: number[] = [];
    let remaining = cols;
    for (let i = 0; i < spans.length; i++) {
      const s = Math.max(1, Math.min(cols, spans[i]));
      if (s > remaining) {
        out.push(current);
        current = [];
        remaining = cols;
      }
      current.push(i);
      remaining -= s;
      if (remaining === 0) {
        out.push(current);
        current = [];
        remaining = cols;
      }
    }
    if (current.length) out.push(current);
    return out;
  }, [spans, cols]);

  const [heights, setHeights] = useState<Record<number, number>>({});

  useEffect(() => {
    // reset heights when children change
    setHeights({});
  }, [children, colsRaw]);

  // compute max height per row
  const rowMax = rows.map((row) => {
    let max = 0;
    for (const idx of row) {
      const h = heights[idx];
      if (h && h > max) max = h;
    }
    return max || undefined;
  });

  const onChildLayout = (index: number) => (e: any) => {
    const h = e?.nativeEvent?.layout?.height;
    if (!h) return;
    setHeights((prev) => {
      if (prev[index] === h) return prev;
      return { ...prev, [index]: h };
    });
  };

  const containerStyle = gridContainerStyle(parentAttrs);

  const rendered = childArray.map((child, i) => {
    if (!React.isValidElement(child)) return child;
    const span = spans[i] || 1;
    // find row index
    let rowIndex = 0;
    for (let r = 0; r < rows.length; r++) if (rows[r].includes(i)) { rowIndex = r; break; }
    const enforcedHeight = rowMax[rowIndex];

    const wrapperStyle: any = { paddingLeft: (getSpacing(parentAttrs.gap || parentAttrs['gap-x'] || 0) || 0) / 2, paddingRight: (getSpacing(parentAttrs.gap || parentAttrs['gap-x'] || 0) || 0) / 2, boxSizing: 'border-box' };

    if (enforcedHeight) wrapperStyle.height = enforcedHeight;

    return (
      <View key={(child as any).key ?? i} onLayout={onChildLayout(i)} style={wrapperStyle}>
        {React.cloneElement(child, child.props)}
      </View>
    );
  });

  return <View style={containerStyle}>{rendered}</View>;
}
