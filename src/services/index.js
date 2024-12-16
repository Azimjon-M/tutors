import axios from "axios";

// Axios instance yaratish
const axiosInstance = axios.create({
    baseURL: "https://tyutr.pythonanywhere.com/",
    headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
    },
});

// So'rov interceptori (Request Interceptor)
axiosInstance.interceptors.request.use((request) => {
    const data = JSON.parse(localStorage.getItem("data"));
    if (data?.token) {
        request.headers.Authorization = `Bearer ${data.token}`;
    }
    return request;
});

// Javob interceptori (Response Interceptor)
axiosInstance.interceptors.response.use(
    (response) => {
        // Muvaffaqiyatli javobni o'z holida qaytarish
        return response;
    },
    (error) => {
        // Agar xatolik statusi 401 bo'lsa (avtorizatsiya talab qilinadi)
        if (error.response && error.response.status === 401) {
            // Tizimga qayta kirish uchun login sahifasiga yo'naltirish
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
