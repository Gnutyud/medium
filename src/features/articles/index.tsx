import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { articlesAsync, selectArticles } from "./slice/articleSlice";
import { articlesData } from "./data/articlesData";
import { articlesWithFormatDate } from "./helpers/articleDate";
import Article from "./components/Article";

const Articles = () => {
  let articles = useAppSelector(selectArticles);
  const dispatch = useAppDispatch();

  // fetch articles
  useEffect(() => {
    dispatch(articlesAsync());
  }, [dispatch]);

  // case articles empty, assign to backup data
  if (!articles.length) articles = articlesData;

  // articles with format date
  articles = articlesWithFormatDate(articles);

  return (
    <div>
      {articles.map((article) => (
        <li key={article.id}>
          <Article article={article} />
        </li>
      ))}
    </div>
  );
};

export default Articles;
