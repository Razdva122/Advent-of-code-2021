import input from '../input';
import { test, resultHard } from '../test';

function main(input: string): number {
  const data = input.split('\n').map(Number);
  let counter = 0;

  for (let i = 0; i < data.length - 3; i += 1) {
    if (data[i] < data[i + 3]) {
      counter += 1;
    }
  }

  return counter;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day1/hard -> ${main(input)}`);
console.log(`---------------------`);
