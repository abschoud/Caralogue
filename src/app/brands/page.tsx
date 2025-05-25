import Image from "next/image";

const brands = [
  {
    name: "BMW",
    logo: "/bmw.png",
    country: "Germany",
    luxury: "Premium",
    slug: "bmw",
  },
  {
    name: "Toyota",
    logo: "/toyota.png",
    country: "Japan",
    luxury: "Mainstream",
    slug: "toyota",
  },
  {
    name: "Ferrari",
    logo: "/ferrari.png",
    country: "Italy",
    luxury: "Exotic",
    slug: "ferrari",
  },
  // ...add more brands as needed
];

export default function BrandsPage() {
  return (
    <div className="min-h-screen px-4 py-12 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <h1 className="text-4xl font-bold mb-8 text-center">All Car Brands</h1>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-10">
        <input
          type="text"
          placeholder="Search brands..."
          className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <select className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <option>All Countries</option>
          <option>Germany</option>
          <option>Japan</option>
          <option>Italy</option>
          {/* ...add more countries */}
        </select>
        <select className="px-4 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <option>All Luxury Levels</option>
          <option>Mainstream</option>
          <option>Premium</option>
          <option>Exotic</option>
        </select>
      </div>
      {/* Brands Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <a
            key={brand.slug}
            href={`/brands/${brand.slug}`}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center"
          >
            <Image
              src={brand.logo}
              alt={brand.name}
              width={500}
              height={250}
              className="object-contain mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{brand.name}</h3>
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-2">
              {brand.country} &middot; {brand.luxury}
            </div>
            <span className="text-blue-600 dark:text-blue-400 font-medium mt-2 hover:underline">
              View Models &rarr;
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}