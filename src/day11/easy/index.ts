import input from '../input';
import { test, result } from '../test';

function main(input: string): number {
  const data = input.split('\n').map((el) => el.split('').map(Number));
  let counter = 0;

  for (let i = 0; i < 100; i += 1) {
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
          counter += 1;
        }
      })
    })
  }

  return counter;
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
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day10/easy -> ${main(input)}`);
console.log(`---------------------`);
