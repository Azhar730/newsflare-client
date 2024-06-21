import { FaFacebook, FaGithub } from 'react-icons/fa6';
import { FcGoogle } from 'react-icons/fc';

import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosCommon from '../Hooks/useAxiosCommon';

const SocialLogin = () => {
    const axiosCommon = useAxiosCommon()
    const navigate = useNavigate()
    const { googleSignIn } = useAuth()
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    image: result.user?.photoURL,
                    premiumTaken: null,
                    lastSignInTime: result.user?.metadata?.lastSignInTime,
                    status: 'Normal User'
                }
                console.log(result);
                axiosCommon.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/')
                    })
            })
    }
    return (
        <div className="text-center">
            <p className="flex items-center justify-center gap-x-8 text-4xl font-bold">
                <FaFacebook></FaFacebook>
                <FcGoogle onClick={handleGoogleSignIn}></FcGoogle>
                <FaGithub></FaGithub>
            </p>
        </div>
    );
};

export default SocialLogin;