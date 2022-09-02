import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import Button from '../button/button.component';
import SearchBox from '../search-box/search-box.component';

import { setIsSearchOpen } from '../../store/search/search.action';

import {
  SearchDropdownContainer,
} from './search-dropdown.styles';

const SearchDropdown = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Create searchField
  const [searchField, setSearchField] = useState('');

  const hideDropdown = () => dispatch(setIsSearchOpen(false));

  // called when input in SearchBox changes (user types/deletes letters)
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString); 
  };
  
  const goToResultsHandler = () => {
    //only search if searchField is not empty
    if (searchField) {
      //hide search dropdown when going to another page
      hideDropdown();
      navigate(`/search/${searchField}`);
    }
  };

  // Runs whenever user enters a key
  const onEnter = (event) => {
      // Want to go to search results page when user presses Enter
      if (event.key ==='Enter') {
          goToResultsHandler();
      }
  };

  return (
    <SearchDropdownContainer onMouseLeave={hideDropdown}>
      <SearchBox 
        placeholder='&#128269;  Search for Products' 
        onChangeHandler ={ onSearchChange }
        onKeyPress = { onEnter } 
      />

      <Button onClick={goToResultsHandler}>SEARCH</Button>
    </SearchDropdownContainer>
  );
};

export default SearchDropdown;
