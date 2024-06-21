import { Link, NavLink } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import { FaRegNewspaper } from "react-icons/fa6";

const NavBar = () => {
    const { user, logOut } = useAuth()
    const links = <>
        <li><NavLink to={'/'}>Home</NavLink></li>
        <li><NavLink to={'/add-articles'}>Add Articles</NavLink></li>
        <li><NavLink to={'/all-article'}>All Articles</NavLink></li>
        <li><NavLink to={'/subscription'}>Subscription</NavLink></li>
        <li><NavLink to={'/dashboard'}>Dashboard</NavLink></li>
        <li><NavLink to={'/my-articles'}>My Articles</NavLink></li>
        <li><NavLink to={'/premium-articles'}>Premium Articles</NavLink></li>
    </>
    
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {links}
                    </ul>
                </div>
                <div className='w-full hidden md:flex px-4 py-2 rounded-lg justify-center items-center bg-[#f1f2f5] mx-auto'>
                            <Link className='flex items-center text-gray-700 gap-x-1' to='/'>
                                <FaRegNewspaper className='text-3xl' />
                                <h1 className="text-3xl font-bold">NewsFlare</h1>
                            </Link>
                        </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <div className="flex items-center">
                            <img title={user?.displayName} className="h-12 w-12 rounded-full" src={user?.photoURL} />
                            <button onClick={()=>logOut()} className="btn bg-[#B2C3F9]">Logout</button>
                        </div>
                        : <Link to={'/login'} className="btn bg-[#B2C3F9]">Login</Link>
                }
            </div>
        </div>
    );
};

export default NavBar;