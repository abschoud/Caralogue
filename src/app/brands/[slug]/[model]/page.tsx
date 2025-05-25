"use client";
import Image from "next/image";
import { useState, use as usePromise } from "react"; // <-- import use as usePromise
import { notFound } from "next/navigation";
import Link from "next/link";

// Example data for demonstration
const brands = [
  { name: "BMW", slug: "bmw", logo: "/bmw.png" },
];

const bmw3Series = {
  name: "3 Series",
  slug: "3-series",
  bodyTypes: ["Sedan", "Touring", "Gran Turismo"],
  trims: [
    {
      name: "320i",
      years: [
        {
          year: 2022,
          images: ["/models/bmw/3-series-320i-1.png", "/models/bmw/3-series-320i-2.png"],
          description: "2022 BMW 320i: Efficient and sporty entry-level sedan.",
          specs: {
            engine: "2.0L I4",
            horsepower: "184 hp",
            drivetrain: "RWD",
            transmission: "Automatic",
            price: "$41,000",
            fuelEconomy: "30 mpg",
            safety: "5 stars",
          },
          features: [
            "LED headlights",
            "iDrive infotainment",
            "Lane departure warning",
          ],
        },
        // ...add more years
      ],
    },
    {
      name: "330i",
      years: [
        {
          year: 2022,
          images: ["/models/bmw/3-series-330i-1.png", "/models/bmw/3-series-330i-2.png"],
          description: "2022 BMW 330i: More power and luxury features.",
          specs: {
            engine: "2.0L I4 Turbo",
            horsepower: "258 hp",
            drivetrain: "RWD / AWD",
            transmission: "Automatic",
            price: "$45,000",
            fuelEconomy: "28 mpg",
            safety: "5 stars",
          },
          features: [
            "Adaptive cruise control",
            "Leather seats",
            "Wireless Apple CarPlay",
          ],
        },
        // ...add more years
      ],
    },
    // ...add more trims
  ],
};

