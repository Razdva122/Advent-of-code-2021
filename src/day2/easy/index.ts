import input from '../input';
import { test, result } from '../test';

import type { TDirection, TElement } from '../interface';

function main(input: string): number {
  const data = (input.split('\n') as TElement[]).map((el) => el.split(' ') as [TDirection, string]);
  let x = 0;
  let y = 0;

  const actions = {
    forward: (amount: number) => x += amount,
    up: (amount: number) => y -= amount,
    down: (amount: number) => y += amount,
  } as const;

  data.forEach((el) => {
    actions[el[0]](Number(el[1]))
  });

  return x * y;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day2/easy -> ${main(input)}`);
console.log(`---------------------`);
