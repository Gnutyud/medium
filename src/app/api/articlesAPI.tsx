import axios from "axios";

const baseAPI = "http://localhost:3000/api/";

const articlesAPI = baseAPI + "/articles";

export function fetchArticles() {
  return fetch(articlesAPI).then((response) => response.json());
}

export function postArticle(data: any) {
  let token = localStorage.getItem("token");
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  return axios
    .post(articlesAPI, data, axiosConfig)
    .then((response: any) => response);
}
