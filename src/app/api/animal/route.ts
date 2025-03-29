// app/api/animal/route.ts (API route with TypeScript)

import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai'; // Import GoogleGenAI

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
  locations?: string[];
  characteristics?: Record<string, string>;
  summary?: string; // Add a field for the summary
}

const ai = new GoogleGenAI({ apiKey: 'AIzaSyD4sh1ADtL3ZF31Btegl0Z3Bk4WG83pipQ' }); 

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const animalName = searchParams.get('animalName');

  if (!animalName) {
    return NextResponse.json({ error: 'Animal name is required' }, { status: 400 });
  }

  const apiUrl = `https://api.api-ninjas.com/v1/animals?name=${encodeURIComponent(animalName)}`;
  const apiKey = 'UMTGp4WbK3k1F+cx2rT1VQ==ggieWfvctGM9xctZ'; // Replace with your actual API key

  try {
    // Fetch animal data from the external API
    const response = await fetch(apiUrl, {
      headers: {
        'X-Api-Key': apiKey,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data: AnimalData[] = await response.json();

    if (data && data.length > 0) {
      const animalData = data[0];

      // Fetch the summary using Gemini API
      try {
        const summaryResponse = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: `Provide a brief summary about the animal species: ${animalData.name}`,
        });

        animalData.summary = summaryResponse.text; // Add the summary to the response
      } catch (summaryError) {
        console.error('Error fetching summary from Gemini API:', summaryError);
        animalData.summary = 'Summary not available.';
      }

      return NextResponse.json(animalData);
    } else {
      return NextResponse.json({ error: 'Animal not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('API request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}