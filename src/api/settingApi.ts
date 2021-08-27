import axiosClient from './axiosClient';

const settingApi = {
  getCurrentUser: (): Promise<any> => {
    let Storage: any = localStorage.getItem('user');
    let user = JSON.parse(Storage);
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    return axiosClient.get(`/user`, axiosConfig);
  },
  updateCurrentUser: (data: { user: any }): Promise<any> => {
    let Storage: any = localStorage.getItem('user');
    let user = JSON.parse(Storage);
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + user.token,
      },
    };
    return axiosClient.put(`/user`, data, axiosConfig);
  },
};

export default settingApi;
