import { useNavigate } from "react-router-dom"
import useAuth from "../Hooks/useAuth";
import toast from "react-hot-toast";

const Profile = () => {
    const { user, updateUserProfile, update, setUpdate } = useAuth()
    // const navigate = useNavigate()
    // const from = '/profile'
    const handleUpdate = async e => {
        e.preventDefault()
        const form = e.target;
        const fullName = form.fullName.value;
        const photo = form.photo.value
        await updateUserProfile(fullName, photo)
            .then(() => {
                toast.success(`${user?.displayName}'s Profile Updated`)
                setUpdate(!update)
                navigate(from)
            })
        form.reset()
    }
    return (
        <div className="flex flex-col gap-x-5 lg:flex-row mt-10">
            <div className="bg-[#eae6e0] rounded-full flex flex-1 flex-col items-center justify-center">
                <img className="w-56 rounded-full" src={user?.photoURL} alt="" />
                <p className="text-2xl font-bold">{user?.displayName}</p>
                <p className="text-xl text-[#4d2f02] font-bold">{user?.email}</p>
            </div>
            <form onSubmit={handleUpdate} className="flex-1 card-body bg-[#e8d7c1] rounded-xl">
                <h2 className="text-2xl font-bold text-center">Want to Update Your Profile</h2>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-bold">Name</span>
                    </label>
                    <input name="fullName" type="text" placeholder="Enter Your Update Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text text-lg font-bold">Photo URL</span>
                    </label>
                    <input name="photo" type="text" placeholder="Photo URL" className="input input-bordered" required />
                </div>

                <div className="form-control mt-6">
                    <button className="btn bg-[#edab56] text-[#FFF] font-bold text-xl">Update</button>
                </div>
            </form>
        </div>
    );
};

export default Profile;