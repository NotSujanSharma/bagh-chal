export const BOARD_SIZE = 5;
export const TOTAL_GOATS = 20;
export const WINNING_CAPTURES = 5;

export const DIRECTIONS = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1],          [0, 1],
  [1, -1],  [1, 0],  [1, 1]
] as const;