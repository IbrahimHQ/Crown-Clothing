import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DropdownContext } from '../../contexts/dropdown.context';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import { CartDropdownContainer, EmptyMessage, CartItemsStyles} from './cart-dropdown.styles'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    const  { setOpenCart } = useContext(DropdownContext);
    const close  = () => {setOpenCart(false)};

    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout')
    };

    return (
        <CartDropdownContainer onMouseLeave={close}>
            <CartItemsStyles>
                {
                    cartItems.length ? (cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))) : (
                    <EmptyMessage>Your cart is empty</EmptyMessage>
                )}
            </CartItemsStyles>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;
