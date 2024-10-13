import Axios from "axios";

const baseUrl = 'https://server.kppmonitoring.online/';
// const baseUrl = 'http://localhost:3000/';
// const baseUrl = 'http://13.229.58.126/';

export const heroService = Axios.create({
    baseURL: baseUrl,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
});