import { motion } from 'framer-motion';

interface StreakCounterProps {
  streakDays: number;
}

export default function StreakCounter({ streakDays }: StreakCounterProps) {
  // Generate array of 7 days for the week visualization
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center mb-3">
        <motion.div 
          className="mr-2 text-red-500"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, 0, -5, 0] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
          </svg>
        </motion.div>
        <h3 className="font-bold text-gray-800 text-lg">Daily Streak</h3>
      </div>

      <div className="flex justify-between mb-3">
        {weekDays.map((day, index) => {
          const isActive = index < streakDays % 7;
          return (
            <div key={index} className="flex flex-col items-center">
              <motion.div 
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  isActive ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}
                initial={false}
                animate={isActive ? {
                  scale: [0.8, 1],
                  backgroundColor: ["#f87171", "#ef4444"],
                } : {}}
                transition={{ duration: 0.3 }}
              >
                {day}
              </motion.div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center">
        <motion.div 
          className="text-2xl font-bold text-gray-800"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {streakDays} {streakDays === 1 ? 'day' : 'days'}
        </motion.div>
        <p className="text-gray-500 text-sm mt-1">Keep it going!</p>
      </div>
    </div>
  );
} 