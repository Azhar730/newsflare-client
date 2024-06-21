import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Slide from './Slide';

const Banner = () => {
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
        <SwiperSlide>
          <Slide img={'https://i.postimg.cc/15M5GhGH/carousel1.jpg'} text={'Get Your Web Development Project Done in Minutes'}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide img={'https://i.postimg.cc/fRLW525h/carousel2.jpg'} text={'Get Your Graphic Design Project Done in Minutes'}></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide img={'https://i.postimg.cc/B6WqSq3q/carousel3.jpg'} text={'Get Your Digital Marketing Project Done in Minutes'}></Slide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;