import axiosInstance from ".";

const ep = "topshiriq/superadmin_qoshimcha_topshiriq/";

const get = () => axiosInstance.get(ep);

const getbyId = (id) => axiosInstance.get(`${ep}${id}/`);

const post = (item) => {
    return axiosInstance.post(`${ep}`, item);
}

const patch = (id, item) => axiosInstance.patch(`${ep}${id}/`, item);

// const put = (id, item) => axiosInstance.put(`${ep}${id}/`, item);

const del = (id) => axiosInstance.delete(`${ep}${id}/`);

const APISuperAdminQoshTop = {get, getbyId, post, patch, del};

export default APISuperAdminQoshTop;