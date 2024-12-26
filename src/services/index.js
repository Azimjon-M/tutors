import axios from "axios";
import CryptoJS from "crypto-js";

const axiosInstance = axios.create({
    baseURL: "https://tyutr.pythonanywhere.com/",
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use((request) => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data?.token) {
        const unShifredToken = CryptoJS.AES.decrypt(data?.token, "token-001")
                .toString(CryptoJS.enc.Utf8)
                .trim().replace(/^"|"$/g, '');
        request.headers.Authorization = `Bearer ${unShifredToken}`;
    }
    return request;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
);

export default axiosInstance;
