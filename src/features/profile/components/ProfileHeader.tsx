import React from 'react';
import clsx from 'clsx';
import { AppBar, Box, Button, Toolbar, Typography, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import { grey } from '@material-ui/core/colors';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { selectCountArticles, setTag } from 'features/articles/articlesSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    background: grey[50],
    color: grey[800],
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('md')]: {
      padding: '0 5px',
    },
  },
  authorInfosContainer: {
    display: 'flex',
    flex: 1,
    [theme.breakpoints.down('md')]: {
      margin: '0',
    },
  },
  authorInfoContainer: {
    marginRight: '20px',
    [theme.breakpoints.down('md')]: {
      margin: '0',
    },
  },
  usernameContainer: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navBrand: {
    cursor: 'pointer',
  },
  textSmall: {
    fontSize: '0.6rem',
  },
}));

interface AuthorHeaderProps {
  author: ProfileType;
}

const AuthorHeader: React.FC<AuthorHeaderProps> = ({ author }) => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useAppDispatch();

  // select total articles
  const totalArticle = useAppSelector(selectCountArticles);
  // handle event go to home page
  const handleGoToHomePage = () => {
    dispatch(setTag(null));
    history.push('/');
  };
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolbar}>
        <Box className={classes.authorInfosContainer}>
          <Box className={clsx(classes.authorInfoContainer, classes.usernameContainer)}>
            <Typography variant="h6">{author?.username?.toUpperCase()}</Typography>
          </Box>
          <Box className={clsx(classes.authorInfoContainer, classes.textSmall)}>
            <Button color="inherit">{totalArticle} articles</Button>
          </Box>

          <Box className={classes.textSmall}>
            <Button startIcon={author?.following ? <CheckIcon /> : <AddIcon />} color="inherit">
              Follow
            </Button>
          </Box>
        </Box>
        <Box className={classes.navBrand} onClick={handleGoToHomePage}>
          <Typography variant="h6">Medium</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AuthorHeader;
