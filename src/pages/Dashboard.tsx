import { Link } from 'react-router-dom';
import { useUserState } from '../hooks/useUserState';
import GameMap from '../components/GameMap';
import SkillChart from '../components/SkillChart';
import StreakCounter from '../components/StreakCounter';
import BadgesGrid from '../components/BadgesGrid';
import QuestList from '../components/QuestList';
import CharacterCustomizer from '../components/CharacterCustomizer';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const {
    xp,
    level,
    badges,
    skills,
    streakDays,
    character,
    quests,
    unlockedItems,
    addXp,
    updateCharacter,
    completeQuest
  } = useUserState();
  
  // Calculate percentage for XP bar (xp % 100 shows progress within current level)
  const xpPercentage = xp % 100;
  // Calculate XP needed for next level
  const xpToNextLevel = 100 - xpPercentage;
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto pt-6 px-4 pb-12">
        <header className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-lg shadow-lg p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold">STEMverse Dashboard</h1>
              <p className="mt-1 opacity-90">Your gateway to gamified STEM learning</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <div className="bg-white bg-opacity-20 text-white rounded-full w-12 h-12 flex items-center justify-center mr-3 shadow-inner">
                <span className="text-xl font-bold">{level}</span>
              </div>
              <div>
                <p className="text-sm font-medium">Level {level}</p>
                <div className="flex items-center">
                  <div className="w-32 bg-white bg-opacity-20 rounded-full h-2 mr-2 overflow-hidden">
                    <motion.div 
                      className="bg-yellow-300 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${xpPercentage}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <span className="text-xs font-medium opacity-90">{xpPercentage}%</span>
                </div>
              </div>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Left 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Game Map */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Explore the Universe</h2>
              <GameMap />
            </section>
            
            {/* Skills and Stats */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Skill Mastery</h2>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <SkillChart skills={skills} />
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-3">Learning Streak</h2>
                <StreakCounter streakDays={streakDays} />
              </div>
            </section>
            
            {/* Badges */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Your Achievements</h2>
              <BadgesGrid badges={badges} />
            </section>
          </div>
          
          {/* Sidebar - Right 1/3 */}
          <div className="space-y-6">
            {/* Character Customizer */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Character</h2>
              <CharacterCustomizer 
                character={character} 
                level={level} 
                unlockedItems={unlockedItems}
                onUpdateCharacter={updateCharacter}
              />
            </section>
            
            {/* Quests */}
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-3">Quests</h2>
              <QuestList 
                quests={quests} 
                onCompleteQuest={completeQuest}
              />
            </section>
            
            {/* Debugging: Add XP Button */}
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="font-bold text-gray-800 mb-2">Developer Tools</h3>
              <div className="space-x-2">
                <button
                  onClick={() => addXp(10)}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200 transition-colors text-sm"
                >
                  Add 10 XP
                </button>
                <button
                  onClick={() => addXp(50)}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition-colors text-sm"
                >
                  Add 50 XP
                </button>
                <button
                  onClick={() => addXp(100)}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded hover:bg-purple-200 transition-colors text-sm"
                >
                  Add 100 XP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 