import axiosInstance from "./index";

const ep = "users/users/";

const get = (username, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    return axiosInstance.get(`${ep}?username=${username}`, config);
};

const getTutor = () =>  axiosInstance.get(`${ep}?role=tutor`);

const APIGetTutor = { get, getTutor };

export default APIGetTutor;
