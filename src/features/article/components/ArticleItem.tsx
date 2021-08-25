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
import { grey, blue } from '@material-ui/core/colors';
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
      marginRight: '50px',
      borderRight: '1px solid',
      borderRightColor: grey[400],
      [theme.breakpoints.down('md')]: {
        borderRight: 'none',
      },
    },
    card: {
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: '30px',
      width: '90%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
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
      backgroundColor: blue[400],
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

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
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
    </Box>
  );
};

export default ArticleItem;
