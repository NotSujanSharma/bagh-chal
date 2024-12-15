import { Position } from '../types/game';
import { BOARD_SIZE } from '../constants/game';

export const positionToIndex = (pos: Position): number => {
  return pos.y * BOARD_SIZE + pos.x;
};

export const indexToPosition = (index: number): Position => {
  return {
    x: index % BOARD_SIZE,
    y: Math.floor(index / BOARD_SIZE),
  };
};

export const isValidPosition = (pos: Position): boolean => {
  return pos.x >= 0 && pos.x < BOARD_SIZE && pos.y >= 0 && pos.y < BOARD_SIZE;
};

export const isDiagonalAllowed = (pos: Position): boolean => {
  // Only allow diagonal moves on intersecting points
  return (pos.x + pos.y) % 2 === 0;
};