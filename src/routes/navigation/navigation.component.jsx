import { useState, Fragment } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import SearchBox from '../../components/search-box/search-box.component';

import { selectIsCartOpen } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import { selectCurrentUser } from '../../store/user/user.selector';
import { signOutStart } from '../../store/user/user.action';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
} from './navigation.styles';

const Navigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const currentUser = useSelector(selectCurrentUser);
  const isCartOpen = useSelector(selectIsCartOpen);

  const signOutUser = () => dispatch(signOutStart());
  
  // Close dropdown menus when user navigates to a different page
  const hideDropdownMenu = () => dispatch(setIsCartOpen(false));

  // Create searchField, showResults, and products array
  const [searchField, setSearchField] = useState('');
  
  // called when input in SearchBox changes (user types/deletes letters)
  const onSearchChange = (event) => {
      const searchFieldString = event.target.value.toLocaleLowerCase();
      setSearchField(searchFieldString); 
  };

  // Runs whenever user enters a key
  const onEnter = (event) => {
      // Want to go to search results page when user presses Enter
      if (event.key ==='Enter') {
          navigate(`/search/${searchField}`);
      }
  };

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'  onClick={hideDropdownMenu}>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/search' onClick={hideDropdownMenu}>SEARCH</NavLink>
          
          {/* <SearchBox 
            placeholder='&#128269;  Search for Products' 
            onChangeHandler ={ onSearchChange }
            onKeyPress = { onEnter } /> */}

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
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
