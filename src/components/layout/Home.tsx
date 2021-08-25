import { Grid } from '@material-ui/core';
import ArticleList from 'features/article/components/ArticleList';
import ArticlePagination from 'features/article/components/ArticlePagination';
import TagList from 'features/tag/components/TagList';

const HomeLayout = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <ArticleList />
        <ArticlePagination />
      </Grid>
      <Grid item xs={12} md={3}>
        <TagList />
      </Grid>
    </Grid>
  );
};

export default HomeLayout;
