import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    let Storage: any = localStorage.getItem('user');
    let store = JSON.parse(Storage);
    if (store) {
      config.headers.Authorization = 'Bearer ' + store.token;
    }
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  function (response: AxiosResponse) {
    return response.data;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export default axiosClient;
