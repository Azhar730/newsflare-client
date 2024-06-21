import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import toast from 'react-hot-toast'
import DeleteModal from "../../Components/Dashboard/DeleteModal";


const AllArticles = () => {
    const axiosSecure = useAxiosSecure();
    const { data: articles = [], refetch } = useQuery({
        queryKey: ['article'],
        queryFn: async () => {
            const res = await axiosSecure.get('/article');
            return res.data
        }
    })
    const handleStatus = async (id, prevStatus, status) => {
        if (prevStatus === status) return toast.error('Action not Allowed')
        const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/article/${id}`, { status }
        )
        console.log(data);
        refetch()
    }
    const handleMakePremium = async (id, oldStatus, isPremium) => {
        if (oldStatus === isPremium) return toast.error('Action not Allowed')
        const { data } = await axios.patch(
            `${import.meta.env.VITE_API_URL}/article/${id}`, { isPremium }
        )
        console.log(data);
        refetch()
    }
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
                <h2 className='text-lg font-medium text-gray-800 '>All Articles</h2>

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
                                                <span>Article Title</span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Author Name</span>
                                            </div>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <span>Author Email</span>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <button className='flex items-center gap-x-2'>
                                                <span>Author Photo</span>
                                            </button>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Posted Date
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Status
                                        </th>

                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Approve/Decline
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Delete
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Make Premium
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='bg-white divide-y divide-gray-200 '>
                                    {articles.map(article => (
                                        <tr key={article._id}>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {article.title}
                                            </td>
                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {article.author?.name}
                                            </td>

                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                {article.author?.email}
                                            </td>

                                            <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                                                <img className="w-10 h-10 rounded-full" src={article.author?.photo} />
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                {new Date(article.postedDate).toLocaleDateString()}
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
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <div className='flex items-center gap-x-6'>
                                                    {/* Accept Button: In Progress */}
                                                    <button
                                                        onClick={() =>
                                                            handleStatus(article._id, article.status, 'Approved')
                                                        }
                                                        disabled={article.status === 'Approved'}
                                                        className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            strokeWidth='1.5'
                                                            stroke='currentColor'
                                                            className='w-5 h-5'
                                                        >
                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                d='m4.5 12.75 6 6 9-13.5'
                                                            />
                                                        </svg>
                                                    </button>
                                                    {/* Reject Button */}
                                                    <button
                                                        onClick={() =>
                                                            handleStatus(article._id, article.status, 'Decline')
                                                        }
                                                        disabled={article.status === 'Approved'}
                                                        className='disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'
                                                    >
                                                        <svg
                                                            xmlns='http://www.w3.org/2000/svg'
                                                            fill='none'
                                                            viewBox='0 0 24 24'
                                                            strokeWidth='1.5'
                                                            stroke='currentColor'
                                                            className='w-5 h-5'
                                                        >

                                                            <path
                                                                strokeLinecap='round'
                                                                strokeLinejoin='round'
                                                                d='M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636'
                                                            />
                                                        </svg>
                                                    </button>

                                                </div>
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
                                            <td>
                                                <button onClick={() =>
                                                    handleMakePremium(article._id, article.isPremium, true)
                                                }
                                                    disabled={article.isPremium === true}
                                                    className="disabled:cursor-not-allowed btn btn-sm px-2 bg-blue-200">{article.isPremium ? 'Premium' : 'Make Premium'}</button>
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

export default AllArticles;