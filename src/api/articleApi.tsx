import axiosClient from './axiosClient';

const articleApi = {
  getOne: (slug: string): Promise<ArticleType> => {
    console.log(slug);

    return axiosClient.get(`/articles/${slug}`);
  },
};

export default articleApi;
