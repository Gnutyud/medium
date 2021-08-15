import { ArticleType } from "./articleType";

const dateFormat = require("dateformat");
const formatType = "ddd mmm dS yyyy";

export const articlesWithFormatDate = (articles: ArticleType[]) => {
  return articles.map((article) => {
    return {
      ...article,
      createdAt: dateFormat(article.createdAt, formatType),
      updatedAt: dateFormat(article.updatedAt, formatType),
    };
  });
};
