'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function PhylumPage() {
  const params = useParams();
  const phylum = params.phylum as string;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-6">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Phylum: {phylum}
        </h1>
        
        
        <p className="text-gray-600 mb-4">
          Information about phylum {phylum}.
        </p>
        
        <Link href="/" className="text-blue-500 hover:underline">
          Back to search
        </Link>
      </div>
    </div>
  );
}