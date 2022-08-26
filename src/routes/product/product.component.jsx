import { useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import Spinner from '../../components/spinner/spinner.component';
import ProductDescription from '../../components/product-description/product-description.component';

import Button, {BUTTON_TYPE_CLASSES} from '../../components/button/button.component';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from '../../store/categories/category.selector';

import { 
    ProductContainer, 
    Title 
} from './product.styles';

const Product = () => {
    // Get category and name of product from URL using useParams()
    const { category, id } = useParams();

    const dispatch = useDispatch();

    // Get categoriesMap, isLoading, and cartItems state using selectors
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const cartItems = useSelector(selectCartItems);

    // Get list of products from matching category
    const [products, setProducts] = useState(categoriesMap[category]);

    // const [product, setProduct] = useState(products?.find((element) => {
    //     return element.name === name;
    // }));
    
    // Find the matching object in products array based on id
    const product = products?.find((element) => {
        return element.id === parseInt(id, 10);
    });    
    
    // onClick function when user presses "Add to cart" button
    // Updates the cartItems with product
    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));
    
    // Change products list whenever category or categoriesMap changes
    useEffect(() => {
        setProducts(categoriesMap[category]);
        

        // setProduct(products?.find((element) => {
        //     return element.name === name;
        // }));
        // console.log(product);
        
    }, [category, categoriesMap]);

    
  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {product &&
             (
                <ProductContainer>
                    <img src={product.imageUrl} alt={`${product.name}`}/>
                    
                    <div>
                        <Title>{product.name.toUpperCase()}</Title>
                        <p>{`$${product.price}`}</p>
                        
                        <ProductDescription description={product.description} material={product.material} />
                        
                        <Button
                            buttonType={BUTTON_TYPE_CLASSES.inverted}
                            onClick={addProductToCart}
                        >
                            Add to cart
                        </Button>
                    </div>
                </ProductContainer>
            )
        }
        </div>
      )}
    </Fragment>
    
  );
};

export default Product;
