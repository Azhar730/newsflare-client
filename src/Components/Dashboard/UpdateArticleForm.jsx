import { ImSpinner9 } from "react-icons/im"
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { useQuery } from "@tanstack/react-query";
import CreatableSelect from "react-select/creatable"

/* eslint-disable react/prop-types */
const UpdateArticleForm = ({ selectedOption, setSelectedOption, handleSubmit, handleImage, loading, articleData, setArticleData, imagePreview, imageText }) => {
    const axiosCommon = useAxiosCommon();
    const { data: publishers = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosCommon.get('/publisher');
            return res.data
        }
    })
    return (
        <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
            <form onSubmit={handleSubmit} className="my-24 w-70% p-2 lg:p-4 lg:w-3/4 m-auto">
                <div className='space-y-1 text-sm'>
                    <label htmlFor='title' className='block text-gray-600 text-lg font-semibold'>
                        Title*
                    </label>
                    <input
                        className='px-4 py-3 w-full text-gray-800 border border-[#315fbc] focus:outline-[#3c6ccc] rounded-md '
                        name='title'
                        value={articleData?.title}
                        onChange={e =>
                            setArticleData({ ...articleData, title: e.target.value })
                        }
                        id='title'
                        type='text'
                        placeholder='Publisher Name'
                        required
                    />
                </div>
                <div className=' p-4 bg-white w-full  m-auto rounded-lg'>
                    <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                        <div className='flex flex-col w-max mx-auto text-center'>
                            <label>
                                <input
                                    className='text-sm cursor-pointer w-36 hidden'
                                    type='file'
                                    name='image'
                                    onChange={e => handleImage(e.target.files[0])}
                                    id='image'
                                    accept='image/*'
                                    hidden
                                />
                                <div className='flex items-center gap-x-4'>
                                    <div className='bg-[#315fbc] text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-[#1656d7]'>
                                        {imageText.length > 20 ?
                                            imageText.split('.')[0].slice(0, 15) + '.' + imageText.split('.')[1]
                                            : imageText}
                                    </div>
                                    <div>
                                        {imagePreview && <img className="h-10 w-16" src={imagePreview} />}
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
                <div className='space-y-1 text-sm'>
                    <label htmlFor='publisher' className='block text-gray-600 text-lg font-semibold'>
                        Publisher*
                    </label>
                    <select
                        required
                        className='px-4 py-3 w-full text-gray-800 border border-[#315fbc] focus:outline-[#3c6ccc] rounded-md'
                        name='publisher'
                        value={articleData?.publisher}
                        onChange={e =>
                            setArticleData({ ...articleData, publisher: e.target.value })
                        }
                    >
                        {publishers.map(publisher => (
                            <option value={publisher.name} key={publisher.name}>
                                {publisher.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='space-y-1 text-sm'>
                    <label htmlFor='title' className='block text-gray-600 text-lg font-semibold'>
                        Tags*
                    </label>
                    <CreatableSelect
                        defaultValue={selectedOption}
                        onChange={setSelectedOption}
                        isMulti
                    />
                </div>
                <div className='space-y-1 text-sm'>
                    <label htmlFor='title' className='block text-gray-600 text-lg font-semibold'>
                        Description*
                    </label>
                    <input
                        className='px-4 py-3 w-full text-gray-800 border border-[#315fbc] focus:outline-[#3c6ccc] rounded-md '
                        name='description'
                        value={articleData?.description}
                        onChange={e =>
                            setArticleData({ ...articleData, description: e.target.value })
                        }
                        id='description'
                        type='text'
                        placeholder='Publisher Name'
                        required
                    />
                </div>
                <button
                    disabled={loading}
                    type='submit'
                    className='disabled:cursor-not-allowed mt-3 bg-[#315fbc] w-full rounded-md py-3 text-white'
                >
                    {loading ? <ImSpinner9 className='animate-spin m-auto text-xl' /> : 'Save & Continue'}
                </button>
            </form>
        </div>
    )
}

export default UpdateArticleForm