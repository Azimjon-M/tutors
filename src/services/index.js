import axios from "axios";
import CryptoJS from "crypto-js";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use((request) => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data?.token) {
        const unShifredToken = CryptoJS.AES.decrypt(
            data?.token,
            process.env.REACT_APP_ENCRYPTION_KEY
        )
            .toString(CryptoJS.enc.Utf8)
            .trim()
            .replace(/^"|"$/g, "");
        request.headers.Authorization = `Bearer ${unShifredToken}`;
    }

    // Set Content-Type dynamically based on the request type
    if (request.data instanceof FormData) {
        request.headers["Content-Type"] = "multipart/form-data";
    } else {
        request.headers["Content-Type"] = "application/json";
    }

    return request;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (
            error.response &&
            error.response.status === 401 &&
            error.response?.data?.code
        ) {
            console.log("ishladim");
            window.location.href = "/not-authorized";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
