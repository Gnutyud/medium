import axios from 'axios';
import { userPayload } from 'features/auth/authSlice';

const ROOT_URL = 'http://localhost:3000/api/';

const authApi = {
  loginHandler: (userInput: userPayload, endPoint: string): Promise<any> => {
    const userRequest = { user: userInput };
    return axios.post(ROOT_URL + endPoint, userRequest, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'JWT fefege...',
      },
    });
  },
};

export default authApi;
