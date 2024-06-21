import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
// import Select from "react-select"
import CreatableSelect from "react-select/creatable"
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { imageUpload } from "../../Utils/imageUpload";
import { useLoaderData } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateArticle = () => {
    const { _id,title, publisher, description } = useLoaderData()
    const axiosSecure = useAxiosSecure()
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')
    const [loading, setLoading] = useState(false)
    const [selectedOption, setSelectedOption] = useState(null);
    const axiosCommon = useAxiosCommon();
    const { data: publishers = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosCommon.get('/publisher');
            return res.data
        }
    })

    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target

        const title = form.title.value;
        const image = form.image.files[0]
        const image_url = await imageUpload(image)
        const publisher = form.publisher.value
        const tags = selectedOption.map(item => item.value)
        const description = form.description.value

        const articleInfo = {
            title,
            image_url,
            publisher,
            description,
            tags
        };
        try{
            const {data} = await axiosSecure.put(`/article/update/${_id}`,articleInfo)
            if(data.modifiedCount>0){
                toast.success('Data Updated Successfully')
                // navigate('/myPostedJobs')
                form.reset()
            }
        }catch(err){
            console.log(err.message);
        }
        setLoading(false)
    }
    return (
        <div className="bg-[#eff1f5] my-24 p-1 lg:p-6 w-70% lg:w-3/4 mx-auto">
            <form onSubmit={handleSubmit} className="my-24 w-70% p-2 lg:p-4 lg:w-3/4 m-auto">
                <div className='space-y-1 text-sm'>
                    <label htmlFor='title' className='block text-gray-600 text-lg font-semibold'>
                        Title*
                    </label>
                    <input
                    defaultValue={title}
                        className='px-4 py-3 w-full text-gray-800 border border-[#315fbc] focus:outline-[#3c6ccc] rounded-md '
                        name='title'
                        id='title'
                        type='text'
                        placeholder='Publisher Name'
                        required
                    />
                </div>
                <div className='p-4 mt-2 bg-white m-auto rounded-lg  border-2 border-[#315fbc]'>
                    <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
                        <div className='flex flex-col w-max mx-auto text-center'>
                            <label>
                                <input
                                    onChange={e => handleImage(e.target.files[0])}
                                    className='text-sm cursor-pointer w-36 hidden'
                                    type='file'
                                    name='image'
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
                    defaultValue={publisher}
                        required
                        className='px-4 py-3 w-full text-gray-800 border border-[#315fbc] focus:outline-[#3c6ccc] rounded-md'
                        name='publisher'
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
                    defaultValue={description}
                        className='px-4 py-3 w-full text-gray-800 border border-[#315fbc] focus:outline-[#3c6ccc] rounded-md '
                        name='description'
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
    );
};

export default UpdateArticle;