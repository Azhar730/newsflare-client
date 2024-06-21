import { useState } from "react";
import { imageUpload } from "../../Utils/imageUpload";
import { ImSpinner9 } from "react-icons/im";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAxiosCommon from "../../Hooks/useAxiosCommon";

const AddPublishers = () => {
    const [imagePreview, setImagePreview] = useState()
    const [imageText, setImageText] = useState('Upload Image')
    const [loading, setLoading] = useState(false)
    const axiosCommon = useAxiosCommon()

    const handleImage = image => {
        setImagePreview(URL.createObjectURL(image))
        setImageText(image.name)
    }
    const { mutateAsync } = useMutation({
        mutationFn: async roomData => {
            const { data } = await axiosCommon.post('/publisher', roomData)
            return data;
        },
        onSuccess: () => {
            toast.success('Room Added Successfully')
            // navigate('/dashboard/my-listings')
            setLoading(false)

        }
    })

    const handleSubmit = async e => {
        e.preventDefault()
        setLoading(true)
        const form = e.target
        const name = form.name.value;
        const image = form.image.files[0]
        const image_url = await imageUpload(image)

        try {
            const publisherInfo = {
                name,
                image_url
            }
            //post request to server
            await mutateAsync(publisherInfo)
            form.reset()
        } catch (err) {
            toast.error(err.message)
            setLoading(false)
        }
    }
    return (
        <div className="bg-[#eff1f5] p-1 lg:p-6 w-full lg:w-3/4 mx-auto">
            <form onSubmit={handleSubmit} className="w-full p-2 lg:p-4 lg:w-2/4 m-auto">
                <div className='space-y-1 text-sm'>
                    <label htmlFor='title' className='block text-gray-600 text-lg font-semibold'>
                        Publisher Name*
                    </label>
                    <input
                        className='px-4 py-3 w-full text-gray-800 border border-[#315fbc] focus:outline-[#3c6ccc] rounded-md '
                        name='name'
                        id='name'
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

export default AddPublishers;