import { Box } from '@material-ui/core';
import { Pagination, PaginationItem } from '@material-ui/lab';
import { useAppDispatch } from 'app/hooks';
import { setNumberCurrentPage } from 'features/articles/articlesSlice';
import { useEffect } from 'react';
import { Link, MemoryRouter, Route, useHistory, useLocation } from 'react-router-dom';

const queryString = require('query-string');

interface ProfileArticlePaginationProps {
  articleCount: number | undefined;
  articlePerPage: number | undefined;
  tagByArticle: string | undefined;
  currentPage: number | undefined;
  username?: string;
}

const ProfileArticlePagination: React.FC<ProfileArticlePaginationProps> = ({
  articleCount,
  articlePerPage,
  tagByArticle,
  currentPage,
  username,
}) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useAppDispatch();

  // get total page
  const totalPage = articleCount && articlePerPage ? Math.ceil(articleCount / articlePerPage) : 0;

  // navigate to page event
  const handleNavigate = (event: any, pageNumber: number) => {
    dispatch(setNumberCurrentPage(pageNumber));

    // sync url param
    const queryParams = tagByArticle
      ? { page: pageNumber, tag: tagByArticle }
      : { page: pageNumber };
    history.push({
      pathname: `/profile/${username}`,
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
                showFirstButton
                showLastButton
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

export default ProfileArticlePagination;
