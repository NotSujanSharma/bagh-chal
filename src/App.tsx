import { useState } from 'react';
import MainMenu from './components/MainMenu';
import Board from './components/Board';
import GameStatus from './components/GameStatus';
import Scoreboard from './components/Scoreboard';
import { useGameState } from './hooks/useGameState';
import { Home } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


function App() {
  const [currentScreen, setCurrentScreen] = useState('menu');
  const { gameState, handleCellClick, gameStatus, resetGame } = useGameState();

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
          <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
            <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-amber-600/20">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-6 text-center text-amber-500"
              >
                Baghchal
              </motion.h1>
              
              <GameStatus 
                gameState={gameState} 
                winner={gameStatus.winner}
                onRestart={resetGame}
              />
              
              <Board gameState={gameState} onCellClick={handleCellClick} />
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setCurrentScreen('menu')}
                className="mt-6 w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-amber-400 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Home size={16} />
                Back to Menu
              </motion.button>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      {renderScreen()}
    </AnimatePresence>
  );
};

export default App;