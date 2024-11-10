import Axios from "axios";

const baseURL = "https://server.kppmonitoring.online/";

export const AuthServices = Axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
