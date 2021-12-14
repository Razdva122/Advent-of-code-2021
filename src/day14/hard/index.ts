import input from '../input';
import { test, resultHard } from '../test';

function main(input: string): number {
  const word = input.split('\n').slice(0, 1)[0];
  const moves = input.split('\n').slice(2).map((el) => {
    const [path, insert] = el.split(' -> ');

    return {
      path,
      insert
    }
  });

  let memory: {[key: string]: number} = {};

  let tempMemory: {[key: string]: number};

  for (let i = 1; i < word.length; i += 1) {
    const path = `${word[i - 1] ? word[i - 1] : ''}${word[i] ? word[i] : ''}`;
    memory[path] = memory[path] || 0;
    memory[path] += 1;
  }

  const alphabet = Array.from(new Set('abcdefghijklmnopqrstuvwxyz'.toUpperCase()));

  for (let i = 0; i < 40; i += 1) {
    tempMemory = { ...memory };

    Object.keys(memory).forEach((key) => {
      const move = moves.find((el) => el.path === key);

      if (move) {
        const amount = memory[move.path];

        if (amount === 0) {
          return;
        }

        tempMemory[move.path] -= amount;
        const firstValue = `${move.path[0]}${move.insert}`;
        const secondValue = `${move.insert}${move.path[1]}`;
    
        tempMemory[firstValue] = tempMemory[firstValue] || 0;
        tempMemory[firstValue] += amount;

        tempMemory[secondValue] = tempMemory[secondValue] || 0;
        tempMemory[secondValue] += amount;
      }
    })

    memory = { ...tempMemory };
  }

  const resLetters = alphabet.map((el) => {
    const startValues = Object.keys(memory).reduce((acc, path) => {
      return path[0] === el ? acc + memory[path] : acc;
    }, 0);

    const endValues = Object.keys(memory).reduce((acc, path) => {
      return path[1] === el ? acc + memory[path] : acc;
    }, 0);

    return {
      el,
      value: Math.max(startValues, endValues)
    };
  }).filter((el) => el.value);

  const minMax = resLetters.reduce((acc, el) => {
    acc[0] = Math.min(acc[0], el.value);
    acc[1] = Math.max(acc[1], el.value);
    return acc;
  }, [Infinity, -Infinity]);

  return minMax[1] - minMax[0];
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day14/hard -> ${main(input)}`);
console.log(`---------------------`);
