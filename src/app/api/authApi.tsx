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
      if (res.statusText === "OK") {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data.user));
      }
    } catch (error) {
      reject(error);
    }
  });
};

export function getCurrentUser() {
  let token = localStorage.getItem("token");
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return axios
    .get(`${ROOT_URL}/user`, axiosConfig)
    .then((response: any) => response);
}

export function updateCurrentUser(data: any) {
  let token = localStorage.getItem("token");
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return axios
    .put(`${ROOT_URL}/user`, data, axiosConfig)
    .then((response: any) => response);
}
