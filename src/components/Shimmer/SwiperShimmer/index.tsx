import { FC, Fragment } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

interface SwiperShimmerProps {
  width: number;
  spaceBetween: number;
  repeat?: number;
}
const SwiperShimmer: FC<SwiperShimmerProps> = ({
  width,
  spaceBetween,
  repeat,
  children,
}) => {
  return (
    <Fragment>
      <Swiper slidesPerView={`auto`} spaceBetween={spaceBetween}>
        {[...Array(repeat)].map((e, i) => (
          <SwiperSlide key={i} style={{ width: width }}>
            {children}
          </SwiperSlide>
        ))}
      </Swiper>
    </Fragment>
  );
};

export default SwiperShimmer;
