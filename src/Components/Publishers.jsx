import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import useAxiosCommon from '../Hooks/useAxiosCommon';
import { useQuery } from '@tanstack/react-query';


const Publishers = () => {
    const axiosCommon = useAxiosCommon();
    const { data: publishers = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosCommon.get('/publisher');
            return res.data
        }
    })
    return (
        <div className='my-10'>
            <h1 className="text-4xl text-center my-6 font-bold text-blue-600">All Publisher</h1>
            <section>
                <Swiper
                    slidesPerView={4}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                >
                    {
                        publishers.map(publisher=><SwiperSlide key={publisher._id}>
                            <img className='h-48' src={publisher?.image_url} />
                            <h3 className='text-2xl font-semibold text-center text-[#0a2268]'>{publisher?.name}</h3>
                        </SwiperSlide>)
                    }
                </Swiper>
            </section>
        </div>
    );
};

export default Publishers;