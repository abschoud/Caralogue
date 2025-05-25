import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { use as usePromise } from "react";

const brands = [
  { name: "BMW", slug: "bmw", country: "Germany", luxury: "Premium", logo: "/bmw.png" },
  { name: "Toyota", slug: "toyota", country: "Japan", luxury: "Mainstream", logo: "/toyota.png" },
  { name: "Ferrari", slug: "ferrari", country: "Italy", luxury: "Exotic", logo: "/ferrari.png" },
];

type Model = {
  name: string;
  slug: string;
  image: string;
  bodyType: string;
  years: string;
};

const modelsByBrand: Record<string, Model[]> = {
  bmw: [
    { name: "1 Series", slug: "1-series", image: "/bmw-1series.png", bodyType: "Hatchback", years: "2004–present" },
    { name: "2 Series", slug: "2-series", image: "/bmw-2series.png", bodyType: "Coupe", years: "2014–present" },
    { name: "3 Series", slug: "3-series", image: "/bmw-3series.png", bodyType: "Sedan", years: "1975–present" },
    { name: "4 Series", slug: "4-series", image: "/bmw-4series.png", bodyType: "Coupe", years: "2013–present" },
  ],
  // Add more brands and their models here
};

export default function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap the promise using React's use() or use as usePromise
  const resolvedParams = usePromise(params);

  const brand = brands.find((b) => b.slug === resolvedParams.slug);
  if (!brand) return notFound();

  const models = modelsByBrand[resolvedParams.slug] || [];

  return (
    <div className="min-h-screen px-4 py-12 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col items-center mb-8">
        <Image src={brand.logo} alt={brand.name} width={500} height={250} className="mb-4" />
        <h1 className="text-4xl font-bold mb-2">{brand.name}</h1>
        <div className="text-lg mb-1">{brand.country} &middot; {brand.luxury}</div>
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <input
          type="text"
          placeholder="Search models..."
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <select className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <option>All Body Types</option>
          <option>Hatchback</option>
          <option>Coupe</option>
          <option>Sedan</option>
        </select>
        <select className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <option>All Years</option>
          <option>1970s</option>
          <option>1980s</option>
          <option>1990s</option>
          <option>2000s</option>
          <option>2010s</option>
          <option>2020s</option>
        </select>
      </div>
      {/* Models Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {models.map((model) => (
          <Link
            key={model.slug}
            href={`/brands/${brand.slug}/${model.slug}`}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center"
          >
            <Image
              src={model.image}
              alt={model.name}
              width={450}
              height={225}
              className="object-contain mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{model.name}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {model.bodyType} &middot; {model.years}
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-medium mt-2 hover:underline">
              View Details &rarr;
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}