import input from '../input';
import type { TAccData, TBoard } from '../interface';

function main(input: string): void {
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

  const firstXFold = acc.fold.find((el) => el.type === 'x');
  const firstYFold = acc.fold.find((el) => el.type === 'y');

  let board: TBoard = new Array(firstYFold!.index * 2 + 1).fill(null).map((_) => new Array(firstXFold!.index * 2 + 1).fill('.'))

  acc.data.forEach(([x, y]) => {
    board[y][x] = '#';
  })

  for (let i = 0; i < acc.fold.length; i += 1) {
    const currentFold = acc.fold[i];

    board = foldBoard(board, currentFold.type, currentFold.index);
    
  }

  console.log(board.map((el) => el.join('')).join('\n'));
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
console.log(`---------------------`);
console.log(`Result of day13/easy -> ${main(input)}`);
console.log(`---------------------`);
