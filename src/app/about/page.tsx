export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">About Caralogue</h1>
        <p className="text-lg mb-4 text-center">
          <span className="font-semibold">Caralogue</span> is your ultimate resource for discovering every car ever made. Our mission is to provide a comprehensive, easy-to-use catalogue of all car brands, models, trims, and specifications from every country and era—no buying, no selling, just pure exploration.
        </p>
        <p className="text-lg mb-4 text-center">
          Whether you’re a car enthusiast, researcher, or just curious, you can browse brands, filter by country, luxury, price, performance, and more. Dive deep into each model’s history, see every trim, and explore detailed specs and images.
        </p>
        <p className="text-lg mb-4 text-center">
          Caralogue is built with modern web technologies like <span className="font-semibold">Next.js</span> and <span className="font-semibold">Tailwind CSS</span>, and is designed to be fast, accessible, and beautiful in both light and dark mode.
        </p>
        <p className="text-lg text-center">
          This project is open to feedback and contributions. If you have suggestions, corrections, or want to help expand the catalogue, please <a href="/contact" className="text-blue-600 dark:text-blue-400 underline hover:text-blue-800 dark:hover:text-blue-200">get in touch</a>!
        </p>
      </div>
    </div>
  );
}