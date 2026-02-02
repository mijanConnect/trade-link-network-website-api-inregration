export default function SearchBar() {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full rounded-sm border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
        />

        {/* Search Icon */}
        <svg
          className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
      </div>
    </div>
  );
}
