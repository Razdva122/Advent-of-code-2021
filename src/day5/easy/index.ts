import input from '../input';
import { test, result } from '../test';

function main(input: string): number {
  const data = input.split('\n').map((el) => {
    const nums = el.split(' -> ');
    const [startX, startY] = nums[0].split(',');
    const [endX, endY] = nums[1].split(',');

    return {
      start: {
        x: Number(startX),
        y: Number(startY)
      },
      end: {
        x: Number(endX),
        y: Number(endY),
      }
    }
  });

  const normalizedData = data.filter((el) => el.start.x === el.end.x || el.start.y === el.end.y);

  const memory: {[key: string]: number} = {};

  const move = {
    y: (position: [number, number], move: number) => [position[0], position[1] + move],
    x: (position: [number, number], move: number) => [position[0] + move, position[1]],
  }

  normalizedData.forEach((el) => {
    const position: [number, number] = [el.start.x, el.start.y];
    let moveDir: 'x' | 'y';
    let amount: number;
    let direction;

    if (el.start.x === el.end.x) {
      moveDir = 'y';
      amount = Math.abs(el.end.y - el.start.y);
      direction = el.end.y > el.start.y ? 1 : -1;

    } else {
      moveDir = 'x';
      amount = Math.abs(el.end.x - el.start.x);
      direction = el.end.x > el.start.x ? 1 : -1;
    }

    for (let i = 0; i < amount + 1; i += 1) {
      const newPosition = move[moveDir](position, i * direction);

      const newPositionIndex = newPosition.join(',');

      memory[newPositionIndex] = memory[newPositionIndex] || 0;
      memory[newPositionIndex] += 1;
    }
  });

  return Object.values(memory).filter((el) => el >= 2).length;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(result)} -> expect: ${result} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day5/easy -> ${main(input)}`);
console.log(`---------------------`);
