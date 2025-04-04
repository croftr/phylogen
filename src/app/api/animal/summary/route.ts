import { type NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai"; // Import GoogleGenAI


const ai = new GoogleGenAI({ apiKey: 'AIzaSyD4sh1ADtL3ZF31Btegl0Z3Bk4WG83pipQ' }); 

export async function GET(request: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const animalName = searchParams.get("animalName");

  if (!animalName) {
    return NextResponse.json({ error: "Animal name is required" }, { status: 400 });
  }
    
  let animalSummary: string|undefined = undefined; 
  try {
  
      try {
        const summaryResponse = await ai.models.generateContent({
          model: 'gemini-2.0-flash',
          contents: `Provide a short humerous made up description of a mythical animal called a ${animalName} Try and include the words goose or horse in the description`,
        });

        animalSummary = summaryResponse.text; // Add the summary to the response
      } catch (summaryError) {
        console.error('Error fetching summary from Gemini API:', summaryError);
        animalSummary = '';
      }

      return NextResponse.json(animalSummary);
    
  } catch (error) {
    console.error('API request error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}