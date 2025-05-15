import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ToastProps {
  badge: string;
  onDismiss: () => void;
}

// Individual toast component with animation
const Toast = ({ badge, onDismiss }: ToastProps) => {
  useEffect(() => {
    // Auto-dismiss after 3 seconds
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onDismiss]);
  
  return (
    <div 
      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg p-4 mb-3 flex items-center animate-slideIn"
      style={{
        animationDuration: '0.3s',
      }}
    >
      <div className="mr-3 bg-yellow-400 text-yellow-800 rounded-full p-2 flex-shrink-0">
        🏆
      </div>
      <div className="flex-grow">
        <h3 className="font-bold text-sm">New Badge Earned!</h3>
        <p className="text-sm opacity-90">{badge}</p>
      </div>
      <button 
        onClick={onDismiss} 
        className="ml-2 text-white opacity-70 hover:opacity-100"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

// Event bus for badge notifications
type BadgeListener = (badge: string) => void;
const listeners: BadgeListener[] = [];

export const notifyBadgeEarned = (badge: string) => {
  listeners.forEach(listener => listener(badge));
};

export default function BadgeToast() {
  const [toasts, setToasts] = useState<{id: number, badge: string}[]>([]);
  let nextId = 0;
  
  useEffect(() => {
    // Subscribe to badge events
    const handleBadgeEarned = (badge: string) => {
      const id = nextId++;
      setToasts(prev => [...prev, { id, badge }]);
    };
    
    listeners.push(handleBadgeEarned);
    
    return () => {
      // Unsubscribe on unmount
      const index = listeners.indexOf(handleBadgeEarned);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);
  
  // Remove a toast by id
  const dismissToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  // Create portal to render at the top level of the DOM
  return createPortal(
    <div className="fixed top-4 right-4 z-50 w-72">
      {toasts.map(toast => (
        <Toast 
          key={toast.id}
          badge={toast.badge}
          onDismiss={() => dismissToast(toast.id)}
        />
      ))}
    </div>,
    document.body
  );
} 