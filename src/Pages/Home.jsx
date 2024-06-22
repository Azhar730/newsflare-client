import AllUser from "../Components/AllUser";
import Banner from "../Components/Banner";
import Faq from "../Components/Faq";
import Newsletter from "../Components/Newsletter";
import Plans from "../Components/Plans";
import Publishers from "../Components/Publishers";

const Home = () => {
    return (
        <div>
            <Banner/>
            <Publishers/>
            <AllUser/>
            <Plans/>
            <Newsletter/>
            <Faq/>
        </div>
    );
};

export default Home;