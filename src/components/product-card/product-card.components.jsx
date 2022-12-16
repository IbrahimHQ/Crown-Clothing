import { 
    ProductCardContainerStyled,
    FooterStyled,
    NameStyled,
    PriceStyled
} from './product-card.styles';
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl} = product;
    const { addItem } = useContext(CartContext);
    
    return (
        <ProductCardContainerStyled>
            <img src={imageUrl} alt={`${name}`}/>
            <FooterStyled>
                <NameStyled>{name}</NameStyled>
                <PriceStyled>${price}</PriceStyled>
            </FooterStyled>
            <Button 
                buttonType={BUTTON_TYPE_CLASSES.inverted}
                onClick={()=> addItem(product)}
            >
                Add to cart
            </Button>
        </ProductCardContainerStyled>
    )
}

export default ProductCard;