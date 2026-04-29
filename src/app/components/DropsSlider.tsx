'use client';

import type { DropItem } from '@/app/types';
import useEmblaCarousel from 'embla-carousel-react';
import Image from 'next/image';
import styles from '../page.module.scss';

function DropThumb({ image, alt }: { image: DropItem['image']; alt: DropItem['alt'] }) {
    return <Image src={image} alt={alt ?? ''} width={100} height={100} />;
}

export default function DropsSlider({ drops }: { drops: DropItem[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'start',
        slidesToScroll: 1,
    });

    return (
        <>
            <h2 className={styles.sectionTitle} id="drops-title">
                DROPS
            </h2>

            <div className={styles.dropsRow}>
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
                        {drops.map((item) => (
                            <article
                                key={item.id}
                                className={`${styles.dropItem} ${styles.emblaSlide}`}
                            >
                                <div className={styles.dropThumb}>
                                    <DropThumb image={item.image} alt={item.alt} />
                                </div>
                                <span>{item.label}</span>
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
