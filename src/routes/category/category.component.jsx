import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import { 
  CategoryContainer, 
  Title,
  SubTitle,
  SubCategoryContainer,
  Products
} from './category.styles';

const Category = () => {
  // Get category from URL using useParams()
  const { category } = useParams();

  // Get categoriesMap and isLoading state using selectors
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  // Get list of products from matching category
  // subCategories will be a map => subcategories : array of product objects
  const [subCategories, setSubCategories] = useState(categoriesMap[category]);

  // Change products list whenever category or categoriesMap changes
  useEffect(() => {
    setSubCategories(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {subCategories &&
            Object.keys(subCategories).map((subCategory) => (
              <SubCategoryContainer key={subCategory}>
                <SubTitle>{ subCategory }</SubTitle>

                <Products>
                  { subCategories[subCategory].map((product) => 
                        <ProductCard key={product.id} product={product} category={category} subcategory={subCategory} />
                  )}
                </Products>
              </SubCategoryContainer>
            ))
          }
        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
