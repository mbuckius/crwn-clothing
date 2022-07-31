import { Fragment, useContext } from "react";
import { Outlet, Link } from "react-router-dom";

import { signOutUser } from "../../utils/firebase/firebase.utils";

import { UserContext } from "../../context/user.context";
import { CartContext } from "../../context/cart.context";

import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import { NavigationContainer, NavLinks, NavLink, LogoContainer } from './navigation.styles';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    const { isCartOpen } = useContext(CartContext);

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer to='/'>
                    <CrwnLogo className="logo" />
                </LogoContainer>
                <NavLinks>
                    <NavLink to='/shop'>
                        SHOP
                    </NavLink>
                    {
                       currentUser ? (
                        <NavLink as='span' className="nav-link" onClick={ signOutUser }>
                            SIGN OUT
                        </NavLink>
                       ) : (
                        <NavLink to='/auth'>
                            SIGN IN
                        </NavLink>
                       )
                    }
                    <CartIcon />
                </NavLinks>
                {/* check if cart is open, then show dropdown cart */}
                {isCartOpen && <CartDropdown />} 
            </NavigationContainer>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;