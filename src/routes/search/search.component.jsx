import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';
import SearchBox from "../../components/search-box/search-box.component";
import SearchResults from '../../components/search-results/search-results.component';

import { fetchCategoriesStart } from '../../store/categories/category.action';
import {
    selectCategoriesMap,
    selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import { SearchContainer, Title } from './search.styles';

const Search = () => {
    const dispatch = useDispatch();

    // get categories from firebase, run only at first
    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, []);

    // Get categoriesMap and isLoading state using selectors
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    // Create searchField, showResults, and products array
    const [searchField, setSearchField] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProductsMap, setFilteredProductsMap] = useState(categoriesMap);
    const [resultCount, setResultCount] = useState(0);
    
    // called when input in SearchBox changes (user types/deletes letters)
    const onSearchChange = (event) => {
        // const searchFieldString = event.target.value.toLocaleLowerCase();
        // setSearchField(searchFieldString); 
    };

    // Runs whenever user enters a key
    const onEnter = (event) => {

        // Want search to run when user presses Enter
        if (event.key ==='Enter') {
            console.log("user hit enter");

            //set searchField to what user typed
            const searchFieldString = event.target.value.toLocaleLowerCase();
            setSearchField(searchFieldString); 
        }
    };

    // When searchField changes, filter categoriesMap with includes
    useEffect(() => {
        // reset resultCount 
        setResultCount(0);

        // create a tempMap which has same contents as categoriesMap
        var tempMap = JSON.parse(JSON.stringify(categoriesMap));
        
        // for each category in categoriesMap 
        Object.keys(categoriesMap).map((category) => {
            
            // Create temp array which will hold filtered products in current category
            const temp = (categoriesMap[category]).filter((product) => {
                return product.name.toLocaleLowerCase().includes(searchField);
            });
            
            // Update tempMap and resultCount
            tempMap[category] = temp;
            setResultCount(prevCount => (prevCount + temp.length));
        });

        // Update filteredProductsMap
        setFilteredProductsMap(tempMap);
    }, [searchField, categoriesMap]); 

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    {products && (
                        <SearchContainer>
                            <Title>Search</Title>
                            <SearchBox 
                                placeholder='&#128269;  Search for Products' 
                                onChangeHandler ={ onSearchChange }
                                onKeyPress = { onEnter } 
                            />

                            {searchField &&
                                <SearchResults filteredProductsMap={ filteredProductsMap } resultCount={ resultCount }/>
                            }
                        </SearchContainer>
                    )}
                </div>
            )}
        </Fragment>
        
    );
};

export default Search;