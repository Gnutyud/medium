import { Avatar, Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound } from 'components/common';
import Loading from 'components/common/Loading';
import { getListArticle, selectListArticles } from 'features/articles/articlesSlice';
import { nanoid } from 'nanoid';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getArticle, selectArticle, selectError, selectIsloading } from '../articleSlice';
import SidebarDetail from '../components/SidebarDetail';

const useStyle = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    fontSize: '40px',
    marginBottom: '30px',
  },
  description: {
    fontSize: '25px',
    marginBottom: '20px',
    color: 'rgba(117, 117, 117, 1);',
  },
  avatar: {
    lineHeight: '40px',
    marginLeft: '10px',
    color: 'green',
    textDecoration: 'none',
    '&:hover': {
      transform: 'scale(1.2)',
      transition: 'all 0.5s',
      margin: '0 10px',
      cursor: 'pointer',
    },
  },
  avatarDate: {
    lineHeight: '40px',
    marginLeft: '10px',
  },
}));

function DetailArticle() {
  const { slug }: { slug: string } = useParams();
  const article = useAppSelector(selectArticle);
  const isloading = useAppSelector(selectIsloading);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  // test
  const articleList = useAppSelector(selectListArticles);
  const currentArticle = articleList.find((item) => item.slug === slug);
  const body = article.body ? article.body.split('\n') : [];
  React.useEffect(() => {
    dispatch({
      type: getArticle.type,
      payload: slug,
    });
    dispatch({
      type: getListArticle.type,
      payload: {
        offset: 0,
      },
    });
  }, [dispatch, slug]);

  const classes = useStyle();

  if (isloading) {
    return <Loading />;
  } else if (error) {
    return <NotFound />;
  } else {
    return (
      article && (
        <div style={{ marginTop: '50px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              {currentArticle && <SidebarDetail article={currentArticle} />}
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" className={classes.title}>
                {article.title}
              </Typography>
              <Typography variant="h5" className={classes.description}>
                {article.description}
              </Typography>
              <Box style={{ display: 'flex', marginBottom: '30px' }}>
                <Avatar alt={article?.author?.username} src={article?.author?.image} />
                <NavLink className={classes.avatar} to={`/profile/${article?.author?.username}`}>
                  {article?.author?.username}
                </NavLink>
                <span className={classes.avatarDate}>{article.createdAt}</span>
              </Box>
              {body.map((item: string) => (
                <Box key={nanoid()}>
                  <Typography variant="body1">{item}</Typography>
                  <br />
                </Box>
              ))}
            </Grid>
          </Grid>
        </div>
      )
    );
  }
}

export default DetailArticle;
