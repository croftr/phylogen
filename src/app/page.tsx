'use client';

import { useState } from 'react';
import Image from 'next/image';

const continentImages: { [key: string]: string } = {
  Africa: '/images/africa.png',
  Antarctica: '/images/antarctica.png',
  Asia: '/images/asia.png',
  Australia: '/images/australia.png',
  Europe: '/images/europe.png',
  Eurasia: '/images/europe.png',
  'North-America': '/images/north-america.png',
  'South-America': '/images/south-america.png',
  Ocean: '/images/ocean.png',
  Oceania: '/images/oceania.png',
  'Central-America': '/images/central-america.png',
};

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
  locations: string[];
  characteristics: Record<string, string>;
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
      setError(null); // Reset error state
      const response = await fetch(
        `/api/animal?animalName=${encodeURIComponent(animalName)}`
      );
      if (!response.ok) {
        if (response.status === 404) {
          setError(`The animal "${animalName}" does not exist.  This app is only intended to be used by professional biologists or those informed on animal matters.`); // Specific 404 message
          setAnimalData(null);
          return; // Exit early after setting the 404 error
        } else {
          throw new Error('Failed to fetch animal data'); // Generic error for other issues
        }
      }
      const data: AnimalData = await response.json();
      setAnimalData(data);
    } catch (err) {
      console.error(err);
      setError('API error'); // Generic error message
      setAnimalData(null);
    } finally {
      setIsLoading(false);
    }
  };

  function capitalize(str: string): string {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function capitalizeWords(str: string): string {
    return str
      .split(' ')
      .map(word => capitalize(word))
      .join(' ');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full flex flex-col">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Animal Taxonomy
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
          <div>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                {animalData.name}
              </h2>
              <div className="grid grid-cols-2 gap-y-2">
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

            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Found in:
              </h3>
              <div className="flex flex-wrap gap-2">
                {animalData.locations.map((location) => (
                  <span
                    key={location}
                    className={`bg-gradient-to-tl from-blue-400 to-blue-800 text-white px-3 py-1 rounded-full text-sm flex gap-2 items-center`}
                  >
                    <div className="relative w-6 h-6">
                      <Image
                        src={
                          continentImages[location] || '/images/default.png'
                        }
                        alt={location}
                        fill
                        className="rounded-full"
                      />
                    </div>
                    {location}
                  </span>
                ))}
              </div>
            </div>
            {animalData.characteristics && (
              <div className="rounded-md overflow-hidden">
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Characteristics:
                </h3>
                <table className="w-full table-auto border-collapse border border-gray-400 text-gray-700">
                  <tbody>
                    {Object.entries(animalData.characteristics).map(
                      ([key, value]) => (
                        <tr key={key} className="border border-gray-400">
                          <td className="border border-gray-400 px-2 py-1 font-medium">
                            {capitalizeWords(key.split('_').join(' '))}
                          </td>
                          <td className="border border-gray-400 px-2 py-1">
                            {value}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
