import { FC, memo } from 'react';

import { CartItem as TCartItem } from 'store/cart/cart.type';
import { CardItemContainer, ItemDetail } from './cart-item.styles';

type CardItemProps = {
    cartItem: TCartItem;
}

const CartItem: FC<CardItemProps> = memo(({ cartItem }) => {
    const { imageUrl, price, name, quantity } = cartItem;

    return (
        <CardItemContainer>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetail>
                <span className="name">{name}</span>
                <span className="price">
                    {quantity} x ${price}
                </span>
            </ItemDetail>
        </CardItemContainer>
    );
});

export default CartItem;
