import ProductCard from "../product-card/product-card.component";

import { ResultsContainer } from "./search-results.styles";

const SearchResults = ({ filteredProductsMap, resultCount }) => {
    console.log(filteredProductsMap);
    console.log(resultCount);

    return (
        <div>
            <h2>search results</h2>

            { resultCount ? (
                Object.keys(filteredProductsMap).map((category) => (
                    filteredProductsMap[category].map(product => {
                        return (
                            <ResultsContainer>
                                <ProductCard product={product} category={category}/>
                            </ResultsContainer>
                            
                        );
                    })

                ))
            ) : (
                <p>No results</p>
            )}
        </div>
        
        
    );
};

export default SearchResults