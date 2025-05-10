import Axios from "axios";

// const baseURL = "http://localhost:3000/";
const baseURL = "https://kppassetmanagement.cloud/";

export const AuthServices = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
