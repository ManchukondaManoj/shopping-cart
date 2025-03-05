import React, { useState, FormEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import AddProduct from "./AddProduct";
import api from "@/lib/axiosInterceptors";

type selectedProduct = {
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  countInStock: number;
};
type ProductType = {
  productId: string;
  name: string;
  image: string;
  price: number;
  description: string;
  category: string;
  countInStock: number;
};

const EditProduct = () => {
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [prodDetails, setProdDetails] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([]);

  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    if (products.length) {
      setAvailableProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (selectedProduct) {
      const product = products.find(
        ({ productId }: ProductType) => productId === selectedProduct
      );
      setProdDetails(product);
    } else if (!selectedProduct) {
      setProdDetails(null);
    }
  }, [selectedProduct, products]);

  const handleEditProduct = async (updatedProduct: selectedProduct) => {
    const countInStock = parseInt(updatedProduct.countInStock, 10);
    const price = parseInt(updatedProduct.price, 10);
    const properProduct = {
      ...updatedProduct,
      countInStock,
      price,
    };
    const config = {
      method: "put",
      data: {
        product: properProduct,
      },
    };
    await api("/products", config);
    alert("Product updated successfully");
  };

  return (
    <div className="flex flex-col p-2">
      <div className="flex-1">
        <select
          id="products"
          value={selectedProduct}
          onChange={(e) => setSelectedProduct(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm mb-2"
        >
          <option value="">Select product</option>
          {availableProducts &&
            availableProducts.map(({ productId, name }) => (
              <option key={productId} value={productId}>
                {name}
              </option>
            ))}
        </select>
      </div>
      {prodDetails && (
        <AddProduct selectedProduct={prodDetails} onEdit={handleEditProduct} />
      )}
    </div>
  );
};

export default EditProduct;
