import Axios from "axios";

// const baseUrl = 'http://34.142.247.224/';
const baseUrl = 'http://localhost:3000/';

export const heroService = Axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
});