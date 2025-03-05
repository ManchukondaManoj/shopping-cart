"use client";

import React, { useEffect, useState } from "react";
import { checkout } from "@/store/checkoutActions";

import { useDispatch, useSelector } from "react-redux";
import withAuth from "@/components/withAuthHOC";
import { useRouter } from "next/navigation";

const CheckoutScreen: React.FC = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("Cash");

  const dispatch = useDispatch();
  const router = useRouter();
  const { isOrderPlaced } = useSelector((state) => state.checkoutReducer);

  useEffect(() => {
    if (isOrderPlaced) {
      router.push("/orders");
    }
  }, [isOrderPlaced, router]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const shippingAddress = { address, city, postalCode, country };
    dispatch(checkout(shippingAddress, paymentMethod));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left Column: Shipping Address */}
          <div className="md:w-2/3 bg-white shadow-md rounded p-6 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-gray-700 font-medium mb-2"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="city"
                className="block text-gray-700 font-medium mb-2"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="postalCode"
                className="block text-gray-700 font-medium mb-2"
              >
                Postal Code
              </label>
              <input
                type="text"
                id="postalCode"
                placeholder="Enter your postal code"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="country"
                className="block text-gray-700 font-medium mb-2"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                placeholder="Enter your country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Column: Payment Method */}
          <div className="md:w-1/3 bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="cash"
                  value="Cash"
                  checked={paymentMethod === "Cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="cash" className="text-gray-700">
                  Cash
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  id="card"
                  value="Card"
                  checked={paymentMethod === "Card"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="card" className="text-gray-700">
                  Card
                </label>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default withAuth(CheckoutScreen);
