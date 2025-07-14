import axios from "axios";
import Cookies from "js-cookie";
const API_BASE_URL = "https://ds.reconnaissancetechnologies.com/api/v2";
const apiClient = axios.create({
  withCredentials: true,
  headers: {
    "System-Key": "1234",
    "Content-Type": "application/json",
  },
  baseURL: API_BASE_URL,
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token =
      Cookies.get("token") ||
      "8|h0YBeDc8ErIGxFpfp2P4ktP0N0Anu3WRcZEFoq6Kc573c9e2";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
