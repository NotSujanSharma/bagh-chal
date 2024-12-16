import { GameState } from '../../types/game';
import { WINNING_CAPTURES } from '../../constants/game';
import { indexToPosition } from './board';
import { getValidMoves } from './moves';

export const isGameOver = (state: GameState): { winner: 'tiger' | 'goat' | null } => {
  if (state.capturedGoats >= WINNING_CAPTURES) {
    return { winner: 'tiger' };
  }

  if (areTigersTrapped(state)) {
    return { winner: 'goat' };
  }

  return { winner: null };
};

export const areTigersTrapped = (state: GameState): boolean => {
  if (state.phase !== 'moving') return false;

  return !state.board.some((piece, index) => {
    if (piece === 'tiger') {
      const pos = indexToPosition(index);
      return getValidMoves(state, pos).length > 0;
    }
    return false;
  });
};