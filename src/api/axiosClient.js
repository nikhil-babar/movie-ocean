import axios from "axios";

const apiPath = 'http://localhost:5000'

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

