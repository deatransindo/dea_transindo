// components/Hero.js
import Link from 'next/link';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Bridging Distance, Building Trust</h1>
          <p className={styles.subtitle}>
            Quote, book, and track shipments in minutes. By air and sea, we
            efficiently move your cargo while you focus on growing your
            business.
          </p>
          <div className={styles.buttonGroup}>
            <Link href="/services" className="btn btn-primary">
              Our Services
            </Link>
            <Link href="/calculator" className="btn btn-secondary">
              Calculate Cost
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
