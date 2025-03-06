"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/store/authActions";

// Adjust the RootState import as needed
// import type { RootState } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth); // Assuming state.auth is available
  const [userInfo, setUserInfo] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userInfoHasKeys = Object.keys(userInfo || {}).length > 0;

  useEffect(() => {
    setUserInfo(user);
  }, [user]);

  const handleLogout = () => {
    setDropdownOpen(false);
    dispatch(logout());
    router.push("/");
  };

  // Open dropdown when mouse enters the container
  const handleMouseEnter = () => {
    setDropdownOpen(true);
  };

  // Close dropdown when mouse leaves the container
  const handleMouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <header>
      <nav className="bg-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold">
              Easy Shop
            </Link>
            <div className="hidden md:flex space-x-6 items-center">
              <Link
                onClick={() => setDropdownOpen(false)}
                href="/cart"
                className="flex items-center hover:text-gray-300"
              >
                <i className="fas fa-shopping-cart mr-1"></i>
                <span>Cart</span>
              </Link>
              {userInfo && userInfoHasKeys ? (
                <div className="relative" onMouseEnter={handleMouseEnter}>
                  <button className="cursor-pointer flex items-center hover:text-gray-300 focus:outline-none">
                    <span>
                      {userInfo.displayName || userInfo.name || userInfo.email}
                    </span>
                    <i className="fas fa-caret-down ml-1"></i>
                  </button>
                  {dropdownOpen && (
                    <div
                      className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg transition-opacity z-10"
                      onMouseLeave={handleMouseLeave}
                    >
                      {userInfo.isAdmin && (
                        <Link
                          onClick={() => setDropdownOpen(false)}
                          href="/admin"
                          className="cursor-pointer block px-4 py-2 hover:bg-gray-200"
                        >
                          Admin Page
                        </Link>
                      )}
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        href="/updateProfile"
                        className="cursor-pointer block px-4 py-2 hover:bg-gray-200"
                      >
                        Update Profile
                      </Link>
                      <Link
                        onClick={() => setDropdownOpen(false)}
                        href="/orders"
                        className="block cursor-pointer px-4 py-2 hover:bg-gray-200"
                      >
                        My Orders
                      </Link>
                      <div
                        onClick={handleLogout}
                        className="w-full cursor-pointer text-left block px-4 py-2 hover:bg-gray-200"
                      >
                        Log Out
                      </div>
                    </div>
                  )}
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
