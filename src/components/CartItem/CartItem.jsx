import { CardItemContainer, ItemDetail } from './cart-item.styles';

const CartItem = ({ cartItem }) => {
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
};

export default CartItem;
