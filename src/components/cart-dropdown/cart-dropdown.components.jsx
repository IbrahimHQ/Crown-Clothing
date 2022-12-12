import { useContext } from 'react';
import { DropdownContext } from '../../contexts/dropdown.context';
import Button from '../button/button.component';
import './cart-dropdown.styles.scss'

const CartDropdown = () => {
    const  { setOpenCart } = useContext(DropdownContext);
    const close  = () => {setOpenCart(false)};
    return (
        <div onMouseLeave= {close} className='cart-dropdown-container'>
            <div className='cart-items' />
            <Button>CHECKOUT</Button>
        </div>
    )
}

export default CartDropdown;