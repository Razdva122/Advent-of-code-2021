import input from '../input';
import { test, result } from '../test';

import type { TTicket } from '../interface';

import { isWinningTicket, removeElementFromTicket, sumOfElementsInTicket } from '../helpers';

function main(input: string): number {
  const [firstLine, ...tickets] = input.split('\n\n');
  const numbers = firstLine.split(',').map(Number);
  const ticketsNormalized: TTicket[] = tickets.map((el) => el.split('\n')
    .map((el) => el.split(/\s+/).filter(Boolean).map(Number)) as unknown as TTicket
  );

  for (let i = 0; i < numbers.length; i += 1) {
    let currentNumber = numbers[i];

    ticketsNormalized.forEach((el) => removeElementFromTicket(el, currentNumber));

    const winTicket = ticketsNormalized.find((el) => isWinningTicket(el));

    if (winTicket) {
      return sumOfElementsInTicket(winTicket) * currentNumber;
    }
  }

  return 0;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day4/easy -> ${main(input)}`);
console.log(`---------------------`);
