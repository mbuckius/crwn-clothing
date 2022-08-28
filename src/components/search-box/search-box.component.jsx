// import './search-box.styles.jsx'
 
const SearchBox = ({className, placeholder, onChangeHandler, onKeyPress }) => (
    <input 
        className={`search-box ${ className }`}
        type='search' 
        placeholder={ placeholder } 
        onChange={ onChangeHandler } //onChange runs whenever change happens on input
        onKeyPress={ onKeyPress }   //onKeyPress runs whenever user presses a key
    /> 
);

export default SearchBox;
