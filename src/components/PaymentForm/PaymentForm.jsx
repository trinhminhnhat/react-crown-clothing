import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import { BUTTON_TYPE_CLASSES } from 'components/Button/Button';
import { FormContainer, PaymentButton, PaymentFormContainer } from './payment-form.styles';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const paymentHandler = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;
    };

    return (
        <PaymentFormContainer>
            <FormContainer>
                <h2>Credit Card Payment:</h2>
                <CardElement />
                <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;
