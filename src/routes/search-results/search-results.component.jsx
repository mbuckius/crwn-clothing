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

import { ProductCards, Title } from "./search-results.styles";

const SearchResults = () => {
    const {searchField} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesStart());
    }, []);

    // Get categoriesMap and isLoading state using selectors
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    const [filteredProductsMap, setFilteredProductsMap] = useState(categoriesMap);
    const [resultCount, setResultCount] = useState(0);

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
                return (product.name.toLocaleLowerCase().includes(searchField) 
                || product.description?.toLocaleLowerCase().includes(searchField)
                || product.material?.toLocaleLowerCase().includes(searchField));
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
                    { resultCount ? (
                        <div>
                            { resultCount === 1 ? (
                                    <Title>{resultCount} Search result for {searchField}:</Title>
                                ) : (
                                    <Title>{resultCount} Search results for {searchField}:</Title>
                            )}

                            <ProductCards>
                                {Object.keys(filteredProductsMap).map((category) => (
                                    filteredProductsMap[category].map(product => {
                                        return (
                                            <ProductCard key={product.id} product={product} category={category}/>
                                        );
                                    })
                                ))}
                            </ProductCards>
                        </div>
                        
                    ) : (
                        <Title>No results for {searchField}</Title>
                    )}
                </div>
            )}
        </Fragment>  
    );
};

export default SearchResults;