// components/Feature.js
import styles from './Feature.module.css'

export default function Feature({ icon, title, description }) {
  return (
    <div className={styles.feature}>
      <div className={styles.iconBox}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <div className={styles.content}>
        <h4 className={styles.title}>{title}</h4>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}