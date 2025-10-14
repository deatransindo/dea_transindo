// components/Hero.js
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            Solusi Terpercaya untuk Kebutuhan Impor Anda
          </h1>
          <p className={styles.subtitle}>
            Kami menyediakan layanan laut dan udara yang andal untuk kebutuhan
            impor Anda
          </p>
          <div className={styles.buttonGroup}>
            <Link href="/services" className="btn btn-primary">
              Lihat Layanan
            </Link>
            <Link href="/calculator" className="btn btn-secondary">
              Hitung Biaya
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
