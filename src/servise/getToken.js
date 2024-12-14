import axiosInstance from "./index";

const ep = "api/token/";

const post = (item) => axiosInstance.post(ep, item);

const APIGetToken = { post };

export default APIGetToken;
