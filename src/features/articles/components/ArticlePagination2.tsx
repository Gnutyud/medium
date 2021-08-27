import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  Link,
  MemoryRouter,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import {
  selectCountArticles,
  selectNumberArticlePerPage,
  selectNumberCurrentPage,
  selectTagByArticle,
  setNumberCurrentPage,
} from '../articlesSlice';

const queryString = require('query-string');

const ArticlePagination2 = () => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  // get data for pagination
  const articleCount = useAppSelector(selectCountArticles);
  const articlePerPage = useAppSelector(selectNumberArticlePerPage);
  const tagByArticle = useAppSelector(selectTagByArticle);

  // get total page
  const totalPage = Math.ceil(articleCount / articlePerPage);

  // navigate to page event
  const handleNavigate = (event: any, pageNumber: number) => {
    dispatch(setNumberCurrentPage(pageNumber));

    // sync url param
    const queryParams = { page: pageNumber, tag: tagByArticle };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  // sync url param with state
  useEffect(() => {
    const { page } = queryString.parse(location.search);
    dispatch(setNumberCurrentPage(page));
  }, [location.search, dispatch]);

  return (
    <Box>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Route>
          {({ location }) => {
            const query = new URLSearchParams(location.search);
            const page = parseInt(query.get('page') || '1', 10);

            return (
              <Pagination
                size="large"
                page={page}
                count={totalPage}
                onChange={handleNavigate}
                renderItem={(item) => (
                  <PaginationItem
                    component={Link}
                    to={`/${item.page === 1 ? '' : `?page=${item.page}`}`}
                    {...item}
                  />
                )}
              />
            );
          }}
        </Route>
      </MemoryRouter>
    </Box>
  );
};

export default ArticlePagination2;
