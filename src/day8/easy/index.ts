import input from '../input';
import { test, result } from '../test';

function main(input: string): number {
  const data = input.split('\n').map((el) => {
    const [signalPattern, output] = el.split(' | ');
    return {
      signalPattern: signalPattern.split(' '),
      output: output.split(' '),
    }
  });

  let counter = 0;

  for (let i = 0; i < data.length; i += 1) {
    const count = data[i].output.filter((el) => 
      el.length === 7 || el.length === 3 || el.length === 2 || el.length === 4
    ).length;

    counter += count;
  }

  return counter;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day8/easy -> ${main(input)}`);
console.log(`---------------------`);
