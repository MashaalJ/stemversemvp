import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import BadgeToast from '../components/BadgeToast';

const NanoCityPage: React.FC = () => {
  const { userState, setUserState } = useUser();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSuccess = () => {
    // Add XP
    setUserState(prev => ({
      ...prev,
      xp: prev.xp + 10,
      level: Math.floor((prev.xp + 10) / 100) + 1
    }));

    // Add badge if it's the first success
    if (!userState.badges.some(b => b.id === 'first-success')) {
      setUserState(prev => ({
        ...prev,
        badges: [...prev.badges, {
          id: 'first-success',
          name: 'First Success',
          description: 'Completed your first challenge in Nano City',
          icon: '🏆',
          dateEarned: new Date().toISOString()
        }]
      }));
      setToastMessage('You earned a new badge: First Success! 🏆');
    } else {
      setToastMessage('You earned 10 XP!');
    }
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-800 text-white">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <header className="bg-indigo-800 bg-opacity-50 backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold">Nano City Challenge</h1>
          <p className="mt-1 text-indigo-200">Complete all tiles to earn XP and a badge!</p>
        </header>
        
        <section className="bg-indigo-800 bg-opacity-50 backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
          {userState.badges.some(b => b.id === 'first-success') ? (
            <div className="text-center py-6">
              <h2 className="text-3xl font-bold mb-4 text-yellow-300">You did it!</h2>
              <p className="text-xl mb-6">You've earned 10 XP and the First Success badge!</p>
              <div className="inline-block bg-yellow-500 text-yellow-900 font-bold px-4 py-2 rounded-full mb-8">
                🏆 First Success Badge
              </div>
              <div>
                <button 
                  onClick={handleSuccess}
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
                {Array.from({ length: 9 }).map((_, index) => (
                  <div
                    key={index}
                    className="aspect-square bg-blue-100 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-200 transition-colors"
                    onClick={handleSuccess}
                  >
                    <span className="text-2xl">🔬</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <div className="text-sm">
                  {userState.badges.length} of 9 completed
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
      {showToast && (
        <BadgeToast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default NanoCityPage; 