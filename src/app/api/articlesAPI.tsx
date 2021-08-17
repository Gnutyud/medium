import axios from "axios";

const baseAPI = "http://localhost:3000/api";

const articlesAPI = baseAPI + "articles";

export function fetchArticles() {
  return fetch(articlesAPI).then((response) => response.json());
}

export function postArticle(data: any) {
  let Storage: any = localStorage.getItem("user");
  let user = JSON.parse(Storage);
  let axiosConfig = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + user.token,
    },
  };
  return axios
    .post(articlesAPI, data, axiosConfig)
    .then((response: any) => response);
}
