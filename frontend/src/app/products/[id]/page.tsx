/* eslint-disable @next/next/no-async-client-component */
"use client";
import { useState, useEffect } from "react";
import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getProductById } from "../../../store/productActions"; // Update path as needed
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Params {
  id: string;
}

interface PageProps {
  params: Promise<Params>;
}
const ProductScreen = ({ params }: PageProps) => {
  const { id } = React.use(params);
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const router = useRouter();

  const { fetching, error, product } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
  }, [dispatch, id]);

  const addToCartHandler = () => {
    router.push(`/cart/${id}?qty=${qty}`);
  };

  if (fetching || !product) {
    return <p className="text-center text-lg">Loading...</p>;
  } else if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  } else {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <Link href="/">
          <button className="mb-4 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
            Go Back
          </button>
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Product Image */}
          <div className="col-span-1">
            <Image
              width={640}
              height={640}
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="col-span-1">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="text-xl font-semibold mt-2">${product.price}</p>
            <p className="text-gray-700 mt-2">{product.description}</p>
          </div>

          {/* Purchase Section */}
          <div className="col-span-1 border rounded-lg shadow-md p-4">
            <div className="flex justify-between py-2">
              <span className="text-lg font-semibold">Price:</span>
              <span className="text-lg">${product.price}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-lg font-semibold">Status:</span>
              <span className="text-lg">
                {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center justify-between py-2">
                <span className="text-lg font-semibold">Qty</span>
                <select
                  className="border rounded px-2 py-1"
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              className={`w-full mt-4 px-4 py-2 text-white font-semibold rounded ${
                product.countInStock === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={product.countInStock === 0}
              onClick={addToCartHandler}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductScreen;
