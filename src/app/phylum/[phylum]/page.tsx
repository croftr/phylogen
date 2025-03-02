'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const images: { [key: string]: string } = {
  Chordata: '/images/chordate.jpg',
  // Add more phyla images as needed
};

const data: { [key: string]: string } = {
  Chordata: 'Chordata is a phylum of animals that includes all vertebrates, as well as several invertebrates. The defining characteristics of chordates are: Notochord, a flexible rod that runs along the length of the body'
};

interface Subgroup {
  name: string;
  members: string[];
}

interface PhylumDetail {
  description: string;
  subgroups: Subgroup[];
}

const phylumDetails: { [key: string]: PhylumDetail } = {
  Chordata: {
    description: 'Chordata is a phylum of animals that includes all vertebrates, as well as several invertebrates. The defining characteristics of chordates are: Notochord, a flexible rod that runs along the length of the body',
    subgroups: [
      {
        name: 'Vertebrata (Vertebrates)',
        members: ['Fish', 'Amphibians', 'Reptiles', 'Birds', 'Mammals']
      },
      {
        name: 'Invertebrate Chordates',
        members: ['Urochordata (Tunicates)', 'Cephalochordata (Lancelets)']
      }
    ]
  }
  // Add more phyla details as needed
};

export default function PhylumPage() {
  const params = useParams();
  const phylum = params.phylum as string;
  const [imageError, setImageError] = useState(false);

  // Use a default image if the phylum doesn't have a specific one or if there was an error
  const backgroundImage = !imageError && images[phylum]
    ? images[phylum]
    : '/images/default-phylum.jpg';

  // For debugging
  useEffect(() => {
    console.log("Current phylum:", phylum);
    console.log("Image path being used:", backgroundImage);
  }, [phylum, backgroundImage]);

  const phylumDetail = phylumDetails[phylum];

  return (
    <div className="min-h-screen min-w-screen relative bg-gray-100 pt-30 text-gray-600">
      {/* Display the image directly */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0 bg-cover bg-center ring bg-red-800">
          <Image
            src={backgroundImage}
            alt={`${phylum} background`}
            layout="fill"
            priority
            onError={() => {
              console.error("Failed to load image:", backgroundImage);
              setImageError(true);
            }}
          />
        </div>
      )}

      {/* Content container */}
      <div className="relative z-20 flex flex-col items-center justify-start p-6 min-h-screen">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Phylum: {phylum}
          </h1>

          <p className="mb-4">
            {phylumDetail ? phylumDetail.description : data[phylum]}
          </p>
          {phylumDetail && phylumDetail.subgroups && (
            <ul className="list-disc list-inside">
              {phylumDetail.subgroups.map((subgroup: { name: string; members: string[] }) => (
                <li key={subgroup.name} className="mb-2">
                  <span className="font-semibold">{subgroup.name}</span>
                  <ul className="list-disc list-inside ml-6">
                    {subgroup.members.map((member: string) => (
                      <li key={member}>{member}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}

          <Link href="/" className="text-blue-500 hover:underline mt-6">
            Back to search
          </Link>
        </div>
      </div>
    </div>
  );
}