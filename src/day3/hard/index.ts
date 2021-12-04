import input from '../input';
import { test, resultHard } from '../test';

function main(input: string): number {
  const oxygenRating = calculateRating(input, 'oxygen');
  const CO2Rating = calculateRating(input, 'co2');

  return parseInt(oxygenRating, 2) * parseInt(CO2Rating, 2);
}

function calculateRating(input: string, type: 'oxygen' | 'co2'): string {
  let data = input.split('\n');
  let i = 0;

  while (data.length !== 1) {
    const bit = data.map((el) => el[i]);
    const bitAcc = bit.reduce((acc, el) => {

      if (el === '0') {
        acc[0] += 1;
      } else {
        acc[1] += 1;
      }

      return acc;
    }, {0: 0, 1: 0});

    let filterNum: number;

    if (bitAcc[0] === bitAcc[1]) {
      filterNum = type === 'oxygen' ? 1 : 0;

    } else if (bitAcc[0] > bitAcc[1]) {
      filterNum = type === 'oxygen' ? 0 : 1;

    } else {
      filterNum = type === 'oxygen' ? 1 : 0;
    }

    data = data.filter((el) => Number(el[i]) === filterNum);

    i += 1;
  }

  return data[0];
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day3/hard -> ${main(input)}`);
console.log(`---------------------`);
