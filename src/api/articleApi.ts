import axiosClient from './axiosClient';

const articleApi = {
  getOne: (slug: string): Promise<ArticleType> => {
    return axiosClient.get(`/articles/${slug}`);
  },
  deleteOne: (slug: string): Promise<ArticleType> => {
    return axiosClient.delete(`/articles/${slug}`);
  },
  updateOne: (slug: string, data: FormInputArticleType): Promise<ArticleType> => {
    return axiosClient.put(`/articles/${slug}`, data);
  },
};

export default articleApi;
