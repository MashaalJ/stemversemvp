import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUserState } from '../hooks/useUserState';

export default function NanoCityPage() {
  const { addXp, awardBadge } = useUserState();
  const [grid, setGrid] = useState<boolean[]>(Array(9).fill(false));
  const [allCompleted, setAllCompleted] = useState(false);
  
  // Check if all tiles are completed
  useEffect(() => {
    if (grid.every(tile => tile) && !allCompleted) {
      setAllCompleted(true);
      addXp(50);
      
      // Award badge - the toast notification is now handled in the useUserState hook
      awardBadge("nano-master");
    }
  }, [grid, allCompleted, addXp, awardBadge]);
  
  // Mark a tile as completed
  const completeTile = (index: number) => {
    if (allCompleted) return;
    
    const newGrid = [...grid];
    newGrid[index] = true;
    setGrid(newGrid);
  };
  
  // Reset the grid
  const resetGrid = () => {
    setGrid(Array(9).fill(false));
    setAllCompleted(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-800 text-white">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <header className="bg-indigo-800 bg-opacity-50 backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold">Nano City Challenge</h1>
          <p className="mt-1 text-indigo-200">Complete all tiles to earn XP and a badge!</p>
        </header>
        
        <section className="bg-indigo-800 bg-opacity-50 backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
          {allCompleted ? (
            <div className="text-center py-6">
              <h2 className="text-3xl font-bold mb-4 text-yellow-300">You did it!</h2>
              <p className="text-xl mb-6">You've earned 50 XP and the Nano Master badge!</p>
              <div className="inline-block bg-yellow-500 text-yellow-900 font-bold px-4 py-2 rounded-full mb-8">
                🏆 Nano Master Badge
              </div>
              <div>
                <button 
                  onClick={resetGrid}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-lg transition-colors mx-2"
                >
                  Try Again
                </button>
                <Link 
                  to="/" 
                  className="bg-white text-purple-800 hover:bg-purple-100 font-medium py-2 px-6 rounded-lg transition-colors mx-2 inline-block"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-semibold mb-4">Click all tiles to complete the challenge:</h2>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {grid.map((completed, index) => (
                  <button
                    key={index}
                    onClick={() => completeTile(index)}
                    disabled={completed}
                    className={`
                      aspect-square p-4 rounded-lg transition-all duration-300 transform
                      ${completed ? 
                        'bg-green-500 text-white shadow-lg scale-95' : 
                        'bg-indigo-600 hover:bg-indigo-500 hover:scale-105 shadow-md'
                      }
                      flex items-center justify-center text-lg font-medium
                    `}
                  >
                    {completed ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-5xl opacity-70">{index + 1}</span>
                    )}
                  </button>
                ))}
              </div>
              <div className="flex justify-between">
                <div className="text-sm">
                  {grid.filter(tile => tile).length} of 9 completed
                </div>
                <Link 
                  to="/nano-city" 
                  className="bg-white text-indigo-800 hover:bg-indigo-100 font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Back to Nano City
                </Link>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
} 