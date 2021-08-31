import { Box, makeStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

interface Props {
  option: number;
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
    fontSize: '1.3rem',
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
  itemActive: {
    borderBottom: '2px solid',
    borderBottomColor: blue[500],
    cursor: 'pointer',
    marginRight: '20px',
    fontSize: '1.3rem',
    [theme.breakpoints.down('xs')]: {
      width: '50%',
    },
  },
}));

const ArticleMenuTabs: React.FC<Props> = ({ option, handleDisplay }) => {
  const classes = useStyles();
  const local: any = localStorage.getItem('user');
  const curUser = JSON.parse(local);

  const handleClick = (value: number) => {
    handleDisplay(value);
  };

  return (
    <Box className={classes.root} width="100%">
      <Box
        className={option === 0 ? classes.itemActive : classes.item}
        onClick={() => handleClick(0)}
      >
        Global
      </Box>
      {curUser && (
        <Box
          className={option === 1 ? classes.itemActive : classes.item}
          onClick={() => handleClick(1)}
        >
          Feed
        </Box>
      )}
    </Box>
  );
};

export default ArticleMenuTabs;
