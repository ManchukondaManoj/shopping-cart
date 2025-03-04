"use client";
import React, { useEffect, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/Image";
import Link from "next/link";
import { useRouter, useParams, useSearchParams } from "next/navigation";
// import Message from "../components/Message";
import { addToCart, removeFromCart } from "../../../store/cartActions";
import { updateCartInitialState } from "@/store/cartActions";
// import type { RootState } from "../store";

const CartScreen = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id = [] } = useParams();
  const searchParams = useSearchParams();
  const productId = id[0];
  const qty = searchParams.get("qty"); // returns a string or null if not set

  const cart = useSelector((state: RootState) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { cartItems } = cart;

  useEffect(() => {
    dispatch(updateCartInitialState());
  }, []);

  useEffect(() => {
    if (typeof productId === "string" && productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    if (!user) {
      router.push("/login");
    } else {
      router.push("/checkout");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:space-x-8">
        <div className="md:w-2/3">
          <h1 className="text-2xl font-bold mb-4">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <Link href="/" className="text-blue-500 hover:underline">
              Go Back
            </Link>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product}
                  className="flex items-center space-x-4 border p-4 rounded"
                >
                  <div className="w-16 h-16 flex-shrink-0">
                    <Image
                      width={640}
                      height={640}
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product}`}
                      className="text-lg font-medium text-blue-500 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div className="w-20 text-center">${item.price}</div>
                  <div>
                    <select
                      value={item.qty}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
                      }
                      className="border rounded p-1"
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="md:w-1/3 mt-8 md:mt-0">
          <div className="bg-white shadow-md rounded p-4">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-bold">
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
                items)
              </h2>
              <p className="text-lg">
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </div>
            <button
              type="button"
              onClick={checkoutHandler}
              disabled={cartItems.length === 0}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded disabled:opacity-50 hover:bg-blue-600 transition-colors"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
