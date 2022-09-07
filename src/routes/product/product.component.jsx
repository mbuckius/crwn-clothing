import { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import React from 'react';

import ProductDescription from '../../components/product-description/product-description.component';
import Spinner from '../../components/spinner/spinner.component';

import { addItemToCart } from '../../store/cart/cart.action';
import Button, {BUTTON_TYPE_CLASSES} from '../../components/button/button.component';
import { selectCartItems } from '../../store/cart/cart.selector';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import { 
    ProductContainer, 
    Title,
    Info,
    Images
} from './product.styles';

const Product = () => {
  // Get category and name of product from URL using useParams()
  const { category, id } = useParams();

  const dispatch = useDispatch();

  // Get subcategory from URL query
  const { search } = useLocation();
  const query = React.useMemo(() => new URLSearchParams(search), [search]);
  const subcategory = query.get("subcategory");

  // Get categoriesMap, isLoading, and cartItems state using selectors
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const cartItems = useSelector(selectCartItems);

  // Create products (map of subcategories and their products) and product (matching product based on id)
  const [products, setProducts] = useState(categoriesMap[category]); 
  const [product, setProduct] = useState();

  // onClick function when user presses "Add to cart" button, Updates the cartItems with product
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
  
  // Change products list whenever category, products, or categoriesMap changes
  useEffect(() => {
      setProducts(categoriesMap[category]);
      if(products) {
        setProduct(products[subcategory].find((element) => {
          return element.id === parseInt(id, 10);
        })); 
      }   
  }, [category, products, id, subcategory, categoriesMap]);
    
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          
          {product && (
      
              <ProductContainer>
 
                <Images>
                  { product.imageUrls.map((imageUrl) => {
                      return <img key={imageUrl} src={imageUrl} alt={`${product.name}`}/>
                  })}
                </Images>
                  
                <Info>
                  <Title>{product.name.toUpperCase()}</Title>
                  <h3>{`$${product.price}`}</h3>
          
                  <ProductDescription description={product.description} material={product.material} price={product.price} />
                  
                  <Button
                      buttonType={BUTTON_TYPE_CLASSES.inverted}
                      onClick={addProductToCart}
                  >
                      Add to cart
                  </Button>
                </Info>

              </ProductContainer>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Product;
