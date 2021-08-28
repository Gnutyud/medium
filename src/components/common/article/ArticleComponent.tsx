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
import { blue } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from 'app/hooks';
import { setTag } from 'features/articles/articlesSlice';
import { setInAuthorPage } from 'features/author/authorSlice';
import React from 'react';
import { useHistory, useRouteMatch, Link } from 'react-router-dom';

interface ArticleComponentProps {
  article: ArticleType;
}

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      height: '200px',
      marginBottom: '20px',
      [theme.breakpoints.down('md')]: {
        borderRight: 'none',
      },
    },
    card: {
      display: 'flex',
      justifyContent: 'space-between',
      marginRight: '30px',
      width: '90%',
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        margin: '0',
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
    chip: {
      marginRight: '5px',
    },
    favoritesContainer: {
      width: '100%',
      textAlign: 'right',
    },
    link: {
      textDecoration: 'none',
    },
  })
);

const queryString = require('query-string');

const ArticleComponent: React.FC<ArticleComponentProps> = ({ article }) => {
  const classes = useStyles();
  const history = useHistory();
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  const { author, title, updatedAt, description, favorited, favoritesCount, tagList } = article;

  // update tags from store
  const handleClickTag = (tagLabel: string) => {
    dispatch(setTag(tagLabel));

    // sync url param
    const queryParams = { tag: tagLabel, page: '1' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  // handle event go to author page
  const handleClickAuthor = () => {
    localStorage.setItem('inAuthorPage', 'true');
    dispatch(setInAuthorPage(true));
  };

  return (
    <Box className={classes.root}>
      <Card className={classes.card}>
        <Box className={classes.cardLeft}>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                {author?.username[0].toUpperCase()}
              </Avatar>
            }
            title={
              <Box className={classes.authorName} component="div" display="inline">
                <Link
                  className={classes.link}
                  to={`/author/${author?.username}`}
                  onClick={handleClickAuthor}
                >
                  {author?.username}
                </Link>
              </Box>
            }
            subheader={updatedAt}
          />
          <CardContent>
            <Box className={classes.description} fontWeight="fontWeightMedium">
              {title}
            </Box>
            <Typography variant="body2" color="textSecondary" component="p">
              {description?.slice(0, 20) + ' ...'}
            </Typography>
          </CardContent>
        </Box>

        <Box>
          <CardActions className={classes.cardAction}>
            <Box className={classes.favoritesContainer}>
              {favoritesCount}
              <IconButton aria-label="add to favorites">
                {favorited ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>
            <Box>
              {tagList?.map((tag) => (
                <Chip
                  className={classes.chip}
                  key={nanoid()}
                  label={tag}
                  onClick={() => handleClickTag(tag)}
                />
              ))}
            </Box>
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
};

export default ArticleComponent;
