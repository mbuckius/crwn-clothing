import { useDispatch, useSelector } from 'react-redux';
import { selectCartItems } from '../../store/cart/cart.selector';
import { addItemToCart } from '../../store/cart/cart.action';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import {
  ProductCardContainer,
  Footer,
  Name,
  Price,
} from './product-card.styles';

const ProductCard = ({ product, category, subcategory }) => {
  // Destructure product object
  const { id, name, price, imageUrls } = product;
  const dispatch = useDispatch();

  // Get cartItems using selector
  const cartItems = useSelector(selectCartItems);

  // onClick function when user cliakcs "Add to cart" button
  const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCardContainer to={`/shop/${category}/${id}?subcategory=${subcategory}`}>
      <img src={imageUrls[0]} alt={`${name}`} /> 
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        See details
      </Button>
    </ProductCardContainer>
  );
};

export default ProductCard;
