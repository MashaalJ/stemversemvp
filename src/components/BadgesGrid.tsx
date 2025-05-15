import { motion } from 'framer-motion';
import type { Badge } from '../types';

interface BadgesGridProps {
  badges: Badge[];
}

export default function BadgesGrid({ badges }: BadgesGridProps) {
  // If no badges, show empty state
  if (badges.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <div className="text-gray-400 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-700 mb-1">No Badges Yet</h3>
        <p className="text-gray-500 text-sm">Complete activities to earn badges!</p>
      </div>
    );
  }
  
  // Badge icons mapping - would normally use actual icon assets
  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'star':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
        );
      case 'fire':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        );
    }
  };
  
  // Colors for badges
  const badgeColors: Record<string, string> = {
    'level': 'bg-yellow-100 text-yellow-700 border-yellow-300',
    'streak': 'bg-red-100 text-red-700 border-red-300',
    'stem': 'bg-purple-100 text-purple-700 border-purple-300',
    'default': 'bg-blue-100 text-blue-700 border-blue-300'
  };
  
  const getBadgeColor = (badgeId: string) => {
    for (const [key, value] of Object.entries(badgeColors)) {
      if (badgeId.startsWith(key)) {
        return value;
      }
    }
    return badgeColors.default;
  };
  
  // Badge grid with animation
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="font-bold text-gray-800 text-lg mb-4">Your Badges</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.id}
            className={`flex flex-col items-center p-3 rounded-lg border ${getBadgeColor(badge.id)}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="mb-2">
              {getIconComponent(badge.icon)}
            </div>
            <div className="text-center">
              <h4 className="font-semibold text-sm">{badge.name}</h4>
              <p className="text-xs mt-1 opacity-80">{badge.description}</p>
              <div className="text-xs mt-2 opacity-70">
                {new Date(badge.dateEarned).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 