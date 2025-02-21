import axiosInstance from ".";

const ep = "topshiriq/superadmin_oz_sohasida_topshiriq/"; // ep yozilishi kerak

const get = () => axiosInstance.get(ep);

const getbyId = (id) => axiosInstance.get(`${ep}${id}/`);

const post = (item) => {
    return axiosInstance.post(`${ep}`, item);
}

const patch = (id, item) => axiosInstance.patch(`${ep}${id}/`, item);

// const put = (id, item) => axiosInstance.put(`${ep}${id}/`, item);

const del = (id) => axiosInstance.delete(`${ep}${id}/`);

const APISuperadminOzSoxa = {get, getbyId, post, patch, del};

export default APISuperadminOzSoxa;