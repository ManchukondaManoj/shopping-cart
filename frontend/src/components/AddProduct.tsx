import api from "@/lib/axiosInterceptors";
import { useEffect, useState } from "react";

type selectedProduct = {
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  countInStock: number;
};

type AddProductProps = {
  selectedProduct?: selectedProduct;
  onEdit?: (p: selectedProduct) => void | null;
};
const AddProduct = ({ selectedProduct, onEdit }: AddProductProps) => {
  const productInitialState = selectedProduct || {
    name: "",
    image: "",
    price: 0,
    description: "",
    category: "",
    countInStock: 1,
  };

  const [productDetails, setProductDetails] = useState(productInitialState);

  useEffect(() => {
    if (selectedProduct) {
      setProductDetails(selectedProduct);
    }
  }, [selectedProduct]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductDetails({
      ...productDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveProduct = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (onEdit) {
      return onEdit(productDetails);
    }

    try {
      const config = {
        method: "post",
        data: {
          product: productDetails,
        },
      };
      await api("/products", config);
      setProductDetails(productInitialState);
      alert("Product added successfully");
    } catch (error) {
      console.log("error", error);
    }
  };
  const handlePriceAndQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    // const val = parseInt(e.target.value, 10);
    const inputValue = e.target.value;

    // Allow empty input to let the user clear the field
    if (inputValue === "") {
      setProductDetails({
        ...productDetails,
        [e.target.name]: "",
      });
    }

    const isValidFormat = /^\d*\.?\d*$/.test(inputValue);
    const parsedValue = parseFloat(inputValue);

    if (isValidFormat && !isNaN(parsedValue) && parsedValue >= 0) {
      setProductDetails({
        ...productDetails,
        [e.target.name]: inputValue,
      });
    }
  };

  return (
    <div>
      <form className="max-w-lg" onSubmit={handleSaveProduct}>
        <div className="mb-2">
          <label htmlFor="name" className="block mb-2 text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={productDetails.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="description" className="block mb-2 text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={productDetails.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          ></textarea>
        </div>
        <div className="mb-2">
          <label htmlFor="category" className="block mb-2 text-gray-700">
            Category
          </label>
          <input
            id="category"
            name="category"
            value={productDetails.category}
            onChange={handleChange}
            placeholder="Enter product category"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="price" className="block mb-2 text-gray-700">
            Price
          </label>
          <input
            id="price"
            name="price"
            value={productDetails.price}
            onChange={handlePriceAndQty}
            placeholder="Enter product price"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="qty" className="block mb-2 text-gray-700">
            Quantity
          </label>
          <input
            id="qty"
            name="countInStock"
            value={productDetails.countInStock}
            onChange={handlePriceAndQty}
            placeholder="Enter product quantity"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <div className="mb-2">
          <label htmlFor="image" className="block mb-2 text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={productDetails.image}
            onChange={handleChange}
            placeholder="Enter Image Url"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            required
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

export default AddProduct;
