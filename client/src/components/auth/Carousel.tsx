import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import demoImage from "@/assets/demo.jpg";

const images = [
  {
    src: "https://variety.com/wp-content/uploads/2022/12/Animal-first-look.jpg",
    movie: "Animal",
  },
  {
    src: "https://bollywoodmascot.com/wp-content/uploads/maxresdefault-7.jpg",
    movie: "Rocky aur Rani ki Prem Kahani",
  },
  {
    src: "https://i.pinimg.com/originals/0f/c2/01/0fc201e82185c7499f2c30eb91286dd9.jpg",
    movie: "LEO",
  },
];

export const Carousel = () => {
  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay, Pagination]}
      className="mySwiper w-[580px] h-full"
    >
      {images.map((image) => (
        <SwiperSlide
          key={image.movie}
          className="!flex text-white !flex-col !gap-2 !items-center !justify-center"
        >
          <img src={demoImage} alt="Demo" className="w-[580px]" />

          <div className="text-center my-4 space-y-2">
            <p className="text-xl font-semibold">Your Digital School</p>
            <p className="w-72">
              Revolutionize the academics with our digital school platform
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
