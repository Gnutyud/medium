import { Avatar, Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound } from 'components/common';
import Loading from 'components/common/Loading';
import { getListArticle, selectListArticles } from 'features/articles/articlesSlice';
import { nanoid } from 'nanoid';
import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { convertArticleDate } from 'share/methods/dateFormat';
import { upperFirstLetter } from 'share/methods/upperFirst';
import {
  getArticle,
  getComment,
  selectArticle,
  selectError,
  selectIsloading,
} from '../articleSlice';
import { CommentBox } from '../components/CommentBox';
import SidebarDetail from '../components/SidebarDetail';

const useStyle = makeStyles((theme) => ({
  title: {
    fontWeight: 'bold',
    fontSize: '40px',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
      fontSize: '1.6rem',
      marginTop: theme.spacing(4),
    },
  },
  description: {
    fontSize: '25px',
    marginBottom: '20px',
    color: 'rgba(117, 117, 117, 1);',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem',
    },
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
  sideBar: {
    [theme.breakpoints.down('md')]: {
      marginLeft: '0px',
      order: '2',
    },
    // [theme.breakpoints.down('sm')]: {
    //   order: '2',
    // },
  },
  boxContent: {
    [theme.breakpoints.down('md')]: {
      margin: '0px 20px',
    },
  },
  authorInfor: {
    display: 'flex',
    marginBottom: '30px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  container: {
    marginTop: '50px',
    [theme.breakpoints.down('md')]: {
      marginTop: '0px',
    },
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
    dispatch({
      type: getComment.type,
      payload: slug,
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
        <Box className={classes.container}>
          <Grid container spacing={2}>
            <Grid item md={12} lg={3} className={classes.sideBar}>
              {currentArticle && <SidebarDetail article={currentArticle} />}
            </Grid>
            <Grid item md={12} lg={6} className={classes.boxContent}>
              <Typography variant="h5" className={classes.title}>
                {article.title}
              </Typography>
              <Typography variant="h5" className={classes.description}>
                {article.description}
              </Typography>
              <Box className={classes.authorInfor}>
                <Box style={{ display: 'flex' }}>
                  <Avatar alt={article?.author?.username} src={article?.author?.image} />
                  <NavLink className={classes.avatar} to={`/profile/${article?.author?.username}`}>
                    {upperFirstLetter(article?.author?.username)}
                  </NavLink>
                </Box>
                <Box className={classes.avatarDate}>{convertArticleDate(article.createdAt)}</Box>
              </Box>
              {body.map((item: string) => (
                <Box key={nanoid()}>
                  <Typography variant="body1">{item}</Typography>
                  <br />
                </Box>
              ))}
            </Grid>
          </Grid>
          <Grid item md={12} lg={3}>
            <CommentBox slug={slug} />
          </Grid>
        </Box>
      )
    );
  }
}

export default DetailArticle;
