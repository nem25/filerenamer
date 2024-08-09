import React, { useState } from 'react';
import axios from 'axios';
import FileInput from './FileInput';
import FileList from './FileList';
import RenameFileHandler from './RenameFileHandler';
import ErrorMessage from '../Common/ErrorMessage';
import SuccessMessage from '../Common/SuccessMessage';

export interface CustomFile {
  name: string;
  path: string;
  newName: string;
  extension: string;
}

interface SearchResult {
  title: string;
  release_date: string;
  media_type: string;
}

const FileRenamer: React.FC = () => {
  const [files, setFiles] = useState<CustomFile[]>([]);
  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [searchResults, setSearchResults] = useState<{ [key: number]: SearchResult[] }>({});
  const [error, setError] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleAddFile = (file: CustomFile) => {
    setFiles([...files, file]);
  };

  const handleUpdateFileName = (index: number, newName: string) => {
    setFiles(files.map((file, i) => (i === index ? { ...file, name: newName } : file)));
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const stripFileExtension = (fileName: string): string => {
    return fileName.replace(/\.[^/.]+$/, "");
  };

  const handleSearchFile = async (index: number) => {
    const file = files[index];
    if (!file.name) return;

    const strippedFileName = stripFileExtension(file.name);
    setLoadingIndex(index);

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${strippedFileName}`);
      const results = response.data.results;

      if (results.length > 0) {
        const filteredResults = results
          .filter((result: any) => result.media_type === 'movie' || result.media_type === 'tv')
          .map((result: any) => ({
            title: result.title || result.name,
            release_date: result.release_date || result.first_air_date,
            media_type: result.media_type
          }))
          .sort((a: SearchResult, b: SearchResult) => (b.release_date > a.release_date ? 1 : -1));

        if (filteredResults.length > 0) {
          setSearchResults(prevResults => ({ ...prevResults, [index]: filteredResults }));
        } else {
          setError(`No relevant match found for ${file.name}`);
        }
      } else {
        setError(`No match found for ${file.name}`);
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleRenameFile = (index: number, newName: string) => {
    const file = files[index];
    if (!file || !newName) return;

    const fullName = `${newName}.${file.extension}`;
    const confirmRename = window.confirm(`Are you sure you want to rename "${file.name}" to "${fullName}"?`);
    if (confirmRename) {
      window.electron.renameFile(file.path, fullName);
      setFiles(files.filter((_, i) => i !== index));
    }
  };

  const handleRenameFileResponse = (response: string) => {
    setMessage(response);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">File Renamer</h1>
      {error && <ErrorMessage message={error} />}
      {message && <SuccessMessage message={message} />}
      <FileInput onFileAdd={handleAddFile} />
      <FileList
        files={files}
        onSearchFile={handleSearchFile}
        onRenameFile={handleRenameFile}
        loadingIndex={loadingIndex}
        searchResults={searchResults}
        onUpdateFileName={handleUpdateFileName}
        onRemoveFile={handleRemoveFile}
      />
      <RenameFileHandler onRenameFileResponse={handleRenameFileResponse} />
    </div>
  );
};

export default FileRenamer;
