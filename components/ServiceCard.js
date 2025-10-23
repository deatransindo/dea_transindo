// components/ServiceCard.js
import Image from 'next/image'
import styles from './ServiceCard.module.css'

export default function ServiceCard({ image, title, description }) {
  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className={styles.cardImage}
          />
        </div>
      )}
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}