import { Grid } from '@material-ui/core';
import ArticleList from 'features/article/components/ArticleList';
import ArticleTagList from 'features/article/components/ArticleTagList';

const HomeLayout = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <ArticleList />
      </Grid>
      <Grid item xs={12} md={3}>
        <ArticleTagList />
      </Grid>
    </Grid>
  );
};

export default HomeLayout;
