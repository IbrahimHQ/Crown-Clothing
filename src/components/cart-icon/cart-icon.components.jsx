import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { DropdownContext } from '../../contexts/dropdown.context';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const { openCart, setOpenCart } = useContext(DropdownContext);
    const toggleDropdown = () => {setOpenCart(!openCart)}
    const { totalQuantity } = useContext(CartContext);
    return (
        <div className='cart-icon-container' onClick={toggleDropdown}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{totalQuantity}</span>
        </div>
    )
}

export default CartIcon;