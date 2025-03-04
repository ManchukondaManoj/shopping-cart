import axios from "axios";
import { auth } from "./firebase"; // Import Firebase auth

// Create an Axios instance
const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}`, // Change this to your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the token
api.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser; // Get the authenticated user
    if (user) {
      const token = await user.getIdToken(); // Get the Firebase token
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor (optional)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
