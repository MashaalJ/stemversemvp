import React, { useEffect, useRef, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { ZONES } from '../types';
import { motion } from 'framer-motion';

const GameMap: React.FC = () => {
  const { userState } = useUser();
  const mapRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(userState.position);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const step = 10;
      switch (e.key) {
        case 'ArrowUp':
          setPosition(prev => ({ ...prev, y: Math.max(0, prev.y - step) }));
          break;
        case 'ArrowDown':
          setPosition(prev => ({ ...prev, y: Math.min(100, prev.y + step) }));
          break;
        case 'ArrowLeft':
          setPosition(prev => ({ ...prev, x: Math.max(0, prev.x - step) }));
          break;
        case 'ArrowRight':
          setPosition(prev => ({ ...prev, x: Math.min(100, prev.x + step) }));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div ref={mapRef} className="relative w-full h-[600px] bg-gray-900 rounded-lg overflow-hidden">
      {ZONES.map(zone => (
        <motion.div
          key={zone.id}
          className={`absolute p-4 rounded-lg cursor-pointer transition-colors
            ${zone.unlocked ? 'bg-opacity-80' : 'bg-opacity-40 cursor-not-allowed'}
            hover:bg-opacity-100`}
          style={{
            backgroundColor: zone.color,
            left: `${zone.position.x}%`,
            top: `${zone.position.y}%`,
            transform: 'translate(-50%, -50%)'
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-white font-bold">{zone.name}</h3>
          <p className="text-white text-sm">{zone.description}</p>
        </motion.div>
      ))}
      <motion.div
        className="absolute w-8 h-8 bg-yellow-400 rounded-full"
        style={{
          left: `${position.x}%`,
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
        animate={{
          x: position.x,
          y: position.y
        }}
      />
    </div>
  );
};

export default GameMap; 