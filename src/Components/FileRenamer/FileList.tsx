import React from 'react';
import { CustomFile } from './FileRenamer';
import FileItem from './FileItem';

interface FileListProps {
  files: CustomFile[];
  onSearchFile: (index: number) => void;
  onRenameFile: (index: number, newName: string) => void;
  loadingIndex: number | null;
  searchResults: { [key: number]: any[] };
  onUpdateFileName: (index: number, newName: string) => void;
  onRemoveFile: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({
  files,
  onSearchFile,
  onRenameFile,
  loadingIndex,
  searchResults,
  onUpdateFileName,
  onRemoveFile,
}) => (
  <div className="mt-4">
    {files.map((file, index) => (
      <FileItem
        key={index}
        file={file}
        index={index}
        onSearchFile={onSearchFile}
        onRenameFile={onRenameFile}
        loadingIndex={loadingIndex}
        searchResults={searchResults}
        onUpdateFileName={onUpdateFileName}
        onRemoveFile={onRemoveFile}
      />
    ))}
  </div>
);

export default FileList;
