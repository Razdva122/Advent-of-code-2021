import input from '../input';
import { test, resultHard } from '../test';

import type { TDirection, TElement } from '../interface';

function main(input: string): number {
  const data = (input.split('\n') as TElement[]).map((el) => el.split(' ') as [TDirection, string]);
  let x = 0;
  let y = 0;
  let aim = 0;

  const actions = {
    forward: (amount: number) => {
      y += amount * aim;
      x += amount;
    },
    up: (amount: number) => aim -= amount,
    down: (amount: number) => aim += amount,
  } as const;

  data.forEach((el) => {
    actions[el[0]](Number(el[1]));
  });

  return x * y;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day2/hard -> ${main(input)}`);
console.log(`---------------------`);
