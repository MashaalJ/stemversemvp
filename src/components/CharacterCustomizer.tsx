import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Character } from '../types';

interface CharacterCustomizerProps {
  character: Character;
  level: number;
  unlockedItems: string[];
  onUpdateCharacter: (updates: Partial<Character>) => void;
}

export default function CharacterCustomizer({ 
  character, 
  level, 
  unlockedItems,
  onUpdateCharacter 
}: CharacterCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Available colors based on level
  const availableColors = [
    { id: 'blue', color: '#3B82F6', requiredLevel: 1 },
    { id: 'green', color: '#10B981', requiredLevel: 2 },
    { id: 'purple', color: '#8B5CF6', requiredLevel: 3 },
    { id: 'red', color: '#EF4444', requiredLevel: 4 },
    { id: 'yellow', color: '#F59E0B', requiredLevel: 5 },
  ];
  
  // Available accessories based on unlocked items
  const availableAccessories = [
    { id: 'glasses', name: 'Glasses', requiredLevel: 2 },
    { id: 'hat', name: 'Hat', requiredLevel: 3 },
    { id: 'bowtie', name: 'Bow Tie', requiredLevel: 4 },
    { id: 'lab-coat', name: 'Lab Coat', requiredLevel: 5 },
  ];
  
  // Change character color
  const handleColorChange = (colorId: string) => {
    onUpdateCharacter({ color: colorId });
  };
  
  // Toggle accessory
  const handleAccessoryToggle = (accessoryId: string) => {
    const newAccessories = character.accessories.includes(accessoryId)
      ? character.accessories.filter(id => id !== accessoryId)
      : [...character.accessories, accessoryId];
    
    onUpdateCharacter({ accessories: newAccessories });
  };
  
  // Change character name
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onUpdateCharacter({ name: e.target.value });
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-800 text-lg">Your Character</h3>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full hover:bg-indigo-200 transition-colors"
          >
            {isOpen ? 'Close' : 'Customize'}
          </button>
        </div>
        
        <div className="mt-4 flex flex-col items-center">
          <motion.div 
            className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl mb-3"
            style={{ backgroundColor: character.color === 'blue' ? '#3B82F6' : character.color }}
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              rotate: character.accessories.includes('hat') ? [-2, 2, -2] : 0
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {character.name.charAt(0)}
            
            {/* Accessories would normally be proper images */}
            {character.accessories.includes('glasses') && (
              <div className="absolute text-sm">👓</div>
            )}
            {character.accessories.includes('hat') && (
              <div className="absolute -top-3 text-sm">🎩</div>
            )}
            {character.accessories.includes('bowtie') && (
              <div className="absolute -bottom-1 text-sm">🎀</div>
            )}
          </motion.div>
          
          <h4 className="text-lg font-medium text-gray-800">{character.name}</h4>
          <div className="text-sm text-gray-500">Level {level}</div>
        </div>
      </div>
      
      {isOpen && (
        <motion.div 
          className="border-t border-gray-200 p-4"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Character Name</label>
            <input
              type="text"
              value={character.name}
              onChange={handleNameChange}
              maxLength={12}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          {/* Color Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Character Color</label>
            <div className="flex space-x-2">
              {availableColors.map(({ id, color, requiredLevel: reqLevel }) => {
                const isAvailable = level >= reqLevel;
                
                return (
                  <button
                    key={id}
                    onClick={() => isAvailable && handleColorChange(id)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform ${
                      character.color === id ? 'ring-2 ring-gray-400 scale-110' : ''
                    } ${!isAvailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
                    style={{ backgroundColor: color }}
                    disabled={!isAvailable}
                  >
                    {!isAvailable && (
                      <span className="text-xs text-white">
                        {reqLevel}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Accessories Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Accessories</label>
            <div className="grid grid-cols-2 gap-2">
              {availableAccessories.map(({ id, name, requiredLevel: reqLevel }) => {
                const isAvailable = level >= reqLevel || unlockedItems.includes(id);
                const isActive = character.accessories.includes(id);
                
                return (
                  <button
                    key={id}
                    onClick={() => isAvailable && handleAccessoryToggle(id)}
                    className={`p-2 text-sm rounded-md border ${
                      isActive 
                        ? 'bg-indigo-100 border-indigo-300 text-indigo-700' 
                        : 'bg-gray-50 border-gray-200 text-gray-700'
                    } ${!isAvailable ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={!isAvailable}
                  >
                    <div className="flex items-center justify-between">
                      <span>{name}</span>
                      {!isAvailable && (
                        <span className="text-xs bg-gray-200 px-1 rounded">
                          Lvl {reqLevel}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
} 