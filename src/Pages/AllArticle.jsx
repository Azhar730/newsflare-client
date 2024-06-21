import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import ArticleCard from "../Components/ArticleCard";
import { useState } from "react";

const AllArticle = () => {
    const axiosSecure = useAxiosSecure();
    const [search, setSearch] = useState('')
    const [searchText, setSearchText] = useState('')

    const { data: articles = [], refetch } = useQuery({
        queryKey: ['article',search],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allArticle?search=${search}`);
            return res.data
        }
    })
    const handleSearch = e => {
        e.preventDefault()
        setSearch(searchText)
    }
    return (
        <div>
            <div className="w-96 mx-auto">
                <form onSubmit={handleSearch}>
                    <div className='flex p-1 overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
                        <input
                            className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                            type='text'
                            onChange={e => setSearchText(e.target.value)}
                            value={searchText}
                            name='search'
                            placeholder='Search by Article Title'
                            aria-label='Search by Article Title'
                        />

                        <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-700 focus:bg-blue-600 focus:outline-none'>
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
                {
                    articles.filter(art => art.status === 'Approved').map(article => <ArticleCard key={article._id} article={article} />)
                }
            </div>
        </div>
    );
};
export default AllArticle;