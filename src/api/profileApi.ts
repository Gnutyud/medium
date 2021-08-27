import axios from 'axios';
const ROOT_URL = 'http://localhost:3000/api/';

export function fetchProfile(username: string) {
  let Storage: any = localStorage.getItem('user');
  let user = JSON.parse(Storage);
  let profileUrl = ROOT_URL + 'profiles/' + username;
  let axiosConfig = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + user.token,
    },
  };
  return axios.get(profileUrl, axiosConfig).then((response: any) => response);
}
