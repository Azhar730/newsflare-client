import { Outlet } from "react-router-dom";
import NavBar from "../Components/NavBar";

const MainLayout = () => {
    return (
        <div className="max-w-6xl mx-auto">
            <NavBar/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;