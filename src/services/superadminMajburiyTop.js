import axiosInstance from ".";

const endPoint = "topshiriq/superadmin_majburiy_topshiriq/";

const get = () => axiosInstance.get(endPoint);

// const getbyId = (id) => axiosInstance.get(`${endPoint}${id}/`);

const post = (item) => {
    return axiosInstance.post(`${endPoint}`, item);
}

const patch = (id, item) => axiosInstance.patch(`${endPoint}${id}/`, item);

const put = (id, item) => axiosInstance.put(`${endPoint}${id}/`, item);

const del = (id) => axiosInstance.delete(`${endPoint}${id}/`);

const APIMajburiyTop = {get, post, patch, put, del};

export default APIMajburiyTop;