import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://immortal1-1.onrender.com/api",
  withCredentials: true,
});


