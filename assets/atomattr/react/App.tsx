import React, { useEffect, useMemo, useState } from 'react';
import {
  Badge,
  Box,
  Btn,
  Card,
  Code,
  Col,
  Divider,
  Grid,
  H1,
  H2,
  H3,
  Header,
  Link,
  Main,
  Nav,
  Pre,
  Row,
  Section,
  Span,
  Stack,
  Txt,
} from './index';
import Homepage from './Homepage';

const htmlSnippet = `<section p="8" bg="slate-950" text="white" rounded="3xl" shadow="xl">
  <h1 font-size="4xl" weight="black">HTML stays simple</h1>
  <p mt="3" text="slate-300">Attributes are the API.</p>
  <div mt="6" flex gap="3" items="center">
    <button px="4" py="2" rounded="full" bg="brand-light" text="slate-950">
      Ship it
    </button>
    <span text="slate-400">No class soup.</span>
  </div>
</section>`;

const reactSnippet = `import { Box, H1, Txt, Btn, Row } from 'atomattr/react';

export function Hero() {
  return (
    <Box bg="slate-950" text="white" p="8" rounded="3xl" shadow="xl">
      <H1 fontSize="4xl" weight="black">React uses the same contract</H1>
      <Txt mt="3" text="slate-300">
        Camel aliases map back to canonical HTML attributes.
      </Txt>
      <Row mt="6" gap="3" items="center">
        <Btn px="4" py="2" rounded="full" bg="brand-light" text="slate-950">
          Ship it
        </Btn>
        <Span text="slate-400">Still attribute-first.</Span>
      </Row>
    </Box>
  );
}`;

const viteSnippet = `npm install
npm run dev

import { startAtomAttr } from 'atomattr';
import { Box } from 'atomattr/react';
import 'atomattr/defaults.css';

startAtomAttr();`;

const cheatItems = [
  ['Spacing', 'p="4" px="6" gap="3" mt="8"'],
  ['Size', 'w="full" min-h="screen" font-size="12"'],
  ['Color', 'bg="blue-600" text="white" border-color="blue-800"'],
  ['Type', 'font-size="3xl" weight="bold" leading="tight"'],
  ['Layout', 'flex flex-col items="center" justify="between"'],
  ['Grid', 'grid grid-cols="3" col-span="2"'],
  ['Effects', 'shadow="xl" rounded="2xl" blur="8"'],
  ['State', 'hover-bg="slate-900" md-p="8" dark-bg="black"'],
];

const chipColors = ['brand-light', 'sky-200', 'rose-200', 'emerald-200', 'amber-200', 'violet-200'];

function CodePanel({ title, code }: { title: string; code: string }) {
  return (
    <Card attrs={{ bg: 'slate-950', text: 'slate-100', rounded: '3xl', shadow: '2xl' }} p="0">
      <Row px="5" py="4" items="center" justify="between" attrs={{ 'border-b': '1', 'border-color': 'slate-800' }}>
        <Txt m="0" attrs={{ 'font-size': 'sm', weight: 'semibold', text: 'slate-300' }}>
          {title}
        </Txt>
        <Badge attrs={{ bg: 'slate-800', text: 'slate-200' }}>AtomAttr</Badge>
      </Row>
      <Pre className="code-panel" m="0" p="5">
        <Code>{code}</Code>
      </Pre>
    </Card>
  );
}

function ThemePreview({ dark }: { dark: boolean }) {
  return (
    <Card
      p="6"
      attrs={{
        bg: dark ? 'slate-950' : 'white',
        text: dark ? 'white' : 'slate-950',
        rounded: '3xl',
        shadow: '2xl',
      }}
      className="preview-card"
    >
      <Row items="center" justify="between" mb="6">
        <Col gap="1">
          <Txt m="0" attrs={{ 'font-size': 'xs', tracking: 'widest', text: dark ? 'slate-400' : 'slate-500' }}>
            LIVE PREVIEW
          </Txt>
          <H3 m="0" fontSize="2xl" weight="black">
            One contract, two render paths
          </H3>
        </Col>
        <Badge attrs={{ bg: dark ? 'slate-800' : 'slate-100', text: dark ? 'slate-200' : 'slate-700' }}>
          {dark ? 'dark mode' : 'light mode'}
        </Badge>
      </Row>
      <Grid gridCols="2" gap="4" className="preview-grid">
        <Box p="4" attrs={{ rounded: '2xl', bg: dark ? 'slate-900' : 'slate-50' }}>
          <Txt m="0" attrs={{ 'font-size': 'sm', text: dark ? 'slate-400' : 'slate-500' }}>
            HTML
          </Txt>
          <H3 mt="2" mb="2" fontSize="xl" weight="bold">
            {'<section p="6" bg="brand">'}
          </H3>
          <Txt m="0" text={dark ? 'slate-300' : 'slate-600'}>
            The browser gets canonical AtomAttr attributes directly.
          </Txt>
        </Box>
        <Box p="4" attrs={{ rounded: '2xl', bg: dark ? 'slate-900' : 'slate-50' }}>
          <Txt m="0" attrs={{ 'font-size': 'sm', text: dark ? 'slate-400' : 'slate-500' }}>
            React
          </Txt>
          <H3 mt="2" mb="2" fontSize="xl" weight="bold">
            {'<Box p="6" bg="brand">'}
          </H3>
          <Txt m="0" text={dark ? 'slate-300' : 'slate-600'}>
            React normalizes friendly prop aliases back into the same HTML contract.
          </Txt>
        </Box>
      </Grid>
      <Divider my="6" />
      <Row gap="3" wrap className="chip-wrap">
        {chipColors.map(color => (
          <Badge key={color} attrs={{ bg: color, text: 'slate-950' }}>
            {color}
          </Badge>
        ))}
      </Row>
    </Card>
  );
}

