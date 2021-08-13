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
        localStorage.setItem("token", res.data.user.token);
      }
    } catch (error) {
      reject(error);
    }
  });
};
