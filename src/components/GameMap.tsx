import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useUserState } from '../hooks/useUserState';
import { ZONES } from '../types';
import type { Position } from '../types';

export default function GameMap() {
  const { 
    position, 
    updatePosition, 
    currentZone, 
    changeZone, 
    level, 
    character,
    unlockedItems 
  } = useUserState();
  const navigate = useNavigate();
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapBounds, setMapBounds] = useState({ width: 0, height: 0 });
  const charSize = 40; // character size in pixels
  
  // Update map bounds on mount and resize
  useEffect(() => {
    const updateBounds = () => {
      if (mapRef.current) {
        setMapBounds({
          width: mapRef.current.clientWidth,
          height: mapRef.current.clientHeight
        });
      }
    };
    
    updateBounds();
    window.addEventListener('resize', updateBounds);
    return () => window.removeEventListener('resize', updateBounds);
  }, []);
  
  // Handle keyboard movement
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = 10; // pixels to move per key press
      let newPosition: Position = { ...position };
      
      switch (e.key) {
        case 'ArrowUp':
          newPosition.y = Math.max(0, position.y - step);
          break;
        case 'ArrowDown':
          newPosition.y = Math.min(100, position.y + step);
          break;
        case 'ArrowLeft':
          newPosition.x = Math.max(0, position.x - step);
          break;
        case 'ArrowRight':
          newPosition.x = Math.min(100, position.x + step);
          break;
      }
      
      if (newPosition.x !== position.x || newPosition.y !== position.y) {
        updatePosition(newPosition);
        
        // Check if player is near a zone
        checkZoneProximity(newPosition);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [position, updatePosition]);
  
  // Check if player is near a zone to trigger zone change
  const checkZoneProximity = (pos: Position) => {
    const proximityThreshold = 15; // distance threshold to activate a zone
    
    ZONES.forEach(zone => {
      if (!zone.unlocked && !unlockedItems.includes(zone.id)) {
        // Skip locked zones that haven't been unlocked
        if (zone.id !== 'nano-city' && level < 2) return;
      }
      
      const distance = Math.sqrt(
        Math.pow(pos.x - zone.position.x, 2) + 
        Math.pow(pos.y - zone.position.y, 2)
      );
      
      if (distance < proximityThreshold) {
        // Change current zone when player gets close enough
        changeZone(zone.id);
      }
    });
  };
  
  // Handle clicking on a zone bubble
  const handleZoneClick = (zoneId: string) => {
    const zone = ZONES.find(z => z.id === zoneId);
    if (!zone) return;
    
    // If zone is locked and not unlocked, don't navigate
    if (!zone.unlocked && !unlockedItems.includes(zone.id)) {
      if (zone.id !== 'nano-city' && level < 2) return;
    }
    
    // Otherwise navigate to zone page
    navigate(`/${zoneId}`);
  };
  
  return (
    <div 
      ref={mapRef}
      className="relative w-full h-64 md:h-96 bg-gradient-to-br from-indigo-900 to-purple-900 rounded-xl overflow-hidden border-2 border-indigo-600"
    >
      {/* Map dots grid for visualization */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex justify-between h-[10%]">
            {Array.from({ length: 10 }).map((_, j) => (
              <div key={j} className="w-[10%] flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full"></div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Character */}
      <motion.div
        className="absolute z-10 flex items-center justify-center"
        style={{
          left: `calc(${position.x}% - ${charSize / 2}px)`,
          top: `calc(${position.y}% - ${charSize / 2}px)`,
          width: `${charSize}px`,
          height: `${charSize}px`,
        }}
        animate={{
          x: 0,
          y: 0,
          scale: [0.9, 1, 0.9],
          transition: { duration: 1, repeat: Infinity }
        }}
      >
        <div 
          className={`w-full h-full rounded-full flex items-center justify-center text-white font-bold shadow-lg`}
          style={{ backgroundColor: character.color === 'blue' ? '#3B82F6' : character.color }}
        >
          {character.name.charAt(0)}
        </div>
      </motion.div>
      
      {/* Zone indicators */}
      {ZONES.map((zone) => {
        const isUnlocked = zone.unlocked || unlockedItems.includes(zone.id) || zone.id === 'nano-city';
        const canAccess = isUnlocked || (zone.id !== 'nano-city' && level >= 2);
        
        return (
          <motion.div
            key={zone.id}
            className={`absolute cursor-pointer transition-all duration-300 flex flex-col items-center`}
            style={{
              left: `calc(${zone.position.x}% - 20px)`,
              top: `calc(${zone.position.y}% - 20px)`,
              opacity: canAccess ? 1 : 0.5,
            }}
            onClick={() => handleZoneClick(zone.id)}
            whileHover={{ scale: 1.1 }}
            initial={{ scale: 0.8 }}
            animate={{ 
              scale: [0.95, 1.05, 0.95],
              transition: { duration: 2, repeat: Infinity }
            }}
          >
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg ${
                currentZone === zone.id ? 'ring-2 ring-white ring-offset-2 ring-offset-indigo-900' : ''
              }`}
              style={{ backgroundColor: zone.color }}
            >
              {/* Zone icon would go here - using first letter for now */}
              {zone.name.charAt(0)}
            </div>
            <div className="mt-1 px-2 py-1 bg-black bg-opacity-60 rounded text-xs text-white whitespace-nowrap">
              {zone.name}
              {!canAccess && <span> 🔒</span>}
            </div>
          </motion.div>
        );
      })}
      
      {/* Instructions */}
      <div className="absolute bottom-2 left-2 text-xs text-white bg-black bg-opacity-50 p-1 rounded">
        Use arrow keys to move your character
      </div>
    </div>
  );
} 