// components/Footer.js
import Link from 'next/link';
import styles from './Footer.module.css';
import Image from 'next/image';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.column}>
            <div className={styles.logo}>
              <Image
                src="/logo_dea.png"
                width={200}
                height={200}
                alt="Dea Trans Solusindo"
                className={styles.logoIcon}
              />
              {/* <span className={styles.logoText}>Dea Trans Solusindo</span> */}
            </div>
            <p className={styles.description}>
              Penyedia layanan freight forwarding terpercaya dengan jangkauan
              global dan layanan profesional.
            </p>
            <div className={styles.social}>
              <a
                href="https://www.facebook.com/profile.php?id=61564861785387"
                aria-label="Facebook"
                target="blank"
              >
                <Image src="/icons/facebook.png" alt="Facebook" />
              </a>
              <a
                href="https://www.instagram.com/deatransolusindo/"
                aria-label="Instagram"
                target="blank"
              >
                <Image src="/icons/instagram.png" alt="Instagram" />
              </a>
              <a
                href="https://www.tiktok.com/@deatrans92"
                aria-label="tiktok"
                target="blank"
              >
                <Image src="/icons/tiktok.png" alt="tiktok" />
              </a>
              <a
                href="http://wa.me/62818828388"
                aria-label="whatsapp"
                target="blank"
              >
                <Image src="/icons/social.png" alt="whatsapp" />
              </a>
            </div>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Tautan Cepat</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/">Beranda</Link>
              </li>
              <li>
                <Link href="/about">Tentang Kami</Link>
              </li>
              <li>
                <Link href="/services">Layanan</Link>
              </li>
              <li>
                <Link href="/calculator">Kalkulator Biaya</Link>
              </li>
              <li>
                <Link href="/contact">Kontak</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Layanan</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/services">Sea Freight</Link>
              </li>
              <li>
                <Link href="/services">Air Freight</Link>
              </li>
              <li>
                <Link href="/services">Land Freight</Link>
              </li>
              <li>
                <Link href="/services">Customs Clearance</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Kontak Kami</h4>
            <ul className={styles.contactInfo}>
              <li>
                <span>📍</span>
                <span>
                  Ruko Modern Business Park No. 12, Cipondoh, Tangerang, Banten
                </span>
              </li>
              <li>
                <span>📞</span>
                <span>+62 818-828-388</span>
              </li>
              <li>
                <span>✉️</span>
                <span>deatransolusindo@gmail.com</span>
              </li>
              <li>
                <span>🕐</span>
                <span>Senin - Jumat: 09:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>&copy; {currentYear} deatransolusindo. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
