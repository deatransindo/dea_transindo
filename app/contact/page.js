// app/contact/page.js
'use client';
import { useState } from 'react';
import styles from './contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: 'success',
          message:
            'Terima kasih! Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: '',
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Terjadi kesalahan. Silakan coba lagi.',
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Terjadi kesalahan. Silakan coba lagi nanti.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Hubungi Kami</h1>
          <p className={styles.heroSubtitle}>
            Kami siap membantu kebutuhan logistik Anda
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section">
        <div className="container">
          <div className={styles.contactWrapper}>
            {/* Contact Info */}
            <div className={styles.contactInfo}>
              <h2>Informasi Kontak</h2>
              <p className={styles.infoDescription}>
                Jangan ragu untuk menghubungi kami. Tim kami siap membantu Anda
                dengan layanan terbaik.
              </p>

              <div className={styles.infoList}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📍</div>
                  <div>
                    <h4>Alamat Kantor</h4>
                    <p>
                      Ruko Modern Business Park No. 12, Cipondoh, Tangerang,
                      Banten
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>📞</div>
                  <div>
                    <h4>Telepon</h4>
                    <p>
                      +62 818-828-388
                      <br />
                      +62 818-0695-5699
                    </p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>✉️</div>
                  <div>
                    <h4>Email</h4>
                    <p>deatransolusindo@gmail.com</p>
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}>🕐</div>
                  <div>
                    <h4>Jam Operasional</h4>
                    <p>
                      Senin - Jumat: 09:00 - 17:00
                      <br />
                      Sabtu - Minggu: Tutup
                    </p>
                  </div>
                </div>
              </div>

              <div className={styles.socialLinks}>
                <h4>Ikuti Kami</h4>
                <div className={styles.socialIcons}>
                  <a
                    href="https://www.facebook.com/profile.php?id=61564861785387"
                    aria-label="Facebook"
                    target="blank"
                  >
                    <img src="/icons/facebook.png" alt="Facebook" />
                  </a>
                  <a
                    href="https://www.instagram.com/deatransolusindo/"
                    aria-label="Instagram"
                    target="blank"
                  >
                    <img src="/icons/instagram.png" alt="Instagram" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@deatrans92"
                    aria-label="tiktok"
                    target="blank"
                  >
                    <img src="/icons/tiktok.png" alt="tiktok" />
                  </a>
                  <a
                    href="http://wa.me/62818828388"
                    aria-label="whatsapp"
                    target="blank"
                  >
                    <img src="/icons/social.png" alt="whatsapp" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={styles.contactForm}>
              <h2>Kirim Pesan</h2>
              <p className={styles.formDescription}>
                Isi formulir di bawah ini dan kami akan segera menghubungi Anda
              </p>

              {status.message && (
                <div className={`${styles.alert} ${styles[status.type]}`}>
                  {status.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nama Lengkap *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Masukkan nama lengkap Anda"
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="nama@email.com"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="phone">Nomor Telepon *</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+62 xxx xxxx xxxx"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company">Nama Perusahaan</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Nama perusahaan (opsional)"
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="service">Layanan yang Diminati</label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                    >
                      <option value="">Pilih Layanan</option>
                      <option value="sea-freight">Sea Freight</option>
                      <option value="air-freight">Air Freight</option>
                      <option value="land-freight">Land Freight</option>
                      <option value="warehousing">Warehousing</option>
                      <option value="customs">Customs Clearance</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message">Pesan *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Ceritakan kebutuhan Anda..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className={`btn btn-primary ${styles.submitBtn}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className={styles.mapSection}>
        <div className={styles.mapEmbed}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.9128253041983!2d106.65106955038671!3d-6.184916989405076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f921b77dac8f%3A0x2cd89d6ee02954cb!2sModern%20Business%20Park!5e1!3m2!1sid!2sid!4v1759481023864!5m2!1sid!2sid"
            width="100%"
            height="500"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
