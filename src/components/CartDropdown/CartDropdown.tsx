import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import CartItem from 'components/CartItem';
import { selectCartItems } from 'store/cart/cart.selector';
import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles';

const CartDropdown = () => {
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);

    const goToCheckOutPage = () => navigate('/checkout');

    return (
        <CartDropdownContainer>
            <CartItems>
                {cartItems.length ? (
                    cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
                ) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItems>
            <Button onClick={goToCheckOutPage}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;
