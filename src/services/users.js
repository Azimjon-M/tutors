import axiosInstance from ".";

const endPoint = process.env.REACT_APP_API_ENDPOINT_USERS

const get = () => axiosInstance.get(endPoint);

const getRole = (role) => axiosInstance.get(`${endPoint}?role=${role}`);

const getFakTutors = (fakultet) => axiosInstance.get(`${endPoint}?role=tutor&fakultet=${fakultet}`);

const getbyId = (id) => axiosInstance.get(`${endPoint}${id}/`);

const post = (item) => {
    return axiosInstance.post(`${endPoint}`, item);
}

const patch = (id, item) => axiosInstance.patch(`${endPoint}${id}/`, item);

const put = (id, item) => axiosInstance.put(`${endPoint}${id}/`, item);

const del = (id) => axiosInstance.delete(`${endPoint}${id}/`);

const APIUsers = {get, getRole, getFakTutors, getbyId, post, patch, put, del};

export default APIUsers;