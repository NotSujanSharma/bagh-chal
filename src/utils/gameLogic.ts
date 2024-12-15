import { Position, Piece, GameState } from '../types/game';

const BOARD_SIZE = 5;
const TOTAL_GOATS = 20;

export const initialGameState: GameState = {
  board: Array(25).fill(null),
  phase: 'placing',
  currentPlayer: 'goat',
  goatsToPlace: TOTAL_GOATS,
  capturedGoats: 0,
  selectedPiece: null,
  validMoves: [],
};

// Initialize tigers at corners
initialGameState.board[0] = 'tiger';
initialGameState.board[4] = 'tiger';
initialGameState.board[20] = 'tiger';
initialGameState.board[24] = 'tiger';

export const positionToIndex = (pos: Position): number => {
  return pos.y * BOARD_SIZE + pos.x;
};

export const indexToPosition = (index: number): Position => {
  return {
    x: index % BOARD_SIZE,
    y: Math.floor(index / BOARD_SIZE),
  };
};

export const getValidMoves = (state: GameState, pos: Position): Position[] => {
  const piece = state.board[positionToIndex(pos)];
  if (!piece) return [];

  const moves: Position[] = [];
  const directions = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],          [0, 1],
    [1, -1],  [1, 0],  [1, 1]
  ];

  for (const [dx, dy] of directions) {
    const newX = pos.x + dx;
    const newY = pos.y + dy;
    
    if (newX >= 0 && newX < BOARD_SIZE && newY >= 0 && newY < BOARD_SIZE) {
      // Check if diagonal move is valid (only on actual diagonal lines)
      if (Math.abs(dx) === Math.abs(dy)) {
        // Skip non-intersecting points for diagonal moves
        if ((pos.x + pos.y) % 2 !== 0) {
          continue;
        }
      }
      
      const targetIndex = positionToIndex({ x: newX, y: newY });
      
      if (state.board[targetIndex] === null) {
        moves.push({ x: newX, y: newY });
      } else if (piece === 'tiger' && state.board[targetIndex] === 'goat') {
        // Check for capture moves
        const jumpX = newX + dx;
        const jumpY = newY + dy;
        if (jumpX >= 0 && jumpX < BOARD_SIZE && jumpY >= 0 && jumpY < BOARD_SIZE) {
          const jumpIndex = positionToIndex({ x: jumpX, y: jumpY });
          if (state.board[jumpIndex] === null) {
            moves.push({ x: jumpX, y: jumpY });
          }
        }
      }
    }
  }
  
  return moves;
};

export const isGameOver = (state: GameState): { winner: 'tiger' | 'goat' | null } => {
  if (state.capturedGoats >= 5) {
    return { winner: 'tiger' };
  }

  // Check if tigers are trapped
  let tigerCanMove = false;
  for (let i = 0; i < state.board.length; i++) {
    if (state.board[i] === 'tiger') {
      const pos = indexToPosition(i);
      if (getValidMoves(state, pos).length > 0) {
        tigerCanMove = true;
        break;
      }
    }
  }

  if (!tigerCanMove && state.phase === 'moving') {
    return { winner: 'goat' };
  }

  return { winner: null };
};