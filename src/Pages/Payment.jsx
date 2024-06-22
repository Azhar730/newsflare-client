import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import CheckoutForm from '../Components/CheckoutForm';


const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = ({price,period}) => {
    console.log(price);
    return (
        <div>
            <h1>Subscription {price}</h1>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={price} period={period}/>
            </Elements>
        </div>
    );
};

export default Payment;