import React from 'react';
import theme from '../../theme';

interface FileDetailsProps {
  file: {
    name: string;
    path: string;
    extension: string;
  };
}

const FileDetails: React.FC<FileDetailsProps> = ({ file }) => (
  <div className={`${theme.padding.md} ${theme.colors.border} ${theme.borderRadius} mb-4`}>
    <p className="break-words"><strong>Name:</strong> {file.name}</p>
    <p className="break-words"><strong>Path:</strong> {file.path}</p>
    <p><strong>Extension:</strong> {file.extension}</p>
  </div>
);

export default FileDetails;
