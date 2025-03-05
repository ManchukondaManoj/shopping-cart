"use client";
import React from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
// import type { RootState } from "../store"; // Adjust the import based on your store location
import { logout } from "@/store/authActions";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const {
  //   user: { userDetails: userInfo },
  // } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);
  const { userDetails: userInfo } = user || {};

  const handleLogout = () => {
    dispatch(logout());
    router.push("/");
  };

  return (
    <header>
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              Shopping Cart
            </Link>

            <div className="hidden md:flex space-x-6 items-center">
              <Link
                href="/cart"
                className="flex items-center hover:text-gray-300"
              >
                <i className="fas fa-shopping-cart mr-1"></i>
                <span>Cart</span>
              </Link>

              {userInfo ? (
                <div className="relative group">
                  <button className="flex items-center hover:text-gray-300 focus:outline-none">
                    <span>
                      {userInfo.displayName || userInfo.name || userInfo.email}
                    </span>
                    <i className="fas fa-caret-down ml-1"></i>
                  </button>
                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <Link
                      href="/updateProfile"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/orders"
                      className="block px-4 py-2 hover:bg-gray-200"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block px-4 py-2 hover:bg-gray-200"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center hover:text-gray-300"
                >
                  <i className="fas fa-user mr-1"></i>
                  <span>Sign In</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
