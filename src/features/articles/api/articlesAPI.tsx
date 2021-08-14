const baseAPI = 'http://localhost:3000/api/';

const articlesAPI = baseAPI + '/articles';

export function fetchArticles() {
  return fetch(articlesAPI).then(response => response.json());
}