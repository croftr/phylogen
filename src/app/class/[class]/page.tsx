// src/app/class/[class]/page.tsx
// This file defines a dynamic page component that displays information
// about a biological class based on the URL parameter.
// It uses React functional components, Tailwind CSS, and is a Client Component.
// Refactored to use truly separate components for rendering each class's details.
"use client"; // Mark this component as a Client Component

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation"; // Import useParams hook
import { MammaliaDisplay } from "./mammaliaDisplay";
import { ReptiliaDisplay } from "./reptiliaDisplay";

// --- Data Structures and Data ---

// Define the structure for characteristics/orders
interface Characteristic {
	name: string;
	description: string;
}

// Define the structure for the overall class information
interface AnimalClassInfo {
	title: string;
	subtitle: string;
	description: string[];
	imagePlaceholders: { src: string; alt: string }[];
	characteristicsTitle: string;
	characteristics: Characteristic[];
	characteristicLabels: { name: string; description: string };
}

// Data for different biological classes
// This data could be moved to a separate file (e.g., data/animalClasses.ts)
const animalClassData: Record<string, AnimalClassInfo> = {
	mammalia: {
		title: "Class Mammalia",
		subtitle: "The Warm-Blooded Vertebrates",
		description: [
			"Mammalia is a diverse class of vertebrate animals characterized primarily by the presence of mammary glands in females, which produce milk for nourishing their young.",
			"Other key features typically include the presence of hair or fur, a neocortex region in the brain, three middle ear bones (malleus, incus, and stapes), and being warm-blooded (endothermic).",
			"Mammals inhabit a vast range of environments, from oceans and deserts to forests and polar regions, and exhibit an incredible variety of forms and lifestyles, from the tiny bumblebee bat to the enormous blue whale.",
		],
		imagePlaceholders: [
			{ src: "https://placehold.co/600x400/a0aec0/ffffff?text=Mammal+1", alt: "Mammal Example 1" },
			{ src: "https://placehold.co/600x400/90cdf4/ffffff?text=Mammal+2", alt: "Mammal Example 2" },
			{ src: "https://placehold.co/600x400/fbb6ce/ffffff?text=Mammal+3", alt: "Mammal Example 3" },
		],
		characteristicsTitle: "Major Orders of Mammals",
		characteristicLabels: { name: "Order Name", description: "Common Examples" },
		characteristics: [
			{ name: "Monotremata", description: "Platypuses, Echidnas" },
			{ name: "Didelphimorphia", description: "Opossums" },
			{ name: "Diprotodontia", description: "Kangaroos, Koalas, Wombats" },
			{ name: "Primates", description: "Monkeys, Apes, Lemurs, Humans" },
			{ name: "Rodentia", description: "Rats, Mice, Squirrels, Beavers" },
			{ name: "Chiroptera", description: "Bats" },
			{ name: "Carnivora", description: "Dogs, Cats, Bears, Seals" },
			{
				name: "Cetartiodactyla",
				description: "Cattle, Pigs, Hippos, Whales, Dolphins, Deer, Giraffes",
			},
		],
	},
	reptilia: {
		title: "Class Reptilia",
		subtitle: "The Cold-Blooded Scaly Vertebrates",
		description: [
			"Reptilia is a class of tetrapod animals comprising today's turtles, crocodilians, snakes, lizards, tuatara, and their extinct relatives.",
			'Most reptiles are ectothermic ("cold-blooded"), meaning they regulate their body temperature using external heat sources. They are typically covered in scales or scutes, protecting them from desiccation and injury.',
			"Reptiles reproduce sexually, and most lay amniotic eggs enclosed in leathery or hard shells, usually on land.",
		],
		imagePlaceholders: [
			{
				src: "https://placehold.co/600x400/8fbc8f/ffffff?text=Reptile+1",
				alt: "Reptile Example 1",
			},
			{
				src: "https://placehold.co/600x400/98fb98/ffffff?text=Reptile+2",
				alt: "Reptile Example 2",
			},
			{
				src: "https://placehold.co/600x400/9acd32/ffffff?text=Reptile+3",
				alt: "Reptile Example 3",
			},
		],
		characteristicsTitle: "Major Orders/Groups of Reptiles",
		characteristicLabels: { name: "Order/Group", description: "Common Examples" },
		characteristics: [
			{ name: "Testudines", description: "Turtles, Tortoises, Terrapins" },
			{ name: "Squamata", description: "Lizards, Snakes, Amphisbaenians" },
			{ name: "Crocodilia", description: "Crocodiles, Alligators, Caimans, Gharials" },
			{ name: "Rhynchocephalia", description: "Tuataras (found only in New Zealand)" },
		],
	},
	// aves: { ... } // Add other classes here
};

// --- Component Prop Interface ---
interface ClassDisplayProps {
	data: AnimalClassInfo; // Accepts the data for the specific class
}

// --- Main Page Component ---
// This remains in src/app/class/[class]/page.tsx
export default function AnimalClassPage() {
	const params = useParams();
	const paramClass = params.class as string;
	const className = paramClass?.toLowerCase();
	const currentClassInfo = className ? animalClassData[className] : undefined;

	// Function to render the correct component based on the class name
	const renderClassComponent = () => {
		if (!currentClassInfo) {
			return null; // Handled by the main return block's "Not Found" logic
		}

		// Conditionally render the specific component
		switch (className) {
			case "mammalia":
				return <MammaliaDisplay data={currentClassInfo} />;
			case "reptilia":
				return <ReptiliaDisplay data={currentClassInfo} />;
			// Add cases for other classes here (e.g., Aves, Amphibia)
			// case 'aves':
			//     return <AvesDisplay data={currentClassInfo} />;
			default:
				// Fallback for classes in data but without a specific component yet
				console.warn(`No specific display component created for class: ${className}.`);
				return (
					<div className="text-center p-10 bg-yellow-100 border border-yellow-300 rounded-lg">
						<p className="font-semibold text-yellow-800">
							Display component for '{className}' is not implemented yet.
						</p>
					</div>
				);
		}
	};

	// Handle cases where the class name is not found in our data
	if (!currentClassInfo) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
				<div className="bg-white p-8 rounded-lg shadow-md text-center">
					<h1 className="text-2xl font-bold text-red-600 mb-4">Class Not Found</h1>
					<p className="text-gray-700 mb-6">
						Sorry, we don't have information for the class:{" "}
						<span className="font-semibold">{paramClass || "Unknown"}</span>
					</p>
					<Link href="/" legacyBehavior>
						<a
							href="/"
							className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
						>
							Go Back Home
						</a>
					</Link>
				</div>
			</div>
		);
	}

	// Render the main page structure and the dynamically chosen class component
	return (
		<div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 p-4 sm:p-8 font-sans">
			{/* Render the component chosen by the switch statement */}
			{renderClassComponent()}
		</div>
	);
}
