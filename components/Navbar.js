// components/Navbar.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo_dea.png"
            width={200}
            height={200}
            alt="Dea Trans Solusindo"
            className={styles.logoIcon}
          />
        </Link>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={isOpen ? styles.open : ''}></span>
          <span className={isOpen ? styles.open : ''}></span>
          <span className={isOpen ? styles.open : ''}></span>
        </button>

        <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
          <li>
            <Link href="/" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              About
            </Link>
          </li>
          <li>
            <Link href="/services" onClick={() => setIsOpen(false)}>
              Services
            </Link>
          </li>
          <li>
            <Link href="/calculator" onClick={() => setIsOpen(false)}>
              Calculator
            </Link>
          </li>
          <li>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/* components/Navbar.module.css */
