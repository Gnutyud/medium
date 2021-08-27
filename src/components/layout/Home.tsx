import { Grid } from '@material-ui/core';
import ArticleList from 'features/articles/components/ArticleList';
import ArticlePagination from 'features/articles/components/ArticlePagination';
import ArticlePagination2 from 'features/articles/components/ArticlePagination2';
import TagList from 'features/tags/components/TagList';

const HomeLayout = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <ArticleList />
        {/* <ArticlePagination /> */}
        <ArticlePagination2 />
      </Grid>
      <Grid item xs={12} md={3}>
        <TagList />
      </Grid>
    </Grid>
  );
};

export default HomeLayout;
