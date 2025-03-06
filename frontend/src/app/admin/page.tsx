"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import withAdminHOC from "@/components/withAdminHOC";
import AddProduct from "@/components/AddProduct";
import EditProduct from "@/components/EditProduct";
import { listProducts } from "@/store/productActions";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("previousRoute", "admin");
  }, []);

  useEffect(() => {
    dispatch(listProducts());
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Add Product</h1>
            <AddProduct />
          </div>
        );
      case "edit-products":
        return (
          <div>
            <h1 className="text-2xl font-bold mb-4">Edit Product.</h1>
            <EditProduct />
          </div>
        );
      default:
        return <AddProduct />;
    }
  };

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <nav>
          <ul>
            <li className="mb-4">
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === "products" ? "bg-gray-700" : "hover:bg-gray-600"
                }`}
              >
                Add Product
              </button>
            </li>
            <li className="mb-4">
              <button
                onClick={() => setActiveTab("edit-products")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === "edit-products"
                    ? "bg-gray-700"
                    : "hover:bg-gray-600"
                }`}
              >
                Edit Product
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 p-8 bg-gray-100">{renderTabContent()}</main>
    </div>
  );
};

export default withAdminHOC(AdminPage);
