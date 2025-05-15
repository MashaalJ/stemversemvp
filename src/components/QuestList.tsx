import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Quest } from '../types';

interface QuestListProps {
  quests: Quest[];
  onCompleteQuest: (questId: string) => void;
}

export default function QuestList({ quests, onCompleteQuest }: QuestListProps) {
  const [expandedQuest, setExpandedQuest] = useState<string | null>(null);
  
  // Sort quests - incomplete first, then by XP reward
  const sortedQuests = [...quests].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    return b.xpReward - a.xpReward;
  });
  
  // Toggle expanded quest details
  const toggleExpand = (questId: string) => {
    setExpandedQuest(expandedQuest === questId ? null : questId);
  };
  
  // Mark quest as complete
  const handleCompleteQuest = (questId: string) => {
    onCompleteQuest(questId);
  };
  
  // If no quests, show empty state
  if (quests.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-gray-400 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-700 mb-1">No Active Quests</h3>
        <p className="text-gray-500 text-sm">Explore different zones to discover quests!</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-gray-800 text-lg mb-4">Your Quests</h3>
      <div className="space-y-3">
        {sortedQuests.map((quest) => (
          <motion.div
            key={quest.id}
            className={`border rounded-lg overflow-hidden ${
              quest.completed 
                ? 'border-gray-200 bg-gray-50 opacity-70' 
                : 'border-indigo-200 bg-indigo-50'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="p-3 cursor-pointer flex items-center justify-between"
              onClick={() => toggleExpand(quest.id)}
            >
              <div className="flex items-center">
                {quest.completed ? (
                  <div className="mr-3 text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                ) : (
                  <div className="mr-3 text-indigo-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div>
                  <h4 className={`font-medium ${quest.completed ? 'text-gray-500' : 'text-gray-800'}`}>
                    {quest.title}
                  </h4>
                  <div className="text-xs text-gray-500">
                    {quest.xpReward} XP reward
                  </div>
                </div>
              </div>
              <div className="text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transform transition-transform ${expandedQuest === quest.id ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            {expandedQuest === quest.id && (
              <motion.div 
                className="px-3 pb-3 pt-0"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">{quest.description}</p>
                  {!quest.completed && (
                    <button
                      onClick={() => handleCompleteQuest(quest.id)}
                      className="text-sm bg-indigo-600 hover:bg-indigo-700 text-white py-1 px-3 rounded transition-colors"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 