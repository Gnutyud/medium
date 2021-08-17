import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Card, CardContent, CardHeader, Chip } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { selectArticles } from "../../app/reducers/articleSlice";
import { articlesData } from "../../helpers/Home/data/articlesData";
import { getTagsList } from "../../helpers/Home/helpers/tagsListPriority";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 330,
    maxWidth: 350,
  },
  container: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "20px",
    width: "100%",
    minHeight: "300px",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  tag: {
    marginRight: "10px",
  },
}));

const TagsBox = () => {
  const classes = useStyles();

  // case articles empty, assign to backup data
  let articles = useAppSelector(selectArticles);
  if (!articles.length) articles = articlesData;

  // get list of tags
  const tagsListFetchFromApi = articles.flatMap((article) => article.tagList);
  const tagsList = getTagsList(tagsListFetchFromApi);

  console.log(tagsList);

  return (
    <Box className={classes.container}>
      <Card className={classes.root}>
        <CardHeader title="Popular Tags" />
        <CardContent>
          {tagsList.map((tag) => {
            return (
              <Chip className={classes.tag} key={tag.id} label={tag.tag} />
            );
          })}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TagsBox;
