# Animal Info & AI Generator API

This project is a Next.js application providing API endpoints to retrieve information about animals, generate AI-powered summaries, and create AI-generated images of animals.

## Features

The application exposes the following API endpoints:

* **GET `/api/animal`**:
    * Fetches factual data for a specified animal from the [api-ninjas.com](https://api-ninjas.com) Animals API.
    * Uses the Google AI Generative Language API (`GoogleGenAI`) to generate a brief, factual summary of the animal.
    * **Query Parameters**:
        * `animalName` (required): The name of the animal to look up.
    * **Returns**: JSON object containing animal taxonomy, locations, characteristics, and an AI-generated summary. Returns 404 if the animal is not found.

* **GET `/api/animal/summary`**:
    * Generates a short, *humorous, and fictional* description of a mythical animal using the Google AI Generative Language API (`GoogleGenAI`).
    * **Query Parameters**:
        * `animalName` (required): The name of the mythical animal to describe.
    * **Returns**: JSON object containing the AI-generated humorous summary string.

* **GET `/api/animal/image`**:
    * Generates an image of an animal using the Google AI Image Generation API (`GoogleGenAI`, specifically `gemini-2.0-flash-exp-image-generation` model).
    * Can generate either a realistic image in a natural habitat or a cartoon image of a mythical/alien creature.
    * **Query Parameters**:
        * `animalName` (required): The name of the animal.
        * `isRealAnimal` (optional, default assumed based on code logic, likely 'true'): Set to `'false'` to generate a mythical/cartoon image.
    * **Returns**: A PNG image file.

## Technology Stack

* Next.js (App Router structure inferred)
* TypeScript
* Google AI SDK (`@google/genai`)
* Node Fetch (implicitly used for API calls)
* External API: api-ninjas.com Animals API

## Setup and Installation (Example)

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Environment Variables:**
    Create a `.env.local` file in the root directory and add your API keys:
    ```env
    # Required for /api/animal endpoint
    API_NINJAS_KEY=UMTGp4WbK3k1F+cx2rT1VQ==ggieWfvctGM9xctZ # Replace with your actual api-ninjas.com key

    # Required for all AI features (/api/animal, /api/animal/summary, /api/animal/image)
    GOOGLE_AI_API_KEY=AIzaSyD4sh1ADtL3ZF31Btegl0Z3Bk4WG83pipQ # Replace with your actual Google AI API key
    ```
    *(Note: The keys shown above are placeholders found in the code and should be replaced with your actual, secured keys).*

4.  **Run the development server:**
    ```bash
    npm run dev
    # or
    yarn dev
    ```
    The API endpoints will be available at `http://localhost:3000/api/animal/...` (or your configured port).

## Usage Example

You can test the endpoints using tools like `curl` or Postman, or directly in your browser for GET requests:

* `http://localhost:3000/api/animal?animalName=Lion`
* `http://localhost:3000/api/animal/summary?animalName=WingedHorse`
* `http://localhost:3000/api/animal/image?animalName=Tiger`
* `http://localhost:3000/api/animal/image?animalName=Glarf&isRealAnimal=false`