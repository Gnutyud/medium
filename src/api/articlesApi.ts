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
  addOne: (data: { article: FormInputArticleType }): Promise<FormInputArticleType> => {
    let Storage: any = localStorage.getItem('user');
    let user = JSON.parse(Storage);
    let axiosConfig = {
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    };
    return axiosClient.post('/articles', data, axiosConfig);
  },
  favoriteArticle: (slug: string): Promise<ArticleType> => {
    let Storage: any = localStorage.getItem('user');
    let user = JSON.parse(Storage);
    let axiosConfig = {
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    };
    return axiosClient.post(`/articles/${slug}/favorite`, null, axiosConfig);
  },
};

export default articlesApi;
