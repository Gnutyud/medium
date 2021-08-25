import axiosClient from './axiosClient';

const articleApi = {
  getAll: (offsetParam?: number, limitParam?: number): Promise<ArticleType[]> => {
    return axiosClient.get('/articles', {
      params: {
        offset: offsetParam,
        limit: limitParam,
      },
    });
  },
};

export default articleApi;
