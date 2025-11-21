export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];

/**
 * PUBLIC_INTERFACE
 * Determines the winner of the board and returns the winning player and line.
 */
export function calculateWinner(board: Board): { winner: Player; line: number[] } | null {
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // diags
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, line: [a, b, c] };
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * Determines if the board is a draw (no empty cells and no winner).
 */
export function isDraw(board: Board): boolean {
  return !calculateWinner(board) && board.every((c) => c !== null);
}

/**
 * PUBLIC_INTERFACE
 * Returns the next player given the current board state.
 */
export function nextPlayer(board: Board): Player {
  const xCount = board.filter((c) => c === 'X').length;
  const oCount = board.filter((c) => c === 'O').length;
  return xCount === oCount ? 'X' : 'O';
}

/**
 * PUBLIC_INTERFACE
 * Creates an empty board.
 */
export function createEmptyBoard(): Board {
  return Array<CellValue>(9).fill(null);
}

/**
 * PUBLIC_INTERFACE
 * Pretty-print cell value for accessibility labels.
 */
export function prettyCell(v: CellValue): string {
  if (v === 'X') return 'X';
  if (v === 'O') return 'O';
  return 'Empty';
}
