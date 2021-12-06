import input from '../input';
import { test, result } from '../test';

function main(input: string): number {
  let data = input.split(',').map(Number);
  
  for (let i = 0; i < 80; i += 1) {
    let length = data.length;
    for (let j = 0; j < length; j += 1) {
      if (data[j] === 0) {
        data[j] = 6;
        data.push(8);
      } else {
        data[j] -= 1;
      }
    }
  }

  return data.length;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day6/easy -> ${main(input)}`);
console.log(`---------------------`);
