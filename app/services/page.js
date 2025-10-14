// app/services/page.js
import ServiceCard from '@/components/ServiceCard';
import Link from 'next/link';
import styles from './services.module.css';

// export const metadata = {
//   title: 'Layanan Kami - FreightPro',
//   description: 'Berbagai layanan freight forwarding dan logistik yang kami tawarkan untuk kebutuhan bisnis Anda',
// }

export default function ServicesPage() {
  const mainServices = [
    {
      icon: '🚢',
      title: 'Sea Freight (LCL & FCL)',
      description:
        'Layanan pengiriman laut untuk Less than Container Load (LCL) dan Full Container Load (FCL). Solusi ekonomis untuk kargo bervolume besar dengan rute ke seluruh pelabuhan utama dunia.',
    },
    {
      icon: '✈️',
      title: 'Air Freight',
      description:
        'Pengiriman udara cepat dan aman untuk barang-barang yang membutuhkan waktu transit singkat. Tersedia layanan door-to-door dan airport-to-airport dengan berbagai pilihan carrier.',
    },
    {
      icon: '🚚',
      title: 'Land Freight',
      description:
        'Pengiriman darat menggunakan truk dan kontainer untuk distribusi domestik dan regional. Cocok untuk pengiriman antar kota atau antar pulau dengan jalur darat.',
    },
    {
      icon: '📦',
      title: 'Warehousing & Distribution',
      description:
        'Fasilitas gudang modern dengan sistem WMS (Warehouse Management System) untuk penyimpanan, packing, dan distribusi barang Anda dengan aman dan efisien.',
    },
    {
      icon: '📋',
      title: 'Customs Clearance',
      description:
        'Pengurusan dokumen kepabeanan dan customs clearance yang cepat dan profesional. Tim berpengalaman memastikan proses impor-ekspor berjalan lancar.',
    },
    {
      icon: '📊',
      title: 'Supply Chain Management',
      description:
        'Solusi manajemen rantai pasok end-to-end untuk optimalisasi logistik bisnis Anda. Termasuk perencanaan, koordinasi, dan monitoring seluruh proses.',
    },
    {
      icon: '🏭',
      title: 'Project Cargo',
      description:
        'Penanganan khusus untuk kargo berukuran besar, berat, atau memerlukan handling khusus. Kami memiliki pengalaman dalam proyek konstruksi, oil & gas, dan industri.',
    },
    {
      icon: '❄️',
      title: 'Cold Chain Logistics',
      description:
        'Layanan khusus untuk produk yang memerlukan suhu terkontrol seperti makanan, farmasi, dan bahan kimia dengan reefer container dan cold storage.',
    },
    {
      icon: '📱',
      title: 'Track & Trace',
      description:
        'Sistem tracking real-time untuk memantau posisi dan status pengiriman Anda kapan saja, di mana saja melalui platform online atau mobile app.',
    },
  ];

  const additionalServices = [
    {
      icon: '💼',
      title: 'Cargo Insurance',
      description: 'Asuransi kargo untuk perlindungan maksimal',
    },
    {
      icon: '📄',
      title: 'Documentation',
      description: 'Pengurusan dokumen lengkap impor-ekspor',
    },
    {
      icon: '🔍',
      title: 'Quality Inspection',
      description: 'Inspeksi kualitas barang sebelum pengiriman',
    },
    {
      icon: '📦',
      title: 'Packing & Crating',
      description: 'Layanan packing profesional untuk keamanan barang',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Layanan Kami</h1>
          <p className={styles.heroSubtitle}>
            Solusi logistik lengkap untuk semua kebutuhan pengiriman Anda
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Layanan Utama</h2>
          <p className="section-subtitle">
            Berbagai pilihan layanan freight forwarding yang dapat disesuaikan
            dengan kebutuhan bisnis Anda
          </p>
          <div className={styles.servicesGrid}>
            {mainServices.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className={styles.additionalSection}>
        <div className="container">
          <h2 className="section-title">Layanan Tambahan</h2>
          <p className="section-subtitle">
            Layanan pendukung untuk melengkapi kebutuhan logistik Anda
          </p>
          <div className={styles.additionalGrid}>
            {additionalServices.map((service, index) => (
              <div key={index} className={styles.additionalCard}>
                <span className={styles.additionalIcon}>{service.icon}</span>
                <h4>{service.title}</h4>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Proses Kerja Kami</h2>
          <p className="section-subtitle">
            Langkah mudah untuk menggunakan layanan kami
          </p>
          <div className={styles.processGrid}>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>1</div>
              <h3>Konsultasi</h3>
              <p>Hubungi kami untuk mendiskusikan kebutuhan pengiriman Anda</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>2</div>
              <h3>Quotation</h3>
              <p>Dapatkan penawaran harga yang kompetitif dan transparan</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>3</div>
              <h3>Booking</h3>
              <p>Konfirmasi booking dan persiapan dokumen pengiriman</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>4</div>
              <h3>Pengiriman</h3>
              <p>Kami handle seluruh proses pengiriman hingga tiba di tujuan</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Butuh Solusi Logistik?</h2>
            <p>
              Konsultasikan kebutuhan pengiriman Anda dengan tim expert kami dan
              dapatkan solusi terbaik.
            </p>
            <Link href="/contact" className="btn btn-secondary">
              Hubungi Kami
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
