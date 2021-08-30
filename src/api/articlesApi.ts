import axiosClient from './axiosClient';

const Storage: any = localStorage.getItem('user');
const user = JSON.parse(Storage);

const articlesApi = {
  getAll: (
    offsetParam?: number,
    limitParam?: number,
    tagParam?: string,
    authorNameParam?: string
  ): Promise<ArticleType[]> => {
    const axiosConfig = user
      ? {
          headers: {
            Authorization: 'Bearer ' + user.token,
            params: {
              offset: offsetParam,
              limit: limitParam,
              tag: tagParam,
              author: authorNameParam,
            },
          },
        }
      : {
          headers: {
            params: {
              offset: offsetParam,
              limit: limitParam,
              tag: tagParam,
              author: authorNameParam,
            },
          },
        };
    return axiosClient.get('/articles', axiosConfig);
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
  unfavoriteArticle: (slug: string): Promise<ArticleType> => {
    let Storage: any = localStorage.getItem('user');
    let user = JSON.parse(Storage);
    let axiosConfig = {
      headers: {
        Authorization: 'Bearer ' + user.token,
      },
    };
    return axiosClient.delete(`/articles/${slug}/favorite`, axiosConfig);
  },
};

export default articlesApi;
