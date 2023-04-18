import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrownLogo } from 'assets/img/crown.svg';
import CartDropdown from 'components/CartDropdown';
import CartIcon from 'components/CartIcon';
import { selectIsCartOpen } from 'store/cart/cart.selector.js';
import { selectCurrentUser } from 'store/user/user.selector.js';
import { signOutUser } from 'utils/firebase';
import './navigation.styles.jsx';
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from './navigation.styles.jsx';

const Navigation = () => {
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>

                    {currentUser ? (
                        <NavLink as="span" onClick={signOutUser}>
                            SIGN OUT
                        </NavLink>
                    ) : (
                        <NavLink to="/auth">SIGN IN</NavLink>
                    )}

                    <CartIcon />
                </NavLinks>
                {isCartOpen && <CartDropdown />}
            </NavigationContainer>
            <Outlet />
        </>
    );
};

export default Navigation;
