import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import * as classNames from "classnames/bind";

import Image from "../../assets/Image";

import styles from "./Home.module.scss";

const cx = classNames.bind(styles);

function Home() {
    return (
        <div className={cx("home")}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
            >
                <SwiperSlide>
                    <img
                        src={Image.image_slider_1}
                        alt="slider1"
                        className={cx("home-image-slider")}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={Image.image_slider_2}
                        alt="slider2"
                        className={cx("home-image-slider")}
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <img
                        src={Image.image_slider_3}
                        alt="slider3"
                        className={cx("home-image-slider")}
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default Home;