export default function App() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const sectionAccent = useMemo(
    () => (dark ? { bg: 'slate-950', text: 'white' } : { bg: 'white', text: 'slate-950' }),
    [dark]
  );

  return (
    <Main className="site-shell">
      <Header className="site-header">
        <Nav className="site-nav">
          <Row items="center" justify="between" gap="4">
            <Row items="center" gap="3">
              <Box className="mark" />
              <Col gap="0.5">
                <Txt m="0" attrs={{ 'font-size': 'xs', tracking: 'widest', text: 'slate-500' }}>
                  ATOMATTR
                </Txt>
                <Txt m="0" attrs={{ 'font-size': 'sm', weight: 'semibold' }}>
                  HTML-first styling, rebuilt
                </Txt>
              </Col>
            </Row>
            <Row items="center" gap="2" wrap>
              <Link href="#docs" className="nav-link">
                Docs
              </Link>
              <Link href="#cheatsheet" className="nav-link">
                Cheatsheet
              </Link>
              <Btn
                className="theme-toggle"
                onClick={() => setDark(value => !value)}
                attrs={{ rounded: 'full', px: '4', py: '2', bg: dark ? 'brand-light' : 'slate-950', text: dark ? 'slate-950' : 'white' }}
              >
                {dark ? 'Light canvas' : 'Dark canvas'}
              </Btn>
            </Row>
          </Row>
        </Nav>
      </Header>

      <Homepage />

      <Section className="proof-strip">
        <Grid className="proof-grid" gap="4">
          {[
            ['HTML-first', 'The engine still scans real attributes in the DOM.'],
            ['React-aware', 'Components normalize props back into canonical HTML keys.'],
            ['State-ready', 'Responsive, hover, dark, and group-hover modifiers stay in one parser.'],
            ['Docs-included', 'Homepage, README, guide, and cheatsheet all point to the same model.'],
          ].map(([title, body]) => (
            <Card key={title} p="5" attrs={{ rounded: '2xl', shadow: 'lg', bg: 'white' }}>
              <H3 m="0" fontSize="xl" weight="bold">
                {title}
              </H3>
              <Txt mt="2" mb="0" text="slate-600">
                {body}
              </Txt>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section id="docs" className="docs-section">
        <Row items="end" justify="between" gap="4" wrap mb="5">
          <Col gap="1">
            <Txt m="0" attrs={{ 'font-size': 'xs', tracking: 'widest', text: 'slate-500' }}>
              SOURCE OF TRUTH
            </Txt>
            <H2 m="0" fontSize="3xl" weight="black">
              Same idea, different entrypoints
            </H2>
          </Col>
          <Txt m="0" text="slate-600">
            HTML gets canonical attributes. React gets the same contract plus camel aliases where JSX needs help.
          </Txt>
        </Row>
        <Grid className="docs-grid" gap="5">
          <CodePanel title="HTML usage" code={htmlSnippet} />
          <CodePanel title="React usage" code={reactSnippet} />
          <CodePanel title="Vite setup" code={viteSnippet} />
        </Grid>
      </Section>

      <Section id="cheatsheet" className="cheatsheet-section">
        <Row items="end" justify="between" gap="4" wrap mb="5">
          <Col gap="1">
            <Txt m="0" attrs={{ 'font-size': 'xs', tracking: 'widest', text: 'slate-500' }}>
              QUICK MEMORY
            </Txt>
            <H2 m="0" fontSize="3xl" weight="black">
              Cheatsheet preview
            </H2>
          </Col>
          <Badge attrs={{ bg: 'slate-950', text: 'white' }}>See docs/cheatsheet.md for the full sheet</Badge>
        </Row>
        <Grid className="cheat-grid" gap="4">
          {cheatItems.map(([label, sample]) => (
            <Card key={label} p="5" attrs={{ bg: sectionAccent.bg, text: sectionAccent.text, rounded: '2xl', shadow: 'lg' }}>
              <Txt m="0" attrs={{ 'font-size': 'sm', tracking: 'widest', text: dark ? 'slate-400' : 'slate-500' }}>
                {label}
              </Txt>
              <Pre className="cheat-code" mt="3" mb="0">
                <Code>{sample}</Code>
              </Pre>
            </Card>
          ))}
        </Grid>
      </Section>

      <Section className="closing-section">
        <Card className="closing-card" p="7" attrs={{ bg: 'brand', text: 'white', rounded: '3xl', shadow: '2xl' }}>
          <Row items="center" justify="between" gap="4" wrap>
            <Col gap="2">
              <Txt m="0" attrs={{ 'font-size': 'xs', tracking: 'widest', text: 'brand-light' }}>
                NEXT UP
              </Txt>
              <H2 m="0" fontSize="3xl" weight="black">
                Keep building from one mental model.
              </H2>
              <Txt m="0" text="slate-200">
                HTML, React, and the docs now point at the same attribute contract instead of drifting apart.
              </Txt>
            </Col>
            <Row gap="3" wrap>
              <Link href="/README.md" className="cta-link">
                README
              </Link>
              <Link href="/docs/getting-started.md" className="cta-link">
                Guide
              </Link>
              <Link href="/docs/cheatsheet.md" className="cta-link">
                Cheatsheet
              </Link>
            </Row>
          </Row>
        </Card>
      </Section>
    </Main>
  );
}
