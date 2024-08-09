import React from 'react';
import theme from '../../theme';

interface FileInputProps {
  onFileAdd: (file: any) => void;
}

const FileInput: React.FC<FileInputProps> = ({ onFileAdd }) => {
  const handleAddFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*,.mkv';
    input.onchange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const fullPath = (file as any).path;
        const extension = file.name.split('.').pop() || '';
        onFileAdd({ name: file.name, path: fullPath, newName: '', extension });
      }
    };
    input.click();
  };

  return (
    <button
      className={`${theme.colors.primary} ${theme.colors.buttonText} ${theme.padding.sm} ${theme.borderRadius} ${theme.colors.primaryHover}`}
      onClick={handleAddFile}
    >
      Add File
    </button>
  );
};

export default FileInput;
