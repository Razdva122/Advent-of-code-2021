import input from '../input';
import { test, resultHard } from '../test';

function main(input: string): number {
  const data = input.split('\n').map((el) => el.split('').map(Number));
  let counter = 0;

  for (; counter < 10000; counter += 1) {
    data.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (increaseCellValue(data, x, y) === 10) {
          highlightCell(data, x, y);
        }
      })
    })
  
    data.forEach((row, x) => {
      row.forEach((cell, y) => {
        if (cell >= 10) {
          data[x][y] = 0;
        }
      })
    })

    if (data.map((el) => el.join('')).join('').split('').every((el) => el === '0')) {
      break;
    }
  }

  return counter + 1;
}

function increaseCellValue(data: number[][], x: number, y: number): number {
  return data[x][y] += 1;
}

function highlightCell(data: number[][], x: number, y: number): void {
  const closestCells = getClosestCells(data, x, y);
  closestCells.forEach(([x,y]) => {
    if (increaseCellValue(data, x, y) === 10) {
      highlightCell(data, x, y);
    }
  })
}

function getClosestCells(data: number[][], x: number, y: number): [number, number][] {
  const closestCells = [[0, -1], [0, 1], [-1, 0], [1,0], [1,1], [1, -1], [-1, 1], [-1, -1]];
  const closestCoords = closestCells.map<[number, number]>(([xDiff, yDiff]) => [x + xDiff, y + yDiff]);

  return closestCoords.filter(([x, y]) => saveGetValue(data, x, y) != null)
}

function saveGetValue(data: number[][], x: number, y: number): number | null {
  if (x < 0 || x >= data.length) {
    return null
  }

  if (y < 0 || y >= data[0].length) {
    return null;
  }

  return data[x][y];
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day11/hard -> ${main(input)}`);
console.log(`---------------------`);
