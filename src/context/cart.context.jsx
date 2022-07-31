import { createContext, useState, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_CART_COUNT: 'SET_CART_COUNT',
  SET_CART_TOTAL: 'SET_CART_TOTAL',
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [{ cartCount, cartTotal, cartItems }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (cartItems) => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );

    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );

    const payload = {
      cartItems,
      cartCount: newCartCount,
      cartTotal: newCartTotal,
    };

    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemToCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    updateCartItemsReducer(newCartItems);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};


//OLD CONTEXT WITHOUT USING REDUCERS
// import { createContext, useEffect, useState } from "react";

// const addCartItem = (cartItems, productToAdd) => {
//     //find if cartItems contains product to Add based on id value
//     const existingCartItem = cartItems.find(
//         (cartItem) => cartItem.id === productToAdd.id
//     );
    
//     //check if a matching product was found
//     if (existingCartItem) {

//         //map through cartItems
//         //if we are at the matching product increment its quantity
//         //if we are not, leave cartItem alone
//         return cartItems.map((cartItem) => 
//             cartItem.id === productToAdd.id 
//                 ? {...cartItem, quantity: cartItem.quantity + 1}
//                 : cartItem
//         );
//     } 
    
//     //return new array with new cart item
//     return [...cartItems, {...productToAdd, quantity: 1}];   
// }

// const removeCartItem = (cartItems, cartItemToRemove) => {
//     //find if cartItem contains product to decrement based on id value
//     const existingCartItem = cartItems.find(
//         (cartItem) => cartItem.id === cartItemToRemove.id
//     );
    
//     //check if a matching product was found
//     if (existingCartItem) {

//         //if quantity is greater than 1, we need to decrement quantity
//         if (existingCartItem.quantity > 1) {

//             //map through cartItems
//             //if we are at the matching product decrement its quantity
//             //if we are not, leave cartItem alone
//             return cartItems.map((cartItem) => 
//                 cartItem.id === cartItemToRemove.id 
//                     ? {...cartItem, quantity: cartItem.quantity - 1}
//                     : cartItem
//             );
//         } 
//         //if quantity is 1, we need to remove item
//         else if (existingCartItem.quantity === 1) {
//             return cartItems.filter((cartItem) => 
//                 cartItem.id !== cartItemToRemove.id 
//             );
//         }
//     }
    
//     //no matching product was found so we return original array
//     return [...cartItems];   
// }

// const clearCartItem = (cartItems, cartItemToClear) => {
//     return cartItems.filter((cartItem) => 
//         cartItem.id !== cartItemToClear.id 
//     );
// }

// export const CartContext = createContext({
//     isCartOpen: false,
//     setIsCartOpen: () => {},
//     cartItems: [],
//     addItemToCart: () => {},
//     removeItemFromCart: () => {},
//     clearItemFromCart: () => {},
//     cartCount: 0,
//     cartTotal: 0
// })

// export const CartProvider = ({ children }) => {
//     const [isCartOpen, setIsCartOpen] = useState(false);
//     const [cartItems, setCartItems] = useState([]);
//     const [cartCount, setCartCount] = useState(0);
//     const [cartTotal, setCartTotal] = useState(0);

//     //run function everytime array changes
//     //we want to re-count items every time cartItems changes
//     useEffect(() => {
//         //use reduce function to add quanitities of all cartItems and save to newCartCount
//         const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
//         setCartCount(newCartCount);
//     }, [cartItems])

//     useEffect(() => {
//         //use reduce function to add price of all cartItems and save to newCartTotal
//         const newCartTotal = cartItems.reduce((total, cartItem) => total + (cartItem.quantity * cartItem.price), 0);
//         setCartTotal(newCartTotal);
//     }, [cartItems])

//     const addItemToCart = (productToAdd) => {
//         setCartItems(addCartItem(cartItems, productToAdd)); 
//     }

//     const removeItemFromCart = (cartItemToRemove) => {
//         setCartItems(removeCartItem(cartItems, cartItemToRemove));
//     }

//     const clearItemFromCart = (cartItemToClear) => {
//         setCartItems(clearCartItem(cartItems, cartItemToClear));
//     }

//     const value = {
//         isCartOpen, 
//         setIsCartOpen, 
//         addItemToCart, 
//         removeItemFromCart, 
//         clearItemFromCart,
//         cartItems, 
//         cartCount,
//         cartTotal
//     };

//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }