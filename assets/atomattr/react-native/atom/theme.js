// JS shim for bundlers that import ./atom/theme.js
// Re-export the TypeScript implementation so imports that include
// the .js extension (e.g. from compiled assets) still resolve.
export * from './theme';
