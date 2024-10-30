
import Axios from "axios";

const baseUrl = 'http://localhost:3000/'

export const heroService = Axios.create({
    baseURL: baseUrl  
});