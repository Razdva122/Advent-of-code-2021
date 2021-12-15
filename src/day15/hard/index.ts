import input from '../input';
import { test, resultHard } from '../test';

interface IData {
  price?: number;
  num: number;
}

function main(input: string): number {
  const data: IData[][] = input.split('\n').map((el) => el.split('').map((num) => ({ num: Number(num) })));

  data[0][0].price = 0; 

  const iLength = data.length;
  const jLength = data[0].length;

  for (let i = 0; i < iLength * 5; i += 1) {
    for (let j = 0; j < jLength * 5; j += 1) {
      if (!data[i]) {
        data.push([]);
      }

      if (data[i][j]) {
        continue;
      }

      const newI = i % iLength;
      const newJ = j % jLength;
      const value = data[newI][newJ];

      data[i][j] = {...value};
      const increase = Math.floor(i / iLength) + Math.floor(j / jLength);

      if (data[i][j].num + increase > 9) {
        data[i][j].num += increase - 9;
      } else {
        data[i][j].num += increase;
      }
    }
  }
  
  let stack: [number, number][] = [[0, 1], [1, 0]];

  while (stack.length) {
    let newStack: [number, number][] = [];
    for (let i = 0; i < stack.length; i += 1) {
      const element = stack[i];
      countPriceForElement(data, element);
      recountPriceForCloseElements(data, element);

      const moves = movesForElement(data, element);
      moves.forEach((move) => {
        if (newStack.some((el) => el.join() === move.join())) {
          return
        }

        newStack.push(move);
      })
    }

    stack = newStack;
  }

  return data[data.length - 1][data[0].length - 1].price!;
}

function countPriceForElement(data: IData[][], element: [number, number]): void {
  const toCheck: [number, number][] = [[element[0], element[1] - 1], [element[0] - 1, element[1]]];

  const elements = toCheck.map((el) => saveGetValue(data,  el));
  const price = elements.filter(Boolean).reduce((acc, el) => {
    return Math.min(acc, el!.price!);
  }, Infinity);

  data[element[0]][element[1]].price = price + saveGetValue(data, element)!.num;
}

function recountPriceForCloseElements(data: IData[][], element: [number, number]): void {
  const toCheck: [number, number][] = [
    [element[0], element[1] - 1], 
    [element[0] - 1, element[1]],
    [element[0] + 1, element[1]],
    [element[0], element[1] + 1]
  ];

  const elements = toCheck.filter((el) => saveGetValue(data,  el));

  elements.forEach((el) => {
    const value = saveGetValue(data, el)!;
    if (value.price! > saveGetValue(data,  element)!.price! + value.num) {
      value.price = saveGetValue(data,  element)!.price! + value.num;

      recountPriceForCloseElements(data, el);
    }
  });
}

function movesForElement(data: IData[][], element: [number, number]): [number, number][] {
  const moves: [number, number][] = [[element[0], element[1] + 1], [element[0] + 1, element[1]]]
  return moves.filter((el) => saveGetValue(data, el));
}

function saveGetValue(data: IData[][], element: [number, number]): IData | null {
  if (element[0] < 0 || element[0] >= data.length) {
    return null
  }

  if (element[1] < 0 || element[1] >= data[0].length) {
    return null;
  }

  return data[element[0]][element[1]];
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day15/hard -> ${main(input)}`);
console.log(`---------------------`);
