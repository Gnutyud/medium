import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  createStyles,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import React from "react";
import { Type } from "../../helpers/Home/type/Type";
import { nanoid } from "@reduxjs/toolkit";

interface ArticleProps {
  article: Type;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: "80%",
      margin: "20px auto",
      maxHeight: 300,
      border: "0.5px solid gray",
    },
    avatar: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    description: {
      marginTop: "10px",
    },
    readMore: {
      fontSize: "16px",
      marginTop: "20px",
      cursor: "pointer",
    },
    cardContent: {
      display: "flex",
      justifyContent: "space-between",
    },
    cardContentRight: { display: "flex", alignItems: "flex-end" },
    cardContentRightText: {
      marginRight: "7px",
      fontSize: "13px",
    },
  })
);

const Article: React.FC<ArticleProps> = ({ article }) => {
  const classes = useStyles();
  // article info
  const {
    author: { username, image },
    createdAt,
    title,
    description,
    favoritesCount,
    tagList,
  } = article;

  return (
    <>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe">
              <img src={image} alt="avatar" className={classes.avatar} />
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <FavoriteIcon /> <Typography>{favoritesCount}</Typography>
            </IconButton>
          }
          title={username}
          subheader={createdAt}
        />
        <CardContent className={classes.cardContent}>
          <Box>
            <Typography variant="h5" color="textSecondary" component="p">
              {title}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="textSecondary"
              className={classes.description}
            >
              {description}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              color="textSecondary"
              className={classes.readMore}
            >
              Read more...
            </Typography>
          </Box>
          <Box className={classes.cardContentRight}>
            {tagList.map((tag) => (
              <Chip
                key={nanoid()}
                label={tag}
                className={classes.cardContentRightText}
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default Article;
