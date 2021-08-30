import axios from 'axios';

const followApi = {
  followOne: (username: string): Promise<ProfileType> => {
    return axios.post(`/profiles/${username}/follow`);
  },
  unFollowOne: (username: string): Promise<ProfileType> => {
    return axios.delete(`/profiles/${username}/follow`);
  },
};

export default followApi;
