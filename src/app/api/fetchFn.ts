import axios from "axios";

export const fetchFn = async (url: string, params?: string) => {
  const response = await axios.get(`${url}${params ? `?${params}` : ""}`);
  return response;
};
