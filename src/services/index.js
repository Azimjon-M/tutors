import axios from "axios";

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
        request.headers.Authorization = `Bearer ${data.token}`;
    }
    return request;
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
);

export default axiosInstance;
