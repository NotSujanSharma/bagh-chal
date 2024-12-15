import React from 'react';
import { Volume2, VolumeX, Trophy, Play, X } from 'lucide-react';
import { useAudio } from '../hooks/useAudio';

interface MainMenuProps {
  onStartGame: () => void;
  onShowHighScores: () => void;
  onExit: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onShowHighScores, onExit }) => {
  const { isMuted, volume, toggleMute, handleVolumeChange } = useAudio();

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-orange-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-800">
            Baghchal
          </h1>
          <p className="text-amber-600">Tiger and Goats</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-white py-3 px-6 rounded-lg transform transition-all hover:scale-105 active:scale-95"
          >
            <Play size={20} />
            Start Game
          </button>

          <button
            onClick={onShowHighScores}
            className="w-full flex items-center justify-center gap-2 bg-amber-100 hover:bg-amber-200 text-amber-800 py-3 px-6 rounded-lg transform transition-all hover:scale-105 active:scale-95"
          >
            <Trophy size={20} />
            High Scores
          </button>

          <button
            onClick={onExit}
            className="w-full flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-800 py-3 px-6 rounded-lg transform transition-all hover:scale-105 active:scale-95"
          >
            <X size={20} />
            Exit
          </button>
        </div>

        <div className="flex items-center justify-center gap-4 pt-4 border-t border-amber-200">
          <button
            onClick={toggleMute}
            className="p-2 rounded-full hover:bg-amber-100 transition-colors"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-32 h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default MainMenu;