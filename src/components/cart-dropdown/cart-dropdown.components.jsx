import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { DropdownContext } from '../../contexts/dropdown.context';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext);

    const  { setOpenCart } = useContext(DropdownContext);
    const close  = () => {setOpenCart(false)};

    const navigate = useNavigate();
    const goToCheckoutHandler = () => {
        navigate('/checkout')
    };

    return (
        <div className='cart-dropdown-container'> {/* onMouseLeave= {close} */}
            <div className='cart-items'>
                {cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
            </div>
            <Button onClick={goToCheckoutHandler}>CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;
