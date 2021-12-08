import input from '../input';
import { test, resultHard } from '../test';

const img = 
` 1111
 2    3
 2    3
  4444
 5    6
 5    6
  7777
`;

const map: {[key: number]: number[]} = {
  0: [1,2,3,5,6,7],
  1: [3,6],
  2: [1,3,4,5,7],
  3: [1,3,4,6,7],
  4: [2,3,4,6],
  5: [1,2,4,6,7],
  6: [1,2,4,5,6,7],
  7: [1,3,6],
  8: [1,2,3,4,5,6,7],
  9: [1,2,3,4,6,7]
};

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
    const dataEl = data[i];
    const knownEdge = new Array(8);
    const knownElements: {[key: number]: string} = {
      1: dataEl.signalPattern.find((el) => el.length === map[1].length)!,
      4: dataEl.signalPattern.find((el) => el.length === map[4].length)!,
      7: dataEl.signalPattern.find((el) => el.length === map[7].length)!,
      8: dataEl.signalPattern.find((el) => el.length === map[8].length)!,
    };

    // Find edge 1111
    const diff1111 = findDiff([knownElements[1], knownElements[7]]);
    knownEdge[1] = Object.entries(diff1111).find((el) => el[1] === 1)![0];

    // Find edge 22 and 4444
    const diff4minus1 = findDiff([knownElements[1], knownElements[4]]);
    const diff069 = findDiff(dataEl.signalPattern.filter((el) => el.length === map[0].length));

    knownEdge[2] = Object.entries(diff069).find(([name, amount]) => {
      if (amount > 0) {
        return false;
      }

      return diff4minus1[name] === 1;
    })![0];

    knownEdge[4] = Object.entries(diff069).find(([name, amount]) => {
      if (amount !== 1) {
        return false;
      }

      return diff4minus1[name] === 1;
    })![0];

    knownElements[0] = dataEl.signalPattern
      .filter((el) => el.length === map[0].length)
      .find((el) => !el.includes(knownEdge[4]))!

    // Find edge 33 and 66
    const num6and9 = dataEl.signalPattern
      .filter((el) => el.length === map[0].length && el !== knownElements[0]);

    const diff69 = findDiff(num6and9);

    knownEdge[3] = Object.entries(diff69).find(([name, amount]) => {
      if (amount !== 1) {
        return false;
      }

      return knownElements[1].includes(name);
    })![0];

    knownElements[9] = num6and9.find((el) => el.includes(knownEdge[3]))!;

    knownElements[6] = num6and9.find((el) => !el.includes(knownEdge[3]))!;

    knownEdge[6] = Object.entries(diff69).find(([name, amount]) => {
      if (amount === 1) {
        return false;
      }

      return knownElements[1].includes(name);
    })![0];

    // Find number 2,3,5
    const num235 = dataEl.signalPattern
      .filter((el) => el.length === map[2].length);

    knownElements[2] = num235.find((el) => el.includes(knownEdge[3]) && !el.includes(knownEdge[6]))!

    knownElements[3] = num235.find((el) => el.includes(knownEdge[3]) && el.includes(knownEdge[6]))!

    knownElements[5] = num235.find((el) => !el.includes(knownEdge[3]) && el.includes(knownEdge[6]))!

    const hash: {[key: string]: number} = {};

    for (const key in knownElements) {
      hash[knownElements[key].split('').sort().join()] = Number(key);
    }

    let result = '';

    dataEl.output.forEach((el) => {
      result += hash[el.split('').sort().join()];
    });

    counter += Number(result);
  }

  return counter;
}

function findDiff(arr: string[]): {[key: string]: number} {
  const res = {
    'a': arr.length,
    'b': arr.length,
    'c': arr.length,
    'd': arr.length,
    'e': arr.length,
    'f': arr.length,
    'g': arr.length,
  };

  arr.forEach((str: string) => {
    [...str].forEach((letter: string) => {
      res[letter as keyof typeof res] -= 1;
    })
  })

  return res;
}

main(test);

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day8/hard -> ${main(input)}`);
console.log(`---------------------`);
