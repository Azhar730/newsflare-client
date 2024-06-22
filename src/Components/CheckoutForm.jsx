import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';

const CheckoutForm = ({price,period}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId,setTransactionId] = useState('')
    const axiosSecure = useAxiosSecure()
    const { user } = useAuth()
    const totalPrice = price
    console.log(period);
    useEffect(() => {
        if(totalPrice>0){
            axiosSecure.post('/create-payment-intent', { price: totalPrice })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret)
            })
        }
    }, [axiosSecure, totalPrice])

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
            setError(error.message)
        } else {
            console.log('[PaymentMethod]', paymentMethod);
            setError('')
        }
        //confirm-payment
        const { paymentIntent, error: confirmError } = await stripe.
        confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if (confirmError) {
            console.log('confirmError');
        } 
        else {
            console.log('payment intent', paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id)
                
                //now save the payment info in the database
                const payment = {
                    email: user?.email,
                    price: totalPrice,
                    transactionId: paymentIntent.id,
                    date: new Date(),
                    period
                }
                const res = await axiosSecure.post('/payments',payment)
                console.log(res.data);
                if(res.data?.paymentResult?.insertedId){
                    toast.success('Payment Successful')
                }
                else{
                    toast.error('Not Successful')
                }
            }
        }
    };
    return (
        <div className='w-2/4 mx-auto bg-gray-200'>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className='btn btn-primary' type="submit" disabled={!stripe || !clientSecret}>
                    Pay ${price}
                </button>
                <p className='text-red-600'>{error}</p>
                {transactionId && <p className='text-green-600'>Your Transaction Id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;