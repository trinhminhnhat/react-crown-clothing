import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import CartItem from 'components/CartItem';
import { CartContext } from 'contexts/cart.context';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckOutPage = () => navigate('/checkout');

    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                ))}
            </div>
            <Button onClick={goToCheckOutPage}>GO TO CHECKOUT</Button>
        </div>
    );
};

export default CartDropdown;
