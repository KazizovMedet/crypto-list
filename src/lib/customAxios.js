import axios from "axios";

export const http = axios.create({
  baseURL: "/api",
  timeout: 15000,
  headers: { "Accept": "application/json" },
});

http.interceptors.response.use(
  (r) => r,
  (error) => {
    const message =
      error?.response?.data?.message || error.message || "Network error";
    return Promise.reject(new Error(message));
  }
);
