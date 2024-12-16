import React  from 'react';
import { Score } from '../types/game';
import { motion } from 'framer-motion';

interface ScoreboardProps {
  scores: Score[];
  onClose: () => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scores, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-slate-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden border border-amber-600/20"
      >
        <div className="p-6 border-b border-slate-700">
          <h2 className="text-2xl font-bold text-amber-500">High Scores</h2>
        </div>

        <div className="overflow-auto max-h-[calc(80vh-8rem)]">
          <table className="w-full">
            <thead className="bg-slate-700 sticky top-0">
              <tr>
                <th className="py-3 px-4 text-left text-amber-400">Rank</th>
                <th className="py-3 px-4 text-left text-amber-400">Player</th>
                <th className="py-3 px-4 text-left text-amber-400">Score</th>
                <th className="py-3 px-4 text-left text-amber-400">Date</th>
              </tr>
            </thead>
            <tbody className="text-slate-300">
              {scores.map((score, index) => (
                <motion.tr
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className="border-t border-slate-700 hover:bg-slate-700/50"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{score.playerName}</td>
                  <td className="py-3 px-4">{score.score}</td>
                  <td className="py-3 px-4">
                    {new Date(score.date).toLocaleDateString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-700">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
          >
            Close
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Scoreboard;