import React from 'react';
import theme from '../../theme';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className={`bg-white p-6 rounded-lg shadow-lg z-10 ${theme.colors.bgLight}`}>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="mb-4">
          {children}
        </div>
        <button
          onClick={onClose}
          className={`${theme.colors.primary} ${theme.colors.buttonText} ${theme.padding.sm} ${theme.borderRadius} ${theme.colors.primaryHover}`}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