export default function ModelPage({ params }: { params: Promise<{ slug: string; model: string }> }) {
  const resolvedParams = usePromise(params);

  // Always define hooks first!
  // Use fallback values in case brand/model are not found
  const brand = brands.find((b) => b.slug === resolvedParams.slug);
  const model = resolvedParams.slug === "bmw" && resolvedParams.model === "3-series" ? bmw3Series : undefined;

  // Use fallback values to satisfy hooks rules
  const fallbackBodyTypes = model?.bodyTypes ?? [""];
  const fallbackTrims = model?.trims ?? [{ name: "", years: [{ year: 0, images: [""], description: "", specs: {}, features: [] }] }];
  const fallbackYears = fallbackTrims[0]?.years ?? [{ year: 0, images: [""], description: "", specs: {}, features: [] }];

  const [selectedBodyType, setSelectedBodyType] = useState(fallbackBodyTypes[0]);
  const [selectedTrimIndex, setSelectedTrimIndex] = useState(0);
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);

  // After hooks, check for notFound
  if (!brand || !model) return notFound();

  const selectedTrim = model.trims[selectedTrimIndex];
  const selectedYear = selectedTrim.years[selectedYearIndex];

  // Update year when trim changes
  const handleTrimChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = model.trims.findIndex((t) => t.name === e.target.value);
    setSelectedTrimIndex(idx);
    setSelectedYearIndex(0);
    setImageIndex(0);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const idx = selectedTrim.years.findIndex((y) => y.year === Number(e.target.value));
    setSelectedYearIndex(idx);
    setImageIndex(0);
  };

  // Image carousel handlers (with swipe support)
  let touchStartX = 0;
  let touchEndX = 0;
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX = e.changedTouches[0].screenX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) handleNextImage();
    if (touchEndX > touchStartX + 50) handlePrevImage();
  };
  const handlePrevImage = () => setImageIndex((i) => (i === 0 ? selectedYear.images.length - 1 : i - 1));
  const handleNextImage = () => setImageIndex((i) => (i === selectedYear.images.length - 1 ? 0 : i + 1));

  // Breadcrumbs
  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Brands", href: "/brands" },
    { name: brand.name, href: `/brands/${brand.slug}` },
    { name: model.name, href: `/brands/${brand.slug}/${model.slug}` },
  ];

  return (
    <div className="min-h-screen px-4 py-12 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      {/* Breadcrumbs */}
      <nav className="mb-4 text-sm text-gray-500 dark:text-gray-400">
        {breadcrumbs.map((crumb, i) => (
          <span key={crumb.href}>
            <Link href={crumb.href} className="hover:underline">{crumb.name}</Link>
            {i < breadcrumbs.length - 1 && " / "}
          </span>
        ))}
      </nav>
      <div className="flex flex-col items-center mb-8">
        <Image src={brand.logo} alt={brand.name} width={64} height={64} className="mb-2" />
        <h1 className="text-3xl font-bold mb-2">{brand.name} {model.name}</h1>
      </div>
      {/* Dropdowns */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        <select
          value={selectedBodyType}
          onChange={(e) => setSelectedBodyType(e.target.value)}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {model.bodyTypes.map((bt) => (
            <option key={bt} value={bt}>{bt}</option>
          ))}
        </select>
        <select
          value={selectedTrim.name}
          onChange={handleTrimChange}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {model.trims.map((trim) => (
            <option key={trim.name} value={trim.name}>{trim.name}</option>
          ))}
        </select>
        <select
          value={selectedYear.year}
          onChange={handleYearChange}
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        >
          {selectedTrim.years.map((year) => (
            <option key={year.year} value={year.year}>{year.year}</option>
          ))}
        </select>
      </div>
      {/* Image carousel */}
      <div className="flex flex-col items-center mb-8">
        <div
          className="relative w-full max-w-[600px] h-[300px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={handlePrevImage}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 rounded-full p-2"
            aria-label="Previous image"
          >
            &#8592;
          </button>
          <Image
            src={selectedYear.images[imageIndex]}
            alt={model.name}
            fill
            className="object-contain rounded shadow"
            sizes="(max-width: 600px) 100vw, 600px"
          />
          <button
            onClick={handleNextImage}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-700 rounded-full p-2"
            aria-label="Next image"
          >
            &#8594;
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {imageIndex + 1} / {selectedYear.images.length}
        </div>
      </div>
      {/* Description */}
      <div className="mb-6 text-center text-lg">{selectedYear.description}</div>
      {/* Specs and Features */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">Key Specs</h3>
          <ul className="mb-6">
            <li><strong>Engine:</strong> {selectedYear.specs.engine}</li>
            <li><strong>Horsepower:</strong> {selectedYear.specs.horsepower}</li>
            <li><strong>Drivetrain:</strong> {selectedYear.specs.drivetrain}</li>
            <li><strong>Transmission:</strong> {selectedYear.specs.transmission}</li>
            <li><strong>Price:</strong> {selectedYear.specs.price}</li>
            <li><strong>Fuel Economy:</strong> {selectedYear.specs.fuelEconomy}</li>
            <li><strong>Safety:</strong> {selectedYear.specs.safety}</li>
          </ul>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">Features</h3>
          <ul className="list-disc list-inside">
            {selectedYear.features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      </div>
      {/* Compare Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Compare Trims/Years
        </button>
      </div>
      {/* Comparison Table */}
      <div className="mt-12 overflow-x-auto">
        <h3 className="text-xl font-semibold mb-4 text-center">Quick Comparison</h3>
        <table className="min-w-[600px] w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Trim</th>
              {model.trims[0].years.map((year) => (
                <th key={year.year} className="border px-4 py-2">{year.year}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {model.trims.map((trim) => (
              <tr key={trim.name}>
                <td className="border px-4 py-2 font-semibold">{trim.name}</td>
                {trim.years.map((year) => (
                  <td key={year.year} className="border px-4 py-2">
                    <div><strong>HP:</strong> {year.specs.horsepower}</div>
                    <div><strong>Price:</strong> {year.specs.price}</div>
                    <div><strong>Fuel:</strong> {year.specs.fuelEconomy}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}