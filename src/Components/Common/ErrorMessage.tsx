import React from 'react';
import theme from '../../theme';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <p className={theme.colors.error}>
    {message}
  </p>
);

export default ErrorMessage;
