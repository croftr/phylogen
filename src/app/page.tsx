'use client';

import { useState } from 'react';

interface AnimalData {
  name: string;
  taxonomy: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
  };
}

export default function Home() {
  const [animalName, setAnimalName] = useState<string>('');
  const [submittedName, setSubmittedName] = useState<string>('');
  const [animalData, setAnimalData] = useState<AnimalData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setIsLoading(true);
    setSubmittedName(animalName);
    try {
      setError(null);
      const response = await fetch(
        `/api/animal?animalName=${encodeURIComponent(animalName)}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch animal data');
      }
      const data: AnimalData = await response.json();
      setAnimalData(data);
    } catch (err) {
      console.error(err);
      setError('API error');
      setAnimalData(null);
    } finally {
      setIsLoading(false);
    }
  };

  function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {`${capitalize(submittedName) || 'Animal'} Taxonomy`}
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            placeholder="Enter animal name (e.g., lion)"
            className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-auto text-black"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md w-full sm:w-auto transition-colors duration-200 ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {animalData && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              {animalData.name}
            </h2>
            <div className="grid grid-cols-2 gap-y-2"> {/* CSS Grid container */}
              <p className="text-gray-600 font-medium">Kingdom:</p>
              <p className="text-gray-600">{animalData.taxonomy.kingdom}</p>

              <p className="text-gray-600 font-medium">Phylum:</p>
              <p className="text-gray-600">{animalData.taxonomy.phylum}</p>

              <p className="text-gray-600 font-medium">Class:</p>
              <p className="text-gray-600">{animalData.taxonomy.class}</p>

              <p className="text-gray-600 font-medium">Order:</p>
              <p className="text-gray-600">{animalData.taxonomy.order}</p>

              <p className="text-gray-600 font-medium">Family:</p>
              <p className="text-gray-600">{animalData.taxonomy.family}</p>

              <p className="text-gray-600 font-medium">Genus:</p>
              <p className="text-gray-600">{animalData.taxonomy.genus}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
