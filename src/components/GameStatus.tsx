import React from 'react';
import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';
import { GameState } from '../types/game';

interface GameStatusProps {
  gameState: GameState;
  winner: 'tiger' | 'goat' | null;
  onRestart: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ gameState, winner, onRestart }) => {
  const [tigerScore] = useState(0);
  const [goatScore] = useState(0);

  return (
    <div className="w-full max-w-md bg-slate-800 rounded-xl p-6 mb-6 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <div className="text-center p-4 bg-slate-700 rounded-lg flex-1 mr-2">
          <div className="text-2xl mb-1">🐯</div>
          <div className="text-amber-400 font-bold">{tigerScore}</div>
        </div>
        <div className="text-center p-4 bg-slate-700 rounded-lg flex-1 ml-2">
          <div className="text-2xl mb-1">🐐</div>
          <div className="text-amber-400 font-bold">{goatScore}</div>
        </div>
      </div>

      <div className="text-center mb-4">
        {!winner ? (
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-lg font-semibold text-white"
          >
            Current Player: {gameState.currentPlayer === 'tiger' ? '🐯 Tiger' : '🐐 Goat'}
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-2xl font-bold text-green-400"
          >
            {winner === 'tiger' ? '🐯 Tigers Win!' : '🐐 Goats Win!'}
          </motion.div>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onRestart}
          className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
        >
          <RotateCcw size={16} />
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameStatus;