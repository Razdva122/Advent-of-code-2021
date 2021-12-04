import input from '../input';
import { test, result } from '../test';

function main(input: string): number {
  const data = input.split('\n');
  const gammaRate = [];

  for (let i = 0; i < data[0].length; i += 1) {
    const bit = data.map((el) => el[i]);
    const bitSum = bit.reduce((acc, el) => el === '0' ? acc - 1 : acc + 1, 0);

    if (bitSum > 0) {
      gammaRate.push('1');
    } else {
      gammaRate.push('0');
    }
  }

  const epsilonRate = gammaRate.map((el) => el === '0' ? '1' : '0');

  return parseInt(gammaRate.join(''), 2) * parseInt(epsilonRate.join(''), 2);
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day3/easy -> ${main(input)}`);
console.log(`---------------------`);
