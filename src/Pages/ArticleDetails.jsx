import { useParams } from "react-router-dom";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import LoadingSpinner from "../Components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import Container from "../Components/Container";

const ArticleDetails = () => {
    const axiosCommon = useAxiosCommon()
    const { id } = useParams()

    const { data: article = {}, isLoading, refetch } = useQuery({
        queryKey: ['article', id],
        queryFn: async () => {
            const { data } = await axiosCommon.get(`/article/${id}`)
            return data;
        }
    })
    const { _id, title, image_url, publisher, description, tags, author, postedDate, status } = article
    if (isLoading) return <LoadingSpinner />
    return (
        <Container>
            {article && (
                <div className='max-w-screen-lg mx-auto'>
                    {/* Header */}
                    <div className='flex flex-col gap-3'>
                        <div className='w-full overflow-hidden rounded-xl'>
                            <img
                                className='object-cover w-full'
                                src={image_url}
                                alt='header image'
                            />
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-between">
                            <div className="my-3 flex items-center gap-4">
                                <img className="w-16 h-16 rounded-full" src={author.photo} />
                                <div>
                                    <p className="text-lg">Posted by <span className="font-semibold">{author.name}</span></p>
                                    <p>Email: {author.email}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg">Published by <span className="text-blue-600 font-semibold text-xl">{publisher}</span></p>
                                <p className="text-gray-600 text-lg font-semibold">Posted Date: {new Date(postedDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <h1 className="text-3xl font-bold">{title}</h1>
                        <div className="flex gap-x-6">
                            {
                                tags.map((tag, idx) => <p className="bg-blue-300 shadow-xl px-3 py-1 rounded-full font-semibold" key={idx}>{tag}</p>)
                            }
                        </div>
                        <p className="text-gray-600 text-lg font-semibold">{description}</p>
                    </div>
                </div>
            )}
        </Container>
    );
};

export default ArticleDetails;