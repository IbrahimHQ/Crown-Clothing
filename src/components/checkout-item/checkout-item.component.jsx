import { 
    CheckoutItemContainerStyled, 
    ImageContainerStyled,
    QuantityStyled,
    RemoveButtonStyled,
    BasicSpan
} from './checkout-item.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';


const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity} = cartItem
    const { addItem, subtractItem, removeItem} = useContext(CartContext);

    const handleRemoveItem = () => removeItem(cartItem);
    const handleAddItem = () => addItem(cartItem);
    const handleSubtractItem = () => subtractItem(cartItem);

    return (
        <CheckoutItemContainerStyled>
            <ImageContainerStyled>
                <img src={imageUrl} alt={`${name}`} />
            </ImageContainerStyled>
            <BasicSpan className='name'> {name} </BasicSpan>
            <QuantityStyled>
                <div className='arrow' onClick={handleSubtractItem}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={handleAddItem}>&#10095;</div>
            </QuantityStyled>
            <BasicSpan className='price'> ${price} </BasicSpan>
            <RemoveButtonStyled onClick={handleRemoveItem}>&#10005;</RemoveButtonStyled>
        </CheckoutItemContainerStyled>
    )
}

export default CheckoutItem;