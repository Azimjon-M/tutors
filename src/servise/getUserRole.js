import axiosInstance from "./index";

const ep = "users/users/";

const get = () => axiosInstance.get(ep);

const APIGetUserRole = { get };

export default APIGetUserRole;
