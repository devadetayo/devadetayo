import React, { forwardRef } from 'react';
import { atom } from './atom';

type PrimitiveProps = Record<string, any>;

export const Box = atom('div');
export const Span = atom('span');
export const Txt = atom('p');
export const Code = atom('code');
export const Pre = atom('pre');
export const H1 = atom('h1');
export const H2 = atom('h2');
export const H3 = atom('h3');
export const H4 = atom('h4');
export const H5 = atom('h5');
export const H6 = atom('h6');
export const Btn = atom('button');
export const Link = atom('a');
export const Img = atom('img');
export const Section = atom('section');
export const Header = atom('header');
export const Footer = atom('footer');
export const Main = atom('main');
export const Nav = atom('nav');
export const Article = atom('article');
export const UL = atom('ul');
export const LI = atom('li');
export const Input = atom('input');
export const Textarea = atom('textarea');
export const Select = atom('select');
export const Option = atom('option');

export const Row = forwardRef<any, PrimitiveProps>(function Row({ attrs, ...props }, ref) {
  return <Box ref={ref} attrs={{ display: 'flex', 'flex-row': '', ...attrs }} {...props} />;
});

export const Col = forwardRef<any, PrimitiveProps>(function Col({ attrs, ...props }, ref) {
  return <Box ref={ref} attrs={{ display: 'flex', 'flex-col': '', ...attrs }} {...props} />;
});

export const Center = forwardRef<any, PrimitiveProps>(function Center({ attrs, ...props }, ref) {
  return <Box ref={ref} attrs={{ center: '', ...attrs }} {...props} />;
});

export const Grid = forwardRef<any, PrimitiveProps>(function Grid({ attrs, ...props }, ref) {
  return <Box ref={ref} attrs={{ grid: '', ...attrs }} {...props} />;
});

export const Stack = forwardRef<any, PrimitiveProps>(function Stack({ attrs, ...props }, ref) {
  return <Col ref={ref} attrs={attrs} {...props} />;
});

export const Spacer = forwardRef<any, PrimitiveProps>(function Spacer({ attrs, ...props }, ref) {
  return <Box ref={ref} attrs={{ grow: '1', ...attrs }} aria-hidden="true" {...props} />;
});

export const Divider = forwardRef<any, PrimitiveProps & { vertical?: boolean }>(function Divider(
  { vertical, attrs, style, ...props },
  ref
) {
  return (
    <Box
      ref={ref}
      attrs={{
        bg: 'gray-200',
        ...(vertical
          ? { w: '1', 'min-h': 'full', self: 'stretch' }
          : { h: '1', w: 'full' }),
        ...attrs,
      }}
      style={{ border: 'none', ...style }}
      aria-hidden="true"
      {...props}
    />
  );
});

export const Card = forwardRef<any, PrimitiveProps>(function Card({ attrs, ...props }, ref) {
  return (
    <Box
      ref={ref}
      attrs={{
        bg: 'white',
        rounded: '2xl',
        shadow: 'lg',
        border: '1',
        'border-color': 'slate-200',
        ...attrs,
      }}
      {...props}
    />
  );
});

export const Badge = forwardRef<any, PrimitiveProps>(function Badge({ attrs, ...props }, ref) {
  return (
    <Span
      ref={ref}
      attrs={{
        'inline-flex': '',
        items: 'center',
        rounded: 'full',
        px: '3',
        py: '1',
        'font-size': 'xs',
        weight: 'semibold',
        ...attrs,
      }}
      {...props}
    />
  );
});

export const Scroll = forwardRef<any, PrimitiveProps>(function Scroll({ attrs, ...props }, ref) {
  return <Box ref={ref} attrs={{ overflow: 'auto', ...attrs }} {...props} />;
});

export const Touchable = Btn;
