import input from '../input';
import { test, resultHard } from '../test';
import { TEndBrackets, TStartBrackets } from '../interface';

function main(input: string): number {
  const data = input.split('\n').map((el) => el.trim());
  let results = [];

  for (let i = 0; i < data.length; i += 1) {
    const res = solve(data[i]);

    if (res) {
      const hash: {[K in TEndBrackets]: number} = {
        ')': 1,
        ']': 2,
        '}': 3,
        '>': 4
      };

      results.push(res.reduce((acc, el) => {
        return acc * 5 + hash[el]; 
      }, 0));
    }
  }

  results.sort((a, b) => a - b);

  return results[Math.floor(results.length / 2)];
}

function solve(str: string): false | TEndBrackets[] {
  const values = str.split('') as TStartBrackets | TEndBrackets[];

  const map: {[K in TEndBrackets]: TStartBrackets} = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
  }

  const mapReverse: {[K in TStartBrackets]: TEndBrackets} = {
    '(': ')',
    '[' : ']',
    '{': '}',
    '<': '>'
  }

  const stack: TStartBrackets[] = [];

  for (let i = 0; i < values.length; i += 1) {
    const el = values[i] as TStartBrackets | TEndBrackets;;

    if (isStartBracket(el)) {
      stack.push(el);
    } else {
      const lastEl = stack.pop();

      if (lastEl !== map[el]) {
        return false;
      }
    }
  }

  return stack.map((el) => mapReverse[el]).reverse();

  function isStartBracket(el: TStartBrackets | TEndBrackets): el is TStartBrackets {
    return Object.values(map).includes(el as TStartBrackets);
  }
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day10/hard -> ${main(input)}`);
console.log(`---------------------`);
