"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "@/store/productActions";
import Product from "@/components/products";
import ProductFilter from "@/components/Filter";
import SearchComponent from "@/components/SearchComponent";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const {
    fetching,
    error,
    products: productsInState,
  } = useSelector((state) => state.products);

  const [products, setProducts] = useState(productsInState);

  useEffect(() => {
    dispatch(listProducts() as any);
  }, [dispatch]);

  useEffect(() => {
    setProducts(productsInState);
  }, [productsInState]);

  const handleFilter = ({ category, minPrice, maxPrice }) => {
    const filteredProducts = productsInState.filter((product) => {
      const { category: cat, price } = product;
      const matchesCategory = category ? cat === category : true;
      const matchesPrice = price >= minPrice && price <= maxPrice;
      return matchesCategory && matchesPrice;
    });
    setProducts(filteredProducts);
  };
  const handleOnClear = () => {
    setProducts(productsInState);
  };

  // const handleSeach = (query) => {};
  const filterProducts = (searchQuery: string) => {
    if (!searchQuery) {
      setProducts(productsInState);
      return;
    }

    const filtered = productsInState.filter((item) => {
      const text = item.name.toLowerCase();
      const desc = item.description.toLowerCase();
      const query = searchQuery.toLowerCase();
      console.log(text, desc, query);
      return text.includes(query) || desc.includes(query);
    });

    console.log("===filtered", filtered);
    setProducts(filtered);
  };

  const categories = Array.from(
    new Set(productsInState.map(({ category }) => category))
  );
  if (fetching) {
    return "Loading...";
  } else if (error) {
    return "Error Loading";
  } else {
    return (
      <div className="container mx-auto px-4">
        {/* <h1 className="text-2xl font-bold my-2">Latest Products</h1> */}
        <SearchComponent onQueryChange={filterProducts} />
        <ProductFilter
          categories={categories}
          onFilter={handleFilter}
          onClear={handleOnClear}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Product key={product.productId} product={product} />
          ))}
        </div>
      </div>
    );
  }
};

export default HomeScreen;
