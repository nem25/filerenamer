import React from 'react';
import { CustomFile } from './FileRenamer';
import SearchResults from './SearchResults';
import InputField from '../Common/InputField';
import Button from '../Common/Button';
import FileDetails from '../Common/FileDetails';
import LoadingSpinner from '../Common/LoadingSpinner';
import theme from '../../theme';

interface FileItemProps {
  file: CustomFile;
  index: number;
  onSearchFile: (index: number) => void;
  onRenameFile: (index: number, newName: string) => void;
  loadingIndex: number | null;
  searchResults: { [key: number]: any[] };
  onUpdateFileName: (index: number, newName: string) => void;
  onRemoveFile: (index: number) => void;
}

const FileItem: React.FC<FileItemProps> = ({
  file,
  index,
  onSearchFile,
  onRenameFile,
  loadingIndex,
  searchResults,
  onUpdateFileName,
  onRemoveFile,
}) => (
  <div className={`relative flex flex-col mb-4 p-4 ${theme.colors.border} ${theme.borderRadius} border overflow-hidden`}>
    <button
      className="absolute top-0 right-0 m-2 text-gray-500 hover:text-gray-700"
      onClick={() => onRemoveFile(index)}
    >
      &times;
    </button>
    <FileDetails file={file} />
    <div className="flex items-center mt-2">
      <InputField
        value={file.name}
        onChange={e => onUpdateFileName(index, e.target.value)}
        placeholder="File name"
        className="flex-grow"
      />
      <Button
        onClick={() => onSearchFile(index)}
        label="Search"
        disabled={loadingIndex === index}
        className="ml-2"
      />
    </div>
    {searchResults[index] && (
      <SearchResults
        results={searchResults[index]}
        onSelectResult={newName => onRenameFile(index, newName)}
      />
    )}
    <LoadingSpinner visible={loadingIndex === index} />
  </div>
);

export default FileItem;
