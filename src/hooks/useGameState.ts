import { useState, useCallback } from 'react';
import { GameState, Position } from '../types/game';
import { positionToIndex } from '../utils/game/board';
import { getValidMoves } from '../utils/game/moves';
import { handlePlacingPhase, handlePieceMovement, createInitialGameState } from '../utils/game/state';
import { isGameOver } from '../utils/game/validation';

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGameState());

  const handleCellClick = useCallback((position: Position) => {
    const index = positionToIndex(position);

    // If game is over, don't allow any moves
    if (isGameOver(gameState).winner) return;

    if (gameState.phase === 'placing' && gameState.currentPlayer === 'goat') {
      setGameState(handlePlacingPhase(gameState, position));
    } else {
      handleMovingPhase(position, index);
    }
  }, [gameState]);

  const handleMovingPhase = (position: Position, index: number) => {
    if (gameState.selectedPiece === null) {
      // Select piece if it belongs to current player
      if (gameState.board[index] === gameState.currentPlayer) {
        setGameState({
          ...gameState,
          selectedPiece: position,
          validMoves: getValidMoves(gameState, position)
        });
      }
    } else {
      setGameState(handlePieceMovement(gameState, position));
    }
  };

  return {
    gameState,
    handleCellClick,
    gameStatus: isGameOver(gameState)
  };
};