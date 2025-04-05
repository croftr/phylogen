"use client"; // Mark this component as a Client Component

import React from "react";

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

// --- Component Prop Interface ---
interface ClassDisplayProps {
	data: AnimalClassInfo; // Accepts the data for the specific class
}

// --- Specific Component for Mammalia ---
// This could be moved to its own file: src/components/MammaliaDisplay.tsx
export function MammaliaDisplay({ data }: ClassDisplayProps) {
	const getSimpleClassName = () => data.title.split(" ")[1] || "Animals";

	return (
		<div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-10">
			{/* Header Section */}
			<header className="mb-8 border-b pb-4 border-gray-200">
				<h1 className="text-4xl sm:text-5xl font-bold text-center text-gray-800 mb-2">
					{data.title}
				</h1>
				<p className="text-lg text-center text-gray-600">{data.subtitle}</p>
			</header>
			{/* Introduction Section */}
			<section className="mb-10">
				<h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-4">
					What are {getSimpleClassName()}?
				</h2>
				{data.description.map((paragraph) => (
					<p key={paragraph.slice(0, 20)} className="text-gray-700 leading-relaxed mb-4">
						{paragraph}
					</p>
				))}
			</section>
			{/* Image Gallery Section */}
			<section className="mb-10">
				<h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6 text-center">
					A Glimpse into {getSimpleClassName()} Diversity
				</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{data.imagePlaceholders.map((img, index) => (
						<div
							key={img.src}
							className={`bg-gray-200 rounded-lg overflow-hidden shadow-md aspect-video flex items-center justify-center ${index === 2 ? "sm:col-span-2 md:col-span-1" : ""}`}
						>
							<img
								src={img.src}
								alt={img.alt}
								className="w-full h-full object-cover"
								onError={(e) => {
									e.currentTarget.src =
										"https://placehold.co/600x400/e2e8f0/a0aec0?text=Image+Not+Found";
								}}
							/>
						</div>
					))}
				</div>
				<p className="text-sm text-center text-gray-500 mt-4">
					Replace placeholder images with actual URLs for {getSimpleClassName()}.
				</p>
			</section>
			{/* Characteristics/Orders Section */}
			<section>
				<h2 className="text-2xl sm:text-3xl font-semibold text-gray-700 mb-6">
					{data.characteristicsTitle}
				</h2>
				<div className="overflow-x-auto rounded-lg border border-gray-200">
					<table className="min-w-full divide-y divide-gray-200">
						<thead className="bg-gray-50">
							<tr>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									{data.characteristicLabels.name}
								</th>
								<th
									scope="col"
									className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
								>
									{data.characteristicLabels.description}
								</th>
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data.characteristics.map((item) => (
								<tr key={item.name} className="hover:bg-gray-50 transition-colors duration-150">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{item.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
										{item.description}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<p className="text-sm text-gray-500 mt-4">
					Note: Classification details can be complex and subject to ongoing research.
				</p>
			</section>
		</div>
	);
}
