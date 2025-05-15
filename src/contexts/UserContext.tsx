import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { UserState } from '../types';

// Default user state
const defaultUserState: UserState = {
  xp: 0,
  level: 1,
  badges: [],
};

// Create context with default values
interface UserContextType {
  userState: UserState;
  updateXp: (xp: number) => void;
  addBadge: (badge: string) => void;
  resetUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider component
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userState, setUserState] = useState<UserState>(defaultUserState);

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
    localStorage.setItem('stemverse_user', JSON.stringify(userState));
  }, [userState]);

  // Update user XP and calculate level
  const updateXp = (xp: number) => {
    setUserState(prev => {
      const newXp = prev.xp + xp;
      // Simple level calculation (can be adjusted as needed)
      const newLevel = Math.floor(newXp / 100) + 1;
      
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
      };
    });
  };

  // Add a new badge
  const addBadge = (badge: string) => {
    setUserState(prev => {
      if (prev.badges.includes(badge)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badge],
      };
    });
  };

  // Reset user to default state
  const resetUser = () => {
    setUserState(defaultUserState);
    localStorage.removeItem('stemverse_user');
  };

  return (
    <UserContext.Provider value={{ userState, updateXp, addBadge, resetUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}; 