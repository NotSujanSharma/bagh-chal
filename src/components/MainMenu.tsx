import React from 'react';
import { Volume2, VolumeX, Trophy, Play, Info } from 'lucide-react';
import { useState } from 'react';

interface MainMenuProps {
  onStartGame: () => void;
  onShowHighScores: () => void;
  onExit: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onShowHighScores }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8 border border-amber-600/20">
        <div className="text-center space-y-2">
          <h1 className="text-5xl font-bold text-amber-500">Baghchal</h1>
          <p className="text-amber-400/80">Tiger and Goats</p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="w-full flex items-center justify-center gap-2 bg-amber-600 hover:bg-amber-700 text-white py-3 px-6 rounded-lg transition-colors"
          >
            <Play size={20} />
            Start Game
          </button>

          <button
            onClick={onShowHighScores}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-amber-400 py-3 px-6 rounded-lg transition-colors"
          >
            <Trophy size={20} />
            High Scores
          </button>

          <button
            onClick={() => setShowAbout(true)}
            className="w-full flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-amber-400 py-3 px-6 rounded-lg transition-colors"
          >
            <Info size={20} />
            About
          </button>
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
      </div>

      {/* About Modal */}
      {showAbout && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-2xl font-bold text-amber-500 mb-4">About Baghchal</h2>
            <p className="text-slate-300 mb-6">
              Designed and created by Sujan Sharma
            </p>
            <button
              onClick={() => setShowAbout(false)}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainMenu;