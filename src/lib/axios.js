import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://immortal1-2.onrender.com",
  withCredentials: true,
});


