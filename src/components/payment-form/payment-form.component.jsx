import { useState } from 'react';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import { UserContext } from '../../contexts/users.contexts';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const { totalCost } = useContext(CartContext);
    const { currentUser } = useContext(UserContext);
    const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);

    const handlePayment = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        setIsPaymentProcessing(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: totalCost * 100 }) //*100 to convert $ to cents as stripe requires
        }).then(res => res.json());
        
        const { paymentIntent: { client_secret } } = response; //destructuring client secret from paymentIntent object off response

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        });

        setIsPaymentProcessing(false);

        if(paymentResult.error) {
            alert(paymentResult.error);
        } else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment successful!')
            }
        }
    };

    return(
        <PaymentFormContainer>
            <FormContainer onSubmit={handlePayment}>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <PaymentButton 
                    isLoading={isPaymentProcessing} 
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                >
                    Pay Now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer> 
    )
};

export default PaymentForm;