import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

import Spinner from '../../components/spinner/spinner.component';
import ProductCard from "../../components/product-card/product-card.component";

import {
    selectCategoriesMap,
    selectCategoriesIsLoading,
} from '../../store/categories/category.selector';
import { fetchCategoriesStart } from '../../store/categories/category.action';

import { SearchResultsContainer, ProductCards, Title, NoResults } from "./search-results.styles";

const SearchResults = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, [dispatch]);

    // get searchField string from url
    var {searchField} = useParams();
    searchField = searchField.toLocaleLowerCase();

    // Get categoriesMap and isLoading state using selectors
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    // filteredProducts: array of objects {product, category, and weight}
    const [filteredProducts, setFilteredProducts] = useState([]);

    // When searchField changes, filter categoriesMap with includes
    useEffect(() => {
        // reset filteredProducts
        setFilteredProducts([]);

        // Split searchField into an array
        const searchFieldArray = searchField.split(" ");

        // for each category in categoriesMap 
        // eslint-disable-next-line
        Object.keys(categoriesMap).map((category) => {

            // For each product in category
            // eslint-disable-next-line
            Object.keys(categoriesMap[category]).map((subcategory) => {
                // eslint-disable-next-line
                categoriesMap[category][subcategory].map((product) => {
                    // Calculate weight of each product by adding the occurrences of each word in searchFieldArray
                    // If the word is in the title, it has a weight of 3 (more likely to match what the user wants)
                    const tempWeight = searchFieldArray.reduce((total, word) => 
                        total + (3 * product.name.toLocaleLowerCase().includes(word)) 
                        + product.description?.toLocaleLowerCase().includes(word)
                        + product.material?.toLocaleLowerCase().includes(word), 0
                    );

                    // If the weight is more than 0, add it to the filteredProducts array
                    if (tempWeight) {
                        setFilteredProducts(oldArray => [...oldArray, {product: product, category: category, subcategory: subcategory, weight: tempWeight}]);
                    }
                });
            });
        });

        // Sort filteredProducts array in descending order based on weight
        setFilteredProducts(oldArray => [...oldArray.sort((a, b) => b.weight - a.weight)]);

    }, [searchField, categoriesMap]); 

    return (
        <Fragment>
            {isLoading ? (
                <Spinner />
            ) : (
                <SearchResultsContainer>
                    { filteredProducts.length ? (
                        <div>
                            { filteredProducts.length === 1 ? (
                                    <Title>{filteredProducts.length} Search result for {searchField}:</Title>
                                ) : (
                                    <Title>{filteredProducts.length} Search results for {searchField}:</Title>
                            )}

                            <ProductCards>
                                {
                                    filteredProducts.map((obj) => {
                                        return (
                                            <ProductCard key={obj.product.id} product={obj.product} subcategory={obj.subcategory} category={obj.category}/>
                                        );
                                    })
                                }
                            </ProductCards>
                        </div>
                        
                    ) : (
                        <NoResults>No results for {searchField}</NoResults>
                    )}
                </SearchResultsContainer>
            )}
        </Fragment>  
    );
};

export default SearchResults;