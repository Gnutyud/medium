import axios from "axios";

const ROOT_URL = "http://localhost:3000/api/";
export const LoginHandler = (userInput: any, endPoint: string) => {
  // const isRegister = useSelector((state: RootState) => state.auth.isRegister);
  // let url;
  // if (isRegister) {
  //   url = REGISTER_URL;
  // } else {
  //   url = LOGIN_URL;
  // }
  // console.log(url);
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
      console.log(res);
      if (res.statusText === "OK") {
        console.log(res.data);
        localStorage.setItem("token", res.data.user.token);
      }
    } catch (error) {
      reject(error);
    }
  });
};
