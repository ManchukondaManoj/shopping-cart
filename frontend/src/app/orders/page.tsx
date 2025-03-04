// pages/orders.tsx (or app/orders/page.tsx if using the App Router)
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import api from "@/lib/axiosInterceptors";

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface OrderItem {
  product: string;
  name: string;
  image: string;
  price: number;
  countInStock: number;
  qty: number;
}

interface Order {
  orderId: string;
  userId: string;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  items: OrderItem[];
  totalPrice: string;
  createdAt: number;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // For demonstration, we're using a hardcoded userId.
  // In a real app, you'll get this from your auth context or state.

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await api(`/orders`);
        setOrders(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p>
          No orders found.{" "}
          <Link href="/">
            <a className="text-blue-500 hover:underline">Go shopping</a>
          </Link>
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.orderId}
              className="border rounded shadow-md p-4 bg-white"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">
                    Order ID: {order.orderId}
                  </h2>
                  <p className="text-gray-600">
                    Placed on: {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold">${order.totalPrice}</p>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Shipping Address</h3>
                <p>{order.shippingAddress.address}</p>
                <p>
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.country}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Payment Method</h3>
                <p>{order.paymentMethod}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Items</h3>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.product}
                      className="flex items-center space-x-4 border-b pb-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.qty}</p>
                      </div>
                      <div className="text-lg font-bold">${item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
