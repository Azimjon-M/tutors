import axiosInstance from ".";

const endPoint = "users/fakultet/";

const get = () => axiosInstance.get(endPoint);

const getbyId = (id) => axiosInstance.get(`${endPoint}${id}/`);

const post = (item) => {
    return axiosInstance.post(`${endPoint}`, item);
}

const patch = (id, item) => axiosInstance.patch(`${endPoint}${id}/`, item);

const put = (id, item) => axiosInstance.put(`${endPoint}${id}/`, item);

const del = (id) => axiosInstance.delete(`${endPoint}${id}/`);

const APIFakultet = {get, getbyId, post, patch, put, del};

export default APIFakultet;