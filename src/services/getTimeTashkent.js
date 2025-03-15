import axios from "axios";

const Link = "https://timeapi.io/api/time/current/zone?timeZone=Asia%2FTashkent";
// const get 

const axiosInstance = axios.create({
    baseURL: Link,
    headers: {
        Accept: "application/json",
    },
});

// axiosInstance.interceptors.response.use(response =>  response);
// axiosInstance.interceptors.request.use(request =>  request);

const Get = () => axiosInstance.get();

export default Get;