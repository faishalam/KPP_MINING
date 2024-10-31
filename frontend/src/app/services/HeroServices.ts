
import Axios from "axios";

// const baseUrl = 'http://localhost:3000/'
const baseUrl = 'https://server.kppmonitoring.online/'

export const heroService = Axios.create({
    baseURL: baseUrl
});