"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Update dark mode and persist to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <nav className="w-full flex justify-between items-center py-4 px-6 bg-white dark:bg-gray-900 shadow-md">
      <Link href="/" className="text-2xl font-bold text-blue-600 dark:text-white">
        Caralogue
      </Link>
      <div className="flex gap-6 items-center">
        <Link href="/" className="hover:underline text-gray-900 dark:text-gray-100">Home</Link>
        <Link href="/brands" className="hover:underline text-gray-900 dark:text-gray-100">Brands</Link>
        <Link href="/about" className="hover:underline text-gray-900 dark:text-gray-100">About</Link>
        <Link href="/contact" className="hover:underline text-gray-900 dark:text-gray-100">Contact</Link>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-3 py-1 rounded border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {darkMode ? "Light" : "Dark"}
        </button>
      </div>
    </nav>
  );
}
