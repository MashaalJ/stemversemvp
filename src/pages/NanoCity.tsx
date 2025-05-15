import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import BadgeToast from '../components/BadgeToast';

const NanoCity: React.FC = () => {
  const { setUserState } = useUser();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleSuccess = () => {
    setUserState(prev => ({
      ...prev,
      xp: prev.xp + 10,
      level: Math.floor((prev.xp + 10) / 100) + 1
    }));
    setToastMessage('You earned 10 XP!');
    setShowToast(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 text-white">
      <div className="max-w-4xl mx-auto pt-8 px-4">
        <header className="bg-blue-800 bg-opacity-50 backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold">Nano City</h1>
          <p className="mt-1 text-blue-200">Explore the microscopic world of nanotechnology</p>
        </header>
        
        <section className="bg-blue-800 bg-opacity-50 backdrop-blur-sm rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Welcome to Nano City!</h2>
          <p className="mb-4">
            This future interactive experience will teach you about the fascinating world of nanotechnology.
          </p>
          <p className="mb-6">
            Learn about atoms, molecules, and how scientists manipulate matter at the nanoscale to create new materials and technologies.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-700 rounded-lg p-4">
              <h3 className="font-medium text-xl mb-2">Coming Soon:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Interactive 3D models of nanostructures</li>
                <li>Nano-building challenges</li>
                <li>Quizzes to test your knowledge</li>
                <li>Virtual lab experiments</li>
              </ul>
            </div>
            <div className="bg-blue-700 rounded-lg p-4 flex flex-col justify-between">
              <p className="mb-4">
                Nanotechnology is revolutionizing medicine, electronics, energy, and more!
              </p>
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={handleSuccess}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors self-start"
                >
                  Explore & Earn XP
                </button>
                <Link
                  to="/nano-city/challenge"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors self-start"
                >
                  Take the Nano Challenge
                </Link>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between">
            <Link 
              to="/" 
              className="bg-white text-blue-800 hover:bg-blue-100 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
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

export default NanoCity; 