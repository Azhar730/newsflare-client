import { useQuery } from "@tanstack/react-query";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, PieChart, Pie, Legend } from 'recharts';
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Statistics = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: chartData = [] } = useQuery({
        queryKey: ['order-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/order-stats')
            return res.data
        }
    })
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };

    //custom shape for the pie chart
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const pieChartData = chartData.map(data=>{
        return {name: data.publisher,value: data.quantity}
    })
    return (
        <div className="">
            <h2 className="text-4xl px-20 py-4 font-bold">Hi, {user?.displayName} Welcome Back</h2>
            {/* <div className="flex items-center justify-center gap-x-4">
                <div className="w-52 h-28 rounded-lg p-4 bg-gradient-to-r from-[#cc72f2] to-[#efdcf1]">
                    <h1 className="text-4xl font-bold text-center">Revenue <br />{stats.revenue}</h1>
                </div>
                <div className="w-52 h- rounded-lg p-4 bg-gradient-to-r from-[#D3A256] to-[#FDE8C0]">
                    <h1 className="text-4xl font-bold text-center">Customers <br />{stats.users}</h1>
                </div>
                <div className="w-52 h- rounded-lg p-4 bg-gradient-to-r from-[#FE4880] to-[#FECDE9]">
                    <h1 className="text-4xl font-bold text-center">Products <br />{stats.menuItems}</h1>
                </div>
                <div className="w-52 h- rounded-lg p-4 bg-gradient-to-r from-[#6AAEFF] to-[#B6F7FF]">
                    <h1 className="text-4xl font-bold text-center">Orders <br />{stats.orders}</h1>
                </div>

            </div> */}
            <div className="flex">
                <div className="w-1/2">
                    <BarChart
                        width={500}
                        height={300}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="publisher" />
                        <YAxis />
                        <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 6]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
                <div className="w-1/2">
                    <PieChart width={400} height={400}>
                        <Pie
                            data={pieChartData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                        >
                            {pieChartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Legend/>
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default Statistics;