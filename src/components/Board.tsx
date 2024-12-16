import React from 'react';
import { Position, GameState } from '../types/game';
import { positionToIndex, indexToPosition } from '../utils/game/board';

interface BoardProps {
  gameState: GameState;
  onCellClick: (position: Position) => void;
}

const Board: React.FC<BoardProps> = ({ gameState, onCellClick }) => {
  const renderCell = (index: number) => {
    const position = indexToPosition(index);
    const piece = gameState.board[index];
    const isSelected = gameState.selectedPiece && 
      positionToIndex(gameState.selectedPiece) === index;
    const isValidMove = gameState.validMoves.some(
      move => positionToIndex(move) === index
    );

    return (
      <div
        key={index}
        className={`absolute w-8 h-8 -translate-x-4 -translate-y-4 cursor-pointer flex items-center justify-center text-2xl
          ${isSelected ? 'ring-4 ring-blue-400' : ''}
          ${isValidMove ? 'bg-green-200 rounded-full' : ''}`}
        style={{
          left: `${(position.x * 25)}%`,
          top: `${(position.y * 25)}%`,
        }}
        onClick={() => onCellClick(position)}
      >
        {piece && (
          piece === 'tiger' ? '🐯' : '🐐'
        )}
      </div>
    );
  };

  return (
    <div className="relative w-[400px] h-[400px] bg-amber-100 border-2 border-amber-800">
      {/* Grid lines */}
      <svg className="absolute w-full h-full" viewBox="0 0 100 100">
        {/* Vertical lines */}
        {[0, 25, 50, 75, 100].map((x) => (
          <line
            key={`v${x}`}
            x1={x}
            y1="0"
            x2={x}
            y2="100"
            stroke="black"
            strokeWidth="0.5"
          />
        ))}
        {/* Horizontal lines */}
        {[0, 25, 50, 75, 100].map((y) => (
          <line
            key={`h${y}`}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="black"
            strokeWidth="0.5"
          />
        ))}
        {/* Diagonal lines */}
        <line x1="0" y1="0" x2="100" y2="100" stroke="black" strokeWidth="0.5" />
        <line x1="100" y1="0" x2="0" y2="100" stroke="black" strokeWidth="0.5" />
        <line x1="0" y1="50" x2="100" y2="50" stroke="black" strokeWidth="0.5" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="black" strokeWidth="0.5" />
      </svg>
      
      {/* Game pieces */}
      {Array(25).fill(null).map((_, index) => renderCell(index))}
    </div>
  );
};

export default Board;