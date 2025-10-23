// components/Feature.js
import styles from './Feature.module.css'

export default function Feature({ image, title, description }) {
  return (
    <div className={styles.feature}>
      {image && (
        <div className={styles.imageWrapper}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image}
            alt={title}
            className={styles.featureImage}
          />
        </div>
      )}
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}