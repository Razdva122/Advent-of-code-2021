import input from '../input';
import { test, result } from '../test';

function main(input: string): number {
  const data = input.split('\n').map(Number);
  let counter = 0;

  for (let i = 0; i < data.length - 1; i += 1) {
    if (data[i] < data[i + 1]) {
      counter += 1;
    }
  }

  return counter;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day1/easy -> ${main(input)}`);
console.log(`---------------------`);
