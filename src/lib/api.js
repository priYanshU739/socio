// src/lib/api.js
import axios from "axios";

// In production (e.g. Vercel), set VITE_API_URL to your backend (e.g. https://your-api.render.com)
// In dev, empty = use Vite proxy to localhost:4000
const baseURL = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL,
  withCredentials: true, // send/receive httpOnly cookie
});

/** Base URL for API (for fetch/sendBeacon when not using axios) */
export function getApiBase() {
  return baseURL || (typeof window !== "undefined" ? "" : "");
}

export default api;
