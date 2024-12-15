import { GameState, Position } from '../types/game';
import { TOTAL_GOATS, WINNING_CAPTURES } from '../constants/game';
import { positionToIndex, indexToPosition } from './board';
import { getValidMoves } from './moves';

export const createInitialGameState = (): GameState => {
  const state: GameState = {
    board: Array(25).fill(null),
    phase: 'placing',
    currentPlayer: 'goat',
    goatsToPlace: TOTAL_GOATS,
    capturedGoats: 0,
    selectedPiece: null,
    validMoves: [],
  };

  // Initialize tigers at corners
  state.board[0] = 'tiger';
  state.board[4] = 'tiger';
  state.board[20] = 'tiger';
  state.board[24] = 'tiger';

  return state;
};

export const isGameOver = (state: GameState): { winner: 'tiger' | 'goat' | null } => {
  if (state.capturedGoats >= WINNING_CAPTURES) {
    return { winner: 'tiger' };
  }

  // Check if tigers are trapped
  let tigerCanMove = false;
  state.board.forEach((piece, index) => {
    if (piece === 'tiger') {
      const pos = indexToPosition(index);
      if (getValidMoves(state, pos).length > 0) {
        tigerCanMove = true;
      }
    }
  });

  if (!tigerCanMove && state.phase === 'moving') {
    return { winner: 'goat' };
  }

  return { winner: null };
};