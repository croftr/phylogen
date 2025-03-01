// app/api/animal/route.ts (API route with TypeScript)

import { NextRequest, NextResponse } from 'next/server';

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
  // ... other properties from the API response
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const animalName = searchParams.get('animalName');

  if (!animalName) {
    return NextResponse.json({ error: 'Animal name is required' }, { status: 400 });
  }


  const randomString = 'UMTGp4WbK3k1F+cx2rT1VQ==ggieWfvctGM9xctZ';  
  const apiUrl = `https://api.api-ninjas.com/v1/animals?name=${encodeURIComponent(animalName)}`;
  console.log('bobby 1', randomString);
  
  try {

    const response = await fetch(apiUrl, {
        headers: {
          'X-Api-Key': randomString as string, 
        },
      });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: AnimalData[] = await response.json();

    if (data && data.length > 0) {
      return NextResponse.json(data[0]);
    } else {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('API request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

