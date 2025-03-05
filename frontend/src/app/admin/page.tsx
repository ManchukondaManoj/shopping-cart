// pages/admin.js
"use client";
import { useState, useEffect } from "react";
import withAuth from "@/components/withAuthHOC";
import AddProduct from "@/components/AddProduct";
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("products");
  useEffect(() => {
    localStorage.setItem("previousRoute", "admin");
  }, []);
  const renderTabContent = () => {
    switch (activeTab) {
      case "products":
        return <AddProduct />;
      case "orders":
        return <OrdersAdmin />;
      default:
        return <ProductsAdmin />;
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Side Pane */}
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
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded ${
                  activeTab === "orders" ? "bg-gray-700" : "hover:bg-gray-600"
                }`}
              >
                Order Page
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 bg-gray-100">{renderTabContent()}</main>
    </div>
  );
};

const OrdersAdmin = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Orders Management</h1>
      <p className="mb-6">Here you can view and manage orders.</p>
      {/* Sample Order Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Order ID</th>
              <th className="py-2 px-4 border">Customer</th>
              <th className="py-2 px-4 border">Status</th>
              <th className="py-2 px-4 border">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border">12345</td>
              <td className="py-2 px-4 border">John Doe</td>
              <td className="py-2 px-4 border">Pending</td>
              <td className="py-2 px-4 border">$50.00</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default withAuth(AdminPage);
