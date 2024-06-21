import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { Link } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import DeleteModal from "../Components/Dashboard/DeleteModal";

const MyArticles = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure();
    const { data: articles = [], refetch } = useQuery({
        queryKey: ['my-articles'],
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/my-articles/${user?.email}`);
            return data
        }
    })
    console.log(articles);
    //delete
    const { mutateAsync } = useMutation({
        mutationFn: async id => {
            const { data } = await axiosSecure.delete(`/article/${id}`)
            return data;
        },
        onSuccess: data => {
            if (data.deletedCount > 0) {
                refetch()
                toast.success('Delete Successful')
            }

        }
    })

    const handleDelete = async id => {
        try {
            await mutateAsync(id)
        } catch (err) {
            toast.error(err.message)
        }
    }
    let [isOpen, setIsOpen] = useState(false)
    const closeModal = () => {
        setIsOpen(false)
    }
    return (
        <section className='container px-4 mx-auto pt-12'>
            <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium text-gray-800 '>My Articles</h2>

                <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                    {articles.length} Articles
                </span>
            </div>

            <div className='flex flex-col mt-6'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span></span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Article Title</span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Details</span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <span>Status</span>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <button className='flex items-center gap-x-2'>
                                                <span>isPremium</span>
                                            </button>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Update
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 '>
                                    {articles.map((article, idx) => (
                                        <tr key={article._id}>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {idx + 1}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {article.title}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                <Link to={`/article/${article._id}`} className="btn btn-sm bg-blue-400 hover:bg-blue-600 font-semibold text-[#FFF]">View Details</Link>
                                            </td>

                                            <td className='px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap'>
                                                <div
                                                    className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${article.status === 'Pending' &&
                                                        'bg-yellow-100/60 text-yellow-500'
                                                        } ${article.status === 'Pending' &&
                                                        'bg-blue-100/60 text-blue-500'
                                                        } ${article.status === 'Approved' &&
                                                        'bg-emerald-100/60 text-emerald-500'
                                                        } ${article.status === 'Decline' &&
                                                        'bg-red-100/60 text-red-500'
                                                        } `}
                                                >
                                                    <h2 className='text-sm font-normal '>{article.status}</h2>
                                                </div>
                                            </td>

                                            <td className={article.isPremium ? 'px-4 py-4 text-sm text-blue-500  whitespace-nowrap' : 'px-4 py-4 text-sm text-red-500  whitespace-nowrap'}>
                                                {article.isPremium ? 'Yes' : 'No'}
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                <button
                                                    onClick={() => setIsOpen(true)}
                                                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                                                >
                                                    <span
                                                        aria-hidden='true'
                                                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                                                    ></span>
                                                    <span className='relative'>Delete</span>
                                                </button>
                                                {/* Delete modal */}
                                                <DeleteModal
                                                    isOpen={isOpen}
                                                    closeModal={closeModal}
                                                    handleDelete={handleDelete}
                                                    id={article?._id}
                                                />
                                            </td>
                                            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                                                <Link
                                                    to={`/update-article/${article?._id}`}
                                                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                                                >
                                                    <span
                                                        aria-hidden='true'
                                                        className='absolute inset-0 bg-green-200 opacity-50 rounded-full'
                                                    ></span>
                                                    <span className='relative'>Update</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyArticles;