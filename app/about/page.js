// app/about/page.js
import Feature from '@/components/Feature';
import Link from 'next/link';
import styles from './about.module.css';
import Image from 'next/image';

// export const metadata = {
//   title: 'Tentang Kami - deatranssolusindo',
//   description: 'Pelajari lebih lanjut tentang Dea Trans Solusindo dan komitmen kami dalam memberikan layanan freight forwarding terbaik',
// }

export default function AboutPage() {
  const whyChooseUs = [
    {
      title: 'Transparent Pricing',
      description:
        'Clear and honest pricing with no hidden charges. We provide detailed cost breakdowns for all services.',
    },
    {
      title: 'Fast Delivery',
      description:
        'Quick turnaround times and efficient processes ensure your cargo reaches on time, every time.',
    },
    {
      title: 'Competitive Rates',
      description:
        'Best market prices without compromising quality. Flexible pricing options tailored to your needs.',
    },
    {
      title: 'Secure & Reliable',
      description:
        'Full cargo insurance and 24/7 real-time tracking for complete peace of mind on every shipment.',
    },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Professionalism',
      description:
        'We are committed to delivering services with the highest professional standards in every aspect of our operations.',
    },
    {
      icon: '🤝',
      title: 'Integrity',
      description:
        'Honesty and transparency form the foundation of our relationships with clients and business partners.',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description:
        'We continuously innovate to improve efficiency and the quality of our logistics services.',
    },
    {
      icon: '⭐',
      title: 'Customer Satisfaction',
      description:
        'Customer satisfaction and trust are our primary priorities in every service we deliver.',
    },
  ];

  const milestones = [
    {
      year: '2022',
      title: 'Company Establishment',
      description:
        'Dea Trans Solusindo was founded with a vision to become a trusted freight forwarding service provider.',
    },
    {
      year: '2023',
      title: 'Regional Expansion',
      description: 'Opened branch offices in various major cities across Indonesia.',
    },
    {
      year: '2024',
      title: 'Global Reach',
      description: 'Serving imports from China to Jakarta and expanding internationally.',
    },
    {
      year: '2025',
      title: 'Digital Transformation',
      description:
        'Implementation of technology-based tracking and logistics management systems.',
    },
    {
      year: '2024',
      title: 'International Certification',
      description:
        'Achieved ISO certification and recognition as a trusted freight forwarder.',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className="container">
          <h1 className={styles.heroTitle}>Our Story</h1>
          <p className={styles.heroSubtitle}>
            Bridging Distance, Building Trust
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="section">
        <div className="container">
          <div className={styles.overview}>
            <div className={styles.overviewContent}>
              <p className={styles.text}>
                Founded in 2022, Dea Trans Solusindo began with a simple vision:
                to revolutionize freight forwarding by combining reliability,
                transparency, and cutting-edge technology. What started as a
                small team of logistics experts has grown into a trusted partner
                for businesses across Indonesia and internationally.
              </p>
              <p className={styles.text}>
                Our journey has been driven by a commitment to understanding our
                clients&apos; unique needs and delivering solutions that exceed
                expectations. From managing complex import-export operations to
                coordinating multi-modal shipments, we&apos;ve built a
                reputation for excellence through meticulous attention to detail
                and unwavering dedication to customer success.
              </p>
              <div className={styles.overviewButton}>
                <Link href="/contact" className="btn btn-primary">
                  Get in Touch
                </Link>
              </div>
            </div>
            <div className={styles.overviewImage}>
              <div className={styles.imagePlaceholder}>
                <Image
                  src="/images/dea-teams.jpg"
                  alt="Dea Trans Solusindo Office"
                  width={500}
                  height={500}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseSection}>
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            What sets us apart in the logistics industry
          </p>
          <div className={styles.whyChooseGrid}>
            {whyChooseUs.map((feature, index) => (
              <div key={index} className={styles.whyChooseCard}>
                <div className={styles.whyChooseIcon}>{feature.icon}</div>
                <div className={styles.whyChooseContent}>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className={styles.valuesSection}>
        <div className="container">
          <h2 className="section-title">Our Values</h2>
          <p className="section-subtitle">
            Principles that guide every aspect of our business
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

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2>Ready to Transform Your Logistics?</h2>
            <p>
              Let&apos;s work together to streamline your supply chain and
              unlock new growth opportunities for your business.
            </p>
            <Link href="/contact" className="btn btn-secondary">
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
