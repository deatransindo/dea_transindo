// app/page.js
'use client';
import { useState } from 'react';
import Hero from '@/components/Hero';
import ServiceCard from '@/components/ServiceCard';
import Feature from '@/components/Feature';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isTracking, setIsTracking] = useState(false);
  const [trackingError, setTrackingError] = useState('');

  const services = [
    {
      icon: '🚢',
      title: 'Sea Freight',
      description:
        'Layanan pengiriman laut yang ekonomis dan andal untuk kargo bervolume besar ke seluruh dunia.',
    },
    {
      icon: '✈️',
      title: 'Air Freight',
      description:
        'Solusi pengiriman udara cepat untuk barang-barang yang membutuhkan pengiriman ekspres.',
    },
    {
      icon: '🚚',
      title: 'Land Freight',
      description:
        'Pengiriman darat yang efisien untuk distribusi domestik dan regional.',
    },
    {
      icon: '📦',
      title: 'Warehousing',
      description:
        'Fasilitas gudang modern dengan sistem manajemen inventori yang terintegrasi.',
    },
    {
      icon: '📋',
      title: 'Customs Clearance',
      description:
        'Pengurusan bea cukai yang cepat dan profesional untuk kelancaran pengiriman Anda.',
    },
    {
      icon: '📊',
      title: 'Supply Chain',
      description:
        'Manajemen rantai pasok end-to-end untuk optimalisasi logistik bisnis Anda.',
    },
  ];

  const features = [
    {
      icon: '🌍',
      title: 'Transparansi',
      description: 'Hitung perkiraan biaya impor anda, dan konsultasi gratis',
    },
    {
      icon: '⚡',
      title: 'Pengiriman Cepat',
      description:
        'Proses yang efisien dan rute optimal untuk pengiriman tepat waktu.',
    },
    {
      icon: '💰',
      title: 'Harga Kompetitif',
      description:
        'Tarif yang kompetitif tanpa mengurangi kualitas layanan kami.',
    },
    {
      icon: '🔒',
      title: 'Aman & Terpercaya',
      description:
        'Asuransi penuh dan tracking real-time untuk keamanan barang Anda.',
    },
  ];

  const handleTracking = async (e) => {
    e.preventDefault();
    setIsTracking(true);
    setTrackingError('');
    setTrackingResult(null);

    try {
      const response = await fetch(
        `/api/tracking?tracking_number=${encodeURIComponent(trackingNumber)}`
      );
      const data = await response.json();

      if (response.ok && data.success) {
        const { shipment, history } = data.data;

        setTrackingResult({
          trackingNumber: shipment.trackingNumber,
          status: getStatusName(shipment.currentStatus),
          service: shipment.serviceName,
          origin: `${shipment.origin.city}, ${shipment.origin.country}`,
          originPort: shipment.origin.port,
          destination: `${shipment.destination.city}, ${shipment.destination.country}`,
          destinationPort: shipment.destination.port,
          destinationAddress: shipment.destination.address,
          currentLocation:
            history.length > 0 ? history[history.length - 1].location : '-',
          weight: shipment.details.weight,
          cargoDescription: shipment.details.cargoDescription,
          containerNumber: shipment.details.containerNumber,
          vesselName: shipment.details.vesselName,
          voyageNumber: shipment.details.voyageNumber,
          estimatedArrival: shipment.schedule.estimatedArrival,
          estimatedDeparture: shipment.schedule.estimatedDeparture,
          actualDeparture: shipment.schedule.actualDeparture,
          departureStatus: shipment.schedule.departureStatus,
          departureStatusText: shipment.schedule.departureStatusText,
          delayReason: shipment.schedule.delayReason,
          history: history,
        });
      } else {
        setTrackingError(
          data.error ||
            'Nomor resi tidak ditemukan. Pastikan nomor resi yang Anda masukkan benar.'
        );
      }
    } catch (error) {
      console.error('Tracking error:', error);
      setTrackingError(
        'Terjadi kesalahan saat melacak pengiriman. Silakan coba lagi.'
      );
    } finally {
      setIsTracking(false);
    }
  };

  const getStatusName = (statusCode) => {
    const statusMap = {
      LOADING_ORIGIN: 'Loading',
      DEPARTED_ORIGIN: 'Departed',
      IN_TRANSIT: 'In Transit',
      ARRIVED_DESTINATION: 'Arrived',
      LOAD_OFF: 'Load Off',
      CUSTOMS_CLEARANCE: 'Customs Clearance',
      OUT_FOR_DELIVERY: 'Out for Delivery',
      DELIVERED: 'Delivered',
    };
    return statusMap[statusCode] || statusCode;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return '#28a745';
      case 'in transit':
        return '#007bff';
      case 'customs clearance':
        return '#ffc107';
      case 'out for delivery':
        return '#17a2b8';
      default:
        return '#6c757d';
    }
  };

  return (
    <div>
      <Hero />

      {/* Tracking Section */}
      <section className={styles.trackingSection}>
        <div className="container">
          <div className={styles.trackingContainer}>
            <div className={styles.trackingHeader}>
              <span className={styles.trackingIcon}>📦</span>
              <div>
                <h2>Lacak Kiriman Anda</h2>
                <p>Masukkan nomor resi untuk melacak posisi barang Anda.</p>
              </div>
            </div>

            <form onSubmit={handleTracking} className={styles.trackingForm}>
              <div className={styles.trackingInputGroup}>
                <input
                  type="text"
                  placeholder="Masukkan nomor resi..."
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className={styles.trackingInput}
                  required
                />
                <button
                  type="submit"
                  className={styles.trackingButton}
                  disabled={isTracking}
                >
                  {isTracking ? '🔍 Melacak...' : '🔍 Lacak Sekarang'}
                </button>
              </div>
              {/* <small className={styles.trackingHint}>
                💡 Contoh nomor resi: FP123456789 atau FP987654321
              </small> */}
            </form>

            {trackingError && (
              <div className={styles.trackingError}>
                <span>⚠️</span>
                <p>{trackingError}</p>
              </div>
            )}

            {trackingResult && (
              <div className={styles.trackingResult}>
                <div className={styles.resultHeader}>
                  <div className={styles.resultHeaderLeft}>
                    <h3>Informasi Pengiriman</h3>
                    <span className={styles.resiNumber}>
                      Resi: {trackingResult.trackingNumber}
                    </span>
                  </div>
                  <span
                    className={styles.statusBadge}
                    style={{
                      backgroundColor: getStatusColor(trackingResult.status),
                    }}
                  >
                    {trackingResult.status}
                  </span>
                </div>

                {/* Status Keberangkatan */}
                {trackingResult.departureStatus && (
                  <div
                    className={
                      trackingResult.departureStatus === 'on_time'
                        ? styles.departureOnTime
                        : styles.departureDelayed
                    }
                  >
                    <span className={styles.departureIcon}>
                      {trackingResult.departureStatus === 'on_time'
                        ? '✅'
                        : '⚠️'}
                    </span>
                    <div>
                      <strong>
                        Status Keberangkatan:{' '}
                        {trackingResult.departureStatusText}
                      </strong>
                      {trackingResult.departureStatus === 'on_time' ? (
                        <p>Keberangkatan sesuai jadwal</p>
                      ) : (
                        <>
                          {trackingResult.delayReason && (
                            <p className={styles.delayReason}>
                              Alasan: {trackingResult.delayReason}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Detail Pengiriman */}
                <div className={styles.resultDetails}>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>🚀</span>
                      <div>
                        <label>Layanan</label>
                        <p>{trackingResult.service}</p>
                      </div>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>📍</span>
                      <div>
                        <label>Lokasi Saat Ini</label>
                        <p>{trackingResult.currentLocation}</p>
                      </div>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>📅</span>
                      <div>
                        <label>Estimasi Tiba</label>
                        <p>{trackingResult.estimatedArrival}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={styles.section}>
        <div className="container">
          <h2 className="section-title">Layanan Kami</h2>
          <p className="section-subtitle">
            Kami menyediakan berbagai layanan freight forwarding yang
            disesuaikan dengan kebutuhan bisnis Anda
          </p>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
          <div className={styles.ctaButton}>
            <Link href="/services" className="btn btn-primary">
              Lihat Semua Layanan
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whySection}>
        <div className="container">
          <h2 className="section-title">Mengapa Memilih Kami</h2>
          <p className="section-subtitle">
            Kepercayaan dan kepuasan klien adalah prioritas utama kami
          </p>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Feature
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Siap Untuk Memulai?</h2>
            <p>
              Hubungi kami hari ini untuk konsultasi gratis dan dapatkan solusi
              logistik terbaik untuk bisnis Anda.
            </p>
            <Link href="/contact" className="btn btn-secondary">
              Hubungi Kami Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
