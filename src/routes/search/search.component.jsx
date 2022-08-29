import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';
import SearchBox from "../../components/search-box/search-box.component";

import { fetchCategoriesStart } from '../../store/categories/category.action';
import {
    selectCategoriesMap,
    selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import { SearchContainer, Title } from './search.styles';
import { useNavigate } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate();

    // Create searchField, showResults, and products array
    const [searchField, setSearchField] = useState('');
    
    // called when input in SearchBox changes (user types/deletes letters)
    const onSearchChange = (event) => {
        const searchFieldString = event.target.value.toLocaleLowerCase();
        setSearchField(searchFieldString); 
    };

    // Runs whenever user enters a key
    const onEnter = (event) => {
        // Want to go to search results page when user presses Enter
        if (event.key ==='Enter') {
            navigate(`/search/${searchField}`);
        }
    };

    return (
        <div>
            <SearchContainer>
                <Title>Search</Title>
                <SearchBox 
                    placeholder='&#128269;  Search for Products' 
                    onChangeHandler ={ onSearchChange }
                    onKeyPress = { onEnter } 
                />
            </SearchContainer>
        </div>
    );
};

export default Search;