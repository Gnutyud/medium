import React from 'react';
import { Avatar, Typography, Card, CardContent, CardMedia } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link } from 'react-router-dom';
import makeStyles from '@material-ui/core/styles/makeStyles';
import MenuTabs from '../../../components/common/MenuTabs';
interface Props {
  image: string;
  username: string;
  following: boolean;
  bio: string;
}
let HEIGHT = window.screen.height;

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: 700,
  },
  media: {
    height: HEIGHT / 3,
    position: 'relative',
  },
  settingBtn: {
    position: 'absolute',
    right: '20px',
    bottom: '15px',
    backgroundColor: 'white',
    padding: '8px 10px',
    color: 'black',
    borderRadius: '5px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    gap: '3px',
    '&:hover': {
      opacity: '0.8',
    },
  },
  profileImage: {
    position: 'relative',
    top: '-110px',
    justifyContent: 'center',
    width: theme.spacing(HEIGHT / 40),
    height: theme.spacing(HEIGHT / 40),
    border: '5px solid white',
    margin: 'auto',
  },
  profileInfoContainer: {
    position: 'relative',
    top: '-100px',
    margin: 'auto',
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 0,
  },
  userTag: {
    marginTop: 0,
  },
  contentContainer: {
    position: 'relative',
    top: '-90px',
  },
}));

const ProfileInfo = (props: Props) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        className={classes.media}
        image="https://st.quantrimang.com/photos/image/2018/09/20/anh-bia-facebook-mau-den-1.jpg"
      >
        <Link className={classes.settingBtn} to="/setting">
          <SettingsIcon />
          Edit Profile Setting
        </Link>
      </CardMedia>
      <Avatar src={props.image} className={classes.profileImage} />
      <div className={classes.profileInfoContainer}>
        <Typography align={'center'} className={classes.userName} variant="h4" gutterBottom>
          {props.username}
        </Typography>
        <Typography align={'center'} variant="subtitle2" gutterBottom className={classes.userTag}>
          {props.following}
        </Typography>
        <Typography align={'center'} variant="subtitle2" gutterBottom className={classes.userTag}>
          {props.bio}
        </Typography>
      </div>
      <CardContent className={classes.contentContainer}>
        <MenuTabs tab1="My articles" tab2="My favorite articles" />
      </CardContent>
    </Card>
  );
};
export default ProfileInfo;
