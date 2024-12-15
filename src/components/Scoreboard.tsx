import React, { useState } from 'react';
import { ArrowUpDown, Share2 } from 'lucide-react';
import { Score } from '../types/game';

interface ScoreboardProps {
  scores: Score[];
  onClose: () => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ scores, onClose }) => {
  const [sortBy, setSortBy] = useState<'score' | 'date'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const sortedScores = [...scores].sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;
    if (sortBy === 'score') {
      return (a.score - b.score) * order;
    }
    return (new Date(a.date).getTime() - new Date(b.date).getTime()) * order;
  });

  const handleSort = (key: 'score' | 'date') => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-amber-800">High Scores</h2>
        </div>

        <div className="overflow-auto max-h-[calc(80vh-8rem)]">
          <table className="w-full">
            <thead className="bg-amber-50 sticky top-0">
              <tr>
                <th className="py-3 px-4 text-left">Rank</th>
                <th className="py-3 px-4 text-left">Player</th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('score')}>
                  <div className="flex items-center gap-1">
                    Score <ArrowUpDown size={16} />
                  </div>
                </th>
                <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('date')}>
                  <div className="flex items-center gap-1">
                    Date <ArrowUpDown size={16} />
                  </div>
                </th>
                <th className="py-3 px-4 text-left">Share</th>
              </tr>
            </thead>
            <tbody>
              {sortedScores.map((score, index) => (
                <tr key={index} className="border-t border-gray-100 hover:bg-amber-50">
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4">{score.playerName}</td>
                  <td className="py-3 px-4">{score.score}</td>
                  <td className="py-3 px-4">
                    {new Date(score.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      className="p-2 hover:bg-amber-100 rounded-full transition-colors"
                      onClick={() => {
                        navigator.share?.({
                          title: 'Baghchal High Score',
                          text: `${score.playerName} scored ${score.score} points in Baghchal!`
                        });
                      }}
                    >
                      <Share2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-amber-100 hover:bg-amber-200 text-amber-800 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;