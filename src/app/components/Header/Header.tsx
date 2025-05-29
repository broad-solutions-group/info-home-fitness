'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();

  // 监听滚动事件，增强吸顶效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 关闭移动端菜单时禁止body滚动
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false); // 搜索后关闭移动端菜单
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.container}>
        {/* 左侧区域：Logo + 导航 */}
        <div className={styles.leftSection}>
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
              Home Gym
            </Link>
            <Link href="/category/family-kids-friendly-workouts" className={styles.navLink}>
              Family Fitness
            </Link>
            <Link href="/category/strength-training-without-equipment" className={styles.navLink}>
              Bodyweight
            </Link>
            <Link href="/category/motivation-habit-building-tips" className={styles.navLink}>
              Motivation
            </Link>
          </nav>
        </div>

        {/* 右侧区域：搜索框 + 移动菜单按钮 */}
        <div className={styles.rightSection}>
          {/* Search Form */}
          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton} aria-label="Search">
              <span className={styles.searchIcon}>🔍</span>
            </button>
          </form>

          {/* Mobile Menu Button */}
          <button 
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            <span className={`${styles.menuIcon} ${isMenuOpen ? styles.menuIconOpen : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
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
        <div className={styles.overlay} onClick={closeMenu} aria-hidden="true"></div>
      )}
    </header>
  );
};

export default Header; 