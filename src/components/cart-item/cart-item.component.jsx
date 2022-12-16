import { 
    CartItemContainerStyled, 
    ItemDetailsStyled, 
    NameStyled
} from './cart-item.styles';

const CartItem = ({ cartItem }) => {
    const { name, quantity, price, imageUrl} = cartItem;
    return (
        <CartItemContainerStyled>
            <img src={imageUrl} alt={`${name}`} />
            <ItemDetailsStyled>
                <NameStyled>{name}</NameStyled>
                <span className='price'>{quantity} x ${price}</span>
            </ItemDetailsStyled>
        </CartItemContainerStyled>
    )
}

export default CartItem;