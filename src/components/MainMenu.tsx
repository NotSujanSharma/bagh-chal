import React from 'react';
import { Volume2, VolumeX, Trophy, Play } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface MainMenuProps {
  onStartGame: () => void;
  onShowHighScores: () => void;
  onExit: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onShowHighScores }) => {

  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8 border border-amber-600/20"
      >
        <motion.div
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-center space-y-2"
        >
          <h1 className="text-5xl font-bold text-amber-500">Baghchal</h1>
          <p className="text-amber-400/80">Tiger and Goats</p>
        </motion.div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onStartGame}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg"
          >
            <Play size={20} />
            Start Game
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShowHighScores}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-amber-400 py-3 px-6 rounded-lg"
          >
            <Trophy size={20} />
            High Scores
          </motion.button>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-700">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full hover:bg-slate-700 transition-colors text-amber-400"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-32 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MainMenu;