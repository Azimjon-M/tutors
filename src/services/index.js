import axios from "axios";
import APIRefreshToken from "./refreshToken";
import Decryption from "../components/Decryption";
import Encryption from "../components/Encryption";
const data = JSON.parse(localStorage.getItem("data"));

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        Accept: "application/json",
    },
});

axiosInstance.interceptors.request.use((request) => {
    if (data && data?.token) {
        request.headers.Authorization = `Bearer ${Decryption(
            data?.token,
            process.env.REACT_APP_ENCRYPTION_KEY
        )}`;
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
                    (async () => {
                        try {
                            const res = await APIRefreshToken.post({
                                refresh: RefToken,
                            });
                            const newData = JSON.stringify({
                                ...data,
                                token: Encryption(
                                    res.data.access,
                                    process.env.REACT_APP_ENCRYPTION_REFKEY
                                ),
                            });
                            localStorage.setItem("data", newData);
                        } catch (error) {
                            console.log(error);
                        }
                    })();
                } else {
                    window.location.href = "/not-authorized";
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
