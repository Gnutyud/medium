import axiosClient from './axiosClient';

const articlesApi = {
  getAll: (
    offsetParam?: number,
    limitParam?: number,
    tagParam?: string
  ): Promise<ArticleType[]> => {
    return axiosClient.get('/articles', {
      params: {
        offset: offsetParam,
        limit: limitParam,
        tag: tagParam,
      },
    });
  },
  getOne: (slug: string): Promise<ArticleType> => {
    return axiosClient.get(`/article${slug}`);
  },
};

export default articlesApi;
