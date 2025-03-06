// GoogleAuthButton.js
"use client"; // if using Next.js app directory
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signInWithPopupProvider } from "@/store/authActions";

const GoogleAuthButton = ({
  label = "Sign in with Google",
}: {
  label: string;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleGoogleAuth = async () => {
    try {
      dispatch(signInWithPopupProvider("google"));
      router.push("/");
    } catch (error) {
      console.error("Error with Google authentication:", error);
    }
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="cursor-pointer w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
    >
      {label}
    </button>
  );
};

export default GoogleAuthButton;
