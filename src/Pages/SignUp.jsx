import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import Swal from 'sweetalert2'
import useAuth from "../Hooks/useAuth";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import SocialLogin from "../Components/SocialLogin";

const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useAuth()
    const navigate = useNavigate();
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const axiosCommon = useAxiosCommon()


    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        console.log('user profile info updated')
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            image: data.photoURL,
                            premiumTaken: null,
                            lastSignInTime: loggedUser?.metadata?.lastSignInTime,
                            status: 'Normal User'
                        }
                        axiosCommon.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate(from);
                                }
                            })
                    })
                    .catch(error => console.log(error))
            })
    };

    return (
        <div className="flex flex-row-reverse mt-20 items-center gap-x-16 p-16 shadow-slate-700 bg-[url('https://i.postimg.cc/zBTCjD9x/authentication.png')]">
            <div className="flex-1">
                <img src='https://i.postimg.cc/3rCj0RjR/authentication1.png' />
            </div>
            <div className="flex-1">
                <h1 className="text-3xl font-semibold text-center">Sign Up</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Full Name</span>
                        </label>
                        <input name="name"
                            {...register("name", { required: true })}
                            type="text" placeholder="Your Name" className="input input-bordered" />
                        {errors.name && <span className="text-red-600">Name is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Email</span>
                        </label>
                        <input name="email"
                            {...register("email", { required: true })}
                            type="email" placeholder="Your Email" className="input input-bordered" />
                        {errors.email && <span className="text-red-600">Email is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">PhotoURL</span>
                        </label>
                        <input name="photo"
                            {...register("photoURL", { required: true })}
                            type="text" placeholder="Your Password" className="input input-bordered" />
                        {errors.photoURL && <span className="text-red-600">PhotoURL is required</span>}
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text text-lg font-semibold">Password</span>
                        </label>
                        <input name="password"
                            {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })}
                            type="password" placeholder="Your Password" className="input input-bordered" />
                        {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                        {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                        {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                        {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase one lower case, one number and one special character.</p>}
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn text-[#FFF] font-semibold text-xl bg-[#dbb984]">Sign Up</button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-lg text-[#976e2b]">Already Account? <Link to={'/login'} className="font-semibold">Please Login</Link></p>
                    <p className="font-semibold my-4">Or Sign Up With</p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default SignUp;