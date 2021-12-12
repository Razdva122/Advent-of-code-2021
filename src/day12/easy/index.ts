import input from '../input';
import { test, result } from '../test';

function main(input: string): number {
  const data = input.split('\n').map((el) => el.split('-'));
  const hash: {[key: string]: string[]} = {
    start: [],
    end: [],
  };

  data.forEach(([from, to]) => {
    hash[from] = hash[from] || [];
    hash[from].push(to);
    hash[to] = hash[to] || [];
    hash[to].push(from);
  })

  const allPaths = findPath('start');

  return allPaths.length;

  function findPath(from: string, currentPath: string[] = [], acc: string[][] = []): string[][] {
    currentPath.push(from);
    if (from === 'end') {
      acc.push(currentPath);
    } else {
      const possibleMoves = hash[from];

      possibleMoves.forEach((el) => {
        if (isLowerCase(el) && currentPath.includes(el)) {
          return;
        }

        findPath(el, [...currentPath], acc);
      })
    }

    return acc;
  }
}

function isLowerCase(el: string): boolean {
  return el === el.toLowerCase();
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day12/easy -> ${main(input)}`);
console.log(`---------------------`);
