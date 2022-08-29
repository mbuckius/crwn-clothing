import ProductCard from "../product-card/product-card.component";

import { ResultsContainer, ProductCards } from "./search-results.styles";

const SearchResults = ({ filteredProductsMap, resultCount }) => {
    console.log(filteredProductsMap);
    console.log(resultCount);

    return (
        <div>
            { resultCount ? (
                <ResultsContainer>
                    <h2>{resultCount} Search results:</h2>

                    <ProductCards>
                        {Object.keys(filteredProductsMap).map((category) => (
                            filteredProductsMap[category].map(product => {
                                return (
                                    <ProductCard key={product.id} product={product} category={category}/>
                                );
                            })
                        ))}
                    </ProductCards>
                </ResultsContainer>
                
            ) : (
                <p>No results</p>
            )}
        </div>
        
        
    );
};

export default SearchResults