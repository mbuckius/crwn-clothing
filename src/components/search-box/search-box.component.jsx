import { SearchBoxContainer } from "./search-box.styles";
 
const SearchBox = ({ placeholder, onChangeHandler, onKeyPress }) => (
    <SearchBoxContainer
        type='search' 
        placeholder={ placeholder } 
        onChange={ onChangeHandler } //onChange runs whenever change happens on input
        onKeyPress={ onKeyPress }   //onKeyPress runs whenever user presses a key
    /> 
);

export default SearchBox;
