import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { articlesAsync, selectArticles } from "../../app/reducers/articleSlice";
import { articlesData } from "../../helpers/Home/data/articlesData";
import { articlesTransform } from "../../helpers/Home/helpers/articlesDataTransform";
import Article from "./Article";
import { Box } from "@material-ui/core";

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
    <Box>
      {articles.map((article) => (
        <li key={article.id}>
          <Article article={article} />
        </li>
      ))}
    </Box>
  );
};

export default Articles;
