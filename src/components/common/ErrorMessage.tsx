import React from 'react';
import { X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => (
  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex justify-between items-center">
    <span>{message}</span>
    <button onClick={onClose} className="text-red-500 hover:text-red-700">
      <X size={16} />
    </button>
  </div>
);