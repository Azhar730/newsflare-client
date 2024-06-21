import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ArticleCard from "../Components/ArticleCard";

const PremiumArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { data: articles = [], refetch } = useQuery({
        queryKey: ['article'],
        queryFn: async () => {
            const res = await axiosSecure.get('/article');
            return res.data
        }
    })
    return (
        <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
            {
                articles.filter(art=>art.isPremium===true).map(article=><ArticleCard key={article._id} article={article} />)
            }
        </div>
    );
};

export default PremiumArticles;