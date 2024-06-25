import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { IoEye, IoEyeOff } from 'react-icons/io5'
import toast from 'react-hot-toast'
import useAuth from '../Hooks/useAuth'
import SocialLogin from '../Components/SocialLogin'

const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state || '/'
  const [email, setEmail] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const { resetPassword, signIn } = useAuth()
  const handleSignIn = async e => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    setEmail(email)
    const password = form.password.value;
    try {
      await signIn(email, password)
      navigate(from)
      toast.success('Sign In Successful')
    }
    catch (err) {
      if (err.message) {
        toast.error('Invalid Email or Password')
      }
    }
  }
  const handleResetPassword = async () => {
    if (!email) return toast.error('Please write your Email first')
    try {
      await resetPassword(email)
      toast.success('Request Success! Please Check Your Email')
    }
    catch (err) {
      toast.error(err.message)
    }
  }
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Log In</h1>
          <p className='text-sm text-gray-400'>
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleSignIn}
          noValidate=''
          action=''
          className='space-y-6 ng-untouched ng-pristine ng-valid'
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                onBlur={e => setEmail(e.target.value)}
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
              Sign In
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button onClick={handleResetPassword} className='text-xs hover:underline hover:text-blue-500 text-gray-400'>
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
          <p className='px-3 text-sm dark:text-gray-400'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 dark:bg-gray-700'></div>
        </div>
        <SocialLogin/>
        <p className='px-6 text-sm text-center text-gray-400'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-blue-500 text-gray-600'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
//const from = location.state?.from?.pathname || "/";