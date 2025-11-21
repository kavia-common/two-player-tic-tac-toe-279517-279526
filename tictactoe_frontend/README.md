# Tic Tac Toe (React Native / Expo)

Modern, accessible two-player Tic Tac Toe game following the Ocean Professional theme.

Features:
- 3x3 grid with turn indicator, winner/draw detection
- Reset, New Game, and optional Undo (move history)
- Light persistence of board/turn across reloads (best-effort with AsyncStorage if available)
- Functional components and hooks, modular structure
- Minimal utility tests

Run:
- npm install
- npm run start
- For web preview: npm run web

Tests:
- npm run test
Note: Tests use esbuild-register to run TypeScript directly without a test framework. They assert core utilities only.

Environment:
- Uses Expo defaults; no secrets stored. Optional AsyncStorage dependency is lazy-loaded.
