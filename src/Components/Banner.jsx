import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';
import { axiosSecure } from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const Banner = () => {
  const { data: articles = [] } = useQuery({
    queryKey: ['article'],
    queryFn: async () => {
        const res = await axiosSecure.get('/article');
        return res.data
    }
})
  return (
    <div className='my-12'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {
          articles.slice(0,6).map(article=><SwiperSlide key={article._id}>
            <Slide img={article.image_url} text={article.title}></Slide>
          </SwiperSlide>)
        }
      </Swiper>
    </div>
  );
};

export default Banner;