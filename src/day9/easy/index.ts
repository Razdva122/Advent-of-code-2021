import input from '../input';
import { test, result } from '../test';

function main(input: string): number {
  const data = input.split('\n').map((el) => el.split('').map(Number));
  let counter = 0;

  data.forEach((row, x) => {
    row.forEach((cell, y) => {
      if (isLowestNumber(data, x, y)) {
        counter += cell + 1
      }
    })
  })

  return counter;
}

function isLowestNumber(data: number[][], x: number, y: number) {
  const closestCells = [[0, -1], [0, 1], [-1, 0], [1,0]];
  const closestCoords = closestCells.map(([xDiff, yDiff]) => [x + xDiff, y + yDiff]);
  
  const values: any = closestCoords.map(([x, y]) => saveGetValue(data, x, y)).filter((el) => el !== null);

  const ourValue = saveGetValue(data, x, y)!;

  return values.every((el: any) => el > ourValue);
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
console.log(`Result of day9/easy -> ${main(input)}`);
console.log(`---------------------`);
