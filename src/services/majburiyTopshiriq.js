import axiosInstance from ".";

const endPoint = "topshiriq/majburiy/";

const get = () => axiosInstance.get(endPoint);

const getbyId = (id) => axiosInstance.get(`${endPoint}${id}/`);

const getActiveByTur = (tur, username) => axiosInstance.get(`${endPoint}?tur=${tur}&user__username=${username}`);

const post = (item) => {
  return axiosInstance.post(`${endPoint}`, item);
};

const patch = (id, item) => axiosInstance.patch(`${endPoint}${id}/`, item);

const put = (id, item) => axiosInstance.put(`${endPoint}${id}/`, item);

const del = (id) => axiosInstance.delete(`${endPoint}${id}/`);

const APIMajburiyTopshiriq = { get, getbyId, getActiveByTur, post, patch, put, del };

export default APIMajburiyTopshiriq;
