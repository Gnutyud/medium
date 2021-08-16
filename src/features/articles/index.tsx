import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { articlesAsync, selectArticles } from "./slice/articleSlice";
import { articlesData } from "./data/articlesData";
import { articlesTransform } from "./helpers/articlesDataTransform";
import Article from "./components/Article";

const Articles = () => {
  let articles = useAppSelector(selectArticles);
  const dispatch = useAppDispatch();

  // case articles empty, assign to backup data
  if (!articles.length) articles = articlesData;

  // fetch articles
  useEffect(() => {
    dispatch(articlesAsync());
  }, [dispatch]);

  // articles with id and format data
  articles = articlesTransform(articles);

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
