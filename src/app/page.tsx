'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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
  summary?: string;
}

export default function Home() {
  const [animalName, setAnimalName] = useState<string>('');
  const [animalData, setAnimalData] = useState<AnimalData | null>(null);
  const [animalImage, setAnimalImage] = useState<string | null>(null); // State for the image URL
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animalSummary, setAnimalSummary] = useState('');


  const handleSearch = async () => {
    setIsLoading(true);
    setAnimalImage(null)
    setAnimalSummary('');

    try {
      setError(null); // Reset error state
      const response = await fetch(
        `/api/animal?animalName=${encodeURIComponent(animalName.trim())}`
      );
      if (!response.ok) {
        if (response.status === 404) {

          console.log('gooo');

          setError(`What the hell is a "${animalName}"?`);
          setAnimalData(null);

          const imageResponse = await fetch(
            `/api/animal/image?animalName=${encodeURIComponent(animalName.trim())}&isRealAnimal=false`
          );


          if (imageResponse.ok) {
            const imageBlob = await imageResponse.blob();
            const imageUrl = URL.createObjectURL(imageBlob); // Create a URL for the image
            setAnimalImage(imageUrl);
          } else {
            setAnimalImage(null); // Reset image if fetching fails
          }


          const madeUpAnimalResponsse = await fetch(
            `/api/animal/summary?animalName=${encodeURIComponent(animalName.trim())}`
          );

          if (madeUpAnimalResponsse.ok) {
            const summaryText = await madeUpAnimalResponsse.text();
            console.log('step 2 ', summaryText);
            setAnimalSummary(summaryText);
          }

          return;
        } else {
          throw new Error('Failed to fetch animal data');
        }
      }
      const data: AnimalData = await response.json();
      setAnimalData(data);

      // Fetch the image
      const imageResponse = await fetch(
        `/api/animal/image?animalName=${encodeURIComponent(data?.name.trim())}&isRealAnimal=true`
      );
      if (imageResponse.ok) {
        const imageBlob = await imageResponse.blob();
        const imageUrl = URL.createObjectURL(imageBlob); // Create a URL for the image
        setAnimalImage(imageUrl);
      } else {
        setAnimalImage(null); // Reset image if fetching fails
      }
    } catch (err) {
      console.error(err);
      setError('API error');
      setAnimalData(null);
      setAnimalImage(null);
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
      .map((word) => capitalize(word))
      .join(' ');
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full flex flex-col">

        <div className="mb-4 flex gap-4 items-baseline align-self-center justify-center">
          <h1 className="text-3xl font-semibold text-green-700 text-center tracking-wide -mr-2">
            Life
          </h1>
          <div>
            <Image
              src="/images/logo.ico" // Path to the favicon
              alt="Life tee Logo"
              width={30} // Adjust the width as needed
              height={30} // Adjust the height as needed
              className="rounded-full"
            />
          </div>
          <h1 className="text-3xl font-semibold text-green-700 text-center tracking-wide -ml-2">
            Tree
          </h1>
        </div>

        <div className="flex flex-col gap-2 mb-6">
          <input
            type="text"
            value={animalName}
            onChange={(e) => setAnimalName(e.target.value)}
            placeholder="Enter the name of an animal that actually exists"
            className="border border-gray-300 px-4 py-2 rounded-md w-full sm:w-auto text-black "
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <button
            onClick={handleSearch}
            disabled={isLoading || !animalName.trim()} // Dynamically disable the button
            className={`bg-green-700 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-md w-full sm:w-auto transition-colors duration-200 ${isLoading || !animalName.trim() ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          {animalData?.name}
        </h1>

        {error && (
          <p className="text-red-500 text-center text-xl mb-2 -mt-6 font-medium">
            {error}
          </p>
        )}

        {animalData && (
          <div>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <div className="grid grid-cols-2 gap-y-2">
                <p className="text-gray-600 font-medium">Kingdom:</p>
                <p className="text-gray-600">
                  <Link
                    href={`/kingdom/${animalData.taxonomy.kingdom}`}
                    className="text-blue-500 hover:underline"
                  >
                    {animalData.taxonomy.kingdom}
                  </Link>
                </p>

                <p className="text-gray-600 font-medium">Phylum:</p>
                <p className="text-gray-600">
                  <Link
                    href={`/phylum/${animalData.taxonomy.phylum}`}
                    className="text-blue-500 hover:underline"
                  >
                    {animalData.taxonomy.phylum}
                  </Link>
                </p>

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
          </div>
        )}

        {isLoading && animalData && (
          <div className="bg-gray-50 p-4 rounded-md mb-4 h-[230px] flex flex-col justify-center items-center">
            {/* CSS Spinner */}
            <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            {/* Loading Text */}
            <p className="mt-4 text-gray-600 text-sm font-medium">Generating image...</p>
          </div>
        )}

        {animalImage && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <Image
              src={animalImage}
              alt={`Generated image of ${animalName}`}
              width={400}
              height={300}
              className="rounded-md"
            />
          </div>
        )}

        {animalSummary && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-black">{animalSummary}</p>
          </div>
        )}

        {animalData && animalData.summary && (
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <p className="text-black">{animalData.summary}</p>
          </div>
        )}

        {animalData && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Found in:
            </h3>
            <div className="flex flex-wrap gap-2">
              {animalData && animalData.locations.map((location) => (
                <span
                  key={location}
                  className={`bg-gradient-to-tl from-blue-400 to-blue-800 text-white px-3 py-1 rounded-full text-sm flex gap-2 items-center`}
                >
                  <div className="relative w-6 h-6">
                    <Image
                      src={continentImages[location] || '/images/default.png'}
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
        )}


        {animalData && animalData.characteristics && (
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
    </div>
  );
}