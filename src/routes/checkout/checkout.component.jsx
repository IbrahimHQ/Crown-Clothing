import { 
    CheckoutContainerStyled,
    CheckoutHeaderStyled,
    HeaderBlock,
    TotalStyled
} from './checkout.styles';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {
    const { cartItems, totalCost } = useContext(CartContext);
    return (
        <CheckoutContainerStyled>
            <CheckoutHeaderStyled>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>
            </CheckoutHeaderStyled>
            {cartItems.map((cartItem) => (
                <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            ))}
            <TotalStyled>Total: ${totalCost}</TotalStyled>
            <PaymentForm />
        </CheckoutContainerStyled>
    )
};

export default Checkout;