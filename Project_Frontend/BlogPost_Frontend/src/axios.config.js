import axios from "axios";
if (import.meta.env.VITE_BACKEND_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
} else if (import.meta.env.DEV) { // If in development mode (locally) and VITE_BACKEND_URL is not set
  // This means you are relying on the vite.config.js proxy for local dev
  // Setting base URL to '/' ensures that '/api/v1/...' correctly hits the proxy
  axios.defaults.baseURL = '/';
}
// For production, VERCEL_BACKEND_URL should *always* be set.

// Set withCredentials globally if all your requests need it
axios.defaults.withCredentials = true;

export default axios;