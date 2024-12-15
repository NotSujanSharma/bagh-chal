import { GameState, Position } from '../types/game';
import { DIRECTIONS } from '../constants/game';
import { positionToIndex, isValidPosition, isDiagonalAllowed } from './board';

export const getValidMoves = (state: GameState, pos: Position): Position[] => {
  const piece = state.board[positionToIndex(pos)];
  if (!piece) return [];

  const moves: Position[] = [];

  DIRECTIONS.forEach(([dx, dy]) => {
    const newX = pos.x + dx;
    const newY = pos.y + dy;
    const newPos = { x: newX, y: newY };
    
    // Early return if position is invalid
    if (!isValidPosition(newPos)) return;

    // For diagonal moves, check if they're allowed at this position
    const isDiagonal = Math.abs(dx) === Math.abs(dy);
    if (isDiagonal && !isDiagonalAllowed(pos)) return;
    
    const targetIndex = positionToIndex(newPos);
    
    // Handle normal moves
    if (state.board[targetIndex] === null) {
      moves.push(newPos);
      return;
    }
    
    // Handle capture moves for tigers
    if (piece === 'tiger' && state.board[targetIndex] === 'goat') {
      const jumpX = newX + dx;
      const jumpY = newY + dy;
      const jumpPos = { x: jumpX, y: jumpY };
      
      if (isValidPosition(jumpPos)) {
        const jumpIndex = positionToIndex(jumpPos);
        if (state.board[jumpIndex] === null) {
          moves.push(jumpPos);
        }
      }
    }
  });

  return moves;
};

export const getCapturedPosition = (from: Position, to: Position): Position | null => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  
  if (Math.abs(dx) === 2 || Math.abs(dy) === 2) {
    return {
      x: from.x + dx/2,
      y: from.y + dy/2
    };
  }
  
  return null;
};