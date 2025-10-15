// app/about/page.js
import Feature from '@/components/Feature';
import styles from './about.module.css';
import Image from 'next/image';

// export const metadata = {
//   title: 'Tentang Kami - deatranssolusindo',
//   description: 'Pelajari lebih lanjut tentang Dea Trans Solusindo dan komitmen kami dalam memberikan layanan freight forwarding terbaik',
// }

export default function AboutPage() {
  const values = [
    {
      icon: '🎯',
      title: 'Profesionalisme',
      description:
        'Kami berkomitmen untuk memberikan layanan dengan standar profesional tertinggi dalam setiap aspek operasional.',
    },
    {
      icon: '🤝',
      title: 'Integritas',
      description:
        'Kejujuran dan transparansi adalah fondasi hubungan kami dengan klien dan mitra bisnis.',
    },
    {
      icon: '💡',
      title: 'Inovasi',
      description:
        'Kami terus berinovasi untuk meningkatkan efisiensi dan kualitas layanan logistik.',
    },
    {
      icon: '⭐',
      title: 'Kepuasan Pelanggan',
      description:
        'Kepuasan dan kepercayaan pelanggan adalah prioritas utama dalam setiap layanan yang kami berikan.',
    },
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Pendirian Perusahaan',
      description:
        'Dea Trans Solusindo didirikan dengan visi menjadi penyedia layanan freight forwarding terpercaya.',
    },
    {
      year: '2023',
      title: 'Ekspansi Regional',
      description: 'Membuka kantor cabang di berbagai kota besar di Indonesia.',
    },
    {
      year: '2024',
      title: 'Jangkauan Global',
      description: 'Melayani impor dari China ke Jakarta ',
    },
    {
      year: '2025',
      title: 'Transformasi Digital',
      description:
        'Implementasi sistem tracking dan manajemen logistik berbasis teknologi.',
    },
    {
      year: '2024',
      title: 'Sertifikasi Internasional',
      description:
        'Meraih sertifikasi ISO dan penghargaan sebagai freight forwarder terpercaya.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Dea Trans Solusindo</h1>
          <p className={styles.heroSubtitle}>
            Solusi Impor Terpercaya untuk Bisnis Anda.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section">
        <div className="container">
          <div className={styles.overview}>
            <div className={styles.overviewContent}>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                VISI
              </h2>
              <p className={styles.text}>
                Kami percaya bahwa layanan forwarder yang handal adalah fondasi
                kesuksesan perdagangan internasional. Tujuan kami adalah
                membantu bisnis membangun rantai pasokan yang kuat dan efisien.
                Proses kami dimulai dengan memahami kebutuhan import spesifik
                klien.
              </p>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                MISI
              </h2>
              <p className={styles.text}>
                Kami kemudian menggunakan informasi tersebut untuk menciptakan
                solusi import yang disesuaikan, yang tidak hanya mencerminkan
                standar kualitas tinggi tetapi juga membantu mencapai tujuan
                bisnis Anda. Dari penanganan dokumen hingga koordinasi
                pengiriman, kami fokus pada setiap detail.
              </p>
            </div>
            <div className={styles.overviewImage}>
              <div className={styles.imagePlaceholder}>
                <Image
                  src="/images/office.jpg"
                  alt="Kantor Pusat"
                  width={500}
                  height={500}
                  className={styles.image}
                />
                <p>Kantor Pusat Dea Trans Solusindo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <h2 className="section-title">Nilai-Nilai Kami</h2>
          <p className="section-subtitle">
            Prinsip-prinsip yang memandu setiap aspek bisnis kami
          </p>
          <div className={styles.valuesGrid}>
            {values.map((value, index) => (
              <Feature
                key={index}
                icon={value.icon}
                title={value.title}
                description={value.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
