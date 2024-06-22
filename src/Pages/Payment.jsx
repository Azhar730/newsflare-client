import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useParams } from 'react-router-dom';
import CheckoutForm from "../../src/Components/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY);
const Payment = () => {
    const { price } = useParams();
    return (
        <div className=" pt-20 min-h-[calc(100vh-180px)]">
            {/* <h3>payment page </h3> */}
            <Elements stripe={stripePromise}>
                <CheckoutForm totalPrice={price}/>
            </Elements>
        </div>
    );
};
//
export default Payment;