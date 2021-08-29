import axiosClient from './axiosClient';

const articleApi = {
  getOne: (slug: string): Promise<ArticleType> => {
    return axiosClient.get(`/articles/${slug}`);
  },
  deleteOne: (slug: string): Promise<ArticleType> => {
    let Storage: any = localStorage.getItem('user');
    let user = JSON.parse(Storage);
    let axiosConfig = {
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    };
    return axiosClient.delete(`/articles/${slug}`, axiosConfig);
  },
};

export default articleApi;
