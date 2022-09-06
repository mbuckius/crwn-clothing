import { CartItemContainer, ItemDetails } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
  // Desctructure cartItem
  const { name, price, imageUrls, quantity } = cartItem;
 
  return (
    <CartItemContainer>
      <img src={imageUrls[0]} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
};

export default CartItem;
