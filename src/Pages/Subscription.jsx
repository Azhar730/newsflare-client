import { useState } from "react";
import { axiosCommon } from "../Hooks/useAxiosCommon";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Payment from "./Payment";

const Subscription = () => {
    const [period, setPeriod] = useState('');
    const [price, setPrice] = useState(0);

    const handlePeriodChange = (e) => {
        const selectedPeriod = e.target.value;
        setPeriod(selectedPeriod);
        switch (selectedPeriod) {
            case '1 minute':
                setPrice(0.10);
                break;
            case '5 days':
                setPrice(5.00);
                break;
            case '10 days':
                setPrice(9.00);
                break;
            default:
                setPrice(0);
        }
    };
    const { mutateAsync } = useMutation({
        mutationFn: async subscribeInfo => {
            const { data } = await axiosCommon.post('/subscribe', subscribeInfo)
            return data;
        }
    })

    const handleSubscribe = async () => {
        try {
            const subscribeInfo = {
                price,
                period
            }
            await mutateAsync(subscribeInfo)
        } catch (err) {
            toast.error(err.message)
        }
    };
    return (
        <div>
            <div className="subscription text-center bg-gray-200 px-6 py-10 rounded-xl shadow-2xl w-2/4 mx-auto">
                <h2 className="text-2xl text-blue-700 font-bold">Select Subscription Period</h2>
                <Payment period={period} price={price} />
                <select className="mt-6 my-8 w-40 px-4 py-2" value={period} onChange={handlePeriodChange}>
                    <option value="" disabled>Select a period</option>
                    <option value='1 minute'>1 Minute - $0.10</option>
                    <option value='5 days'>5 Days - $5.00</option>
                    <option value='10 days'>10 Days - $9.00</option>
                </select> <br />
                <button to={'/payment'} disabled={price < 0.10} className="disabled:cursor-not-allowed btn bg-blue-500 hover:bg-blue-600 text-[#fff] font-semibold btn-sm" onClick={handleSubscribe}>Subscribe Now ${price.toFixed(2)}</button>
            </div>

        </div>
    );
};

export default Subscription;