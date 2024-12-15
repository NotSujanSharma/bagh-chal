import React from 'react';
import { GameState } from '../types/game';

interface GameStatusProps {
  gameState: GameState;
  winner: 'tiger' | 'goat' | null;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameState, winner }) => {
  return (
    <div className="mb-4 text-center">
      {!winner && (
        <>
          <p className="text-lg font-semibold">
            Current Player: {gameState.currentPlayer === 'tiger' ? '🐯 Tiger' : '🐐 Goat'}
          </p>
          {gameState.phase === 'placing' && (
            <p className="text-sm text-gray-600">
              Goats to place: {gameState.goatsToPlace}
            </p>
          )}
          <p className="text-sm text-gray-600">
            Captured Goats: {gameState.capturedGoats}
          </p>
        </>
      )}
      
      {winner && (
        <h2 className="text-2xl font-bold text-green-600">
          {winner === 'tiger' ? '🐯 Tigers Win!' : '🐐 Goats Win!'}
        </h2>
      )}
    </div>
  );
};

export default GameStatus;