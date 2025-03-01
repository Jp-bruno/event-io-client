import axios from "axios";

const axiosBase = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:4000" : "",
    headers: {"Content-Type": "application/json"},
    withCredentials: true,
})

export const axiosBaseFileUpload = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://localhost:4000" : "",
    headers: {"Content-Type": "multipart/form-data"},
    withCredentials: true,
})

export default axiosBase;