import { useState, useEffect, useCallback } from "react";

type SearchComponentPropType = {
  onQueryChange: (e: string) => void;
};

type filterFn = (e: string) => void;

const SearchComponent = ({ onQueryChange }: SearchComponentPropType) => {
  const [query, setQuery] = useState("");

  // Debounce function
  const debounce = (func: filterFn, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: unknown[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const filterProducts = (searchQuery: string) => {
    onQueryChange(searchQuery);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilter = useCallback(debounce(filterProducts, 300), []);

  useEffect(() => {
    debouncedFilter(query);
  }, [query, debouncedFilter]);

  return (
    <div className="max-w-md mx-auto mt-4">
      <input
        type="text"
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
