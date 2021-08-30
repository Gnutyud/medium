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
  updateOne: (slug: string, data: FormInputArticleType): Promise<ArticleType> => {
    let Storage: any = localStorage.getItem('user');
    let user = JSON.parse(Storage);
    let axiosConfig = {
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    };
    return axiosClient.put(`/articles/${slug}`, data, axiosConfig);
  },
};

export default articleApi;
