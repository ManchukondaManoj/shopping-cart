"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "@/components/products";
import { listProducts } from "@/store/productActions";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { fetching, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(listProducts() as any);
  }, [dispatch]);

  if (fetching) {
    return "Loading...";
  } else if (error) {
    return "Error Loading";
  } else {
    return (
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold my-6">Latest Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    );
  }
};

export default HomeScreen;
