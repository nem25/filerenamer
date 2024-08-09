import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import theme from '../../theme';

interface LoadingSpinnerProps {
  visible: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ visible }) => (
  <div className={visible ? 'block' : 'hidden'}>
    <ThreeDots
      height="20"
      width="20"
      radius="9"
      color={theme.colors.buttonText}
      ariaLabel="three-dots-loading"
      wrapperStyle={{ display: 'inline-block' }}
      visible={visible}
    />
  </div>
);

export default LoadingSpinner;
