import { useState, useEffect } from 'react';
import type { UserState, Badge, Position, Skill, Zone, Quest, Character } from '../types';
import { notifyBadgeEarned } from '../components/BadgeToast';
import { ZONES } from '../types';

const STORAGE_KEY = 'stemverse_user';

// Default initial state
const defaultState: UserState = {
  xp: 0,
  level: 1,
  badges: [],
  skills: [
    { id: 'coding', name: 'Coding', progress: 0, color: '#3B82F6' },
    { id: 'physics', name: 'Physics', progress: 0, color: '#10B981' },
    { id: 'ai', name: 'AI', progress: 0, color: '#8B5CF6' },
    { id: 'robotics', name: 'Robotics', progress: 0, color: '#F59E0B' },
  ],
  streakDays: 0,
  character: {
    name: 'Explorer',
    avatar: 'default',
    color: 'blue',
    accessories: []
  },
  quests: [
    {
      id: 'quest-1',
      title: 'Welcome to STEMverse',
      description: 'Visit all zones on the map',
      xpReward: 50,
      completed: false,
      zoneId: 'nano-city'
    }
  ],
  currentZone: 'nano-city',
  position: { x: 50, y: 50 },
  unlockedItems: [],
  lastLogin: new Date().toISOString()
};

/**
 * Hook for managing user state with localStorage persistence
 */
export function useUserState() {
  // Initialize state from localStorage or default
  const [state, setState] = useState<UserState>(() => {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : defaultState;
    } catch (error) {
      console.error('Failed to parse user state from localStorage:', error);
      return defaultState;
    }
  });
  
  // Update localStorage when state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);
  
  // Check and update streak on component mount
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = state.lastLogin ? new Date(state.lastLogin).toISOString().split('T')[0] : null;
    
    if (lastLogin !== today) {
      setState(prev => {
        // If last login was yesterday, increment streak
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];
        
        const newStreakDays = lastLogin === yesterdayStr 
          ? prev.streakDays + 1 
          : (lastLogin ? 1 : prev.streakDays); // Reset streak if not consecutive, keep if first login
        
        // Award badge for streak milestones
        if (newStreakDays === 7) {
          awardBadgeWithDetails({
            id: 'streak-week',
            name: 'Weekly Warrior',
            description: 'Maintained a 7-day learning streak',
            icon: 'fire',
            dateEarned: new Date().toISOString()
          });
        }
        
        return {
          ...prev,
          streakDays: newStreakDays,
          lastLogin: today
        };
      });
    }
  }, []);
  
  // Add XP and recalculate level
  const addXp = (amount: number) => {
    setState(prevState => {
      const newXp = prevState.xp + amount;
      const newLevel = Math.floor(newXp / 100) + 1;
      const prevLevel = prevState.level;
      
      // Check if leveled up
      if (newLevel > prevLevel) {
        // Award badge for level milestones
        if (newLevel === 5) {
          awardBadgeWithDetails({
            id: 'level-5',
            name: 'Budding Genius',
            description: 'Reached level 5 in your STEM journey',
            icon: 'star',
            dateEarned: new Date().toISOString()
          });
        }
      }
      
      return {
        ...prevState,
        xp: newXp,
        level: newLevel,
      };
    });
  };
  
  // Award a badge with full details
  const awardBadgeWithDetails = (badge: Badge) => {
    setState(prevState => {
      // Don't add duplicate badges
      if (prevState.badges.some(b => b.id === badge.id)) {
        return prevState;
      }
      
      // Show toast notification
      notifyBadgeEarned(badge.name);
      
      return {
        ...prevState,
        badges: [...prevState.badges, badge],
      };
    });
  };
  
  // Award a simple badge (backwards compatibility)
  const awardBadge = (id: string) => {
    const displayName = id
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    awardBadgeWithDetails({
      id,
      name: displayName,
      description: `Earned the ${displayName} badge`,
      icon: 'badge',
      dateEarned: new Date().toISOString()
    });
  };
  
  // Update character properties
  const updateCharacter = (updates: Partial<Character>) => {
    setState(prevState => ({
      ...prevState,
      character: {
        ...prevState.character,
        ...updates
      }
    }));
  };
  
  // Update skill progress
  const updateSkill = (skillId: string, progressIncrease: number) => {
    setState(prevState => {
      const updatedSkills = prevState.skills.map(skill => 
        skill.id === skillId
          ? { ...skill, progress: Math.min(100, skill.progress + progressIncrease) }
          : skill
      );
      
      return {
        ...prevState,
        skills: updatedSkills
      };
    });
  };
  
  // Update player position on the map
  const updatePosition = (newPosition: Position) => {
    setState(prevState => ({
      ...prevState, 
      position: newPosition
    }));
  };
  
  // Change current zone
  const changeZone = (zoneId: string) => {
    setState(prevState => ({
      ...prevState,
      currentZone: zoneId
    }));
  };
  
  // Complete a quest
  const completeQuest = (questId: string) => {
    setState(prevState => {
      const quest = prevState.quests.find(q => q.id === questId);
      if (!quest || quest.completed) return prevState;
      
      const updatedQuests = prevState.quests.map(q => 
        q.id === questId ? { ...q, completed: true } : q
      );
      
      // Award XP for completing the quest
      const newXp = prevState.xp + (quest.xpReward || 0);
      const newLevel = Math.floor(newXp / 100) + 1;
      
      return {
        ...prevState,
        quests: updatedQuests,
        xp: newXp,
        level: newLevel
      };
    });
  };
  
  // Unlock a new item (avatar, accessory, zone, etc.)
  const unlockItem = (itemId: string) => {
    setState(prevState => {
      if (prevState.unlockedItems.includes(itemId)) return prevState;
      
      return {
        ...prevState,
        unlockedItems: [...prevState.unlockedItems, itemId]
      };
    });
  };
  
  // Reset state to default
  const resetState = () => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
  };
  
  return {
    // State properties
    ...state,
    
    // Actions
    addXp,
    awardBadge,
    awardBadgeWithDetails,
    updateCharacter,
    updateSkill,
    updatePosition,
    changeZone,
    completeQuest,
    unlockItem,
    resetState,
  };
} 