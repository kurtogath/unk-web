'use client';

import type { PropsWithChildren } from 'react';
import React from 'react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = PropsWithChildren<{
    autoplayMs?: number;
    className?: string;
}>;

export default function SwiperCarousel({
    children,
    autoplayMs = 4000,
    className,
}: Props) {
    const slides = React.Children.toArray(children);

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay, A11y]}
            slidesPerView={1}
            spaceBetween={16}
            loop
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: autoplayMs, disableOnInteraction: false }}
            className={className}
        >
            {slides.map((child, i) => (
                <SwiperSlide key={i}>{child}</SwiperSlide>
            ))}
        </Swiper>
    );
}
