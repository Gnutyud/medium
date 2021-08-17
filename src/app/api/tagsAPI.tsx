const baseAPI = "http://localhost:3000/api/";

const tagsAPI = baseAPI + "tags";

export function fetchTags() {
  return fetch(tagsAPI).then((response) => response.json());
}
