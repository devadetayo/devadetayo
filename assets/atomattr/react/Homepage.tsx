import React from 'react';
import { Box, H1, Txt, Btn, Row, Badge, Grid, Section, Link } from './index';

export default function Homepage() {
  return (
    <Section p="12" attrs={{ maxW: '7xl', mx: 'auto' }}>
      <Grid gridCols="1" lg-grid-cols="2" gap="10" align="center">
        <Box>
          <Badge attrs={{ bg: 'primary/10', text: 'primary', rounded: 'full', px: '3', py: '1' }}>vNext</Badge>
          <H1 mt="4" weight="black" className="hero-title">
            One AtomAttr contract
            <br />
            <span text="primary">for HTML and React.</span>
          </H1>
          <Txt mt="4" text="muted" font-size="lg" line-height="relaxed">
            Attribute-driven styling that stays readable at any scale. Describe spacing, layout, and color
            directly on the elements they belong to.
          </Txt>

          <Row gap="3" mt="6">
            <Btn attrs={{ bg: 'primary', text: 'white', rounded: 'full', px: '6', py: '3', weight: '600' }}>Get started</Btn>
            <Link href="/docs" attrs={{ px: '6', py: '3', rounded: 'full', border: '1', 'border-color': 'surface', bg: 'surface' }}>Docs</Link>
          </Row>
        </Box>

        <Box attrs={{ bg: 'surface', rounded: '2xl', p: '6', border: '1', 'border-color': 'border' }}>
          <pre p="0" m="0" className="hero-code" style={{ fontFamily: 'monospace' }}>
            {`<section p="8" bg="surface" rounded="2xl">
  <h1 font-size="5xl" weight="700">Build faster.</h1>
  <p text="muted">Ship without the class soup.</p>
  <button bg="primary" text="white" px="6" py="3" rounded="lg">Get started</button>
</section>`}
          </pre>
        </Box>
      </Grid>
    </Section>
  );
}
