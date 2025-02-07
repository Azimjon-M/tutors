import axiosInstance from "./index";

const ep = "api/token/refresh/"

const post = (item) => axiosInstance.post(ep, item);

const APIRefreshToken = { post };

export default APIRefreshToken;
