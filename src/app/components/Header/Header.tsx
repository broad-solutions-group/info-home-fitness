'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoIcon}>🏠</span>
          <span className={styles.logoText}>Home Fitness</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/category/affordable-home-gym-setups" className={styles.navLink}>
            Affordable Home Gym Setups
          </Link>
          <Link href="/category/family-kids-friendly-workouts" className={styles.navLink}>
            Family & Kids Friendly Workouts
          </Link>
          <Link href="/category/strength-training-without-equipment" className={styles.navLink}>
            Strength Training Without Equipment
          </Link>
          <Link href="/category/motivation-habit-building-tips" className={styles.navLink}>
            Motivation & Habit Building Tips
          </Link>
        </nav>

        {/* Search Form */}
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchButton}>
            <span className={styles.searchIcon}>🔍</span>
          </button>
        </form>

        {/* Mobile Menu Button */}
        <button 
          className={styles.menuButton}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`${styles.mobileNav} ${isMenuOpen ? styles.mobileNavOpen : ''}`}>
        <Link href="/" className={styles.mobileNavLink} onClick={closeMenu}>
          Home
        </Link>
        <Link href="/category/affordable-home-gym-setups" className={styles.mobileNavLink} onClick={closeMenu}>
          Affordable Home Gym Setups
        </Link>
        <Link href="/category/family-kids-friendly-workouts" className={styles.mobileNavLink} onClick={closeMenu}>
          Family & Kids Friendly Workouts
        </Link>
        <Link href="/category/strength-training-without-equipment" className={styles.mobileNavLink} onClick={closeMenu}>
          Strength Training Without Equipment
        </Link>
        <Link href="/category/motivation-habit-building-tips" className={styles.mobileNavLink} onClick={closeMenu}>
          Motivation & Habit Building Tips
        </Link>
        
        {/* Mobile Search */}
        <form onSubmit={handleSearch} className={styles.mobileSearchForm}>
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.mobileSearchInput}
          />
          <button type="submit" className={styles.mobileSearchButton}>
            Search
          </button>
        </form>
      </div>

      {/* Overlay */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={closeMenu}></div>
      )}
    </header>
  );
};

export default Header; 