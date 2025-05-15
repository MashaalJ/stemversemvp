/**
 * Types for the STEMverse MVP application
 */

/**
 * User state interface for managing user data in localStorage
 */
export interface UserState {
  xp: number;
  level: number;
  badges: Badge[];
  skills: Skill[];
  streakDays: number;
  character: Character;
  quests: Quest[];
  currentZone: string;
  position: Position;
  unlockedItems: string[];
  lastLogin: string;
}

export interface Position {
  x: number;
  y: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
}

export interface Skill {
  id: string;
  name: string;
  progress: number; // 0-100
  color: string;
}

export interface Character {
  avatar: string;
  color: string;
  accessories: string[];
  name: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
  deadline?: string;
  zoneId: string;
}

export interface Zone {
  id: string;
  name: string;
  description: string;
  background: string;
  position: Position;
  unlocked: boolean;
  activities: Activity[];
  color: string;
  icon: string;
}

export interface Activity {
  id: string;
  name: string;
  description: string;
  xpReward: number;
  requiredLevel: number;
  completed: boolean;
  zoneId: string;
  type: "quiz" | "challenge" | "project" | "lesson";
}

// Predefined zones for the map
export const ZONES: Zone[] = [
  {
    id: 'nano-city',
    name: 'Nano City',
    description: 'Explore the world of nanotechnology and quantum physics',
    background: '/backgrounds/nano-city.jpg',
    position: { x: 20, y: 30 },
    unlocked: true,
    color: '#3B82F6', // blue
    icon: 'microscope',
    activities: []
  },
  {
    id: 'code-jungle',
    name: 'Code Jungle',
    description: 'Navigate through coding challenges and computer science concepts',
    background: '/backgrounds/code-jungle.jpg',
    position: { x: 60, y: 40 },
    unlocked: false,
    color: '#10B981', // green
    icon: 'code',
    activities: []
  },
  {
    id: 'ai-arena',
    name: 'AI Arena',
    description: 'Discover artificial intelligence and machine learning',
    background: '/backgrounds/ai-arena.jpg',
    position: { x: 70, y: 70 },
    unlocked: false,
    color: '#8B5CF6', // purple
    icon: 'cpu',
    activities: []
  }
]; 