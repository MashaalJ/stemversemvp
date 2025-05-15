import React, { useEffect } from 'react';

interface BadgeToastProps {
  message: string;
  onClose: () => void;
}

const BadgeToast: React.FC<BadgeToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3">
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-green-200"
      >
        ✕
      </button>
    </div>
  );
};

export default BadgeToast; 