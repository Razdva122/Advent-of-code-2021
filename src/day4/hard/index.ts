import input from '../input';
import { test, resultHard } from '../test';

import type { TTicket } from '../interface';

import { isWinningTicket, removeElementFromTicket, sumOfElementsInTicket } from '../helpers';

function main(input: string): number {
  const [firstLine, ...tickets] = input.split('\n\n');
  const numbers = firstLine.split(',').map(Number);
  let ticketsNormalized: TTicket[] = tickets.map((el) => el.split('\n')
    .map((el) => el.split(/\s+/).filter(Boolean).map(Number)) as unknown as TTicket
  );

  for (let i = 0; i < numbers.length; i += 1) {
    let currentNumber = numbers[i];

    ticketsNormalized.forEach((el) => removeElementFromTicket(el, currentNumber));

    const winTicket = ticketsNormalized.find((el) => isWinningTicket(el));

    if (winTicket && ticketsNormalized.length === 1) {
      return sumOfElementsInTicket(winTicket) * currentNumber;
    }

    ticketsNormalized = ticketsNormalized.filter((el) => !isWinningTicket(el));
  }

  return 0;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day4/hard -> ${main(input)}`);
console.log(`---------------------`);
