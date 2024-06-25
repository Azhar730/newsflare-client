import { Link, useLocation, useNavigate } from 'react-router-dom'
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from 'react'
import toast from 'react-hot-toast';
import { imageUpload } from '../Utils/imageUpload';
import useAuth from '../Hooks/useAuth';
import { axiosCommon } from '../Hooks/useAxiosCommon';
import SocialLogin from '../Components/SocialLogin';

const SignUp = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state || '/'
  const [showPassword, setShowPassword] = useState(false)
  const { createUser, updateUserProfile } = useAuth()
  const handleSignUp = async e => {
    e.preventDefault()
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0]
    if (password.length < 6) {
      return toast.error('Password should be Atleast 6 character or longer')
    }
    else if (!/[A-Z]/.test(password)) {
      return toast.error('Your Password Should have Atleast one UPPERCASE')
    }
    else if (!/[a-z]/.test(password)) {
      return toast.error('Your Password Should have Atleast one lowercase')
    }
    else if (!/[!@#$&*]/.test(password)) {
      return toast.error('Your Password Should have Atleast one Special Character')
    }
    try {
      //1. upload image & get image url
      const image_url =await imageUpload(image)
      //2. User Registration
      await createUser(email, password)
      //3. Save username & photo in firebase
      await updateUserProfile(name, image_url)
        const userInfo = {
            name,
            email,
            image_url
        }
        axiosCommon.post('/users', userInfo)
        .then(res=>{
            if(res.data.insertedId){
                navigate(from)
                toast.success('Sign Up Successful')
            }
        })
      
    }
    catch (err) {
      if (err.message) {
        toast.error('Already Registered')
      }
    }
  }
  // const handleGoogleSignUp = async () => {
  //   try {
  //     await signInWithGoogle()
      
  //     navigate(from)
  //     toast.success('Sign Up Successful')
  //   }
  //   catch (err) {
  //     if (err.message) {
  //       toast.error('Already Registered')
  //     }
  //   }
  // }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to StayVista</p>
        </div>
        <form
          onSubmit={handleSignUp}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                autoComplete='new-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-blue-500 bg-gray-200 text-gray-900'
              />
              <span className="absolute mt-3 -ml-8 text-xl" onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ? <IoEyeOff></IoEyeOff> : <IoEye></IoEye>
                }
              </span>
            </div>
          </div>

          <div>
            <button
              type='submit'
              className='disabled:cursor-not-allowed bg-blue-500 w-full rounded-md py-3 text-white'
            >
              Continue
            </button>
          </div>
        </form>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Signup with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <SocialLogin/>
        <p className='px-6 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-blue-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default SignUp

