import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../Hooks/useAxiosCommon";
import CountUp from 'react-countup';

const AllUser = () => {
    const { data: users = [] } = useQuery({
        queryKey: ['home-stats'],
        queryFn: async () => {
            const res = await axiosCommon.get('/home-stats');
            return res.data
        }
    })
    return (
        <div className="text-center gap-x-20 text-3xl font-bold flex items-center justify-center">
            <p className="bg-gray-200 px-6 py-2 shadow-xl rounded-xl">All User <br /> <CountUp
                start={0}
                end={users.users}
                duration={.75}
            >
                {({ countUpRef, start }) => (
                    <div>
                        <span ref={countUpRef} />
                        <button className="btn btn-sm bg-blue-400 hover:bg-blue-500" onClick={start}>Start</button>
                    </div>
                )}
            </CountUp></p>
            <p className="bg-gray-200 px-6 py-2 shadow-xl rounded-xl">Normal User <br /> <CountUp
                start={0}
                end={users.normalUsers}
                duration={.75}
            >
                {({ countUpRef, start }) => (
                    <div>
                        <span ref={countUpRef} />
                        <button className="btn btn-sm bg-blue-400 hover:bg-blue-500" onClick={start}>Start</button>
                    </div>
                )}
            </CountUp></p>
            <p className="bg-gray-200 px-6 py-2 shadow-xl rounded-xl">Premium User <br /> <CountUp
                start={0}
                end={users.premiumUsers}
                duration={.75}
            >
                {({ countUpRef, start }) => (
                    <div>
                        <span ref={countUpRef} />
                        <button className="btn btn-sm bg-blue-400 hover:bg-blue-500" onClick={start}>Start</button>
                    </div>
                )}
            </CountUp></p>
        </div>
    );
};

export default AllUser;