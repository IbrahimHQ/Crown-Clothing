import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { DropdownContext } from '../../contexts/dropdown.context';

const CartIcon = () => {
    const { openCart, setOpenCart } = useContext(DropdownContext);
    const toggleDropdown = () => {setOpenCart(!openCart)}
    return (
        <div className='cart-icon-container' onClick={toggleDropdown}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon;