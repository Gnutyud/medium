import axiosClient from './axiosClient';

const articleApi = {
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
};

export default articleApi;
