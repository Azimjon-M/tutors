import axiosInstance from ".";

const endPoint = "topshiriq/superadmin_qoshimcha_topshiriq/";

const get = () => axiosInstance.get(endPoint);

const getByPage = (page) => axiosInstance.get(`${endPoint}?page=${page}`);

const getbyId = (id) => axiosInstance.get(`${endPoint}${id}/`);

const post = (item) => {
    return axiosInstance.post(`${endPoint}`, item);
};

const patch = (id, item) => axiosInstance.patch(`${endPoint}${id}/`, item);

const put = (id, item) => axiosInstance.put(`${endPoint}${id}/`, item);

const del = (id) => axiosInstance.delete(`${endPoint}${id}/`);

const APISuperadminQoshimcha = { get, getbyId, getByPage, post, patch, put, del };

export default APISuperadminQoshimcha;
