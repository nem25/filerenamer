import React from 'react';
import theme from '../../theme';

interface SelectProps {
  options: { value: string; label: string }[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  value: string;
}

const Select: React.FC<SelectProps> = ({ options, onChange, placeholder, value }) => (
  <select
    value={value}
    onChange={onChange}
    className={`${theme.colors.border} ${theme.colors.bgLight} ${theme.padding.md} ${theme.borderRadius} ${theme.colors.inputText} border p-2 rounded max-w-full truncate`}
  >
    <option value="">{placeholder || 'Select an option'}</option>
    {options.map((option, index) => (
      <option key={index} value={option.value} className="truncate">
        {option.label}
      </option>
    ))}
  </select>
);

export default Select;
