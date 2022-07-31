import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    //find if cartItems contains product to Add based on id value
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    
    //check if a matching product was found
    if (existingCartItem) {

        //map through cartItems
        //if we are at the matching product increment its quantity
        //if we are not, leave cartItem alone
        return cartItems.map((cartItem) => 
            cartItem.id === productToAdd.id 
                ? {...cartItem, quantity: cartItem.quantity + 1}
                : cartItem
        );
    } 
    
    //return new array with new cart item
    return [...cartItems, {...productToAdd, quantity: 1}];   
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find if cartItem contains product to decrement based on id value
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );
    
    //check if a matching product was found
    if (existingCartItem) {

        //if quantity is greater than 1, we need to decrement quantity
        if (existingCartItem.quantity > 1) {

            //map through cartItems
            //if we are at the matching product decrement its quantity
            //if we are not, leave cartItem alone
            return cartItems.map((cartItem) => 
                cartItem.id === cartItemToRemove.id 
                    ? {...cartItem, quantity: cartItem.quantity - 1}
                    : cartItem
            );
        } 
        //if quantity is 1, we need to remove item
        else if (existingCartItem.quantity === 1) {
            return cartItems.filter((cartItem) => 
                cartItem.id !== cartItemToRemove.id 
            );
        }
    }
    
    //no matching product was found so we return original array
    return [...cartItems];   
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => 
        cartItem.id !== cartItemToClear.id 
    );
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    //run function everytime array changes
    //we want to re-count items every time cartItems changes
    useEffect(() => {
        //use reduce function to add quanitities of all cartItems and save to newCartCount
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
        setCartCount(newCartCount);
    }, [cartItems])

    useEffect(() => {
        //use reduce function to add proce of all cartItems and save to newCartTotal
        const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd)); 
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        clearItemFromCart,
        cartItems, 
        cartCount,
        cartTotal
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}