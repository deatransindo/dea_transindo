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
      image: '/images/sea-freight.jpg',
      title: 'Sea Freight',
      description:
        'Cost-effective maritime shipping solutions for large volume cargo worldwide. We handle international sea freight with complete customs documentation.',
    },
    {
      image: '/images/air-freight.jpg',
      title: 'Air Freight',
      description:
        'Fast and reliable air cargo services for time-sensitive shipments. Ideal for urgent deliveries and perishable goods requiring quick transport.',
    },
    {
      image: '/images/land-freight.jpg',
      title: 'Land Freight',
      description:
        'Efficient ground transportation for domestic and regional distribution. Network coverage across major cities with real-time tracking capabilities.',
    },
    {
      image: '/images/warehouse.jpg',
      title: 'Warehousing',
      description:
        'Modern warehouse facilities with integrated inventory management systems. Climate-controlled storage and secure handling of valuable cargo.',
    },
    {
      image: '/images/customs.jpg',
      title: 'Customs Clearance',
      description:
        'Professional customs brokerage and documentation services. Expert handling of import/export regulations and compliance requirements.',
    },
    {
      image: '/images/supply-chain.jpg',
      title: 'Supply Chain',
      description:
        'End-to-end supply chain management and optimization. Comprehensive logistics solutions for streamlined business operations.',
    },
  ];

  const features = [
    {
      image:
        'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
      title: 'Transparent Pricing',
      description:
        'Calculate accurate import costs and enjoy free consultation services. No hidden charges or unexpected fees.',
    },
    {
      image: '/images/delivery.png',
      title: 'Fast Delivery',
      description:
        'Efficient processes and optimized routes ensure on-time delivery. Real-time tracking keeps you informed every step of the way.',
    },
    {
      image: '/images/price.png',
      title: 'Competitive Rates',
      description:
        'Best market prices without compromising service quality. Flexible pricing options tailored to your business needs.',
    },
    {
      image: '/images/reliable.png',
      title: 'Secure & Reliable',
      description:
        'Full cargo insurance and real-time tracking for complete peace of mind. Dedicated support team available 24/7.',
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
          currentLocation: shipment.destination.city,
          // currentLocation:
          //   shipment.length > 0 ? history[history.length - 1].location : '-',
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
        'An error occurred while tracking your shipment. Please try again.'
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/tracking.svg"
                alt="Tracking Icon"
                className={styles.trackingIcon}
              />
              <div>
                <h2>TRACK YOUR CARGO</h2>
                <p>Enter your tracking number to monitor your shipment location.</p>
              </div>
            </div>

            <form onSubmit={handleTracking} className={styles.trackingForm}>
              <div className={styles.trackingInputGroup}>
                <input
                  type="text"
                  placeholder="Enter your tracking number..."
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
                  {isTracking ? '🔍 Tracking...' : '🔍 Track Now'}
                </button>
              </div>
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
                    <h3>Shipment Information</h3>
                    <span className={styles.resiNumber}>
                      Tracking Number: {trackingResult.trackingNumber}
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

                {/* Departure Status */}
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
                        Departure Status:{' '}
                        {trackingResult.departureStatusText}
                      </strong>
                      {trackingResult.departureStatus === 'on_time' ? (
                        <p>Departure on schedule</p>
                      ) : (
                        <>
                          {trackingResult.delayReason && (
                            <p className={styles.delayReason}>
                              Reason: {trackingResult.delayReason}
                            </p>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Shipment Details */}
                <div className={styles.resultDetails}>
                  <div className={styles.detailGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>🚀</span>
                      <div>
                        <label>Service</label>
                        <p>{trackingResult.service}</p>
                      </div>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>📍</span>
                      <div>
                        <label>Current Location</label>
                        <p>{trackingResult.currentLocation}</p>
                      </div>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>📅</span>
                      <div>
                        <label>Estimated Arrival</label>
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
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">
            We provide comprehensive freight forwarding services tailored
            to meet your business needs
          </p>
          <div className={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                image={service.image}
                title={service.title}
                description={service.description}
              />
            ))}
          </div>
          <div className={styles.ctaButton}>
            <Link href="/services" className="btn btn-primary">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whySection}>
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Client trust and satisfaction are our top priorities
          </p>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <Feature
                key={index}
                image={feature.image}
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
            <h2>Ready to Get Started?</h2>
            <p>
              Contact us today for a free consultation and discover the best
              logistics solution for your business.
            </p>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
