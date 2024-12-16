import axios from "axios";
import { Navigate } from "react-router-dom";
const axiosInstance = axios.create({
    baseURL: "https://tyutr.pythonanywhere.com/",
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use(async (request) => {
    const data = localStorage.getItem("data");
    if (data?.token) {
        request.headers.Authorization = `Bearer ${data.token}`;
    }
    return request;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response && error.response.status === 401) {
            <Navigate to={"/login"} />;
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
