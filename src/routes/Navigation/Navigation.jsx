import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { ReactComponent as CrownLogo } from 'assets/img/crown.svg';
import CartDropdown from 'components/CartDropdown';
import CartIcon from 'components/CartIcon';
import { selectIsCartOpen } from 'store/cart/cart.selector';
import { signOutStart } from 'store/user/user.action';
import { selectCurrentUser } from 'store/user/user.selector';
import './navigation.styles.jsx';
import { LogoContainer, NavLink, NavLinks, NavigationContainer } from './navigation.styles.jsx';

const Navigation = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

    const onSignOut = () => {
        dispatch(signOutStart());
    };

    return (
        <>
            <NavigationContainer>
                <LogoContainer to="/">
                    <CrownLogo />
                </LogoContainer>
                <NavLinks>
                    <NavLink to="/shop">SHOP</NavLink>

                    {currentUser ? (
                        <NavLink as="span" onClick={onSignOut}>
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
