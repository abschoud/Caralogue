export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white text-gray-900 dark:bg-gray-900 dark:text-white">
      <div className="max-w-xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Caralogue</h1>
        <p className="text-lg mb-6 text-center">
          Have feedback, suggestions, or want to contribute to Caralogue? We would love to hear from you!
        </p>
        <form className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 shadow-md flex flex-col gap-4">
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Your Name</span>
            <input
              type="text"
              className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              placeholder="Enter your name"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Your Email</span>
            <input
              type="email"
              className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              placeholder="Enter your email"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Message</span>
            <textarea
              className="px-3 py-2 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              rows={5}
              placeholder="How can we help you?"
              required
            />
          </label>
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 text-center">
          We aim to respond to all inquiries within 2 business days.
        </p>
      </div>
    </div>
  );
}