import { GameState, Position } from '../../types/game';
import { TOTAL_GOATS } from '../../constants/game';
import { positionToIndex } from './board';
import { getValidMoves, getCapturedPosition } from './moves';

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

export const handlePlacingPhase = (
  state: GameState,
  position: Position
): GameState => {
  const index = positionToIndex(position);
  if (state.board[index] !== null) return state;

  const newState = { ...state };
  newState.board[index] = 'goat';
  newState.goatsToPlace--;
  newState.currentPlayer = 'tiger';
  
  if (newState.goatsToPlace === 0) {
    newState.phase = 'moving';
  }

  return newState;
};

export const handlePieceMovement = (
  state: GameState,
  position: Position
): GameState => {
  if (!state.selectedPiece) return state;

  const isValidMove = state.validMoves.some(
    move => move.x === position.x && move.y === position.y
  );

  if (!isValidMove) {
    return {
      ...state,
      selectedPiece: null,
      validMoves: []
    };
  }

  const newState = { ...state };
  const selectedIndex = positionToIndex(state.selectedPiece);
  const targetIndex = positionToIndex(position);

  // Handle captures for tigers
  if (state.currentPlayer === 'tiger') {
    const capturedPos = getCapturedPosition(state.selectedPiece, position);
    if (capturedPos) {
      const capturedIndex = positionToIndex(capturedPos);
      newState.board[capturedIndex] = null;
      newState.capturedGoats++;
    }
  }

  // Move piece
  newState.board[targetIndex] = newState.board[selectedIndex];
  newState.board[selectedIndex] = null;
  newState.currentPlayer = state.currentPlayer === 'tiger' ? 'goat' : 'tiger';
  newState.selectedPiece = null;
  newState.validMoves = [];

  return newState;
};