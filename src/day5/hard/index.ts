import input from '../input';
import { test, resultHard } from '../test';

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

  const memory: any = {};

  const move = {
    y: (position: [number, number], move: number) => [position[0], position[1] + move],
    x: (position: [number, number], move: number) => [position[0] + move, position[1]],
    xy: (position: [number, number], moveX: number, moveY: number) => [position[0] + moveX, position[1] + moveY]
  }

  data.forEach((el) => {
    const position: [number, number] = [el.start.x, el.start.y];
    let amount: number;
    let state: {
      moveDir: 'x' | 'y'
      direction: 1 | -1;
    } | {
      moveDir: 'xy',
      direction: [1 | -1, 1 | -1],
    };

    if (el.start.x === el.end.x) {
      amount = Math.abs(el.end.y - el.start.y);

      state = {
        moveDir: 'y',
        direction: el.end.y > el.start.y ? 1 : -1
      }
      
    } else if (el.start.y === el.end.y) {
      amount = Math.abs(el.end.x - el.start.x);

      state = {
        moveDir: 'x',
        direction: el.end.x > el.start.x ? 1 : -1
      }

    } else {
      amount = Math.abs(el.end.x - el.start.x);

      state = {
        moveDir: 'xy',
        direction: [el.end.x > el.start.x ? 1 : -1, el.end.y > el.start.y ? 1 : -1]
      };
    }

    for (let i = 0; i < amount + 1; i += 1) {
      let newPosition;
      if (state.moveDir === 'xy') {
        newPosition = move[state.moveDir](position, i * state.direction[0], i * state.direction[1]);
      } else {
        newPosition = move[state.moveDir](position, i * state.direction);
      }

      const newPositionIndex = newPosition.join(',');

      memory[newPositionIndex] = memory[newPositionIndex] || 0;
      memory[newPositionIndex] += 1;
    }
  });

  return Object.values(memory).filter((el: any) => el >= 2).length;
}

console.log(`---------------------`);
console.log(`${main(test) === Number(resultHard)} -> expect: ${resultHard} / real: ${main(test)}`);
console.log(`---------------------`);
console.log(`Result of day5/hard -> ${main(input)}`);
console.log(`---------------------`);
