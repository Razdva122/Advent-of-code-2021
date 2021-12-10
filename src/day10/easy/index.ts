import input from '../input';
import { test, result } from '../test';
import { TEndBrackets, TStartBrackets } from '../interface';

function main(input: string): number {
  const data = input.split('\n').map((el) => el.trim());
  let counter = 0;

  for (let i = 0; i < data.length; i += 1) {
    const res = solve(data[i]);

    if (res !== true) {
      const hash = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
      };

      counter += hash[res];
    }
  }

  return counter;
}

function solve(str: string): true | TEndBrackets {
  const values = str.split('') as TStartBrackets | TEndBrackets[];

  const map: {[K in TEndBrackets]: TStartBrackets} = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
  }

  const stack: TStartBrackets[] = [];

  for (let i = 0; i < values.length; i += 1) {
    const el = values[i] as TStartBrackets | TEndBrackets;

    if (isStartBracket(el)) {
      stack.push(el);
    } else {
      const lastEl = stack.pop();

      if (lastEl !== map[el]) {
        return el;
      }
    }
  }

  return true;

  function isStartBracket(el: TStartBrackets | TEndBrackets): el is TStartBrackets {
    return Object.values(map).includes(el as TStartBrackets);
  }
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day10/easy -> ${main(input)}`);
console.log(`---------------------`);
