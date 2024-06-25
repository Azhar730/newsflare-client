import { FcGoogle } from 'react-icons/fc';

import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import toast from 'react-hot-toast';

const SocialLogin = () => {
    const axiosCommon = useAxiosCommon()
    const navigate = useNavigate()
    const from = location?.state || '/'
    const { signInWithGoogle } = useAuth()
    const handleGoogleSignUp = () => {
        signInWithGoogle()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    image_url: result.user?.photoURL,
                }
                console.log(result);
                axiosCommon.post('/users', userInfo)
                    .then(res => {
                        navigate(from)
                        toast.success('Sign Up Successful')

                    })
            })
    }
    return (
        <div className='flex justify-center items-center'>
            <button onClick={handleGoogleSignUp} className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 border-rounded cursor-pointer'>
                <FcGoogle size={32} />

                <p>Continue with Google</p>
            </button>
        </div>
    );
};

export default SocialLogin;