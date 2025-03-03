import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";

const images = [
  {
    src: "https://res.cloudinary.com/dnqet3vq1/image/upload/v1740985572/418460104-4242a5b0-bed4-4d5d-a0c0-4ed3b651b4b0_tv9uab.png",
    id: 1,
    title: "Your Digital School",
    subTitle: "Revolutionize the academics with our digital school platform"
  },
  {
    src: "https://res.cloudinary.com/dnqet3vq1/image/upload/v1740985499/418460388-ad4c35c0-69c3-4bf3-ac21-7af22256eb1e_mb0iny.png",
    id: 2,
    title : "Real-Time Monitoring & Analytics",
    subTitle: "Empower administrators with AI-driven dashboards for seamless tracking and proactive decision-making."
  },
  {
    src: "https://res.cloudinary.com/dnqet3vq1/image/upload/v1740985630/418460118-a5dead46-3380-4c26-987f-27f067550d57_ije7wy.png",
    id: 3,
    title : "Centralized Operations Hub",
    subTitle: "Manage notices, events, schedules, and assignments in one unified platform to boost efficiency across the institution."
  },
  {
    src: "https://res.cloudinary.com/dnqet3vq1/image/upload/v1740985665/418460084-d4332916-c975-48bb-814c-cf8aa5e407a3_tixyk4.png",
    id: 4,
    title: "Streamlined Academic Resource Management",
    subTitle: "Simplify the process of uploading, sharing, and accessing learning materials through automated workflows."
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
          key={image.id}
          className="!flex text-white !flex-col !gap-2 !items-center !justify-center"
        >
          <img src={image.src} alt="Demo" className="w-[580px] w-[680px] object-contain rounded-lg" />

          <div className="text-center my-4 space-y-2">
            <p className="text-xl font-semibold">{image.title}</p>
            <p className="w-96 text-center">
              {image.subTitle}
            </p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
