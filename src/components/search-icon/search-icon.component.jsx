import { useDispatch, useSelector } from 'react-redux';

import { selectIsSearchOpen } from '../../store/search/search.selector';
import { setIsSearchOpen } from '../../store/search/search.action.js';

import { ReactComponent as ProductSearchIcon } from '../../assets/search.svg';

import { SearchIconContainer } from './search-icon.styles.jsx';

const SearchIcon = () => {
  const dispatch = useDispatch();

  const isSearchOpen = useSelector(selectIsSearchOpen);

  const toggleIsSearchOpen = () => dispatch(setIsSearchOpen(!isSearchOpen));

  return (
    <SearchIconContainer onClick={toggleIsSearchOpen}>
      <ProductSearchIcon className='shopping-icon' />
    </SearchIconContainer>
  );
};

export default SearchIcon;
