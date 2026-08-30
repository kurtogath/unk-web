import styles from './loading.module.scss';

function SkeletonCard() {
    return (
        <div className={styles.card}>
            <div className={styles.image} />
            <div className={styles.body}>
                <div className={styles.meta}>
                    <div className={`${styles.pill} ${styles.shimmer}`} />
                    <div className={`${styles.dateBar} ${styles.shimmer}`} />
                </div>
                <div className={`${styles.titleFull} ${styles.shimmer}`} />
                <div className={`${styles.titleHalf} ${styles.shimmer}`} />
                <div className={`${styles.line} ${styles.shimmer}`} />
                <div className={`${styles.line} ${styles.shimmer}`} />
                <div className={`${styles.lineShort} ${styles.shimmer}`} />
            </div>
        </div>
    );
}

export default function Loading() {
    return (
        <main>
            <section className={styles.section}>
                <div className={styles.header}>
                    <div className={`${styles.titlePill} ${styles.shimmer}`} />
                </div>
                <div className={styles.grid}>
                    {Array.from({ length: 12 }).map((_, i) => (
                        <SkeletonCard key={i} />
                    ))}
                </div>
            </section>
        </main>
    );
}
