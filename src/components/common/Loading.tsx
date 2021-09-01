import { Box } from '@material-ui/core';
import Loader from 'react-loader-spinner';

const Loading = () => {
  return (
    <Box>
      <Loader type="Circles" color="#00BFFF" height={80} width={80} />
    </Box>
  );
};

export default Loading;
