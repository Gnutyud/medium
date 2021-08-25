import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  createStyles,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';

interface ArticleItemProps {
  article: ArticleType;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '200px',
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'space-between',
    },
    cardLeft: {
      flex: '1',
    },
    authorName: {
      fontWeight: 600,
      fontSize: '1.2rem',
    },
    description: {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    avatar: {
      backgroundColor: red[500],
    },
    cardAction: {
      height: '80%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    },
  })
);

const ArticleItem: React.FC<ArticleItemProps> = ({ article }) => {
  const classes = useStyles();

  const {
    author: { username },
    title,
    body,
    updatedAt,
    description,
    favorited,
    favoritesCount,
    tagList,
  } = article;

  console.log(favoritesCount);
  return (
    <Card className={classes.root}>
      <Box className={classes.cardLeft}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {username[0].toUpperCase()}
            </Avatar>
          }
          title={
            <Box className={classes.authorName} component="div" display="inline">
              {title}
            </Box>
          }
          subheader={updatedAt}
        />
        <CardContent>
          <Box className={classes.description} fontWeight="fontWeightMedium">
            {description}
          </Box>
          <Typography variant="body2" color="textSecondary" component="p">
            {body.slice(0, 20) + ' ...'}
          </Typography>
        </CardContent>
      </Box>

      <Box>
        <CardActions className={classes.cardAction}>
          <Box>
            {favoritesCount}
            <IconButton aria-label="add to favorites">
              {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>
          </Box>
          <Box>
            {tagList.map((tag) => (
              <Chip key={nanoid()} label={tag} />
            ))}
          </Box>
        </CardActions>
      </Box>
    </Card>
  );
};

export default ArticleItem;
