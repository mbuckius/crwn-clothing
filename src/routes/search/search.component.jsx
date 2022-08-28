import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Spinner from '../../components/spinner/spinner.component';
import SearchBox from "../../components/search-box/search-box.component";
import ProductCard from '../../components/product-card/product-card.component';
import SearchResults from '../../components/search-results/search-results.component';

import { fetchCategoriesStart } from '../../store/categories/category.action';
import {
    selectCategoriesMap,
    selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

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
    

    // var filteredProductsMap = JSON.parse(JSON.stringify(categoriesMap));
   
    
    // console.log("categoriesMap", categoriesMap);
    // console.log("filteredProductsMap", filteredProductsMap);
    // console.log(resultCount);
    
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

    useEffect(() => {

        setResultCount(0);
        var tempMap = JSON.parse(JSON.stringify(categoriesMap));
        
        Object.keys(categoriesMap).map((category) => {
            
            const temp = (categoriesMap[category]).filter((product) => {
                // console.log(product);
                return product.name.toLocaleLowerCase().includes(searchField);
            });
            
            tempMap[category] = temp;
            
            setResultCount(prevCount => (prevCount + temp.length));
            
        });

       

        setFilteredProductsMap(tempMap)
    
        // const newFilteredProducts = products.filter((product) => {
        //   return product.name.toLocaleLowerCase().includes(searchField);
        // });
    
        // setFilteredProducts(newFilteredProducts);
    }, [searchField]); 

    // Change products list whenever categoriesMap changes
    useEffect(() => {
        // Reset products array
        setProducts([]);
        const categories = Object.keys(categoriesMap);

        if (!isLoading) {
            categories.map((category) => {
                setProducts(prevProds => [...prevProds, ...categoriesMap[category]]);
            });
        } 
    }, [categoriesMap]);

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                <div>
                    {products && (
                        <div>
                            <h2>Search Page</h2>
                            <SearchBox 
                                className ='product-search-box' 
                                placeholder='Search for Products' 
                                onChangeHandler ={ onSearchChange }
                                onKeyPress = { onEnter } 
                            />

                            {searchField &&
                                <SearchResults filteredProductsMap={ filteredProductsMap } resultCount={ resultCount }/>
                            }
                        </div>
                    )}
                </div>
            )}
        </Fragment>
        
    );
};

export default Search;