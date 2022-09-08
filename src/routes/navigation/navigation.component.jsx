import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import SearchDropdown from '../../components/search-dropdown/search-dropdown.component';
import SearchIcon from '../../components/search-icon/search-icon.component';

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsSearchOpen } from '../../store/search/search.action';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';
import { selectIsSearchOpen } from '../../store/search/search.selector';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from './navigation.styles';

const Navigation = () => {
  const dispatch = useDispatch();

  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);
  const isSearchOpen = useSelector(selectIsSearchOpen);

  const signOutUser = () => dispatch(signOutStart());
  
  // Close dropdown menus when user navigates to a different page
  const hideDropdownMenu = () => {
    dispatch(setIsCartOpen(false));
    dispatch(setIsSearchOpen(false));
  }

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'  onClick={hideDropdownMenu}>
          <CrwnLogo className='logo' />
        </LogoContainer>
        
        <NavLinks>
          <SearchIcon />
    
          <NavLink to='/shop'  onClick={hideDropdownMenu}>SHOP</NavLink>

          {currentUser ? (
            <NavLink as='span' onClick={signOutUser}>
              HI, {currentUser.displayName}
            </NavLink>
          ) : (
            <NavLink to='/auth'  onClick={hideDropdownMenu}>SIGN IN</NavLink>
          )}
          
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
        {isSearchOpen && <SearchDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
