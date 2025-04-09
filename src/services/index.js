import axios from "axios";
import Decryption from "../components/Decryption";
import Encryption from "../components/Encryption";


const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
});

const getData = () => JSON.parse(localStorage.getItem("data") || "{}");

axiosInstance.interceptors.request.use((request) => {
    const data = getData();
    if (data?.token) {
        request.headers.Authorization = `Bearer ${Decryption(
            data?.token,
            process.env.REACT_APP_ENCRYPTION_KEY
        )}`;
    }

    if (request.data instanceof FormData) {
        request.headers["Content-Type"] = "multipart/form-data";
    } else {
        request.headers["Content-Type"] = "application/json";
    }

    return request;
});

const ep = "api/token/refresh/";
const post = (item) => axiosInstance.post(ep, item);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        console.log("error ishlamoqda !", error)
        if (
            error.response &&
            error.response.status === 401 &&
            error.response?.data?.code
        ) {
            const data = getData();
            const RefToken = Decryption(
                data?.refToken,
                process.env.REACT_APP_ENCRYPTION_REFKEY
            );
            const endRefToken = data?.endRefToken;
            if (endRefToken) {
                const now = new Date();
                const nowDate = now.toISOString().split("T")[0]; // YYYY-MM-DD
                const nowHour = now.toTimeString().split(" ")[0].slice(0, 5); // HH:MM
                if (
                    nowDate < endRefToken.date ||
                    (nowDate === endRefToken.date && nowHour < endRefToken.hour)
                ) {
                    console.log("vaqti tugadi tokenni !")
                    try {
                        const res = await post({ refresh: RefToken });
                        const newData = JSON.stringify({
                            ...data,
                            token: Encryption(
                                res.data.access,
                                process.env.REACT_APP_ENCRYPTION_KEY
                            ),
                        });
                        localStorage.setItem("data", newData);
                        window.location.reload();
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    window.location.href = "/not-authorized";
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;