"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "@/store/productActions";
import Product from "@/components/products";
import ProductFilter from "@/components/Filter";
import SearchComponent from "@/components/SearchComponent";
import { RootState, AppDispatch } from "@/store/store";

type HandleFilterType = {
  category: string;
  minPrice: number;
  maxPrice: number;
};

const HomeScreen = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    fetching,
    error,
    products: productsInState,
  } = useSelector((state: RootState) => state.products);

  const [products, setProducts] = useState(productsInState);

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  useEffect(() => {
    setProducts(productsInState);
  }, [productsInState]);

  const handleFilter = ({ category, minPrice, maxPrice }: HandleFilterType) => {
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

  const filterProducts = (searchQuery: string) => {
    if (!searchQuery) {
      setProducts(productsInState);
      return;
    }

    const filtered = productsInState.filter((item) => {
      const text = item.name.toLowerCase();
      const desc = item.description.toLowerCase();
      const query = searchQuery.toLowerCase();
      return text.includes(query) || desc.includes(query);
    });

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
