const ProductsAdmin = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <p className="mb-6">Here you can add products.</p>
      {/* Add/Edit Product Form */}
      <form className="max-w-lg">
        <div className="mb-4">
          <label htmlFor="productName" className="block mb-2 text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            placeholder="Enter product name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter product description"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-2 text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Enter product price"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="qty" className="block mb-2 text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            id="qty"
            name="qty"
            placeholder="Enter product quantity"
            min="1"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default ProductsAdmin;
