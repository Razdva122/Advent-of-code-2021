import type { TTicket } from './interface';

export function isWinningTicket(ticket: TTicket): boolean {
  for (let i = 0; i < ticket.length; i += 1) {
    const horizontal = ticket[i];
    const vertical = ticket.map((el) => el[i]);

    if (
      horizontal.every((el) => el === null) ||
      vertical.every((el) => el === null) 
    ) {
      return true;
    }
  }

  return false;
}

export function removeElementFromTicket(ticket: TTicket, element: number): void {
  for (let i = 0; i < ticket.length; i += 1) {
    for (let j = 0; j < ticket[0].length; j += 1) {
      if (ticket[i][j] === element) {
        ticket[i][j] = null;
      }
    }
  }
}

export function sumOfElementsInTicket(ticket: TTicket): number {
  let sum = 0;

  for (let i = 0; i < ticket.length; i += 1) {
    for (let j = 0; j < ticket[0].length; j += 1) {
      if (ticket[i][j]) {
        sum += Number(ticket[i][j]);
      }
    }
  }

  return sum;
}