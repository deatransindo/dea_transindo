// app/services/page.js
import Link from 'next/link';
import styles from './services.module.css';

// export const metadata = {
//   title: 'Layanan Kami - FreightPro',
//   description: 'Berbagai layanan freight forwarding dan logistik yang kami tawarkan untuk kebutuhan bisnis Anda',
// }

export default function ServicesPage() {
  const mainServices = [
    {
      image: '/images/sea-freight.jpg',
      title: 'Sea Freight',
      description:
        'Cost-effective maritime shipping solutions for Less than Container Load (LCL) and Full Container Load (FCL) services. We offer routes to all major world ports with competitive rates and reliable schedules.',
      imagePosition: 'right',
    },
    {
      image: '/images/air-freight.jpg',
      title: 'Air Freight',
      description:
        'Fast and secure air cargo services for shipments requiring quick transit times. We provide comprehensive door-to-door and airport-to-airport services with multiple carrier options to meet your needs.',
      imagePosition: 'left',
    },
    {
      image: '/images/land-freight.jpg',
      title: 'Land Freight',
      description:
        'Efficient ground transportation using trucks and containers for domestic and regional distribution. Our network covers major cities with real-time tracking and dedicated customer support throughout your shipment.',
      imagePosition: 'right',
    },
    {
      image: '/images/warehouse.jpg',
      title: 'Warehousing & Distribution',
      description:
        'Modern warehouse facilities equipped with advanced Warehouse Management Systems (WMS) for secure storage, professional packing, and efficient distribution of your goods.',
      imagePosition: 'left',
    },
    {
      image: '/images/customs.jpg',
      title: 'Customs Clearance',
      description:
        'Professional customs brokerage and documentation services with expert handling of import-export procedures. Our experienced team ensures smooth clearance and compliance with all regulations.',
      imagePosition: 'right',
    },
    {
      image: '/images/supply-chain.jpg',
      title: 'Supply Chain Management',
      description:
        'End-to-end supply chain solutions for complete logistics optimization. We handle planning, coordination, and real-time monitoring of your entire supply chain operations.',
      imagePosition: 'left',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Our Services</h1>
          <p className={styles.heroSubtitle}>
            Comprehensive freight forwarding and logistics solutions tailored to
            your business needs
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="section">
        <div className="container">
          <div className={styles.mainServicesContainer}>
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`${styles.serviceRow} ${
                  styles[`position-${service.imagePosition}`]
                }`}
              >
                <div className={styles.serviceContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>
                  <p className={styles.serviceDescription}>
                    {service.description}
                  </p>
                </div>
                <div className={styles.serviceImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={service.image} alt={service.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Working Process</h2>
          <p className="section-subtitle">
            Simple steps to use our services
          </p>
          <div className={styles.processGrid}>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>1</div>
              <h3>Consultation</h3>
              <p>Contact us to discuss your shipping needs and requirements</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>2</div>
              <h3>Quotation</h3>
              <p>Get competitive and transparent pricing quotes for your shipment</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>3</div>
              <h3>Booking</h3>
              <p>Confirm booking and prepare all necessary shipping documents</p>
            </div>
            <div className={styles.processCard}>
              <div className={styles.processNumber}>4</div>
              <h3>Delivery</h3>
              <p>We handle the entire shipping process until arrival at destination</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Need Logistics Solutions?</h2>
            <p>
              Consult with our expert team about your shipping needs and
              discover the best solutions for your business.
            </p>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
