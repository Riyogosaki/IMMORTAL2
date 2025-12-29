import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://immortal1-1.onrender.com/api" : "/api",
  withCredentials: true,
});