import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { 
    SearchContainer, 
    Title, 
    SearchBoxContainer 
} from './search.styles';

const Search = () => {
    const navigate = useNavigate();

    // Create searchField
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
                <SearchBoxContainer
                    type='search' 
                    placeholder='&#128269;  Search for Products' 
                    onChange={ onSearchChange } //onChange runs whenever change happens on input
                    onKeyPress={ onEnter }   //onKeyPress runs whenever user presses a key
                /> 
            </SearchContainer>
        </div>
    );
};

export default Search;