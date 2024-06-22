import { useQuery } from "@tanstack/react-query";
import { axiosCommon } from "../Hooks/useAxiosCommon";

const AllUser = () => {
    const { data: users = [] } = useQuery({
        queryKey: ['home-stats'],
        queryFn: async () => {
            const res = await axiosCommon.get('/home-stats');
            return res.data
        }
    })
    return (
        <div>
            <p>All User{users.users}</p>
            <p>Normal User{users.normalUsers}</p>
            <p>Premium User{users.premiumUsers}</p>
        </div>
    );
};

export default AllUser;