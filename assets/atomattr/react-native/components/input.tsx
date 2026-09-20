// @ts-nocheck
import React, { forwardRef, useState } from 'react';
import { Platform, TextInput } from 'react-native';
import { attrsToStyle, isAtomAttr, toCanonicalAtomName } from '../style-engine';

type InputProps = Record<string, any>;

const DEFAULT_FONT_FAMILY = Platform.select({
  ios: 'Manrope',
  android: 'Manrope',
  default: 'Manrope',
});

const REACT_NATIVE_PROPS = new Set([
  'children',
  'ref',
  'key',
  'as',
  'style',
  'attrs',
  'class',
  'className',
  'onPress',
  'onChange',
  'onChangeText',
  'onChangeTxt',
  'onFocus',
  'onBlur',
  'onSubmitEditing',
  'placeholder',
  'placeholderTxtColor',
  'placeholderTextColor',
  'secureTextEntry',
  'editable',
  'value',
  'defaultValue',
  'label',
  'helperText',
  'error',
  'multiline',
  'numberOfLines',
  'scrollEnabled',
  'pagingEnabled',
  'horizontal',
  'vertical',
  'showsHorizontalScrollIndicator',
  'showsVerticalScrollIndicator',
  'contentContainerStyle',
  'keyboardShouldPersistTaps',
  'keyboardDismissMode',
  'alwaysBounceVertical',
  'bounces',
  'refreshControl',
  'returnKeyType',
  'autoCapitalize',
  'autoCorrect',
  'autoFocus',
  'blurOnSubmit',
  'maxLength',
  'selectionColor',
  'textAlignVertical',
  'TxtAlignVertical',
  'hitSlop',
  'behavior',
  'activeOpacity',
  'disabled',
  'source',
  'contentFit',
  'edges',
  'testID',
  'accessible',
  'accessibilityLabel',
]);

function normalizeAtomAttrs(attrs: Record<string, any>) {
  return Object.fromEntries(Object.entries(attrs));
}

function separateProps(props: Record<string, any>): { atomAttrs: Record<string, any>; reactProps: Record<string, any> } {
  const atomAttrs: Record<string, any> = {};
  const reactProps: Record<string, any> = {};

  for (const [key, value] of Object.entries(props)) {
    if (key === 'class' || key === 'className' || key.startsWith('aria-') || key.startsWith('data-')) {
      continue;
    }

    if (typeof value === 'boolean' && value === false) {
      continue;
    }

    if (isAtomAttr(key)) {
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

function getStatefulAttrs(attrs: Record<string, any>, prefix: string) {
  const stateAttrs: Record<string, any> = {};

  for (const [key, value] of Object.entries(attrs)) {
    if (key.startsWith(`${prefix}-`)) {
      stateAttrs[key.slice(prefix.length + 1)] = value;
    }
  }

  return stateAttrs;
}

function getBaseAttrs(attrs: Record<string, any>) {
  const baseAttrs: Record<string, any> = {};
  const statePrefixes = ['focus', 'focus-visible', 'focus-within', 'hover', 'active', 'disabled', 'checked', 'selected', 'pressed', 'open', 'valid', 'invalid', 'required', 'read-only'];

  for (const [key, value] of Object.entries(attrs)) {
    const hasStatePrefix = statePrefixes.some(prefix => key.startsWith(`${prefix}-`));
    if (!hasStatePrefix) {
      baseAttrs[key] = value;
    }
  }

  return baseAttrs;
}

export const Input = forwardRef<any, InputProps>(function CustomInput(
  { attrs: explicitAttrs = {}, style, onFocus, onBlur, onPressIn, onPressOut, ...props },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const { atomAttrs: implicitAttrs, reactProps } = separateProps(props);

  if (!reactProps.onChangeText && typeof reactProps.onChangeTxt === 'function') {
    reactProps.onChangeText = reactProps.onChangeTxt;
  }
  if (!reactProps.placeholderTextColor && reactProps.placeholderTxtColor) {
    reactProps.placeholderTextColor = reactProps.placeholderTxtColor;
  }
  if (!reactProps.textAlignVertical && reactProps.TxtAlignVertical) {
    reactProps.textAlignVertical = reactProps.TxtAlignVertical;
  }

  delete reactProps.onChangeTxt;
  delete reactProps.placeholderTxtColor;
  delete reactProps.TxtAlignVertical;

  const mergedAttrs = { ...implicitAttrs, ...normalizeAtomAttrs(explicitAttrs) };
  const baseStyle = attrsToStyle(getBaseAttrs(mergedAttrs));
  const focusStyle = attrsToStyle(getStatefulAttrs(mergedAttrs, 'focus'));
  const activeStyle = attrsToStyle(getStatefulAttrs(mergedAttrs, 'active'));
  const pressedStyle = attrsToStyle(getStatefulAttrs(mergedAttrs, 'pressed'));

  const finalStyle = [
    { fontFamily: DEFAULT_FONT_FAMILY },
    baseStyle,
    isFocused ? focusStyle : null,
    isPressed ? activeStyle : null,
    isPressed ? pressedStyle : null,
    style,
  ].filter(Boolean);

  const handleFocus = (event: any) => {
    setIsFocused(true);
    onFocus?.(event);
  };

  const handleBlur = (event: any) => {
    setIsFocused(false);
    onBlur?.(event);
  };

  const handlePressIn = (event: any) => {
    setIsPressed(true);
    onPressIn?.(event);
  };

  const handlePressOut = (event: any) => {
    setIsPressed(false);
    onPressOut?.(event);
  };

  return (
    <TextInput
      ref={ref}
      style={finalStyle}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...reactProps}
    />
  );
});
