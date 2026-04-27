'use client';

import useEmblaCarousel from 'embla-carousel-react';
import type { DropItem } from '@/app/types';
import styles from '../page.module.scss';

function DropThumb({ variant }: { variant: DropItem['variant'] }) {
    if (variant === 'skull') return <span className={styles.thumbAlt}>☠</span>;
    if (variant === 'ring') return <span className={styles.thumbAlt}>◍</span>;
    return <span className={styles.thumbLock}>🔒</span>;
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
                                    <DropThumb variant={item.variant} />
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
