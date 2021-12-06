import input from '../input';
import { test, resultHard } from '../test';

function main(input: string): number {
  let data = input.split(',').map(Number);

  return recursive(data, 0);
}

let memory: {[key: string]: number[]} = {};

function recursive(data: number[], level: 1 | 0): number {
  let dataNew = [...data];
  let totalLength = 0;

  dataNew.forEach((el) => {
    let copy;

    if (memory[el]) {
      copy = memory[el];

    } else {
      copy = [el];

      for (let i = 0; i < 128; i += 1) {
        let length = copy.length;

        for (let j = 0; j < length; j += 1) {
          if (copy[j] === 0) {
            copy[j] = 6;
            copy.push(8);
          } else {
            copy[j] -= 1;
          }
        }
      }

      memory[el] = copy;
    }

    if (level === 1) {
      totalLength += copy.length;
    } else {
      totalLength += recursive(copy, 1);
    }
  })

  return totalLength;
}

console.log(main(test));

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day6/hard -> ${main(input)}`);
console.log(`---------------------`);
