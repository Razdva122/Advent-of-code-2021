import input from '../input';
import { test, result } from '../test';
import type { TAccData, TBoard } from '../interface';

function main(input: string): number {
  const acc = input.split('\n').filter(Boolean).reduce<TAccData>((acc, el) => {
    if (el.startsWith('fold along')) {
      acc.fold.push({
        type: el.slice(11,12) as 'x' | 'y',
        index: Number(el.slice(13))
      })
    } else {
      acc.data.push(el.split(',').map(Number))
    }

    return acc;
  }, { data: [], fold: []});

  const firstFold = acc.fold[0];

  const firstXFold = acc.fold.find((el) => el.type === 'x');
  const firstYFold = acc.fold.find((el) => el.type === 'y');

  let board: TBoard = new Array(firstYFold!.index * 2 + 1).fill(null).map(() => new Array(firstXFold!.index * 2 + 1).fill('.'))

  acc.data.forEach(([x, y]) => {
    board[y][x] = '#';
  })

  board = foldBoard(board, firstFold.type, firstFold.index);

  let counter = 0;

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      if (board[i][j] === '#') {
        counter += 1;
      }
    }
  }

  return counter;
}

function foldBoard(board: TBoard, foldDirection: 'x' | 'y', index: number): TBoard {
  let newBoard;
  if (foldDirection === 'x') {
    newBoard = board.map((el) => el.slice(0, index));
    const cloneBoard = board.map((el) => el.slice(index + 1));

    for (let i = 0; i < cloneBoard.length; i += 1) {
      for (let j = 0; j < cloneBoard[0].length; j += 1) {
        if (cloneBoard[i][j] === '#') {
          newBoard[i][newBoard[0].length - 1 - j] = '#';
        }
      }
    }
  } else {
    newBoard = board.slice(0, index);
    const cloneBoard = board.slice(index + 1);

    for (let i = 0; i < cloneBoard.length; i += 1) {
      for (let j = 0; j < cloneBoard[0].length; j += 1) {
        if (cloneBoard[i][j] === '#') {
          newBoard[newBoard.length - 1 - i][j] = '#';
        }
      }
    }
  }
  return newBoard;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day13/easy -> ${main(input)}`);
console.log(`---------------------`);
