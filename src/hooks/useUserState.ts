import { useState, useEffect } from 'react';
import type { UserState, Badge, Position } from '../types';

export const useUserState = () => {
  const [state, setState] = useState<UserState>(() => {
    const savedState = localStorage.getItem('userState');
    return savedState ? JSON.parse(savedState) : {
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
  });

  useEffect(() => {
    localStorage.setItem('userState', JSON.stringify(state));
  }, [state]);

  const updatePosition = (newPosition: Position) => {
    setState(prev => ({ ...prev, position: newPosition }));
  };

  const addBadge = (badge: Badge) => {
    setState(prev => {
      if (prev.badges.some(b => b.id === badge.id)) return prev;
      return {
        ...prev,
        badges: [...prev.badges, badge],
        xp: prev.xp + 50
      };
    });
  };

  return {
    ...state,
    updatePosition,
    addBadge
  };
}; 