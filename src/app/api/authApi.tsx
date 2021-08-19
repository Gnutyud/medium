import axios from "axios";

const ROOT_URL = "http://localhost:3000/api/";
export const LoginHandler = (userInput: any, endPoint: string) => {
  return new Promise(async (resolve, reject) => {
    const userRequest = { user: userInput };
    try {
      const res = await axios.post(ROOT_URL + endPoint, userRequest, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "JWT fefege...",
        },
      });
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export function getCurrentUser() {
  let Storage: any = localStorage.getItem("user");
  let user = JSON.parse(Storage);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  };
  return axios
    .get(`${ROOT_URL}/user`, axiosConfig)
    .then((response: any) => response);
}

export function updateCurrentUser(data: any) {
  let Storage: any = localStorage.getItem("user");
  let user = JSON.parse(Storage);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  };
  return axios
    .put(`${ROOT_URL}/user`, data, axiosConfig)
    .then((response: any) => response);
}
