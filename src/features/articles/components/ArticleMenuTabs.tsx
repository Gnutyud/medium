import { Box, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

interface Props {
  handleDisplay: (choose: number) => void;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
    },
  },
  item: {
    cursor: 'pointer',
    marginRight: '20px',
    transition: 'all 2s',
    fontSize: '1.3rem',
    '&:active': {
      borderBottom: '2px solid',
      borderBottomColor: blue[500],
    },
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
}));

const ArticleMenuTabs: React.FC<Props> = ({ handleDisplay }) => {
  const classes = useStyles();
  const local: any = localStorage.getItem('user');
  const curUser = JSON.parse(local);

  const handleClick = (value: number) => {
    handleDisplay(value);
  };

  return (
    <Box className={classes.root} width="100%">
      <Box className={classes.item} onClick={() => handleClick(0)}>
        Global
      </Box>
      {curUser && (
        <Box className={classes.item} onClick={() => handleClick(1)}>
          Feed
        </Box>
      )}
    </Box>
  );
};

export default ArticleMenuTabs;
