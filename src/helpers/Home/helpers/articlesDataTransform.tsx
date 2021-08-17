import { Type } from "../type/Type";

const dateFormat = require("dateformat");
const formatType = "ddd mmm dS yyyy";

// articles transform
export const articlesTransform = (articles: Type[]): Type[] => {
  return articles.map((article) => {
    return {
      ...article,
      createdAt: article.createdAt
        ? dateFormat(article.createdAt, formatType)
        : null,
      updatedAt: article.updatedAt
        ? dateFormat(article?.updatedAt, formatType)
        : null,
    };
  });
};
