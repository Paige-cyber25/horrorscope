import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";


export const baseURL = 'https://horroscope-backend.onrender.com';
console.log(baseURL, 'baseURL');

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

// To be updated
const refreshToken = async () => {
  localStorage.clear();
  window.location.href = "/";
};

// Reseponse interceptor for API calls
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const errStatus = error.response.status;
    const errMsg: string = error.response.data.message;
    if (errStatus === 401 && !originalRequest._retry) {
      if (["Not Authenticated. Bad/Expired Token", "NOT_AUTHENTICATED", "TOKEN_REQUIRED" ].includes(errMsg)) {
        originalRequest._retry = true;
        await refreshToken();
        return api(originalRequest);
      }
    }

    if (error.response) {
      return Promise.reject(error.response.data);
    }
    if (error.request) {
      return Promise.reject(error.request);
    }

    return Promise.reject(error.request);
  }
);
