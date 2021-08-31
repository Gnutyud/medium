import { Box } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useAppDispatch } from 'app/hooks';
import { useEffect } from 'react';
import {
  Link,
  MemoryRouter,
  Route,
  useHistory,
  useLocation,
  useRouteMatch,
} from 'react-router-dom';
import { setNumberCurrentPage } from '../articlesSlice';

const queryString = require('query-string');

interface ArticlePaginationProps {
  articleCount: number;
  articlePerPage: number;
  tagByArticle: string | undefined;
  currentPage: number;
  displayMode: number;
}

const ArticlePagination: React.FC<ArticlePaginationProps> = ({
  articleCount,
  articlePerPage,
  tagByArticle,
  currentPage,
  displayMode,
}) => {
  const history = useHistory();
  const location = useLocation();
  const match = useRouteMatch();
  const dispatch = useAppDispatch();

  // get total page
  const totalPage = Math.ceil(articleCount / articlePerPage);

  // navigate to page event
  const handleNavigate = (event: any, pageNumber: number) => {
    dispatch(setNumberCurrentPage(pageNumber));

    const queryParams = tagByArticle
      ? { page: pageNumber, tag: tagByArticle }
      : { page: pageNumber };

    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  // sync url param with state
  useEffect(() => {
    const { page } = queryString.parse(location.search);
    const pageValue = page ? +page : 1;
    dispatch(setNumberCurrentPage(pageValue));
  }, [location.search, dispatch]);

  return (
    <Box>
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Route>
          {() => {
            return (
              <Pagination
                size="large"
                page={currentPage}
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

export default ArticlePagination;
