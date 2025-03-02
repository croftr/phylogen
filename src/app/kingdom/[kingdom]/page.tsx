'use client'; // Make it a client component
// src/app/kingdom/[kingdom]/page.tsx
import Image from 'next/image'; // Import the Image component
import Link from 'next/link'; // Import the Link component
import { useParams } from 'next/navigation'; // Import the useParams hook

interface PhylumInfo {
  name: string;
  description: string;
}

const phylaByKingdom: { [key: string]: PhylumInfo[] } = {
  Animalia: [
    { name: 'Porifera', description: '(sponges)' },
    { name: 'Cnidaria', description: '(jellyfish, corals, sea anemones)' },
    { name: 'Platyhelminthes', description: '(flatworms)' },
    { name: 'Nematoda', description: '(roundworms)' },
    { name: 'Annelida', description: '(segmented worms)' },
    { name: 'Mollusca', description: '(snails, clams, octopuses)' },
    { name: 'Arthropoda', description: '(insects, spiders, crustaceans)' },
    { name: 'Echinodermata', description: '(sea stars, sea urchins)' },
    { name: 'Chordata', description: '(vertebrates and related animals)' },
  ],
  // Add more kingdoms and their phyla here if needed
  Plantae: [], // example
  Fungi: [], // example
  Monera: [], // example
  Protista: [], // example
};

export default function KingdomPage() {
  // Use the hook to read the path param.
  const { kingdom } = useParams();

  // Check if the kingdom is valid.
  const allowedKingdoms = Object.keys(phylaByKingdom);
  const isValidKingdom = allowedKingdoms.includes(kingdom as string); // remove call to notFound, replace with a boolean.

  const phyla = isValidKingdom ? phylaByKingdom[kingdom as string] || [] : [];

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-start p-6 pt-30">
    
      <div className="absolute inset-0 z-0 bg-cover bg-center">
        <Image
          src="/images/animals.jpg"
          alt="Background Animals"
          fill={true}
          style={{ objectFit: 'cover' }}
        />
      </div>
    
      <div id="content" className="relative bg-gray-100 text-gray-600 max-w-4xl mx-auto p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Kingdom: {kingdom}
        </h1>
        {isValidKingdom ? (
          phyla.length > 0 ? (
            <div className="relative z-20 flex flex-col items-center justify-start">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Major Phyla
              </h2>
              <ul className="list-disc list-inside">
                {phyla.map((phylum: PhylumInfo) => (
                  <li key={phylum.name} className="mb-2">
                    {phylum.name === 'Chordata' ? (
                      <Link href={`/phylum/${phylum.name}`} className="text-blue-500 hover:underline">
                        {phylum.name}
                      </Link>
                    ) : (
                      <span className="font-medium">{phylum.name}:</span>
                    )}{' '}
                    <span className="text-sm text-gray-500">{phylum.description}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-600">
              No phyla data available for the kingdom {kingdom}.
            </p>
          )
        ) : (
          <p className="text-red-500">Invalid kingdom {kingdom}</p>
        )}
      </div>
    </div>
  );
}