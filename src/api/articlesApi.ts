import axiosClient from './axiosClient';

const articlesApi = {
  getAll: (
    offsetParam?: number,
    limitParam?: number,
    tagParam?: string,
    authorNameParam?: string
  ): Promise<ArticleType[]> => {
    return axiosClient.get('/articles', {
      params: {
        offset: offsetParam,
        limit: limitParam,
        tag: tagParam,
        author: authorNameParam,
      },
    });
  },
  getOne: (slug: string): Promise<ArticleType> => {
    return axiosClient.get(`/article/${slug}`);
  },
};

export default articlesApi;
