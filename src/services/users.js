import axiosInstance from ".";

const endPoint = process.env.REACT_APP_API_ENDPOINT_USERS

const get = () => axiosInstance.get(endPoint);

const getRole = (role) => axiosInstance.get(`${endPoint}?role=${role}`);

const getFakUsers = (fakultet) => axiosInstance.get(`${endPoint}?fakultet=${fakultet}`);

const getbyId = (id) => axiosInstance.get(`${endPoint}${id}/`);

const post = (item) => {
    return axiosInstance.post(`${endPoint}`, item);
}

const patch = (id, item) => axiosInstance.patch(`${endPoint}${id}/`, item);

const put = (id, item) => axiosInstance.put(`${endPoint}${id}/`, item);

const del = (id) => axiosInstance.delete(`${endPoint}${id}/`);

const APIUsers = {get, getRole, getFakUsers, getbyId, post, patch, put, del};

export default APIUsers;