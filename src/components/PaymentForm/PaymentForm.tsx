import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useSelector } from 'react-redux';
import { StripeCardElement } from '@stripe/stripe-js';

import { BUTTON_TYPE_CLASSES } from 'components/Button/Button';
import { FormEvent, useState } from 'react';
import { selectCartTotal } from 'store/cart/cart.selector';
import { selectCurrentUser } from 'store/user/user.selector';
import { FormContainer, PaymentButton, PaymentFormContainer } from './payment-form.styles';

const ifValidCardElement = (
    card: StripeCardElement | null
): card is StripeCardElement => card !== null;

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    const paymentHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: amount * 100 }),
        })
            .then((res) => res.json())
            .catch((err) => console.error(err));

        const {
            paymentIntent: { client_secret },
        } = response;

        const cardDetail = elements.getElement(CardElement);

        if (!ifValidCardElement(cardDetail)) return;

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: cardDetail,
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest',
                },
            },
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            console.log('PaymentResult error: ', paymentResult.error);
        } else if (paymentResult.paymentIntent.status === 'succeeded') {
            alert('Payment successful');
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>
                    Pay now
                </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
