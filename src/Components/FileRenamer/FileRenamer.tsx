import React, { useState } from 'react';
import axios from 'axios';
import FileInput from './FileInput';
import FileList from './FileList';
import RenameFileHandler from './RenameFileHandler';

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

  const cleanUpFileName = (fileName: string): string => {
    const strippedName = fileName.replace(/\.[^/.]+$/, "");
    const regex = /^(.*?)(?:\.(\d{4})).*$/i;
    const match = strippedName.match(regex);

    if (match) {
      const title = match[1].replace(/\./g, ' ');
      const year = match[2];
      return `${title} ${year}`.trim();
    }

    return strippedName.replace(/\./g, ' ');
  };

  const handleAddFile = (file: CustomFile) => {
    const cleanedFileName = cleanUpFileName(file.name);
    setFiles([...files, { ...file, name: cleanedFileName }]);
    setSearchResults({});
  };

  const handleUpdateFileName = (index: number, newName: string) => {
    setFiles(files.map((file, i) => (i === index ? { ...file, name: newName } : file)));
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    setSearchResults(prevResults => {
      const updatedResults = { ...prevResults };
      delete updatedResults[index];
      return updatedResults;
    });
  };

  const stripFileExtension = (fileName: string): string => {
    return fileName.replace(/\.[^/.]+$/, "");
  };

  const handleSearchFile = async (index: number) => {
    const file = files[index];
    if (!file.name) return;

    const strippedFileName = stripFileExtension(file.name);
    const regex = /^(.*?)(\d{4})$/i;
    const match = strippedFileName.match(regex);

    let title = strippedFileName;
    let year = "";

    if (match) {
        title = match[1].trim();
        year = match[2];
    }

    setLoadingIndex(index);

    try {
        let results: any[] = [];

        const [movieResponse, tvResponse] = await Promise.all([
            axios.get(`https://api.themoviedb.org/3/search/movie`, {
                params: {
                    api_key: process.env.REACT_APP_TMDB_API_KEY,
                    query: title,
                    year: year || undefined,
                },
            }),
            axios.get(`https://api.themoviedb.org/3/search/tv`, {
                params: {
                    api_key: process.env.REACT_APP_TMDB_API_KEY,
                    query: title,
                    first_air_date_year: year || undefined,
                },
            }),
        ]);

        results = [...movieResponse.data.results, ...tvResponse.data.results];

        if (results.length > 0) {
            const filteredResults = results
                .map((result: any) => ({
                    title: result.title || result.name,
                    release_date: result.release_date || result.first_air_date,
                    media_type: result.media_type || (result.first_air_date ? 'tv' : 'movie'),
                }))
                .sort((a: SearchResult, b: SearchResult) => (b.release_date > a.release_date ? 1 : -1));

            if (filteredResults.length > 0) {
                setSearchResults(prevResults => ({ ...prevResults, [index]: filteredResults }));
            } else {
                window.alert(`No relevant match found for ${file.name}`);
            }
        } else {
            window.alert(`No match found for ${file.name}`);
        }
    } catch (err) {
        if (err instanceof Error) {
            window.alert(err.message);
        } else {
            window.alert('An unknown error occurred');
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
        setSearchResults(prevResults => {
            const updatedResults = { ...prevResults };
            delete updatedResults[index];
            return updatedResults;
        });

        window.alert(`File "${file.name}" renamed successfully to "${fullName}".`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">File Renamer</h1>
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
    </div>
  );
};

export default FileRenamer;
