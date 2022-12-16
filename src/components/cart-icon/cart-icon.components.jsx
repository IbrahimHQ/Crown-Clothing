import { CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles';
//import { ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'; --> moved into styles
import { useContext } from 'react';
import { DropdownContext } from '../../contexts/dropdown.context';
import { CartContext } from '../../contexts/cart.context';

const CartIcon = () => {
    const { openCart, setOpenCart } = useContext(DropdownContext);
    const toggleDropdown = () => {setOpenCart(!openCart)}
    const { totalQuantity } = useContext(CartContext);
    return (
        <CartIconContainer onClick={toggleDropdown}>
            <ShoppingIcon className='shopping-icon'/>
            <ItemCount>{totalQuantity}</ItemCount>
        </CartIconContainer>
    )
};

export default CartIcon;