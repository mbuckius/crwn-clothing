
import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';
import Spinner from '../../components/spinner/spinner.component';

import { ReactComponent as TopIcon } from '../../assets/top.svg';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import { 
  CategoryContainer, 
  FixedMenu,
  GoToTopButton,
  LinkContainer,
  NavLink,
  Products,
  SubCategoryContainer,
  SubTitle,
  Title,
  TopContainer
} from './category.styles';

const Category = () => {
  // Get category from URL using useParams()
  const { category } = useParams();

  // Get categoriesMap and isLoading state using selectors
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  // Get list of products from matching category and showMenu flag
  // subCategories will be a map => subcategories : array of product objects
  const [subCategories, setSubCategories] = useState(categoriesMap[category]);
  const [showMenu, setShowMenu] = useState(false);

  // toggle showMenu depending on how far down page is scrolled
  const showMenuHandler = () => {
    var y = window.scrollY;

    setShowMenu(y > 200);
  };

  // Run showMenuHandler when user scrolls
  window.addEventListener("scroll", showMenuHandler);

  // Change products list whenever category or categoriesMap changes
  useEffect(() => {
    setSubCategories(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <Fragment>
      <Title id="top">{category.toUpperCase()}</Title>
      {isLoading ? (
        <Spinner />
      ) : (
        
        <CategoryContainer>
          <LinkContainer>
            {subCategories &&
              Object.keys(subCategories).map((subCategory) => (
                <NavLink smooth to={`/shop/${category}#${subCategory}`} key={subCategory}>{subCategory}</NavLink>
              ))
            }
          </LinkContainer>
          
          { showMenu && 
            <FixedMenu>
              {Object.keys(subCategories).map((subCategory) => (
                <NavLink smooth to={`/shop/${category}#${subCategory}`} key={subCategory}>{subCategory}</NavLink>
              ))}
            </FixedMenu>
          }
          
          {subCategories &&
            Object.keys(subCategories).map((subCategory) => (
              <SubCategoryContainer key={subCategory} id={subCategory}>
                <SubTitle>{ subCategory }</SubTitle>

                <Products>
                  { subCategories[subCategory].map((product) => 
                        <ProductCard key={product.id} product={product} category={category} subcategory={subCategory} />
                  )}
                </Products>
              </SubCategoryContainer>
            ))
          }

          { showMenu &&
            <TopContainer>
              <GoToTopButton smooth to={`/shop/${category}#top`}>
                <TopIcon />
              </GoToTopButton>
            </TopContainer>
          }

        </CategoryContainer>
      )}
    </Fragment>
  );
};

export default Category;
