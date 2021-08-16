import { nanoid } from "@reduxjs/toolkit";
import { ArticleType, TagType } from "../type/ArticleType";

const dateFormat = require("dateformat");
const formatType = "ddd mmm dS yyyy";

// articles transform
export const articlesTransform = (articles: ArticleType[]): ArticleType[] => {
  return articles.map((article) => {
    return {
      ...article,
      id: nanoid(),
      createdAt: dateFormat(article.createdAt, formatType),
      updatedAt: dateFormat(article.updatedAt, formatType),
    };
  });
};

// articles tag transform
export const articlesTagsTransform = (tags: string[]): TagType[] => {
  return tags.map((tag) => {
    return {
      id: nanoid(),
      tag,
    };
  });
};
