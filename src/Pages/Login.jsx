import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import SocialLogin from "../Components/SocialLogin";
import { axiosCommon } from "../Hooks/useAxiosCommon";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const { signInUser } = useAuth()
  const handleFormSubmit = e => {
    e.preventDefault()
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
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
            navigate(from)
          })
      })
  }
  return (
    <div className="flex mt-20 items-center gap-x-16 p-16 shadow-slate-700 bg-[url('https://i.postimg.cc/zBTCjD9x/authentication.png')]">
      <div className="flex-1">
        <img src='https://i.postimg.cc/3rCj0RjR/authentication1.png' />
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold text-center">Login</h1>
        <form onSubmit={handleFormSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Email</span>
            </label>
            <input name="email" type="email" placeholder="Your Email" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-lg font-semibold">Password</span>
            </label>
            <input name="password" type="password" placeholder="Your Password" className="input input-bordered" required />
          </div>

          <div className="form-control mt-6">
            <button className="btn text-[#FFF] font-semibold text-xl bg-[#dbb984]">Login</button>
          </div>
        </form>
        <div className="text-center">
          <p className="text-lg text-[#976e2b]">New Here? <Link to={'/signup'} className="font-semibold">Create a New Account</Link></p>
          <p className="font-semibold my-4">Or Sign in With</p>
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;