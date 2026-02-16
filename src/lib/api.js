// src/lib/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "/",          // IMPORTANT: use Vite proxy (relative path)
  withCredentials: true, // send/receive httpOnly cookie
});

export default api;
