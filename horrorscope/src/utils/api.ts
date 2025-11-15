import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { refreshToken } from "./utils";


export const baseURL = 'https://horroscope-backend.onrender.com';

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor for API Calls
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const token = user?.accessToken;
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Reseponse interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Safety check for error response existence
    if (!error.response) {
      return Promise.reject(error);
    }
    
    const errStatus = error.response.status;

    // Check for 401 status and trigger logout immediately.
    // We remove the dependency on checking the specific error message (errMsg).
    if (errStatus === 401) {
      console.error("401 Unauthorized detected. Triggering user logout.");
      
      // Call the logout function (refreshToken in your setup)
      await refreshToken(); 
      
      // Stop the error from propagating further (e.g., to the useQuery hook)
      // We reject with a custom error message, or simply stop execution.
      // Rejecting the promise is the standard way to exit the interceptor on error.
      return Promise.reject(new Error("Unauthorized access. User logged out."));
    }
    
    // Handle other errors (400, 403, 404, 500, etc.)
    // If error.response.data exists, reject with it. Otherwise, reject the response object.
    return Promise.reject(error.response.data || error.response);
  }
);