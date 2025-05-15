import React from 'react';
import { useUser } from '../contexts/UserContext';
import GameMap from '../components/GameMap';
import SkillChart from '../components/SkillChart';
import BadgesGrid from '../components/BadgesGrid';
import StreakCounter from '../components/StreakCounter';
import QuestList from '../components/QuestList';

const Dashboard: React.FC = () => {
  const { userState } = useUser();
  const { xp, level, badges, skills, streakDays, quests } = userState;
  
  const xpPercentage = xp % 100;

  const handleQuestComplete = (questId: string) => {
    // TODO: Implement quest completion
    console.log('Quest completed:', questId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-8">
          {/* Profile Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Your Progress</h2>
            <div className="flex items-center mb-4">
              <div className="flex-1">
                <p className="text-gray-600">Level {level}</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 rounded-full h-2"
                    style={{ width: `${xpPercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {xpPercentage} / 100 XP
                </p>
              </div>
            </div>
            <StreakCounter streakDays={streakDays} />
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Skills</h2>
            <SkillChart skills={skills} />
          </div>

          {/* Badges Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Badges ({badges.length})</h2>
            <BadgesGrid badges={badges} />
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Game Map */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">STEMverse Map</h2>
            <GameMap />
          </div>

          {/* Quests Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Active Quests</h2>
            <QuestList quests={quests} onCompleteQuest={handleQuestComplete} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 