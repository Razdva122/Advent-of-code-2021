import input from '../input';
import { test, resultHard } from '../test';


function main(input: string): number {
  const data = input.split('\n').map((el) => el.split('').map(Number));
  const basins: [number, number][][] = [];

  data.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (isLowestNumber(data, x, y)) {
        const basin: [number, number][] = [];
        const stack: [number, number][] = [[x, y]];

        const visited: {[key: string]: true} = {};

        while (stack.length) {
          const el = stack.pop()!;

          if (visited[`${el[0]}, ${el[1]}`]) {
            continue;
          } else {
            visited[`${el[0]}, ${el[1]}`] = true;
          }
          
          basin.push(el);

          const closestCells = getClosestCells(data, el[0], el[1]);

          const basinCells = closestCells.filter((cell) => isPartOfBasin(data, cell[0], cell[1]));

          stack.push(...basinCells);
        }

        basins.push(basin);
      }
    })
  })

  basins.sort((a, b) => b.length - a.length);

  return basins[0].length * basins[1].length * basins[2].length;
}

function isLowestNumber(data: number[][], x: number, y: number) {
  const closestCells = [[0, -1], [0, 1], [-1, 0], [1,0]];
  const closestCoords = closestCells.map(([xDiff, yDiff]) => [x + xDiff, y + yDiff]);

  function elNotNull(el: number | null): el is number {
    return el !== null;
  }
  
  const values: number[] = closestCoords.map(([x, y]) => saveGetValue(data, x, y)).filter(elNotNull);

  const ourValue = saveGetValue(data, x, y)!;

  return values.every((el) => el > ourValue);
}

function isPartOfBasin(
  data: number[][],
  x: number, 
  y: number
): boolean {
  const value = saveGetValue(data, x, y);
  return value !== 9;
}

function getClosestCells(data: number[][], x: number, y: number): [number, number][] {
  const closestCells = [[0, -1], [0, 1], [-1, 0], [1,0]];
  const closestCoords = closestCells.map<[number, number]>(([xDiff, yDiff]) => [x + xDiff, y + yDiff]);

  return closestCoords.filter(([x, y]) => saveGetValue(data, x, y) != null)
}

function saveGetValue(data: number[][], x: number, y: number): number | null {
  if (y < 0 || y >= data.length) {
    return null
  }

  if (x < 0 || x >= data[0].length) {
    return null;
  }

  return data[y][x];
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day9/hard -> ${main(input)}`);
console.log(`---------------------`);
