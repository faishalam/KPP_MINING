import Axios from "axios";

const baseURL = "https://kppassetmanagement.cloud/";

export const AuthServices = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
