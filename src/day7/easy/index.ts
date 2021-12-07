import input from '../input';
import { test, result } from '../test';

function main(input: string): number {
  const data = input.split(',').map(Number);
  const minValue = data.reduce((acc, el) => {
    return el < acc ? el : acc;
  }, Infinity)

  const maxValue = data.reduce((acc, el) => {
    return el > acc ? el : acc;
  }, -Infinity);

  const results = [];

  for (let i = minValue; i <= maxValue; i += 1) {
    results.push(countDiff(data, i));
  }

  const minResult = results.reduce((acc, el) => {
    return el < acc ? el : acc;
  }, Infinity);

  return minResult;
}

function countDiff(data: number[], target: number): number {
  return data.reduce((acc, el) => {
    return acc + Math.abs(el - target);
  }, 0);
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day7/easy -> ${main(input)}`);
console.log(`---------------------`);
