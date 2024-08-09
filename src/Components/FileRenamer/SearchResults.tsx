import React from 'react';
import Select from '../Common/Select';

interface SearchResultsProps {
  results: any[];
  onSelectResult: (newName: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelectResult }) => {
  const options = results.map((result, index) => ({
    value: `${result.title} (${new Date(result.release_date).getFullYear()})`,
    label: `${result.title} (${new Date(result.release_date).getFullYear()})`,
  }));

  return (
    <div className="mb-2">
      <p className="text-gray-500 mb-2">Select a new name:</p>
      <Select
        options={options}
        onChange={e => onSelectResult(e.target.value)}
        placeholder="Select a name"
        value=""
      />
    </div>
  );
};

export default SearchResults;
