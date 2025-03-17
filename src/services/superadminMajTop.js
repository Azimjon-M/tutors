import axiosInstance from ".";

const endPoint = "topshiriq/superadmin_majburiy_topshiriq/";

const get = () => axiosInstance.get(endPoint);

const getbyId = (id) => axiosInstance.get(`${endPoint}${id}/`);

const getByMonth = (typeMajTop, startTime, endTime) =>
    axiosInstance.get(
        `${endPoint}?majburiy_topshiriq_turi=${typeMajTop}&boshlanish_vaqti=${startTime}&tugash_vaqti=${endTime}`
    );

const post = (item) => {
    return axiosInstance.post(`${endPoint}`, item);
};

const patch = (id, item) => axiosInstance.patch(`${endPoint}${id}/`, item);

const put = (id, item) => axiosInstance.put(`${endPoint}${id}/`, item);

const del = (id) => axiosInstance.delete(`${endPoint}${id}/`);

const APISuperadminMajTop = { get, getbyId, getByMonth, post, patch, put, del };

export default APISuperadminMajTop;
