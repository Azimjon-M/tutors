import axiosInstance from ".";

const endPoint = "users/talaba/";

const get = () => axiosInstance.get(endPoint);

const getbyId = (id) => axiosInstance.get(`${endPoint}${id}/`);

const getbyTutor = (tyutor) => axiosInstance.get(`${endPoint}?tyutor=${tyutor}`);

const post = (item) => {
  return axiosInstance.post(`${endPoint}`, item);
};

const patch = (id, item) => axiosInstance.patch(`${endPoint}${id}/`, item);

const put = (id, item) => axiosInstance.put(`${endPoint}${id}/`, item);

const del = (id) => axiosInstance.delete(`${endPoint}${id}/`);

const APITalaba = { get, getbyId, getbyTutor, post, patch, put, del };

export default APITalaba;
