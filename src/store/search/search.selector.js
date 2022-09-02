import { createSelector } from 'reselect';
const selectSearchReducer = (state) => state.search;

export const selectIsSearchOpen = createSelector(
    [selectSearchReducer],
    (search) => search.isSearchOpen
);




// const selectCartReducer = (state) => state.cart;

// export const selectCartItems = createSelector(
//   [selectCartReducer],
//   (cart) => cart.cartItems
// );

// export const selectIsCartOpen = createSelector(
//   [selectCartReducer],
//   (cart) => cart.isCartOpen
// );