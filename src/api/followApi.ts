import axios from 'axios';

const storage: any = localStorage.getItem('user');
const user = JSON.parse(storage);
const axiosConfig = {
  headers: {
    Authorization: 'Bearer ' + user.token,
  },
};

const followApi = {
  followOne: (username: string): Promise<ProfileType> => {
    return axios.post(`/profiles/${username}/follow`, axiosConfig);
  },
  unFollowOne: (username: string): Promise<ProfileType> => {
    return axios.delete(`/profiles/${username}/follow`, axiosConfig);
  },
};

export default followApi;
