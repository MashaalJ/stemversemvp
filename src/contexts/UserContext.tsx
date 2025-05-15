import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserState, Badge } from '../types';

// Default user state
const defaultUserState: UserState = {
  xp: 0,
  level: 1,
  badges: [],
  skills: [],
  streakDays: 0,
  character: {
    avatar: 'default',
    color: '#3B82F6',
    accessories: [],
    name: 'Player'
  },
  quests: [],
  currentZone: 'nano-city',
  position: { x: 0, y: 0 },
  unlockedItems: [],
  lastLogin: new Date().toISOString()
};

// Create context with default values
const UserContext = createContext<{
  userState: UserState;
  setUserState: React.Dispatch<React.SetStateAction<UserState>>;
} | null>(null);

// Provider component
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userState, setUserState] = useState<UserState>(() => {
    const savedState = localStorage.getItem('userState');
    return savedState ? JSON.parse(savedState) : defaultUserState;
  });

  // Load user state from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('stemverse_user');
    if (storedUser) {
      try {
        setUserState(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('stemverse_user');
      }
    }
  }, []);

  // Save to localStorage whenever user state changes
  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(userState));
  }, [userState]);

  const value = { userState, setUserState };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const addBadge = (badge: Badge, setUserState: React.Dispatch<React.SetStateAction<UserState>>) => {
  setUserState(prev => {
    const badgeExists = prev.badges.some(b => b.id === badge.id);
    if (badgeExists) return prev;
    
    return {
      ...prev,
      badges: [...prev.badges, badge],
      xp: prev.xp + 50,
      level: Math.floor((prev.xp + 50) / 100) + 1
    };
  });
}; 