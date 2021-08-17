import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  articlesAsync,
  selectArticles,
} from "../../app/reducers/articlesSlice";
import { articlesTransform } from "../../helpers/Home/helpers/articlesDataTransform";
import Article from "./Article";
import { Box } from "@material-ui/core";

const Articles = () => {
  const dispatch = useAppDispatch();

  // case articles empty, assign to backup data
  const articlesFetchFromApi = useAppSelector(selectArticles);

  // fetch articles
  useEffect(() => {
    dispatch(articlesAsync());
  }, [dispatch]);

  console.log(articlesFetchFromApi);

  // articles with id and format data
  const articles = articlesTransform(articlesFetchFromApi);

  return (
    <Box>
      {articles.map((article) => (
        <li key={article.slug}>
          <Article article={article} />
        </li>
      ))}
    </Box>
  );
};

export default Articles;
