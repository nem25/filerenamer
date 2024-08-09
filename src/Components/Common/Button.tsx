import React from 'react';
import theme from '../../theme';

interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, label, disabled, loading, className }) => (
  <button
    className={`${theme.colors.primary} ${theme.colors.buttonText} ${theme.padding.sm} ${theme.borderRadius} ${!disabled && theme.colors.primaryHover} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {loading ? 'Loading...' : label}
  </button>
);

export default Button;
