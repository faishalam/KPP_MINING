import Axios from "axios";
import Cookies from "js-cookie"; 

// const baseURL = "https://kppassetmanagement.cloud/";
const baseURL = "http://localhost:3000/";

export const HeroServices = Axios.create({
  baseURL: baseURL,
  headers: { 
    "Content-Type": "application/json",
  },
});

HeroServices.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? Cookies.get("Authorization") : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
