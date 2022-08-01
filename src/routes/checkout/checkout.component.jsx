import { useSelector } from "react-redux";

import CheckoutItem from "../../components/checkout-item.component.jsx/checkout-item.component";
import { selectCartItems, selectCartTotal } from "../../store/cart/cart.selector";

import { 
    CheckoutContainer, 
    CheckoutHeader, 
    HeaderBlock,
    CheckoutItems,
    Total
} from './checkout.styles'

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal);
   
    return (
        <CheckoutContainer>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeader>

            <CheckoutItems>
                { cartItems.map((cartItem) => (
                        <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                ))}
            </CheckoutItems>

            <Total>{`Total: $${cartTotal}`}</Total>
            
        </CheckoutContainer>
    )
}

export default Checkout;