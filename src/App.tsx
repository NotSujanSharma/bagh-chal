import React, { useState } from 'react';
import MainMenu from './components/MainMenu';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import Scoreboard from './components/Scoreboard';
import { useGameState } from './hooks/useGameState';

type GameScreen = 'menu' | 'game' | 'scores';

function App() {
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('menu');
  const { gameState, handleCellClick, gameStatus } = useGameState();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'menu':
        return (
          <MainMenu
            onStartGame={() => setCurrentScreen('game')}
            onShowHighScores={() => setCurrentScreen('scores')}
            onExit={() => window.close()}
          />
        );
      case 'scores':
        return (
          <Scoreboard
            scores={[
              { playerName: 'Player 1', score: 100, date: '2024-03-15', gameType: 'tiger' },
              { playerName: 'Player 2', score: 85, date: '2024-03-14', gameType: 'goat' },
            ]}
            onClose={() => setCurrentScreen('menu')}
          />
        );
      case 'game':
        return (
          <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200 flex flex-col items-center justify-center p-4">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
              <h1 className="text-3xl font-bold mb-6 text-center text-amber-800">Baghchal</h1>
              <GameStatus gameState={gameState} winner={gameStatus.winner} />
              <Board gameState={gameState} onCellClick={handleCellClick} />
              
              <button
                onClick={() => setCurrentScreen('menu')}
                className="mt-6 w-full py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors"
              >
                Back to Menu
              </button>
            </div>
          </div>
        );
    }
  };

  return renderScreen();
}

export default App;