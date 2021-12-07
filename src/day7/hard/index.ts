import input from '../input';
import { test, resultHard } from '../test';

const memory: {[key: number]: number} = {
  0: 0,
  1: 1
};

for (let i = 2; i < 2000; i += 1) {
  sumOfAll(i);
}

function sumOfAll(i: number) {
  if (memory[i]) {
    return memory[i];
  }

  let result = i + memory[i - 1];

  memory[i] = result;
  return result;
}

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
    return acc + memory[Math.abs(el - target)];
  }, 0);
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day7/hard -> ${main(input)}`);
console.log(`---------------------`);
