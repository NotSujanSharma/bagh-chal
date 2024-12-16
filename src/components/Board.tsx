import React from 'react';
import { Position, GameState } from '../types/game';
import { motion } from 'framer-motion';
import { positionToIndex, indexToPosition } from '../utils/game/board';

interface BoardProps {
  gameState: GameState;
  onCellClick: (position: Position) => void;
}
const Board: React.FC<BoardProps> = ({ gameState, onCellClick }) => {
  return (
    <div className="relative w-[360px] h-[360px] bg-slate-800 border-2 border-amber-600 rounded-lg shadow-lg">
      {/* Grid lines */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        {[0, 25, 50, 75, 100].map((x) => (
          <line
            key={`v${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            stroke="#475569"
            strokeWidth="0.5"
          />
        ))}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={`h${y}`}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="#475569"
            strokeWidth="0.5"
          />
        ))}
        <line x1="0" y1="0" x2="100" y2="100" stroke="#475569" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="#475569" strokeWidth="0.5" />
      </svg>
      
      {/* Game pieces */}
      {Array(25).fill(null).map((_, index) => {
        const position = indexToPosition(index);
        const piece = gameState.board[index];
        const isSelected = gameState.selectedPiece && 
          positionToIndex(gameState.selectedPiece) === index;
        const isValidMove = gameState.validMoves.some(
          move => positionToIndex(move) === index
        );

        return (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute w-10 h-10 cursor-pointer flex items-center justify-center text-4xl
              ${isSelected ? 'ring-4 ring-blue-500' : ''}
              ${isValidMove ? 'bg-green-500/30 rounded-full' : ''}`}
            style={{
              left: `${(position.x * 25) - 5 }%`, 
              top: `${(position.y * 25) - 5}%`,
              
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onCellClick(position)}
          >
            {piece && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                {piece === 'tiger' ? '🐯' : '🐐'}
              </motion.span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Board;