import Axios from "axios";
import Cookies from "js-cookie"; 

// const baseUrl = 'http://localhost:3000/'
const baseURL = "https://server.kppmonitoring.online/";

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
