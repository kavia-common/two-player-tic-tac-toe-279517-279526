import { calculateWinner, createEmptyBoard, isDraw, nextPlayer } from '../utils/game';

function assert(name: string, condition: boolean) {
  if (!condition) {
    throw new Error(`Assertion failed: ${name}`);
  }
}

// Row win
{
  const b = createEmptyBoard();
  b[0] = 'X';
  b[1] = 'X';
  b[2] = 'X';
  assert('Row winner X', calculateWinner(b)?.winner === 'X');
}

// Col win
{
  const b = createEmptyBoard();
  b[0] = 'O';
  b[3] = 'O';
  b[6] = 'O';
  assert('Column winner O', calculateWinner(b)?.winner === 'O');
}

// Diagonal win
{
  const b = createEmptyBoard();
  b[0] = 'X';
  b[4] = 'X';
  b[8] = 'X';
  assert('Diagonal winner X', calculateWinner(b)?.winner === 'X');
}

// Draw
{
  const b: (typeof createEmptyBoard extends () => infer T ? T : never) = [
    'X',
    'O',
    'X',
    'X',
    'O',
    'O',
    'O',
    'X',
    'X',
  ];
  assert('Draw detection', isDraw(b) === true);
}

// Next player
{
  const b = createEmptyBoard();
  assert('X starts', nextPlayer(b) === 'X');
  b[0] = 'X';
  assert('O next', nextPlayer(b) === 'O');
}
