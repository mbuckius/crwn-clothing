import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector } from "react-redux";

import { selectCartTotal } from '../../store/cart/cart.selector';
import { selectCurrentUser } from '../../store/user/user.selector'

import { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { PaymentFormContainer, FormContainer, PaymentButton } from "./payment-form.styles";

const PaymentForm = () => {
    // access stripe
    const stripe = useStripe();
    const elements = useElements();

    // access cart total and user
    const amount = useSelector(selectCartTotal);
    const currentUser = useSelector(selectCurrentUser);

    // loading state for user, by default false
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    // function runs when user submits credit card info
    const paymentHandler = async (e) => {
        e.preventDefault();

        // error handling
        if (!stripe || !elements) {
            return;
        }

        // after error handling we can set isProcessingPayment to true
        setIsProcessingPayment(true);

        // use amount * 100 because stripe expects an integer (cents)
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100 })
        }).then(res => res.json());

        console.log(response);
        
        // destructure to access client_secret from paymentIntent object
        const { paymentIntent: { client_secret }} = response;
        console.log(client_secret);

        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest",
                }
            }
        });

        //payment is done processing, so we can set it to false
        setIsProcessingPayment(false);

        if(paymentResult.error) {
            alert(paymentResult.error);
        }
        else {
            if(paymentResult.paymentIntent.status === 'succeeded') {
                alert('Payment Successful');
            }
        }
    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement />
                {/* disable button based on isProcessingPayment flag */}
                <PaymentButton 
                    isLoading={isProcessingPayment} 
                    buttonType={BUTTON_TYPE_CLASSES.inverted}
                >
                    Pay now
                </PaymentButton>
            </FormContainer>     
        </PaymentFormContainer>
    );
};

export default PaymentForm