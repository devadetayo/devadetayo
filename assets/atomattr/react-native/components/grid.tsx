// @ts-nocheck
import React, { forwardRef, ReactNode } from 'react';
import { View } from 'react-native';
import { attrsToStyle, isAtomAttr, toCanonicalAtomName, getSpacing } from '../style-engine';

type GridProps = Record<string, any> & {
  children?: ReactNode;
  'grid-cols'?: string | number;
  'grid-rows'?: string | number;
  gap?: string | number;
};

function normalizeAtomAttrs(attrs: Record<string, any>) {
  const normalizedAttrs: Record<string, any> = {};
  for (const [key, value] of Object.entries(attrs)) {
    normalizedAttrs[key] = value;
  }
  return normalizedAttrs;
}

function separateProps(props: Record<string, any>): { atomAttrs: Record<string, any>; reactProps: Record<string, any> } {
  const REACT_NATIVE_PROPS = new Set([
    'children', 'ref', 'key', 'as', 'style', 'attrs', 'class', 'className',
    'onPress', 'onChange', 'onChangeText', 'onFocus', 'onBlur', 'onSubmitEditing'
  ]);

  const atomAttrs: Record<string, any> = {};
  const reactProps: Record<string, any> = {};

  for (const [key, value] of Object.entries(props)) {
    if (key === 'class' || key === 'className' || key.startsWith('aria-') || key.startsWith('data-')) {
      continue;
    } else if (typeof value === 'boolean' && value === false) {
      continue;
    } else if (isAtomAttr(key)) {
      const normalized = key.startsWith('dark-') ? key.slice(5) : key;
      const canonical = toCanonicalAtomName(normalized);
      if (canonical) {
        atomAttrs[key.startsWith('dark-') ? `dark-${canonical}` : canonical] = value;
      }
    } else if (REACT_NATIVE_PROPS.has(key)) {
      reactProps[key] = value;
    } else {
      reactProps[key] = value;
    }
  }

  return { atomAttrs, reactProps };
}

/**
 * Grid component that simulates CSS Grid using flexbox for React Native
 * Supports grid-cols for number of columns
 */
export const Grid = forwardRef<any, GridProps>(function CustomGrid(
  { attrs: explicitAttrs = {}, style = {}, 'grid-cols': cols, 'grid-rows': rows, gap, children, ...props },
  ref
) {
  // Separate ATOMATTR attrs from React Native props
  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);

  // Merge explicit and implicit attrs, but exclude grid-cols/grid-rows from normal processing
  const mergedAttrs = {
    ...implicitAttrs,
    ...normalizeAtomAttrs(explicitAttrs),
  };

  // Remove grid-cols and grid-rows from atomAttrs as we'll handle them separately
  delete mergedAttrs['grid-cols'];
  delete mergedAttrs['grid-rows'];
  delete mergedAttrs['gap'];

  // Convert to React Native styles (excluding grid-specific props)
  const atomStyle = attrsToStyle(mergedAttrs);

  // Parse grid-cols to determine column count
  const colCount = cols ? parseInt(String(cols).match(/\d+/)?.[0] || '1') : 1;
  
  // Parse gap value - convert atomattr spacing to pixels
  let gapPixels = 0;
  if (gap) {
    gapPixels = parseInt(String(getSpacing(gap)));
  }

  // Set up grid-like flexbox layout
  const gridStyle = {
    ...atomStyle,
    display: 'flex',
    flexDirection: 'row' as const,
    flexWrap: 'wrap' as const,
    justifyContent: 'flex-start',
    marginHorizontal: gapPixels ? -gapPixels / 2 : 0,
    marginVertical: gapPixels ? -gapPixels / 2 : 0,
  };

  // Create wrapper for items to enforce column layout
  const itemsWithWidth = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;

    // Calculate item width: (100% / colCount) - gap accounting
    const percentWidth = 100 / colCount;
    
    return React.cloneElement(child, {
      ...child.props,
      style: [
        child.props.style,
        {
          width: `${percentWidth}%`,
          paddingHorizontal: gapPixels ? gapPixels / 2 : 0,
          paddingVertical: gapPixels ? gapPixels / 2 : 0,
        },
      ],
    } as any);
  });

  const finalStyle = Array.isArray(style)
    ? [gridStyle, ...style]
    : [gridStyle, style];

  return (
    <View ref={ref} style={finalStyle} {...reactProps}>
      {itemsWithWidth}
    </View>
  );
});
