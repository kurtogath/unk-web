'use client';

import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import type { NewsItem } from '@/app/types';
import styles from '../page.module.scss';

export default function NewsSlider({ news }: { news: NewsItem[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
    });

    return (
        <>
            <h2 className={styles.sectionTitle} id="news-title">
                NEWS
            </h2>

            <div className={styles.newsSliderRow}>
                <button
                    type="button"
                    className={styles.navArrow}
                    aria-label="Anterior"
                    onClick={() => emblaApi?.scrollPrev()}
                >
                    ‹
                </button>

                <div className={styles.emblaViewport} ref={emblaRef}>
                    <div className={styles.emblaContainer}>
                        {news.map((item) => (
                            <article key={item.id} className={styles.newsSlide}>
                                <div className={styles.newsCard}>
                                    <Image
                                        src={item.image}
                                        fill
                                        alt=""
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                            </article>
                        ))}
                    </div>
                </div>

                <button
                    type="button"
                    className={styles.navArrow}
                    aria-label="Siguiente"
                    onClick={() => emblaApi?.scrollNext()}
                >
                    ›
                </button>
            </div>
        </>
    );
}
