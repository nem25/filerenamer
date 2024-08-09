import React from 'react';
import theme from '../../theme';

interface SuccessMessageProps {
  message: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ message }) => (
  <p className={theme.colors.success}>
    {message}
  </p>
);

export default SuccessMessage;
