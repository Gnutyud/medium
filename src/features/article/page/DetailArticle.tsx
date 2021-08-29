import { Avatar, Box, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { NotFound } from 'components/common';
import Loading from 'components/common/Loading';
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
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
  const body = article.body ? article.body.split('\n') : [];
  const history = useHistory();
  React.useEffect(() => {
    dispatch({
      type: getArticle.type,
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
        <div style={{ marginTop: '50px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <SidebarDetail article={article} />
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
                <Link
                  component="button"
                  variant="body1"
                  className={classes.avatar}
                  onClick={() => {
                    history.push(`/profile/${article?.author?.username}`);
                  }}
                >
                  {article?.author?.username}
                </Link>
                <span className={classes.avatarDate}>{article.createdAt}</span>
              </Box>
              {body.map((item: string) => (
                <>
                  <Typography variant="body1">{item}</Typography>
                  <br />
                </>
              ))}
            </Grid>
          </Grid>
        </div>
      )
    );
  }
}

export default DetailArticle;
