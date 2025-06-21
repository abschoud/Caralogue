import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-16 gap-10">
        <h1 className="text-4xl font-bold text-center mb-4">Discover Every Car Ever Made</h1>
        <p className="text-lg text-center max-w-xl mb-8">
          Explore all car brands, models, trims, and specs from every country and era. Filter by brand, body type, year, performance, and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/brands" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Browse Brands
          </Link>
          <Link href="/about" className="bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700">
            About Caralogue
          </Link>
        </div>
        <div className="mt-12">
          <Image src="/porsche.png" alt="Caralogue hero" width={600} height={300} className="rounded shadow-lg" />
        </div>
      </main>
      <footer className="py-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Caralogue. All rights reserved.
      </footer>
    </div>
  );
}