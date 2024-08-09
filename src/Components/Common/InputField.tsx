import React from 'react';
import theme from '../../theme';

interface InputFieldProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({ value, onChange, placeholder }) => (
  <input
    type="text"
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    className={`${theme.colors.border} ${theme.colors.bgLight} ${theme.padding.md} ${theme.borderRadius} ${theme.colors.inputText} border p-2 rounded`}
  />
);

export default InputField;
