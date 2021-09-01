import { CardContent, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    position: 'relative',
    top: '-90px',
  },
}));

interface ProfileContentProps {
  children: React.ReactNode;
}

const ProfileContent: React.FC<ProfileContentProps> = ({ children }) => {
  const classes = useStyles();
  return <CardContent className={classes.contentContainer}>{children}</CardContent>;
};

export default ProfileContent;
