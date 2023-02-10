import axios from "axios";

const apiPath = 'https://movie-ocean-api.onrender.com'

export const axiosClient = axios.create({
    baseURL: apiPath,
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
})

export const axiosPrivateClient = axios.create({
    baseURL: apiPath,
    headers: {
        'Content-type': 'application/json'
    },
    withCredentials: true
})

