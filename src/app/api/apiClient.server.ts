"use server";
import axios from "axios";
import { cookies } from "next/headers"; // Only works server-side

const API_BASE_URL = process.env.API_BASE_URL;
const systemKey = process.env.SYSTEM_KEY;

const apiClient = axios.create({
  withCredentials: true,
  headers: {
    "System-Key": systemKey,
  },
  baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    let token: string | undefined;
    try {
      const cookieStore = cookies();
      token = cookieStore.get("agent_token")?.value;
    } catch (err) {
      console.warn("Server-side cookie access failed:", err);
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
