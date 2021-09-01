import { Avatar, Box, Button, Divider, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';
import SettingsIcon from '@material-ui/icons/Settings';
import { useAppDispatch } from 'app/hooks';
import { followProfile, unFollowProfile } from 'features/profile/profileSlice';
import { NavLink, useHistory } from 'react-router-dom';
import { upperFirstLetter } from 'share/methods/upperFirst';
interface ArticleProps {
  article: ArticleType;
  followingState: boolean;
}

const useStyle = makeStyles((theme) => ({
  avatar: {
    lineHeight: '40px',
    marginLeft: '10px',
    textDecoration: 'none',
    fontSize: theme.spacing(3),
  },
  followBtn: {
    '&:hover': {
      opacity: '0.8',
    },
    fontSize: theme.spacing(1.5),
  },
  followContent: {
    alignSelf: 'center',
    fontSize: theme.spacing(1.5),
    // color: '#a9a9a1',
  },
  containerAvatar: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  containerFollow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2),
  },
}));

function Popup({ article, followingState }: ArticleProps) {
  const { author } = article;
  const classes = useStyle();
  const dispatch = useAppDispatch();
  // auth
  const local: any = localStorage.getItem('user');
  const curUser = JSON.parse(local);

  const history = useHistory();

  const handleFollow = () => {
    if (curUser?.username !== author?.username) {
      if (!followingState) {
        dispatch({
          type: followProfile.type,
          payload: { username: author?.username },
        });
      } else {
        dispatch({
          type: unFollowProfile.type,
          payload: { username: author?.username },
        });
      }
    } else {
      history.push('/settings');
    }
  };

  return (
    <>
      <Box>
        <Box className={classes.containerAvatar}>
          <Avatar alt={author?.username} src={article?.author?.image} />
          <NavLink className={classes.avatar} to={`/profile/${article?.author?.username}`}>
            {upperFirstLetter(author?.username)}
          </NavLink>
        </Box>
        <Divider color="black" />
        <Box className={classes.containerFollow}>
          <Button
            variant="contained"
            color="primary"
            className={classes.followBtn}
            onClick={handleFollow}
          >
            {curUser?.username !== author?.username ? (
              followingState ? (
                <>
                  <CheckIcon />
                  <span style={{ marginLeft: '3px' }}>Following</span>
                </>
              ) : (
                <>
                  <AddIcon />
                  <span style={{ marginLeft: '3px' }}>Following</span>
                </>
              )
            ) : (
              <>
                <SettingsIcon />
                <span style={{ marginLeft: '3px' }}>Setting</span>
              </>
            )}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Popup;
