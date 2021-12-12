import input from '../input';
import { test, resultHard } from '../test';

type TArrayWithFlag<T> = Array<T> & { twiceVisited?: boolean };

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

  function findPath(from: string, currentPath: TArrayWithFlag<string> = [], acc: TArrayWithFlag<string>[] = []): TArrayWithFlag<string>[] {
    if (isLowerCase(from) && currentPath.includes(from)) {
      currentPath.twiceVisited = true;
    }

    currentPath.push(from);

    if (from === 'end') {
      acc.push(currentPath);
    } else {
      const possibleMoves = hash[from];

      possibleMoves.forEach((el) => {
        if (el === 'start') {
          return;
        }

        if (isLowerCase(el) && currentPath.includes(el) && currentPath.twiceVisited) {
          return;
        }

        const clone: TArrayWithFlag<string> = [...currentPath];
        clone.twiceVisited = currentPath.twiceVisited;

        findPath(el, clone, acc);
      })
    }

    return acc;
  }
}

function isLowerCase(el: string): boolean {
  return el === el.toLowerCase();
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day12/hard -> ${main(input)}`);
console.log(`---------------------`);
