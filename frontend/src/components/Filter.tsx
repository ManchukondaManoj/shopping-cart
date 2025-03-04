import React, { useState, FormEvent } from "react";

interface ProductFilterProps {
  categories: string[];
  onFilter: (filter: {
    category: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
  onClear: () => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  categories,
  onFilter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilter({
      category: selectedCategory,
      minPrice,
      maxPrice,
    });
  };

  const clearFilters = () => {
    setSelectedCategory("");
    setMinPrice(0);
    setMaxPrice(1000);
    onFilter({
      category: "",
      minPrice: 0,
      maxPrice: 1000,
    });
    onClear();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded mb-6">
      <div className="flex flex-col md:flex-row md:space-x-8 md:items-end p-2">
        {/* Category Field */}
        <div className="flex-1">
          <label
            htmlFor="category"
            className="block text-gray-700 font-medium mb-2"
          >
            Category
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Fields */}
        <div className="flex-1 flex flex-col md:flex-row md:space-x-4">
          <div className="flex-1">
            <label
              htmlFor="minPrice"
              className="block text-gray-700 font-medium mb-2"
            >
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="maxPrice"
              className="block text-gray-700 font-medium mb-2"
            >
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>
        </div>

        {/* Apply Filter Button */}
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
          >
            Apply Filter
          </button>
        </div>

        {/* Clear Filter Button (X) */}
        <div className="flex-shrink-0 mt-4 md:mt-0">
          <button
            type="button"
            onClick={clearFilters}
            className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors"
          >
            X
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProductFilter;
