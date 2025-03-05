"use client";
import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../../../store/authActions";
import { RootState } from "../../../store/store";
import { useRouter } from "next/navigation";
import GoogleAuthButton from "@/components/GoogleAuth";

interface LoginFormData {
  email: string;
  password: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error, user } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (user) {
      const previousRoute = localStorage.getItem("previousRoute") || "";
      if (previousRoute === "signup") {
        localStorage.removeItem("previousRoute");
        router.push("/");
      } else {
        router.push(`/${previousRoute}`);
      }
    }
  }, [user, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      login({ email: formData.email, password: formData.password }) as any
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-center text-2xl font-bold text-gray-800">Log In</h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 p-3 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-3 text-white font-semibold hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
        <GoogleAuthButton label="" />
      </div>
    </div>
  );
}
